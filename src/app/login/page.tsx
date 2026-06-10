"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://2.25.173.35:3001/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "prepleticsUser",
          JSON.stringify(data.user)
        );

        window.location.href = "/";
      } else {
        alert(
          data.message ||
            "Invalid email or password"
        );
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
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white p-12 flex-col justify-center">
        <h1 className="text-5xl font-bold mb-4">
          Prepletics
        </h1>

        <p className="text-2xl mb-8">
          Train Smarter. Pass Faster.
        </p>

        <div className="space-y-4 text-lg">
          <p>✓ Real PMP-style exam questions</p>
          <p>✓ Full mock exam simulator</p>
          <p>✓ Performance analytics</p>
          <p>✓ AI-powered study recommendations</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-2 text-slate-900">
            Welcome Back
          </h2>

          <p className="text-slate-700 mb-8">
            Sign in to your account
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-900">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="name@example.com"
                className="w-full border border-slate-400 rounded-lg px-4 py-3 text-slate-900"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-900">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="********"
                className="w-full border border-slate-400 rounded-lg px-4 py-3 text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-lime-600 text-white py-3 rounded-lg font-semibold hover:bg-lime-700"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/register"
              className="text-lime-600"
            >
              Create Account
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
