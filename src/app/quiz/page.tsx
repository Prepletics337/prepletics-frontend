"use client";

import { useEffect, useState } from "react";

export default function QuizPage() {

const [questions, setQuestions] =

  useState<any[]>([]);

const [loading, setLoading] =

  useState(true);

const [currentQuestionIndex,

  setCurrentQuestionIndex] =

  useState(0);

const [selectedAnswer,

  setSelectedAnswer] =

  useState("");

const [showResult,

  setShowResult] =

  useState(false);

const [score,

  setScore] =

  useState(0);

const [quizCompleted,

  setQuizCompleted] =

  useState(false);

const [reviewMode,

  setReviewMode] =

  useState(false);

const [incorrectAnswers,

  setIncorrectAnswers] =

  useState<any[]>([]);

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

const currentQuestion =
  questions[currentQuestionIndex] || null;
if (

  !loading &&

  (!questions.length || !currentQuestion)

) {

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <h1 className="text-2xl font-bold text-black">

        No Questions Available

      </h1>

    </div>

  );

}

async function submitAnswer() {

  if (!selectedAnswer) return;

  const isCorrect =

    selectedAnswer ===

    currentQuestion.correctAnswer;

  if (isCorrect) {

    setScore(score + 1);

  }

  try {

    await fetch(

      "http://2.25.173.35:3001/results",

      {

        method: "POST",

        headers: {

          "Content-Type":

            "application/json",

        },

        body: JSON.stringify({

          userId: 1,

          questionId:

            currentQuestion.id,

          selectedAnswer,

          correctAnswer:

            currentQuestion.correctAnswer,

          isCorrect,

          knowledgeArea:

            currentQuestion.knowledgeArea,

        }),

      },

    );

  } catch (error) {

    console.error(error);

  }

  setShowResult(true);

}

  function nextQuestion() {
    if (
      currentQuestionIndex <
      questions.length - 1
    ) {
      setCurrentQuestionIndex(
        currentQuestionIndex + 1,
      );

      setSelectedAnswer("");
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  }

async function reviewIncorrectQuestions() {
  try {
    const response =
      await fetch(
        "http://2.25.173.35:3001/results/incorrect",
      );

    const data =
      await response.json();

    setIncorrectAnswers(data);

    setReviewMode(true);

  } catch (error) {
    console.error(error);
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-black">
          Loading Quiz...
        </h1>
      </div>
    );
  }

if (reviewMode) {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-black">
          Review Incorrect Questions
        </h1>

        {incorrectAnswers.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow mb-6 border"
          >
            <p className="mb-3">
              <strong>Your Answer:</strong>{" "}
              {item.selectedAnswer}
            </p>

            <p className="mb-3">
              <strong>Correct Answer:</strong>{" "}
              {item.correctAnswer}
            </p>

            <p className="mb-3">
              <strong>Knowledge Area:</strong>{" "}
              {item.knowledgeArea}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}

if (reviewMode) {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-black">
          Review Incorrect Questions
        </h1>

        {incorrectAnswers.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow mb-6 border"
          >
            <p className="text-xl mb-3">
              <strong>Your Answer:</strong>{" "}
              {item.selectedAnswer}
            </p>

            <p className="text-xl mb-3">
              <strong>Correct Answer:</strong>{" "}
              {item.correctAnswer}
            </p>

            <p className="text-xl mb-3">
              <strong>Knowledge Area:</strong>{" "}
              {item.knowledgeArea}
            </p>
          </div>
        ))}

        <button
          onClick={() =>
            window.location.reload()
          }
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Retake Quiz
        </button>

      </div>
    </div>
  );
}

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

          <h1 className="text-4xl font-bold mb-6 text-black">
            Quiz Complete 🎉
          </h1>

          <h2 className="text-2xl mb-4 text-black">
            Final Score
          </h2>

          <div className="text-5xl font-bold text-green-600 mb-6">
            {score} / {questions.length}
          </div>

          <div className="text-3xl text-blue-600 mb-8">
            {Math.round(
              (score / questions.length) * 100,
            )}
            %
          </div>


<div className="flex gap-4 mt-8">

  <button
    onClick={reviewIncorrectQuestions}
    className="bg-red-600 text-white px-6 py-3 rounded-lg"
  >
    Review Incorrect Questions
  </button>

  <button
    onClick={() => window.location.reload()}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
  >
    Retake Quiz
  </button>

</div>         

        </div>
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

        <div className="bg-white rounded-xl shadow-lg p-8 border">

          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "#000000" }}
          >
            Question {currentQuestionIndex + 1}
            {" "}of{" "}
            {questions.length}
          </h2>

          <p
            className="text-xl mb-8 leading-relaxed"
            style={{ color: "#111827" }}
          >
            {currentQuestion.question}
          </p>

          <div className="space-y-4">

            {["A", "B", "C", "D"].map(
              (option) => (
                <button
                  key={option}
                  onClick={() =>
                    setSelectedAnswer(option)
                  }
                  className={`w-full p-5 border rounded-lg text-left text-xl ${
                    selectedAnswer === option
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-400 bg-slate-50"
                  }`}
                >
                  <strong>{option}.</strong>{" "}
                  {
                    currentQuestion[
                      `option${option}`
                    ]
                  }
                </button>
              ),
            )}

          </div>

          <button
            onClick={submitAnswer}
            disabled={
              !selectedAnswer || showResult
            }
            className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg text-xl disabled:opacity-50"
          >
            Submit Answer
          </button>

          {showResult && (
            <div className="mt-8 p-6 border rounded-xl bg-slate-50">

              <h3 className="text-3xl font-bold mb-4">

                {selectedAnswer ===
                currentQuestion.correctAnswer
                  ? "✅ Correct"
                  : "❌ Incorrect"}

              </h3>

              <p className="mb-3 text-xl">
                <strong>
                  Your Answer:
                </strong>{" "}
                {selectedAnswer}
              </p>

              <p className="mb-3 text-xl">
                <strong>
                  Correct Answer:
                </strong>{" "}
                {
                  currentQuestion.correctAnswer
                }
              </p>

              <p className="mb-3 text-xl">
                <strong>
                  Current Score:
                </strong>{" "}
                {score}
              </p>

              <div className="mt-6">
                <h4 className="font-bold text-xl mb-2">
                  PMI Explanation:
                </h4>

                <p className="text-lg">
                  {
                    currentQuestion.explanation
                  }
                </p>
              </div>

              <button
                onClick={nextQuestion}
                className="mt-8 bg-green-600 text-white px-8 py-4 rounded-lg text-xl"
              >
                Next Question →
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
