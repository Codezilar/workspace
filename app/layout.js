import './globals.css'; import { ClerkProvider } from '@clerk/nextjs';
export const metadata={title:'Vanta Work — Work worth finding',description:'Premium opportunities for ambitious professionals'};
export default function RootLayout({children}){return <ClerkProvider><html lang="en"><body>{children}</body></html></ClerkProvider>}
