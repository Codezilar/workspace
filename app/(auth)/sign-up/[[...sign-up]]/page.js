import { SignUp } from "@clerk/nextjs";
export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink p-5">
      <SignUp forceRedirectUrl="/dashboard" />
    </main>
  );
}
