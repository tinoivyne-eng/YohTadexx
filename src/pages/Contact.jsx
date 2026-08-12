import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // TODO: swap for Supabase insert later, same pattern as Book.jsx
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: (() => {
          const fd = new FormData();
          Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
          return fd;
        })(),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      {/* Page Hero */}
      <section
        className="relative h-[35vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.95)), url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
            Get In Touch
          </p>
          <h1 className="font-mono text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-studio-white">
            Contact
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* Info side */}
        <div>
          <h2 className="font-mono text-2xl font-bold uppercase tracking-wide text-studio-white mb-6">
            Let's Talk
          </h2>
          <p className="text-studio-white/70 font-body leading-relaxed mb-10">
            Got a question before booking? Want to discuss a custom project? Reach out and
            we'll get back to you within 24 hours.
          </p>

          <div className="space-y-6 font-body">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-md bg-studio-charcoal border border-studio-gray flex items-center justify-center text-studio-bluelight">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M3 8l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
                </svg>
              </span>
              <span className="text-studio-white/80">hello@yohtadexx.com</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-md bg-studio-charcoal border border-studio-gray flex items-center justify-center text-studio-bluelight">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.27 1.05L7.6 9.9a12 12 0 006.5 6.5l1.57-1.56a1 1 0 011.05-.27l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.4 21 3 14.6 3 6V5z" />
                </svg>
              </span>
              <span className="text-studio-white/80">+263 XX XXX XXXX</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-md bg-studio-charcoal border border-studio-gray flex items-center justify-center text-studio-bluelight">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M12 21s-8-5.5-8-11a8 8 0 0116 0c0 5.5-8 11-8 11z" />
                  <circle cx="12" cy="10" r="3" strokeWidth="2" />
                </svg>
              </span>
              <span className="text-studio-white/80">Harare, Zimbabwe</span>
            </div>
          </div>

          <div className="flex gap-4 mt-10 font-mono text-xs uppercase tracking-widest">
            <a href="#" className="text-studio-white/60 hover:text-studio-bluelight transition-colors">Instagram</a>
            <a href="#" className="text-studio-white/60 hover:text-studio-bluelight transition-colors">YouTube</a>
            <a href="#" className="text-studio-white/60 hover:text-studio-bluelight transition-colors">Spotify</a>
          </div>
        </div>

        {/* Form side */}
        <form
          onSubmit={handleSubmit}
          className="bg-studio-charcoal border border-studio-gray rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors"
            />
          </div>
          <div>
            <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors"
            />
          </div>
          <div>
            <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-studio-blue hover:bg-studio-bluelight disabled:opacity-50 transition-all duration-300 text-white py-4 rounded-md font-mono uppercase tracking-widest text-sm font-semibold"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-center text-studio-bluelight font-body">
              Message sent! We'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-red-400 font-body">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </section>
    </div>
  );
}