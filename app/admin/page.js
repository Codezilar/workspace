import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/dashboard/StatCard";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Job from "@/models/Job";
import Payment from "@/models/Payment";
import Application from "@/models/Application";
export default async function Admin() {
  await requireAdmin();
  await connectDB();
  const [users, active, payments, pending, jobs, apps] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ accessStatus: "ACTIVE" }),
    Payment.countDocuments(),
    Payment.countDocuments({ status: "PENDING" }),
    Job.countDocuments({ status: "ACTIVE" }),
    Application.countDocuments(),
  ]);
  return (
    <AppShell admin>
      <p className="text-acid">OWNER CONTROL CENTER</p>
      <h1 className="mt-2 text-3xl font-semibold">Platform overview.</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total users" value={users} />
        <StatCard label="Approved users" value={active} accent />
        <StatCard label="Total payments" value={payments} />
        <StatCard label="Pending reviews" value={pending} />
        <StatCard label="Active jobs" value={jobs} />
        <StatCard label="Applications" value={apps} />
      </div>
    </AppShell>
  );
}
