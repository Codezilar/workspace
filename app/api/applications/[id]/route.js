import { NextResponse } from "next/server";
import { getDbUser, isAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
export async function PATCH(req, { params }) {
  const u = await getDbUser();
  if (!isAdmin(u))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { status } = await req.json();
  if (
    ![
      "SUBMITTED",
      "UNDER_REVIEW",
      "SHORTLISTED",
      "ACCEPTED",
      "REJECTED",
    ].includes(status)
  )
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  await connectDB();
  return NextResponse.json(
    await Application.findByIdAndUpdate(
      (await params).id,
      { status },
      { new: true },
    ),
  );
}
