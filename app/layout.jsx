
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { getServerSession } from "next-auth";
import SessionWrapper from "./components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HP Companion",
  author: "Ryan Ramsey",
  description: "Harry Potter app built to learn Next.js"
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper session={session}>
          <Navbar />
          <main className="my-4 mx-auto w-4/5 min-w-96">
            {children}
          </main>
        </SessionWrapper>
      </body>
    </html>
  );
}
