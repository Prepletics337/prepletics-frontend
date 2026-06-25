"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
<header
  className="sticky top-0 z-50 backdrop-blur-xl border-b border-slate-800/50"
  style={{
    background: "rgba(10,16,35,0.80)",
  }}
>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <Link href="/" className="flex items-center">

          <Image
            src="/images/prepletics.png"
            alt="Prepletics"
            width={220}
            height={40}
            priority
          />

        </Link>

        <nav className="hidden lg:flex gap-10 text-sm text-slate-300">

          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#pricing" className="hover:text-white transition">
            Pricing
          </a>

          <a href="#faq" className="hover:text-white transition">
            FAQ
          </a>

        </nav>

        <div className="flex gap-4">

          <Link
            href="/login"
            className="px-6 py-3 rounded-xl border border-slate-700 hover:border-purple-400 transition duration-300"
          >
            Login
          </Link>


<Link
  href="/register"
  className="px-7 py-3 rounded-xl text-white font-semibold transition duration-300 hover:scale-105"
  style={{
    background: "linear-gradient(90deg,#7C3AED 0%, #9333EA 100%)",
  }}
>
  Get Started
</Link>

        </div>

      </div>

    </header>
  );
}
