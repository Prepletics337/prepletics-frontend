export default function Features() {
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-8 py-28"
    >
      <div className="text-center mb-20">

        <p className="text-cyan-400 uppercase tracking-[0.25em] font-semibold mb-4">
          WHY PREPLETICS
        </p>

        <h2 className="text-5xl md:text-6xl font-black">
          Everything you need to
          <span className="text-purple-400"> pass the PMP®</span>
        </h2>

        <p className="text-slate-300 text-xl mt-8 max-w-3xl mx-auto">
          Built by project professionals for project professionals.
          Practice smarter with realistic questions, AI-driven analytics,
          and detailed explanations.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="rounded-3xl bg-[#111C3D] p-10 border border-slate-700 hover:border-purple-500 transition">

          <div className="text-5xl mb-6">📚</div>

          <h3 className="text-2xl font-bold mb-4">
            1,800+ Questions
          </h3>

          <p className="text-slate-300 leading-8">
            Comprehensive PMP questions covering all Knowledge Areas and
            Process Groups with detailed explanations.
          </p>

        </div>

        <div className="rounded-3xl bg-[#111C3D] p-10 border border-slate-700 hover:border-purple-500 transition">

          <div className="text-5xl mb-6">🧠</div>

          <h3 className="text-2xl font-bold mb-4">
            AI Analytics
          </h3>

          <p className="text-slate-300 leading-8">
            Track strengths, weaknesses and exam readiness with intelligent
            analytics after every practice session.
          </p>

        </div>

        <div className="rounded-3xl bg-[#111C3D] p-10 border border-slate-700 hover:border-purple-500 transition">

          <div className="text-5xl mb-6">🎯</div>

          <h3 className="text-2xl font-bold mb-4">
            Real Mock Exams
          </h3>

          <p className="text-slate-300 leading-8">
            Experience the actual PMP exam environment with timed mock exams,
            score reports and mistake reviews.
          </p>

        </div>

      </div>

    </section>
  );
}
