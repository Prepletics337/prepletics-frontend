"use client";


import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [knowledgeAreas, setKnowledgeAreas] =
    useState<any[]>([]);
const [examHistory, setExamHistory] =
  useState<any[]>([]);

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "prepleticsUser",
      );

    if (storedUser) {
      setUser(
        JSON.parse(storedUser),
      );
    }
const savedHistory =
  localStorage.getItem(
    "prepletics-exam-history",
  );

if (savedHistory) {

  setExamHistory(
    JSON.parse(savedHistory),
  );

}

    fetch(
      "http://2.25.173.35:3001/results/stats",
    )
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(
      "http://2.25.173.35:3001/results/knowledge-areas",
    )
      .then((res) => res.json())
      .then((data) => {
        setKnowledgeAreas(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

const logout = () => {
  localStorage.removeItem(
    "prepleticsUser",
  );

  window.location.href =
    "/login";
};

const chartData =
  examHistory.map(
    (exam, index) => ({
      attempt: `Mock ${index + 1}`,
      score: exam.score,
    }),
  );
  return (
    <main className="min-h-screen bg-slate-50">
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

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Readiness Score
            </p>

            <h3 className="mt-2 text-4xl font-bold text-green-600">
              {stats?.readinessScore ?? 0}%
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Questions Answered
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {stats?.totalAnswered ?? 0}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Correct Answers
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {stats?.correctAnswers ?? 0}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Incorrect Answers
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {stats?.incorrectAnswers ?? 0}
            </h3>
          </div>

        </div>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">

          <h3 className="mb-4 text-xl font-bold">
            Knowledge Area Performance
          </h3>

          <div className="space-y-5">

            {knowledgeAreas.map((area) => (
              <div
                key={area.knowledgeArea}
              >

                <div className="mb-1 flex justify-between">

                  <span>
                    {area.knowledgeArea}
                  </span>

                  <span>
                    {area.percentage}%
                  </span>

                </div>

                <div className="h-3 rounded bg-gray-200">

                  <div
                    className="h-3 rounded bg-green-500"
                    style={{
                      width:
                        `${area.percentage}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>
    <div className="mt-8 rounded-xl bg-white p-6 shadow">    

<h3 className="mb-4 text-xl font-bold">
  Progress Trend
</h3>

{examHistory.length === 0 ? (

  <p className="text-gray-500">
    Complete a mock exam to see progress.
  </p>

) : (

  <div className="h-80">

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <LineChart
        data={chartData}
      >

        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="attempt"
        />

        <YAxis
          domain={[0, 100]}
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="score"
          stroke="#16a34a"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

)}


</div>
<div className="mt-8 rounded-xl bg-white p-6 shadow">
  <h3 className="mb-4 text-xl font-bold">
    Exam History
  </h3>

  {examHistory.length === 0 ? (

    <p className="text-gray-500">
      No exams completed yet.
    </p>

  ) : (

    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="text-left py-2">
            Attempt
          </th>

          <th className="text-left py-2">
            Date
          </th>

          <th className="text-left py-2">
            Score
          </th>

        </tr>

      </thead>

      <tbody>

        {examHistory.map(
          (
            exam,
            index,
          ) => (

            <tr
              key={index}
              className="border-b"
            >

              <td className="py-2">
                Mock #{index + 1}
              </td>

              <td className="py-2">
                {exam.date}
              </td>

              <td className="py-2 font-semibold">
                {exam.score}%
              </td>

            </tr>

          ),
        )}

      </tbody>

    </table>

  )}

</div>



        <div className="mt-8 flex flex-wrap gap-4">

          <button
            className="rounded-lg bg-lime-600 px-6 py-3 font-semibold text-white hover:bg-lime-700"
            onClick={() =>
              (window.location.href =
                "/quiz")
            }
          >
            Start Quiz
          </button>

          <button className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
            Take Mock Exam
          </button>

         <button
  className="rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white hover:bg-slate-900"
  onClick={() =>
    (window.location.href =
      "/review-mistakes")
  }
>
  Review Mistakes
</button>

        </div>

      </div>
    </main>
  );
}
