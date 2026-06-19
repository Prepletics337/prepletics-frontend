"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
         "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white p-12 flex-col justify-center">
        <h1 className="text-5xl font-bold mb-4">
          Prepletics
        </h1>

        <p className="text-2xl mb-8">
          Train Smarter. Pass Faster.
        </p>

        <div className="space-y-4 text-lg">
          <p>✓ PMP-style exam simulator</p>
          <p>✓ AI study recommendations</p>
          <p>✓ Performance analytics</p>
          <p>✓ Personalized study plans</p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Create Account
          </h2>

          <p className="text-slate-700 mb-8">
            Start your certification journey today
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) =>
                setFirstName(e.target.value)
              }
              className="w-full border border-slate-400 rounded-lg px-4 py-3 text-slate-900"
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) =>
                setLastName(e.target.value)
              }
              className="w-full border border-slate-400 rounded-lg px-4 py-3 text-slate-900"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-slate-400 rounded-lg px-4 py-3 text-slate-900"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-slate-400 rounded-lg px-4 py-3 text-slate-900"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full border border-slate-400 rounded-lg px-4 py-3 text-slate-900"
              required
            />

<button

  type="submit"

  disabled={loading}

  className="w-full bg-lime-600 hover:bg-lime-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"

>

  {loading

    ? "Creating Account..."

    : "Create Account"}

</button>


          </form>

          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-lime-600 font-medium"
            >
              Already have an account? Sign In
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
