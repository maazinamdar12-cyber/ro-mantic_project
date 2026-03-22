import Link from "next/link";

export default function HomePage() {
  return (
    <main className="w-full">
      {/* ================= HERO ================= */}
      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-24 grid gap-12 md:grid-cols-2 items-center">
          {/* Text */}
          <div>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Pure Water.
              <span className="block text-[var(--accent)]">
                Reliable Service.
              </span>
            </h1>

            <p className="mt-6 text-gray-500 text-lg">
              Buy RO purifiers online and manage installation,
              repair, and AMC services — all in one place.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/products"
                className="rounded bg-[var(--accent)] px-8 py-3 font-medium  hover:opacity-90"
              >
                View Products
              </Link>

              <Link
                href="/services"
                className="rounded border border-[var(--accent)] px-8 py-3 font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
              >
                Book Service
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/hero.jpg"
              alt="RO purifier in kitchen"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-14 text-center text-3xl font-bold">
            Why RO-mantic?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="Buy Online"
              desc="Browse RO purifiers with transparent pricing."
              img="/images/feature-buy.png"
            />
            <FeatureCard
              title="Service Management"
              desc="Book installation, AMC, and repair services easily."
              img="/images/feature-service.png"
            />
            <FeatureCard
              title="Track Everything"
              desc="Track orders and service status in real time."
              img="/images/feature-track.png"
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gray-50 border-t py-20">
        <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 items-center">
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/cta.png"
              alt="Clean drinking water"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              Clean water starts today
            </h2>

            <p className="mt-4 text-gray-500">
              Choose a purifier or book a service in minutes.
              Our technicians handle the rest.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-block rounded bg-[var(--accent)] px-10 py-4 font-medium text-white hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, desc, img }) {
  return (
    <div className="rounded-lg border  overflow-hidden shadow-sm hover:shadow-md transition">
      <img
        src={img}
        alt={title}
        className="h-48 w-full object-cover"
      />
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
