import { Link } from "react-router-dom";

const services = [
  {
    title: "Recording",
    price: "From $50/hr",
    desc: "Full studio session with professional mic setup, acoustically treated booth, and engineer on hand.",
    features: ["Pro vocal booth", "Industry-grade mics", "Engineer included", "Instant rough mix"],
  },
  {
    title: "Mixing",
    price: "From $150/track",
    desc: "Balance, depth, and clarity — your track polished to translate on any speaker or system.",
    features: ["Up to 3 revisions", "Stem delivery", "Reference-matched", "48hr turnaround"],
  },
  {
    title: "Mastering",
    price: "From $80/track",
    desc: "The final polish — loudness, punch, and consistency, ready for streaming or radio.",
    features: ["Streaming-ready LUFS", "WAV + MP3 delivery", "A/B reference check", "24hr turnaround"],
  },
  {
    title: "Beat Leasing",
    price: "From $30/beat",
    desc: "Browse original instrumentals across genres, licensed for your next release.",
    features: ["MP3 + WAV leases", "Exclusive rights available", "Trackout stems option", "Instant delivery"],
  },
];

export default function Services() {
  return (
    <div>
      {/* Page Hero */}
      <section
        className="relative h-[45vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.95)), url('https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
            What We Offer
          </p>
          <h1 className="font-mono text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-studio-white">
            Our Services
          </h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-studio-charcoal border border-studio-gray rounded-2xl p-8 hover:border-studio-bluelight hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-xl uppercase tracking-wide text-studio-white font-bold">
                  {s.title}
                </h3>
                <span className="font-mono text-studio-bluelight text-sm">{s.price}</span>
              </div>
              <p className="text-studio-white/70 font-body mb-6">{s.desc}</p>
              <ul className="space-y-2 mb-8">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-studio-white/60 text-sm font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-studio-bluelight" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                className="inline-block bg-studio-blue hover:bg-studio-bluelight transition-all duration-300 text-white px-6 py-2 rounded-md font-mono uppercase tracking-widest text-xs font-semibold"
              >
                Book This
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Equipment strip */}
      <section className="bg-studio-charcoal border-y border-studio-gray py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div
            className="h-72 rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=1000&q=80')",
            }}
          />
          <div>
            <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
              The Gear
            </p>
            <h2 className="font-mono text-3xl font-bold uppercase tracking-wide text-studio-white mb-6">
              Industry-Standard Equipment
            </h2>
            <p className="text-studio-white/70 font-body leading-relaxed">
              From analog preamps to modern digital workflows, every session is powered by gear
              trusted by top studios worldwide — so your sound is never held back by the room.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h3 className="font-mono text-2xl font-bold uppercase tracking-wide text-studio-white mb-6">
          Not sure what you need?
        </h3>
        <Link
          to="/contact"
          className="inline-block border border-studio-white/30 hover:border-studio-bluelight hover:text-studio-bluelight transition-all duration-300 text-studio-white px-8 py-3 rounded-md font-mono uppercase tracking-widest text-sm font-semibold"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}