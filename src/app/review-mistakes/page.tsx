"use client";

import { useEffect, useState } from "react";

export default function ReviewMistakesPage() {

  const [questions, setQuestions] =
    useState<any[]>([]);

  useEffect(() => {

fetch(
  "/api/results/review",
)
  .then((res) => res.json())
  .then((data) => {
    setQuestions(data);
  });

  }, []);

  return (

    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-4xl">

        <h1 className="text-4xl font-bold mb-8">
          Review Mistakes
        </h1>

        {questions.length === 0 ? (

          <div className="bg-white p-6 rounded-xl shadow">
            No mistakes available.
          </div>

        ) : (

          <div className="space-y-6">

            {questions.map(
              (
                question,
                index,
              ) => (

                <div
                  key={question.id}
                  className="bg-white p-6 rounded-xl shadow"
                >

                  <div className="font-semibold mb-4">
                    Question {index + 1}
                  </div>

                  <div className="mb-4">
                    {question.question}
                  </div>

                  <div className="text-red-700 mb-2">
                    Your Answer:
                    {" "}
                     {question.selectedAnswer ||
                     "Not Answered"}
                  </div>

                  <div className="text-green-700 mb-2">
                    Correct Answer:
                    {" "}
                    {question.correctAnswer}
                  </div>

                  <div>
                    Explanation:
                    {" "}
                    {question.explanation}
                  </div>

                </div>

              ),
            )}

          </div>

        )}

      </div>

    </main>

  );

}
