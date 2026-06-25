export default function FAQ() {
  return (
    <section
      id="faq"
      className="max-w-6xl mx-auto px-8 py-28"
    >
      <div className="text-center mb-16">

        <p className="text-cyan-400 uppercase tracking-[0.25em]">
          FAQ
        </p>

        <h2 className="text-5xl font-black mt-4">
          Frequently Asked Questions
        </h2>

      </div>

      <div className="space-y-8">

        <div className="bg-[#111C3D] rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-3">
            Is Prepletics based on the latest PMP Exam?
          </h3>
          <p className="text-slate-300">
            Yes. Questions are aligned with the current PMI PMP Examination Content Outline.
          </p>
        </div>

        <div className="bg-[#111C3D] rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-3">
            Can I review my mistakes?
          </h3>
          <p className="text-slate-300">
            Absolutely. Every incorrect answer includes explanations and is available for review.
          </p>
        </div>

        <div className="bg-[#111C3D] rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-3">
            Is there a free version?
          </h3>
          <p className="text-slate-300">
            Yes. You can start practising immediately without paying.
          </p>
        </div>

      </div>

    </section>
  );
}
