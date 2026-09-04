import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Search,
  Send,
  BriefcaseBusiness,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Reveal from "@/components/ui/Reveal";
import JobCard from "@/components/jobs/JobCard";
import Badge from "@/components/ui/Badge";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
export default async function Home() {
  let jobs = [];
  try {
    await connectDB();
    jobs = await Job.find({ status: "ACTIVE" })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
  } catch {}
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="grid-bg relative px-5 pb-24 pt-24 text-center md:pb-36 md:pt-32">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[130px]" />
          <Reveal className="relative mx-auto max-w-5xl">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-acid/25 bg-acid/10 px-4 py-2 text-xs text-acid">
              <CheckCircle2 size={14} /> Curated opportunities for serious
              talent
            </div>
            <h1 className="text-5xl font-semibold leading-[.98] tracking-tight md:text-8xl">
              Find work.
              <br />
              <span className="text-gradient">Build your future.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-mist">
              A premium opportunity network that connects ambitious
              professionals with work designed to move their careers forward.
            </p>
            <div className="mt-9 flex justify-center gap-3">
              <Link href="/jobs" className="btn btn-primary">
                Explore jobs <ArrowRight size={17} />
              </Link>
              <Link href="/sign-up" className="btn btn-secondary">
                Get started
              </Link>
            </div>
          </Reveal>
          <div className="relative mx-auto mt-16 max-w-5xl rounded-[2rem] border border-white/15 bg-[#101a23]/90 p-5 text-left shadow-glow md:p-7">
            <div className="mb-5 flex gap-2">
              <i className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <i className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <i className="h-2.5 w-2.5 rounded-full bg-acid" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Open roles", "128"],
                ["Your applications", "12"],
                ["New this week", "34"],
              ].map(([x, n]) => (
                <div
                  key={x}
                  className="rounded-2xl border border-white/10 bg-white/[.04] p-5"
                >
                  <p className="text-sm text-mist">{x}</p>
                  <p className="mt-4 text-4xl font-semibold">{n}</p>
                  <div className="mt-4 h-1.5 w-full rounded-full bg-white/10">
                    <div className="h-full w-2/3 rounded-full bg-acid" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="how" className="mx-auto max-w-7xl px-5 py-24">
          <Reveal>
            <p className="text-acid">HOW IT WORKS</p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold md:text-5xl">
              Your next move, made clear.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {[
              ["01", "Create account"],
              ["02", "Activate access"],
              ["03", "Browse jobs"],
              ["04", "Apply with confidence"],
              ["05", "Track progress"],
            ].map(([n, x], i) => (
              <Reveal key={n} delay={i * 0.06}>
                <div className="glass rounded-2xl p-5">
                  <span className="text-acid">{n}</span>
                  <p className="mt-12 text-lg font-medium">{x}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="opportunities" className="bg-[#0b1218] px-5 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-acid">FEATURED</p>
                <h2 className="mt-2 text-4xl font-semibold">
                  Opportunities in motion.
                </h2>
              </div>
              <Link href="/jobs" className="hidden text-sm text-mist md:block">
                View all roles →
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {jobs.length
                ? jobs.map((j) => <JobCard key={j._id} job={j} />)
                : [
                    "Product Designer",
                    "Frontend Engineer",
                    "Growth Strategist",
                  ].map((title, i) => (
                    <div key={title} className="glass rounded-3xl p-5">
                      <Badge tone="blue">
                        {["Design", "Engineering", "Marketing"][i]}
                      </Badge>
                      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                      <p className="mt-2 text-mist">New opportunity · Remote</p>
                      <p className="mt-5 text-acid">
                        Join the network to explore
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </section>
        <section id="access" className="mx-auto max-w-7xl px-5 py-24">
          <div className="glass rounded-[2rem] p-8 md:p-14">
            <ShieldCheck className="text-acid" size={32} />
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold">
              A more intentional way to find work.
            </h2>
            <p className="mt-4 max-w-xl text-mist">
              Membership keeps our opportunity network focused, secure, and
              built around professionals ready to act.
            </p>
            <Link href="/sign-up" className="btn btn-primary mt-7">
              Join Dream Crew Bookings <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-mist">
        © 2026 Dream Crew Bookings · Better work, deliberately found.
      </footer>
    </>
  );
}
