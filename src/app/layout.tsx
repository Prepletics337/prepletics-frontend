import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
icons: {

    icon: "/favicon.png",

  },
openGraph: {
  title: "Prepletics | PMP Exam Simulator",
  description:
    "Train Smarter. Pass Faster. Practice PMP mock exams and track your readiness score.",
  url: "https://prepletics.com",
  siteName: "Prepletics",
  images: [
    {
      url: "https://prepletics.com/images/og-image.png",
      width: 1200,
      height: 630,
      alt: "Prepletics PMP Exam Simulator",
    },
  ],
  locale: "en_US",
  type: "website",
},

twitter: {
  card: "summary_large_image",
  title: "Prepletics | PMP Exam Simulator",
  description:
    "Train Smarter. Pass Faster.",
  images: ["https://prepletics.com/images/og-image.png"],
},
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
<Script

  src="https://www.googletagmanager.com/gtag/js?id=G-7XZ53Q34T1"

  strategy="afterInteractive"

/>

<Script id="google-analytics" strategy="afterInteractive">

  {`

    window.dataLayer = window.dataLayer || [];

    function gtag(){dataLayer.push(arguments);}

    gtag('js', new Date());

    gtag('config', 'G-7XZ53Q34T1');

  `}

</Script>
   <body className="min-h-full flex flex-col">

  <main className="flex-1">
    {children}
  </main>

  <footer className="border-t bg-white py-6">
    <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-600">

      <div className="mb-2">
        © 2026 Prepletics. All rights reserved.
      </div>

  <div className="flex justify-center gap-6 flex-wrap">
  <a href="/about">About Us</a>
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
