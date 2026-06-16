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
  ReferenceLine,
} from "recharts";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [knowledgeAreas, setKnowledgeAreas] =
    useState<any[]>([]);
const [
  knowledgeAreaPerformance,
  setKnowledgeAreaPerformance,
] = useState<any[]>([]);
const [examHistory, setExamHistory] =
  useState<any[]>([]);
const [strongestArea, setStrongestArea] =
  useState<any>(null);

const [weakestArea, setWeakestArea] =
  useState<any>(null);

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

const savedAreas =
  localStorage.getItem(
    "prepletics-knowledge-areas",
  );

if (savedAreas) {

  const parsed =
    JSON.parse(
      savedAreas,
    );

  const formatted =
    Object.entries(
      parsed,
    ).map(
      ([name, stats]: any) => ({
        knowledgeArea:
          name,
        percentage:
          Math.round(
            (stats.correct /
              stats.total) *
              100,
          ),
      }),
    );

  setKnowledgeAreaPerformance(
    formatted,
  );

if (formatted.length > 0) {

    const strongest =

      [...formatted].sort(

        (a, b) =>

          b.percentage -

          a.percentage,

      )[0];

    const weakest =

      [...formatted].sort(

        (a, b) =>

          a.percentage -

          b.percentage,

      )[0];

    setStrongestArea(

      strongest,

    );

    setWeakestArea(

      weakest,

    );

  }

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
const scores =
  examHistory.map(
    (exam) => exam.score,
  );

const bestScore =
  scores.length > 0
    ? Math.max(...scores)
    : 0;

const lastScore =
  scores.length > 0
    ? scores[scores.length - 1]
    : 0;

const averageScore =
  scores.length > 0
    ? Math.round(
        scores.reduce(
          (sum, score) =>
            sum + score,
          0,
        ) / scores.length,
      )
    : 0;

const mocksCompleted =
  examHistory.length;

const readinessTarget = 80;

const currentReadiness =
  averageScore;

const readinessGap =
  Math.max(
    0,
    readinessTarget -
      currentReadiness,
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
<div className="mt-6 grid gap-6 md:grid-cols-4">

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Best Mock Score
    </p>

    <h3 className="mt-2 text-4xl font-bold text-green-600">
      {bestScore}%
    </h3>
  </div>

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Average Score
    </p>

    <h3 className="mt-2 text-4xl font-bold">
      {averageScore}%
    </h3>
  </div>

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Last Mock Score
    </p>

    <h3 className="mt-2 text-4xl font-bold">
      {lastScore}%
    </h3>
  </div>

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Mocks Completed
    </p>

    <h3 className="mt-2 text-4xl font-bold">
      {mocksCompleted}
    </h3>
  </div>

</div>

<div className="grid gap-6 md:grid-cols-4 mt-6">

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Current Readiness
    </p>

    <h3 className="mt-2 text-4xl font-bold text-green-600">
      {currentReadiness}%
    </h3>
  </div>

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      PMP Target
    </p>

    <h3 className="mt-2 text-4xl font-bold">
      {readinessTarget}%
    </h3>
  </div>

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Gap Remaining
    </p>

    <h3 className="mt-2 text-4xl font-bold text-red-600">
      {readinessGap}%
    </h3>
  </div>

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Exams Remaining
    </p>

    <h3 className="mt-2 text-4xl font-bold">
      {Math.ceil(
        readinessGap / 10,
      )}
    </h3>
  </div>

</div>

<div className="mt-8 grid gap-6 md:grid-cols-2">

  <div className="rounded-xl bg-white p-6 shadow">

    <p className="text-sm text-gray-500">
      Strongest Area
    </p>

    <h3 className="mt-2 text-2xl font-bold text-green-600">
      {strongestArea?.knowledgeArea ||
        "N/A"}
    </h3>

    <p className="text-gray-600">
      {strongestArea?.percentage || 0}%
    </p>

  </div>

  <div className="rounded-xl bg-white p-6 shadow">

    <p className="text-sm text-gray-500">
      Weakest Area
    </p>

    <h3 className="mt-2 text-2xl font-bold text-red-600">
      {weakestArea?.knowledgeArea ||
        "N/A"}
    </h3>

    <p className="text-gray-600">
      {weakestArea?.percentage || 0}%
    </p>

  </div>

</div>

<div className="mt-8 rounded-xl bg-white p-6 shadow">

  <h3 className="mb-4 text-xl font-bold">
    Recommended Focus Areas
  </h3>

  <div className="space-y-3">

    {knowledgeAreaPerformance
      .sort(
        (a, b) =>
          a.percentage -
          b.percentage,
      )
      .slice(0, 3)
      .map(
        (
          area,
          index,
        ) => (
          <div
            key={
              area.knowledgeArea
            }
            className="flex justify-between border-b pb-2"
          >
            <span>
              {index + 1}.{" "}
              {
                area.knowledgeArea
              }
            </span>

            <span className="font-semibold text-red-600">
              {
                area.percentage
              }
              %
            </span>
          </div>
        ),
      )}

  </div>

</div>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">

          <h3 className="mb-4 text-xl font-bold">
            Knowledge Area Performance
          </h3>

          <div className="space-y-5">

            {knowledgeAreaPerformance.sort(

    (a, b) =>

      b.percentage -

      a.percentage,

  ).map((area) => (
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
<ReferenceLine
  y={80}
  stroke="red"
  strokeDasharray="5 5"
  label="PMP Ready"
/>

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
