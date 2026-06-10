"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "prepleticsUser"
      );

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(
      "prepleticsUser"
    );

    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-lime-600">
              Prepletics
            </h1>

            <p className="text-gray-600">
              Train Smarter. Pass Faster.
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">

        <h2 className="mb-6 text-3xl font-bold">
          Welcome Back{" "}
          {user?.firstName || "Student"} 👋
        </h2>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Readiness Score
            </p>
            <h3 className="mt-2 text-4xl font-bold text-green-600">
              72%
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Questions Answered
            </p>
            <h3 className="mt-2 text-4xl font-bold">
              1,245
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Mock Exams
            </p>
            <h3 className="mt-2 text-4xl font-bold">
              12
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Study Streak
            </p>
            <h3 className="mt-2 text-4xl font-bold">
              14 Days
            </h3>
          </div>
        </div>

        {/* Knowledge Areas */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow">
          <h3 className="mb-4 text-xl font-bold">
            Knowledge Areas
          </h3>

          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between">
                <span>People</span>
                <span>82%</span>
              </div>
              <div className="h-3 rounded bg-gray-200">
                <div className="h-3 w-[82%] rounded bg-green-500"></div>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between">
                <span>Process</span>
                <span>67%</span>
              </div>
              <div className="h-3 rounded bg-gray-200">
                <div className="h-3 w-[67%] rounded bg-yellow-500"></div>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between">
                <span>Business Environment</span>
                <span>74%</span>
              </div>
              <div className="h-3 rounded bg-gray-200">
                <div className="h-3 w-[74%] rounded bg-blue-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="rounded-lg bg-lime-600 px-6 py-3 font-semibold text-white hover:bg-lime-700">
            Start Quiz
          </button>

          <button className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
            Take Mock Exam
          </button>

          <button className="rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white hover:bg-slate-900">
            Review Mistakes
          </button>
        </div>

      </div>
    </main>
  );
}
