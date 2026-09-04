import { NextResponse } from "next/server";
import { getDbUser, isAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { jobSchema } from "@/lib/validators";
async function admin() {
  const u = await getDbUser();
  return isAdmin(u) ? u : null;
}
export async function GET(_, { params }) {
  const u = await getDbUser();
  if (!u || u.accessStatus !== "ACTIVE")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  return NextResponse.json(await Job.findById((await params).id).lean());
}
export async function PATCH(req, { params }) {
  if (!(await admin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    await connectDB();
    const job = await Job.findByIdAndUpdate(
      (await params).id,
      jobSchema.partial().parse(await req.json()),
      { new: true },
    );
    return NextResponse.json(job);
  } catch {
    return NextResponse.json({ error: "Invalid job" }, { status: 400 });
  }
}
export async function DELETE(_, { params }) {
  if (!(await admin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  await Job.findByIdAndDelete((await params).id);
  return NextResponse.json({ ok: true });
}
