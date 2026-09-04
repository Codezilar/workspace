import AppShell from "@/components/layout/AppShell";
import Badge from "@/components/ui/Badge";
import ReviewPayment from "@/components/admin/ReviewPayment";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Payment from "@/models/Payment";
import Job from "@/models/Job";
import Application from "@/models/Application";
export default async function AdminSection({ params }) {
  await requireAdmin();
  await connectDB();
  const section = (await params).section;
  if (section === "payments") {
    const payments = await Payment.find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();
    return (
      <AppShell admin>
        <Heading
          title="Payment review"
          copy="Approve verified access payments or reject incomplete submissions."
        />
        <div className="mt-8 space-y-3">
          {payments.map((p) => (
            <div
              className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5"
              key={p._id}
            >
              <div>
                <p className="font-semibold">
                  {p.userId?.name}{" "}
                  <span className="font-normal text-mist">
                    · {p.userId?.email}
                  </span>
                </p>
                <p className="mt-1 text-sm text-mist">
                  {p.currency} {p.amount} · {p.transactionHash} ·{" "}
                  {new Date(p.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  tone={
                    p.status === "APPROVED"
                      ? "green"
                      : p.status === "REJECTED"
                        ? "red"
                        : "amber"
                  }
                >
                  {p.status}
                </Badge>
                {p.status === "PENDING" && (
                  <ReviewPayment id={p._id.toString()} />
                )}
              </div>
            </div>
          ))}
        </div>
      </AppShell>
    );
  }
  if (section === "users") {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    return (
      <AppShell admin>
        <Heading
          title="Members"
          copy="Monitor platform access and member profiles."
        />
        <div className="glass mt-8 overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-mist">
              <tr>
                <th className="p-4">Member</th>
                <th>Status</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-white/5">
                  <td className="p-4">
                    <p>{u.name}</p>
                    <p className="text-xs text-mist">{u.email}</p>
                  </td>
                  <td>
                    <Badge
                      tone={u.accessStatus === "ACTIVE" ? "green" : "amber"}
                    >
                      {u.accessStatus}
                    </Badge>
                  </td>
                  <td>{u.role}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AppShell>
    );
  }
  if (section === "jobs") {
    const jobs = await Job.find({}).sort({ createdAt: -1 }).lean();
    return (
      <AppShell admin>
        <Heading
          title="Jobs"
          copy="Job publishing is managed through the secured API."
        />
        <div className="mt-8 space-y-3">
          {jobs.map((j) => (
            <div
              className="glass flex justify-between rounded-2xl p-5"
              key={j._id}
            >
              <div>
                <p className="font-semibold">{j.title}</p>
                <p className="mt-1 text-sm text-mist">
                  {j.company} · {j.location}
                </p>
              </div>
              <Badge tone={j.status === "ACTIVE" ? "green" : "amber"}>
                {j.status}
              </Badge>
            </div>
          ))}
        </div>
      </AppShell>
    );
  }
  const apps = await Application.find({})
    .populate("userId", "name email")
    .populate("jobId", "title company")
    .sort({ createdAt: -1 })
    .lean();
  return (
    <AppShell admin>
      <Heading
        title="Applications"
        copy="Review candidate activity across every open role."
      />
      <div className="mt-8 space-y-3">
        {apps.map((a) => (
          <div
            className="glass flex flex-wrap justify-between gap-3 rounded-2xl p-5"
            key={a._id}
          >
            <div>
              <p className="font-semibold">
                {a.userId?.name}{" "}
                <span className="font-normal text-mist">
                  → {a.jobId?.title}
                </span>
              </p>
              <p className="mt-1 text-sm text-mist">
                {a.userId?.email} · {new Date(a.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Badge tone="blue">{a.status}</Badge>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
function Heading({ title, copy }) {
  return (
    <>
      <p className="text-acid">ADMIN</p>
      <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
      <p className="mt-2 text-mist">{copy}</p>
    </>
  );
}
