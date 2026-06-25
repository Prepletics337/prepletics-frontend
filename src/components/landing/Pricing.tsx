export default function Pricing() {
  return (
    <section
      id="pricing"
      className="max-w-7xl mx-auto px-8 py-28"
    >
      <div className="text-center">

        <p className="text-cyan-400 uppercase tracking-[0.25em] mb-4">
          PRICING
        </p>

        <h2 className="text-5xl font-black mb-6">
          Simple Pricing
        </h2>

        <p className="text-slate-300 text-xl mb-16">
          Start free today. Premium plans coming soon.
        </p>

      </div>

      <div className="max-w-xl mx-auto rounded-3xl bg-[#111C3D] border border-purple-600 p-12">

        <h3 className="text-4xl font-bold mb-6">
          Free
        </h3>

        <div className="text-6xl font-black mb-8">
          $0
        </div>

        <ul className="space-y-5 text-slate-300">

          <li>✓ Practice Quizzes</li>
          <li>✓ Mock Exams</li>
          <li>✓ AI Analytics</li>
          <li>✓ Mistake Review</li>

        </ul>

      </div>

    </section>
  );
}
