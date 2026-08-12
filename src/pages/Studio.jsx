const studioImages = [
  {
    id: 1,
    caption: "Recording Booth",
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    caption: "Mixing Console",
    url: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    caption: "Monitor Setup",
    url: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    caption: "Vocal Booth",
    url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    caption: "Keyboard & MIDI Setup",
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    caption: "Lounge Area",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Studio() {
  // TODO (Supabase phase): replace studioImages above with a fetch from a
  // "studio_images" table/bucket, e.g.:
  // const [studioImages, setStudioImages] = useState([]);
  // useEffect(() => { fetchImagesFromSupabase().then(setStudioImages); }, []);
  // Admin upload/delete will write to that same table/bucket, and this page
  // just re-fetches — no other structure here needs to change.

  return (
    <div>
      {/* Page Hero */}
      <section
        className="relative h-[40vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.95)), url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
            Take a Look Inside
          </p>
          <h1 className="font-mono text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-studio-white">
            Our Studio
          </h1>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studioImages.map((img) => (
            <div
              key={img.id}
              className="group relative h-64 rounded-2xl overflow-hidden border border-studio-gray hover:border-studio-bluelight transition-all duration-300"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${img.url}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-mono text-studio-white text-sm uppercase tracking-widest">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}