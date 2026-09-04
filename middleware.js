import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/after-auth",
  "/api/webhooks(.*)",
]);
export default clerkMiddleware(async (auth, req) => {
  if (!isPublic(req)) await auth.protect();
});
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/", "/__clerk/:path*"],
};
