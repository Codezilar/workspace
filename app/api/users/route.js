import { NextResponse } from "next/server";
import { getDbUser, isAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
export async function GET() {
  const u = await getDbUser();
  if (!isAdmin(u))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  return NextResponse.json(await User.find({}).select("-clerkId").lean());
}
