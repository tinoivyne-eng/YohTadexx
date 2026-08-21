import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Studio() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("studio_images")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) console.error(error);

      setImages(data || []);
      setLoading(false);
    };
    fetchImages();
  }, []);

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
        {loading ? (
          <p className="text-studio-white/60 font-body text-center">Loading photos...</p>
        ) : images.length === 0 ? (
          <p className="text-studio-white/60 font-body text-center">
            Studio photos coming soon — check back shortly.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative h-64 rounded-2xl overflow-hidden border border-studio-gray hover:border-studio-bluelight transition-all duration-300"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${img.image_url}')` }}
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-mono text-studio-white text-sm uppercase tracking-widest">
                      {img.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
