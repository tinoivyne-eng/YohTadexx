import { useState } from "react";

const tracks = [
  {
    title: "Midnight Drive",
    artist: "Kay Sol",
    genre: "R&B",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    audio: "",
  },
  {
    title: "No Ceiling",
    artist: "Rell Tha Don",
    genre: "Hip-Hop",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    audio: "",
  },
  {
    title: "Golden Hour",
    artist: "Ava Lune",
    genre: "Afrobeats",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    audio: "",
  },
  {
    title: "Static",
    artist: "Nova Wren",
    genre: "Alt-Pop",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=600&q=80",
    audio: "",
  },
  {
    title: "Concrete Dreams",
    artist: "Jae Marlo",
    genre: "Hip-Hop",
    cover: "https://images.unsplash.com/photo-1524650359799-5be906931e5a?auto=format&fit=crop&w=600&q=80",
    audio: "",
  },
  {
    title: "Echoes",
    artist: "Kay Sol",
    genre: "R&B",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    audio: "",
  },
];

const genres = ["All", "Hip-Hop", "R&B", "Afrobeats", "Alt-Pop"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [playing, setPlaying] = useState(null);

  const filtered = filter === "All" ? tracks : tracks.filter((t) => t.genre === filter);

  return (
    <div>
      {/* Page Hero */}
      <section
        className="relative h-[40vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.95)), url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
            The Work
          </p>
          <h1 className="font-mono text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-studio-white">
            Portfolio
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                filter === g
                  ? "bg-studio-blue border-studio-blue text-white"
                  : "border-studio-gray text-studio-white/60 hover:border-studio-bluelight hover:text-studio-bluelight"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t, i) => (
            <div
              key={i}
              className="bg-studio-charcoal border border-studio-gray rounded-2xl overflow-hidden hover:border-studio-bluelight hover:-translate-y-1 transition-all duration-300 group"
            >
              <div
                className="h-56 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${t.cover}')` }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setPlaying(playing === i ? null : i)}
                    className="w-14 h-14 rounded-full bg-studio-blue/90 hover:bg-studio-bluelight flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"
                    aria-label="Play preview"
                  >
                    {playing === i ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="5" width="4" height="14" />
                        <rect x="14" y="5" width="4" height="14" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-mono text-studio-white uppercase tracking-wide font-bold">
                  {t.title}
                </h3>
                <p className="text-studio-white/60 text-sm font-body mt-1">{t.artist}</p>
                <span className="inline-block mt-3 text-xs font-mono text-studio-bluelight uppercase tracking-widest">
                  {t.genre}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}