import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src="/logo.jpeg"
            alt="Dream Crew Bookings"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover"
            priority
          />
          DREAM <span className="text-acid">CREW</span> BOOKINGS
        </Link>
        <div className="hidden gap-7 text-sm text-mist md:flex">
          <a href="#how">How it works</a>
          <a href="#opportunities">Opportunities</a>
          <a href="#access">Access</a>
        </div>
        <div className="flex items-center gap-3">
          <SignedOut>
            <Link className="text-sm text-mist" href="/sign-in">
              Sign in
            </Link>
            <Link className="btn btn-primary text-sm" href="/sign-up">
              Get started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link className="btn btn-secondary text-sm" href="/dashboard">
              Workspace
            </Link>
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
