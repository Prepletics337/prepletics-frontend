import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prepletics | PMP Exam Simulator",
  description:
    "Train Smarter. Pass Faster. Practice PMP mock exams, track readiness scores, analyze weak knowledge areas, and prepare confidently for certification success.",
  keywords: [
    "PMP",
    "PMP Exam",
    "PMP Mock Exam",
    "PMP Practice Questions",
    "Project Management Professional",
    "PMP Simulator",
    "PMP Certification",
    "PMI Exam Prep",
    "Prepletics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
   <body className="min-h-full flex flex-col">

  <main className="flex-1">
    {children}
  </main>

  <footer className="border-t bg-white py-6">
    <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-600">

      <div className="mb-2">
        © 2026 Prepletics. All rights reserved.
      </div>

      <div className="flex justify-center gap-6">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact Us</a>
      </div>

    </div>
  </footer>

</body>
    </html>
  );
}
