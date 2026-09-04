import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdminClerkId } from "@/lib/auth";

// Keep the first post-auth redirect independent of MongoDB. This lets a
// non-admin member reach payment immediately, even before their user record is
// created during the payment flow.
export default async function AfterAuthPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");
  redirect(isAdminClerkId(userId) ? "/dashboard" : "/payment");
}
