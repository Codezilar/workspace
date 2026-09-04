import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { connectDB } from './db';
import User from '@/models/User';

const adminIds = () => (process.env.ADMIN_CLERK_IDS || '').split(',').map(id => id.trim()).filter(Boolean);
export const isAdmin = user => Boolean(user && (['ADMIN', 'OWNER'].includes(user.role) || adminIds().includes(user.clerkId)));

export async function getDbUser({ create = true } = {}) {
  const { userId } = await auth(); if (!userId) return null;
  await connectDB(); let user = await User.findOne({ clerkId: userId });
  if (!user && create) {
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress?.trim().toLowerCase();
    if (!email) throw new Error('An email address is required to create an account.');

    const name = [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(' ') || 'New member';
    // Match by email as well as Clerk ID. This recovers accounts when a Clerk
    // user is recreated, and prevents the legacy unique email index from
    // turning a normal page visit into a 500 response.
    user = await User.findOneAndUpdate(
      { $or: [{ clerkId: userId }, { email }] },
      { $set: { clerkId: userId }, $setOnInsert: { email, name } },
      { new: true, upsert: true }
    );
  }
  // The allowlist is server-only. It is useful for bootstrapping the first owner;
  // all subsequent authorization still derives from the database record.
  if (user && adminIds().includes(user.clerkId) && user.role === 'USER') { user.role = 'OWNER'; await user.save(); }
  return user;
}
export async function requireActiveUser() { const user = await getDbUser(); if (!user) redirect('/sign-in'); if (user.accessStatus === 'SUSPENDED') redirect('/payment?state=suspended'); if (user.accessStatus !== 'ACTIVE') redirect(user.accessStatus === 'PAYMENT_REVIEW' ? '/pending' : '/payment'); return user; }
export async function requireAdmin() { const user = await getDbUser(); if (!isAdmin(user)) redirect('/dashboard'); return user; }
