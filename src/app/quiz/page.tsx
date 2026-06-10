"use client";

import { useEffect, useState } from "react";

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://2.25.173.35:3001/questions/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-black">
          Loading Quiz...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-5xl mx-auto">

        <h1
          className="text-4xl font-bold mb-8"
          style={{ color: "#000000" }}
        >
          PMP Practice Quiz
        </h1>

        {questions.map((q, index) => (
          <div
            key={q.id}
            className="bg-white rounded-xl shadow-lg p-8 mb-6 border"
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#000000" }}
            >
              Question {index + 1}
            </h2>

            <p
              className="text-xl mb-8 leading-relaxed"
              style={{ color: "#111827" }}
            >
              {q.question}
            </p>

            <div className="space-y-4">

              <div
                className="p-4 border rounded-lg bg-slate-50"
                style={{ color: "#111827" }}
              >
                <strong>A.</strong> {q.optionA}
              </div>

              <div
                className="p-4 border rounded-lg bg-slate-50"
                style={{ color: "#111827" }}
              >
                <strong>B.</strong> {q.optionB}
              </div>

              <div
                className="p-4 border rounded-lg bg-slate-50"
                style={{ color: "#111827" }}
              >
                <strong>C.</strong> {q.optionC}
              </div>

              <div
                className="p-4 border rounded-lg bg-slate-50"
                style={{ color: "#111827" }}
              >
                <strong>D.</strong> {q.optionD}
              </div>

            </div>

            <div className="mt-6 flex gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {q.knowledgeArea}
              </span>

              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                {q.difficulty}
              </span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
