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

const [user, setUser] = useState<any>(null);

const [dashboardStats, setDashboardStats] =
  useState<any>({
    totalExams: 0,
    bestScore: 0,
    averageScore: 0,
    lastScore: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    readinessScore: 0,
  });


useEffect(() => {

  const storedUser =
    localStorage.getItem(
      "prepleticsUser",
    );

  if (!storedUser) {
    return;
  }

  const user =
    JSON.parse(storedUser);

  setUser(user);

  fetch(
    `/api/exam-results/stats?userId=${user.id}`,
  )
    .then((res) => res.json())
    .then((data) => {
      setDashboardStats(data);
    });

  fetch(
    `/api/exam-results?userId=${user.id}`,
  )


    .then((res) => res.json())
    .then((results) => {

      const history =
        results.map(
          (exam: any) => ({
            date:
              new Date(
                exam.createdAt,
              ).toLocaleDateString(),
            score:
              exam.score,
          }),
        );

      setExamHistory(
        history,
      );

      const latestExam =
        results[
          results.length - 1
        ];

      if (
        latestExam &&
        latestExam.knowledgeAreas
      ) {

        const formatted =
          Object.entries(
            latestExam.knowledgeAreas,
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

        if (
          formatted.length > 0
        ) {

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
  dashboardStats.bestScore;

const lastScore =
  dashboardStats.lastScore;

const averageScore =
  dashboardStats.averageScore;

const mocksCompleted =
  dashboardStats.totalExams;

const currentReadiness =
  dashboardStats.readinessScore;

const questionsAnswered =
  dashboardStats.questionsAnswered;

const correctAnswers =
  dashboardStats.correctAnswers;

const incorrectAnswers =
  dashboardStats.incorrectAnswers;
const readinessTarget = 80;

const readinessGap =
  Math.max(
    0,
    readinessTarget -
      currentReadiness,
  );

const readinessStatus =
  currentReadiness >= 80
    ? "Exam Ready"
    : currentReadiness >= 60
    ? "Almost Ready"
    : "Not Ready";
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

        {user ? (

  <button
    onClick={logout}
    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
  >
    Logout
  </button>

) : (

  <a
    href="/login"
    className="bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-lime-700"
  >
    Login
  </a>

)}


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
              {currentReadiness}%
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Questions Answered
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {questionsAnswered}
            </h3>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Correct Answers
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {correctAnswers}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Incorrect Answers
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {incorrectAnswers}
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
  <p
  className={`mt-2 font-semibold ${
    currentReadiness >= 80
      ? "text-green-600"
      : currentReadiness >= 60
      ? "text-yellow-600"
      : "text-red-600"
  }`}
>
  {readinessStatus}
</p> 

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
      {strongestArea?.percentage || 0}
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
 <h3 className="mb-4 text-xl font-bold">

    PMP Readiness Assessment

  </h3>

  <div className="space-y-2">

    <p>

      Current Readiness:

      <strong>

        {" "}

        {currentReadiness}%

      </strong>

    </p>

    <p>

      Status:

      <strong>

        {" "}

        {readinessStatus}

      </strong>

    </p>

    <p>

      PMP Target:

      <strong> 80%</strong>

    </p>

    <p>

      Gap Remaining:

      <strong>

        {" "}

        {readinessGap}%

      </strong>

    </p>

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
