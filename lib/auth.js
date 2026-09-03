import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { connectDB } from './db';
import User from '@/models/User';

export async function getDbUser({ create = true } = {}) {
  const { userId } = await auth(); if (!userId) return null;
  await connectDB(); let user = await User.findOne({ clerkId: userId });
  if (!user && create) { const clerkUser = await currentUser(); user = await User.create({ clerkId:userId, email:clerkUser?.emailAddresses?.[0]?.emailAddress || '', name:[clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(' ') || 'New member' }); }
  // The allowlist is server-only. It is useful for bootstrapping the first owner;
  // all subsequent authorization still derives from the database record.
  if (user && (process.env.ADMIN_CLERK_IDS || '').split(',').includes(user.clerkId) && user.role === 'USER') { user.role = 'OWNER'; await user.save(); }
  return user;
}
export async function requireActiveUser() { const user = await getDbUser(); if (!user) redirect('/sign-in'); if (user.accessStatus === 'SUSPENDED') redirect('/payment?state=suspended'); if (user.accessStatus !== 'ACTIVE') redirect(user.accessStatus === 'PAYMENT_REVIEW' ? '/pending' : '/payment'); return user; }
export async function requireAdmin() { const user = await getDbUser(); const envAdmins = (process.env.ADMIN_CLERK_IDS || '').split(','); if (!user || !(['ADMIN','OWNER'].includes(user.role) || envAdmins.includes(user.clerkId))) redirect('/dashboard'); return user; }
