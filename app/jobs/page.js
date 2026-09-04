import AppShell from "@/components/layout/AppShell";
import JobCard from "@/components/jobs/JobCard";
import { requireActiveUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
export default async function JobsPage({ searchParams }) {
  await requireActiveUser();
  await connectDB();
  const q = (await searchParams)?.q || "";
  const filter = q
    ? {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { company: { $regex: q, $options: "i" } },
          { skills: { $regex: q, $options: "i" } },
        ],
      }
    : {};
  const jobs = await Job.find({ status: "ACTIVE", ...filter })
    .sort({ createdAt: -1 })
    .lean();
  return (
    <AppShell>
      <p className="text-acid">OPPORTUNITIES</p>
      <h1 className="mt-2 text-3xl font-semibold">Find work that fits.</h1>
      <form className="mt-7 flex gap-3">
        <input
          name="q"
          defaultValue={q}
          className="input max-w-xl"
          placeholder="Search role, company, or skill"
        />
        <button className="btn btn-primary">Search</button>
      </form>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {jobs.length ? (
          jobs.map((j) => <JobCard key={j._id} job={j} />)
        ) : (
          <p className="text-mist">No roles match your search yet.</p>
        )}
      </div>
    </AppShell>
  );
}
