import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.75), rgba(10,10,10,0.9)), url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
            Recording · Mixing · Mastering
          </p>
          <h1 className="font-mono text-4xl md:text-6xl font-extrabold uppercase tracking-wide text-studio-white leading-tight mb-6 max-w-3xl">
            Where Your Sound Becomes <span className="text-studio-bluelight">Legendary</span>
          </h1>
          <p className="text-studio-white/70 font-body text-lg max-w-xl mb-8">
          Professional studio production by Yoh Tadexx. From raw ideas to radio-ready records. Whether you're recording your first song or your next hit, we deliver industry-quality sound that brings your vision to life.
          </p>
          <div className="flex flex-wrap gap-4 font-mono uppercase tracking-widest text-sm">
            <Link
              to="/book"
              className="bg-studio-blue hover:bg-studio-bluelight hover:-translate-y-1 hover:shadow-lg hover:shadow-studio-blue/40 transition-all duration-300 text-white px-8 py-3 rounded-md font-semibold"
            >
              Book a Session
            </Link>
            <Link
              to="/portfolio"
              className="border border-studio-white/30 hover:border-studio-bluelight hover:text-studio-bluelight transition-all duration-300 text-studio-white px-8 py-3 rounded-md font-semibold"
            >
              Listen to Work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-studio-charcoal border-y border-studio-gray py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "150+", label: "Tracks Produced" },
            { num: "5+", label: "Years Experience" },
            { num: "40+", label: "Artists Worked With" },
            { num: "24/7", label: "Studio Access" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-mono text-3xl font-extrabold text-studio-bluelight">{s.num}</p>
              <p className="text-studio-white/60 text-xs mt-1 font-mono uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div
          className="h-80 rounded-2xl bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1000&q=80')",
          }}
        />
        <div>
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
            About the Studio
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold uppercase tracking-wide text-studio-white mb-6">
            Built for Artists Who Demand More
          </h2>
          <p className="text-studio-white/70 font-body leading-relaxed mb-6">
            Yoh Tadexx Productions is a full-service recording studio equipped with industry-standard
            gear, acoustically treated rooms, and a producer who understands how to bring your vision
            to life — from first take to final master.
          </p>
          <Link
            to="/services"
            className="text-studio-bluelight font-mono uppercase tracking-widest text-sm font-semibold hover:underline underline-offset-4"
          >
            Explore Services →
          </Link>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-studio-blue/10 border-t border-studio-gray py-16 text-center">
        <h3 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-wide text-studio-white mb-6">
          Ready to record your next hit?
        </h3>
        <Link
          to="/book"
          className="inline-block bg-studio-blue hover:bg-studio-bluelight hover:-translate-y-1 transition-all duration-300 text-white px-8 py-3 rounded-md font-mono uppercase tracking-widest text-sm font-semibold"
        >
          Book a Session Now
        </Link>
      </section>
    </div>
  );
}