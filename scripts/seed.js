/* Run with MONGODB_URI=... npm run seed. A Clerk user is created on first sign-in. */
const mongoose = require("mongoose");
const Job = mongoose.model(
  "Job",
  new mongoose.Schema(
    {
      title: String,
      slug: String,
      description: String,
      company: String,
      location: String,
      jobType: String,
      salary: String,
      category: String,
      requirements: [String],
      responsibilities: [String],
      skills: [String],
      status: String,
    },
    { timestamps: true },
  ),
);
async function seed() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
  await mongoose.connect(process.env.MONGODB_URI);
  if (await Job.countDocuments())
    return console.log("Jobs already exist — skipped seed.");
  await Job.insertMany([
    {
      title: "Senior Frontend Engineer",
      slug: "senior-frontend-engineer",
      company: "Northstar Labs",
      location: "Remote",
      jobType: "Full-time",
      salary: "$4,500 – $6,500 / month",
      category: "Engineering",
      description:
        "Build thoughtful, high-performance interfaces for a growing global product. You will work closely with design and platform teams to turn complex workflows into elegant experiences.",
      requirements: [
        "4+ years building web products",
        "Strong React and Next.js experience",
        "Excellent product judgment",
      ],
      responsibilities: [
        "Ship accessible customer-facing features",
        "Partner with design and backend engineering",
      ],
      skills: ["React", "Next.js", "JavaScript"],
      status: "ACTIVE",
    },
    {
      title: "Product Designer",
      slug: "product-designer",
      company: "Signal House",
      location: "Hybrid · Lagos",
      jobType: "Full-time",
      salary: "$3,000 – $4,500 / month",
      category: "Design",
      description:
        "Shape a new generation of work tools from first principle through production. This is a collaborative product design role with meaningful ownership.",
      requirements: [
        "Portfolio of shipped digital products",
        "Systems thinking",
        "Strong visual craft",
      ],
      responsibilities: [
        "Lead product discovery",
        "Create clear interaction patterns",
      ],
      skills: ["Figma", "Research", "Design systems"],
      status: "ACTIVE",
    },
    {
      title: "Growth Strategist",
      slug: "growth-strategist",
      company: "Parallax Studio",
      location: "Remote",
      jobType: "Contract",
      salary: "$2,500 – $3,500 / month",
      category: "Marketing",
      description:
        "Develop and run focused growth experiments for an ambitious technology studio serving companies around the world.",
      requirements: [
        "Experience with B2B growth",
        "Analytical mindset",
        "Clear written communication",
      ],
      responsibilities: [
        "Plan growth experiments",
        "Report insight and outcomes",
      ],
      skills: ["SEO", "Analytics", "Content"],
      status: "ACTIVE",
    },
  ]);
  console.log("Seeded 3 jobs.");
}
seed()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
