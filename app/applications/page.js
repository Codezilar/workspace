import AppShell from "@/components/layout/AppShell";
import Badge from "@/components/ui/Badge";
import { requireActiveUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
export default async function Applications() {
  const user = await requireActiveUser();
  await connectDB();
  const apps = await Application.find({ userId: user._id })
    .populate("jobId")
    .sort({ createdAt: -1 })
    .lean();
  return (
    <AppShell>
      <p className="text-acid">APPLICATIONS</p>
      <h1 className="mt-2 text-3xl font-semibold">Your application journey.</h1>
      <div className="mt-8 space-y-3">
        {apps.length ? (
          apps.map((a) => (
            <div
              className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5"
              key={a._id}
            >
              <div>
                <h2 className="font-semibold">
                  {a.jobId?.title || "Role unavailable"}
                </h2>
                <p className="mt-1 text-sm text-mist">
                  {a.jobId?.company} · Sent{" "}
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge
                tone={
                  a.status === "ACCEPTED"
                    ? "green"
                    : a.status === "REJECTED"
                      ? "red"
                      : "amber"
                }
              >
                {a.status.replace("_", " ")}
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-mist">You have not applied to any jobs yet.</p>
        )}
      </div>
    </AppShell>
  );
}
