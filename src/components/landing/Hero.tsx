"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

<div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(180deg, #101938 0%, #b3c1f2 55%, #b3c1f2 100%)",
  }}
/>

      <div className="relative max-w-7xl mx-auto px-8 py-40">

        <div className="max-w-4xl">

          <p className="uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-6">

            TRAIN SMARTER. PASS FASTER.

          </p>

          <h1 className="text-6xl md:text-7xl font-black leading-tight">

            Know exactly when you're ready to

            <span className="block text-yellow-300">

              pass the PMP®

            </span>

          </h1>

          <p className="text-xl text-black mt-10 leading-9">

            Full-length PMP mock exams, intelligent practice quizzes,
            detailed analytics, and mistake reviews designed to help you
            build confidence—not just memorize questions.

          </p>

          <div className="flex gap-5 mt-12">

            <Link
              href="/register"
             className="text-white font-bold px-9 py-4 rounded-2xl transition duration-300 hover:scale-105"
style={{
  background:
    "linear-gradient(90deg,#7C3AED 0%, #9333EA 100%)",
}}
            >
              Start Studying Free
            </Link>

            <Link
              href="/login"
             className="border border-slate-700 hover:border-purple-400 px-9 py-4 rounded-2xl transition duration-300"
            >
              I Have an Account
            </Link>

          </div>

          <div className="flex gap-10 mt-16 text-slate-400">

            <div>

              <div className="text-3xl font-bold text-white">

                180

              </div>

              Questions / Exam

            </div>

            <div>

              <div className="text-3xl font-bold text-white">

                100%

              </div>

              Progress Tracking

            </div>

            <div>

              <div className="text-3xl font-bold text-white">

                AI

              </div>

              Ready Platform

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
