import { NextResponse } from "next/server";
import { getDbUser, isAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
const editable = [
  "name",
  "phone",
  "location",
  "bio",
  "skills",
  "experience",
  "education",
  "resume",
  "linkedIn",
  "portfolio",
  "availability",
];
export async function GET(_, { params }) {
  const actor = await getDbUser();
  await connectDB();
  const target = await User.findById((await params).id).lean();
  if (!actor || (!isAdmin(actor) && String(actor._id) !== String(target?._id)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json(target);
}
export async function PATCH(req, { params }) {
  const actor = await getDbUser();
  if (!actor)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const id = (await params).id;
  const body = await req.json();
  const self = String(actor._id) === id;
  if (!self && !isAdmin(actor))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const permitted = self
    ? Object.fromEntries(
        Object.entries(body).filter(([k]) => editable.includes(k)),
      )
    : Object.fromEntries(
        Object.entries(body).filter(([k]) =>
          [...editable, "accessStatus", "role"].includes(k),
        ),
      );
  const user = await User.findByIdAndUpdate(id, permitted, {
    new: true,
    runValidators: true,
  });
  return NextResponse.json(user);
}
