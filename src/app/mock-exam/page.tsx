"use client";

import { useEffect, useState } from "react";

export default function MockExamPage() {
  const [questions, setQuestions] =
    useState<any[]>([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<number, string>>({});
  
  const [flaggedQuestions, setFlaggedQuestions] =
  useState<number[]>([]);

const [examFinished, setExamFinished] =
  useState(false);

const [examResults, setExamResults] =
  useState<any>(null);

  const [timeLeft, setTimeLeft] =
    useState(230 * 60);
const [examPaused, setExamPaused] =
  useState(false);

const [showBreakScreen, setShowBreakScreen] =
  useState(false);

const [breakNumber, setBreakNumber] =
  useState(0);

const [breakTimeLeft, setBreakTimeLeft] =
  useState(10 * 60);
useEffect(() => {

  fetch(
   "/api/questions/mock-exam"
  )
    .then((res) => res.json())
    .then((data) => {

      console.log(
        "Questions loaded:",
        data,
      );

      setQuestions(data);

    })
    .catch((error) => {

      console.error(
        "Question load error:",
        error,
      );

    });

}, []);

useEffect(() => {

  if (examPaused) return;

  const timer = setInterval(() => {

    setTimeLeft((prev) => {

      if (prev <= 1) {

        clearInterval(timer);

        finishExam();

        return 0;

      }

      return prev - 1;

    });

  }, 1000);

  return () => clearInterval(timer);

}, [examPaused]);

useEffect(() => {

  if (!showBreakScreen) return;

  const timer = setInterval(() => {

    setBreakTimeLeft((prev) => {

      if (prev <= 1) {

        clearInterval(timer);

        resumeExam();

        return 0;

      }

      return prev - 1;

    });

  }, 1000);

  return () => clearInterval(timer);

}, [showBreakScreen]);


  if (questions.length === 0) {
    return (
      <div className="p-10">
        Loading Exam...
      </div>
    );
  }

if (examFinished) {

  return (

    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-4xl">

        <div className="bg-white rounded-xl shadow p-10">

          <h1 className="text-4xl font-bold mb-8">
            PMP Mock Exam Results
          </h1>

          <div className="space-y-4 text-xl">

            <div>
              Correct Answers:
              {" "}
              {examResults.correct}
            </div>

            <div>
              Incorrect Answers:
              {" "}
              {examResults.incorrect}
            </div>

            <div>
              Score:
              {" "}
              {examResults.score}%
            </div>

          </div>

        </div>

      </div>

    </main>

  );

}

if (showBreakScreen) {

  const breakMinutes =
    Math.floor(
      breakTimeLeft / 60,
    );

  const breakSeconds =
    breakTimeLeft % 60;

  return (

    <main className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white rounded-xl shadow p-10 text-center max-w-xl">

        <h1 className="text-3xl font-bold mb-6">
          PMP Break #{breakNumber}
        </h1>

        <p className="text-lg mb-4">
          You have completed
          {breakNumber === 1
            ? " Questions 1–60."
            : " Questions 61–120."}
        </p>

        <p className="text-gray-600 mb-8">
          The PMP exam provides an optional
          10-minute break at this point.
          Your exam timer has been paused.
        </p>

        <div className="text-5xl font-bold text-blue-600 mb-8">
          {breakMinutes
            .toString()
            .padStart(2, "0")}
          :
          {breakSeconds
            .toString()
            .padStart(2, "0")}
        </div>

        <button
          onClick={resumeExam}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Resume Exam
        </button>

      </div>

    </main>

  );

}

  const question =
    questions[currentQuestion];

  const hours =
    Math.floor(timeLeft / 3600);

  const minutes =
    Math.floor(
      (timeLeft % 3600) / 60
    );

  const seconds =
    timeLeft % 60;

  const formattedTime =
    `${hours
      .toString()
      .padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

const toggleFlag = (
  questionId: number,
) => {

  if (
    flaggedQuestions.includes(
      questionId,
    )
  ) {

    setFlaggedQuestions(
      flaggedQuestions.filter(
        (id) =>
          id !== questionId,
      ),
    );

  } else {

    setFlaggedQuestions([
      ...flaggedQuestions,
      questionId,
    ]);

  }

};

function startBreak(
  breakNum: number,
) {

  setBreakNumber(breakNum);

  setExamPaused(true);

  setBreakTimeLeft(10 * 60);

  setShowBreakScreen(true);

}

function resumeExam() {

  setExamPaused(false);

  setShowBreakScreen(false);

}

function finishExam() {

  let correct = 0;

  questions.forEach(
    (question) => {

      if (
        answers[question.id] ===
        question.correctAnswer
      ) {

        correct++;

      }

    },
  );

  const incorrect =
    questions.length - correct;

  const score =
    Math.round(
      (correct /
        questions.length) *
        100,
    );

  setExamResults({
    correct,
    incorrect,
    score,
  });

  setExamFinished(true);

}

const answeredCount =
  Object.keys(
    answers,
  ).length;

const flaggedCount =
  flaggedQuestions.length;

const remainingCount =
  questions.length -
  answeredCount;

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-4xl">

        <h1 className="text-4xl font-bold mb-4">
          PMP Mock Exam
        </h1>

<div className="mb-8 flex w-full justify-between items-start">

  <div>

    <p className="text-gray-600 text-lg">

      Question {currentQuestion + 1} of {questions.length}

    </p>

  </div>

  <div className="text-right">

    <div className="text-3xl font-bold text-red-600">

      {formattedTime}

    </div>

    <div className="text-gray-500 text-sm">

      PMP Exam Timer

    </div>

  </div>
</div>

<div className="mb-8 rounded-xl bg-white p-6 shadow">

  <div className="mb-4 flex items-center justify-between">

    <h3 className="font-semibold">
      Question Navigator
    </h3>

    <div className="text-sm text-gray-500">
      Green = Answered |
      Yellow = Flagged |
      Blue = Current
    </div>

  </div>

  <div className="flex flex-wrap gap-2">

    {questions.map(
      (q, index) => {

        const isCurrent =
          index === currentQuestion;

        const isAnswered =
          !!answers[q.id];

        const isFlagged =
          flaggedQuestions.includes(
            q.id,
          );

        let buttonClass =
          "bg-gray-300 text-black";

        if (isAnswered) {
          buttonClass =
            "bg-green-600 text-white";
        }

        if (isFlagged) {
          buttonClass =
            "bg-yellow-500 text-black";
        }

        if (isCurrent) {
          buttonClass =
            "bg-blue-600 text-white";
        }

        return (
          <button
            key={q.id}
            onClick={() =>
              setCurrentQuestion(
                index,
              )
            }
            className={`h-10 w-10 rounded font-semibold ${buttonClass}`}
          >
            {index + 1}
          </button>
        );

      },
    )}

  </div>
<div className="mt-4 flex flex-wrap gap-6 text-sm font-medium">

    <div className="text-green-700">

      Answered: {answeredCount}

    </div>

    <div className="text-yellow-700">

      Flagged: {flaggedCount}

    </div>

    <div className="text-slate-700">

      Remaining: {remainingCount}

    </div>

  </div>

</div>


        <div className="bg-white rounded-xl shadow p-8">

          <h2 className="text-xl font-semibold mb-6">
            {question.question}
          </h2>

<div className="mb-6">

  <button
    onClick={() =>
      toggleFlag(
        question.id,
      )
    }
    className={`rounded-lg px-4 py-2 font-semibold ${
      flaggedQuestions.includes(
        question.id,
      )
        ? "bg-yellow-500 text-black"
        : "bg-slate-200"
    }`}
  >
    🚩 Flag For Review
  </button>

</div>

          <div className="space-y-4">

            <button
              onClick={() =>
                setAnswers({
                  ...answers,
                  [question.id]: "A",
                })
              }
              className={`w-full text-left border rounded-lg p-4 ${
                answers[question.id] === "A"
                  ? "bg-green-100 border-green-500"
                  : "hover:bg-slate-50"
              }`}
            >
              A. {question.optionA}
            </button>

            <button
              onClick={() =>
                setAnswers({
                  ...answers,
                  [question.id]: "B",
                })
              }
              className={`w-full text-left border rounded-lg p-4 ${
                answers[question.id] === "B"
                  ? "bg-green-100 border-green-500"
                  : "hover:bg-slate-50"
              }`}
            >
              B. {question.optionB}
            </button>

            <button
              onClick={() =>
                setAnswers({
                  ...answers,
                  [question.id]: "C",
                })
              }
              className={`w-full text-left border rounded-lg p-4 ${
                answers[question.id] === "C"
                  ? "bg-green-100 border-green-500"
                  : "hover:bg-slate-50"
              }`}
            >
              C. {question.optionC}
            </button>

            <button
              onClick={() =>
                setAnswers({
                  ...answers,
                  [question.id]: "D",
                })
              }
              className={`w-full text-left border rounded-lg p-4 ${
                answers[question.id] === "D"
                  ? "bg-green-100 border-green-500"
                  : "hover:bg-slate-50"
              }`}
            >
              D. {question.optionD}
            </button>

          </div>

        </div>

        <div className="mt-8 flex justify-between">

          <button
            disabled={currentQuestion === 0}
            onClick={() =>
              setCurrentQuestion(
                currentQuestion - 1
              )
            }
            className="bg-slate-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>


{currentQuestion ===
questions.length - 1 ? (

  <button
    onClick={finishExam}
    className="bg-red-600 text-white px-6 py-3 rounded-lg"
  >
    Finish Exam
  </button>

) : (

  <button
onClick={() => {

  const nextQuestion =
    currentQuestion + 1;

  if (nextQuestion === 60) {

    startBreak(1);

  }

  else if (
    nextQuestion === 120
  ) {

    startBreak(2);

  }

  setCurrentQuestion(
    nextQuestion,
  );

}}

    className="bg-green-600 text-white px-6 py-3 rounded-lg"
  >
    Next
  </button>

)}

        </div>

      </div>

    </main>
  );
}
