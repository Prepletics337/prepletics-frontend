"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />

      <div className="relative max-w-7xl mx-auto px-8 py-28">

        <div className="max-w-3xl">

          <p className="uppercase tracking-[0.3em] text-yellow-400 font-semibold mb-6">

            TRAIN SMARTER. PASS FASTER.

          </p>

          <h1 className="text-6xl md:text-7xl font-black leading-tight">

            Know exactly when you're ready to

            <span className="block text-yellow-400">

              pass the PMP®

            </span>

          </h1>

          <p className="text-xl text-slate-400 mt-10 leading-9">

            Full-length PMP mock exams, intelligent practice quizzes,
            detailed analytics, and mistake reviews designed to help you
            build confidence—not just memorize questions.

          </p>

          <div className="flex gap-5 mt-12">

            <Link
              href="/register"
              className="bg-yellow-500 hover:bg-yellow-400 transition text-black font-bold px-8 py-4 rounded-xl"
            >
              Start Studying Free
            </Link>

            <Link
              href="/login"
              className="border border-slate-700 hover:border-slate-500 px-8 py-4 rounded-xl"
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
