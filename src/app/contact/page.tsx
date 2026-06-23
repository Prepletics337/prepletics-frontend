export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="mx-auto max-w-4xl bg-white p-8 rounded-xl shadow">
        <h1 className="text-4xl font-bold mb-6">
          Contact Us
        </h1>

        <p className="mb-4">
          Need help with Prepletics?
        </p>

        <p className="text-lg">
          Email:
          {" "}
          <a
            href="mailto:support@prepletics.com"
            className="text-lime-600 font-semibold"
          >
            support@prepletics.com
          </a>
        </p>

        <p className="mt-6">
          We aim to respond to inquiries within 1–2 business days.
        </p>
      </div>
    </main>
  );
}
