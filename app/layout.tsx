import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import DesktopHeader from "./(protected)/_components/DesktopHeader";
import UnProtectedNav from "./(protected)/_components/UnProtectedNav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-muted/40 text-foreground">
        <main className="min-h-screen flex border-2 border-red-600 flex-col items-center">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
