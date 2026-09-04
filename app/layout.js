import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata = {
  title: "Dream Crew Bookings — Work worth finding",
  description: "Premium opportunities for ambitious professionals",
  icons: { icon: "/logo.jpeg", shortcut: "/logo.jpeg", apple: "/logo.jpeg" },
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
