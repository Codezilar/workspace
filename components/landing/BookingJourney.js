import { CalendarCheck, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const categories = ["Artists", "Production", "Events", "Brand talent"];
const benefits = [
  [CalendarCheck, "One clear booking flow", "Keep availability, briefs, and confirmations in one place."],
  [Headphones, "Human support", "Get thoughtful help when a brief needs the right point of view."],
  [ShieldCheck, "Verified connections", "Build with people who are ready to show up and deliver."],
];

export default function BookingJourney() {
  return <>
    <section className="border-y border-white/10 bg-[#0d161e] px-5 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <Reveal><p className="text-acid">BUILT FOR MOMENTUM</p><h2 className="mt-3 text-4xl font-semibold md:text-5xl">A calmer way to build a brilliant crew.</h2><p className="mt-5 max-w-md leading-7 text-mist">From the first brief to the final confirmation, Dream Crew Bookings keeps the important details clear and the next move obvious.</p><div className="mt-8 flex flex-wrap gap-2">{categories.map(category=><span key={category} className="rounded-full border border-white/15 px-4 py-2 text-sm text-mist">{category}</span>)}</div></Reveal>
        <div className="grid gap-4 sm:grid-cols-3">{benefits.map(([Icon,title,copy],index)=><Reveal key={title} delay={index*.08}><div className="glass h-full rounded-3xl p-6"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-acid/15 text-acid"><Icon size={21}/></span><h3 className="mt-10 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-mist">{copy}</p></div></Reveal>)}</div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 py-24">
      <Reveal className="glass relative overflow-hidden rounded-[2rem] p-8 md:p-14"><div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-acid/15 blur-[90px]"/><div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="flex items-center gap-2 text-acid"><Sparkles size={16}/> READY WHEN YOU ARE</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold md:text-6xl">Make your next booking feel like the easy part.</h2><p className="mt-5 max-w-xl leading-7 text-mist">Create a profile, discover the people behind great work, and keep your next production moving.</p></div><a href="/sign-up" className="btn btn-primary w-fit">Start your profile</a></div></Reveal>
    </section>
  </>;
}
