import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      {/* Page Hero */}
      <section
        className="relative h-[45vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.95)), url('https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
            The Story
          </p>
          <h1 className="font-mono text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-studio-white">
            About Yoh Tadexx
          </h1>
        </div>
      </section>

      {/* Bio section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div
          className="h-96 rounded-2xl bg-cover bg-center order-2 md:order-1"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=1000&q=80')",
          }}
        />
        <div className="order-1 md:order-2">
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
            Producer & Founder
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold uppercase tracking-wide text-studio-white mb-6">
            Sound Is the Story
          </h2>
          <p className="text-studio-white/70 font-body leading-relaxed mb-4">
            Yoh Tadexx started producing out of a bedroom setup before building a full studio
            dedicated to helping artists find their sound. Every session is built around one
            goal: turning an idea into a record that actually moves people.
          </p>
          <p className="text-studio-white/70 font-body leading-relaxed">
            With years of experience across recording, mixing, and mastering, Yoh Tadexx
            Productions has worked with artists across Hip-Hop, R&B, Afrobeats, and beyond —
            bringing a producer's ear to every stage of the process.
          </p>
        </div>
      </section>

      {/* Values / approach */}
      <section className="bg-studio-charcoal border-y border-studio-gray py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-wide text-studio-white text-center mb-12">
            The Approach
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Listen First",
                desc: "Every artist has a different vision. Sessions start with understanding the sound you're chasing, not forcing a formula.",
              },
              {
                title: "Push the Craft",
                desc: "Clean recordings, precise mixing, and mastering that translates — no shortcuts on the technical side.",
              },
              {
                title: "Build Together",
                desc: "This is a partnership. You leave every session with a track you're proud of, not just a file.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="border border-studio-gray rounded-2xl p-8 hover:border-studio-bluelight transition-all duration-300"
              >
                <h3 className="font-mono text-lg uppercase tracking-wide text-studio-bluelight font-bold mb-4">
                  {v.title}
                </h3>
                <p className="text-studio-white/70 font-body leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h3 className="font-mono text-2xl font-bold uppercase tracking-wide text-studio-white mb-6">
          Ready to work together?
        </h3>
        <Link
          to="/book"
          className="inline-block bg-studio-blue hover:bg-studio-bluelight hover:-translate-y-1 transition-all duration-300 text-white px-8 py-3 rounded-md font-mono uppercase tracking-widest text-sm font-semibold"
        >
          Book a Session
        </Link>
      </section>
    </div>
  );
}