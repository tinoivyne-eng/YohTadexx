import { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

function LoginPrompt() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
        Almost There
      </p>
      <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-wide text-studio-white mb-6">
        Log In or Sign Up to Book a Session
      </h2>
      <p className="text-studio-white/70 font-body mb-8">
        Creating an account lets you book sessions, track your booking status, and message the studio directly.
      </p>
      <div className="flex flex-wrap justify-center gap-4 font-mono uppercase tracking-widest text-sm">
        <Link
          to="/login"
          className="border border-studio-gray hover:border-studio-bluelight text-studio-white/80 hover:text-studio-bluelight transition-all duration-300 px-8 py-3 rounded-md"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-studio-blue hover:bg-studio-bluelight transition-all duration-300 text-white px-8 py-3 rounded-md font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
}

export default function Book() {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Recording",
    time: "",
    notes: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !formData.time) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const payload = {
      user_id: user.id,
      name: formData.name || profile?.name || "",
      email: formData.email || user.email,
      phone: formData.phone,
      service: formData.service,
      session_date: selectedDate.toISOString().split("T")[0],
      session_time: formData.time,
      notes: formData.notes,
    };

    const { error } = await supabase.from("bookings").insert([payload]);

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("success");
    setFormData({ name: "", email: "", phone: "", service: "Recording", time: "", notes: "" });
    setSelectedDate(null);
  };

  return (
    <div>
      {/* Page Hero */}
      <section
        className="relative h-[40vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.95)), url('https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
            Let's Get You In
          </p>
          <h1 className="font-mono text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-studio-white">
            Book a Session
          </h1>
        </div>
      </section>

      {!user ? (
        <LoginPrompt />
      ) : (
        <section className="max-w-3xl mx-auto px-6 py-20">
          <form
            onSubmit={handleSubmit}
            className="bg-studio-charcoal border border-studio-gray rounded-2xl p-8 md:p-12 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                  Full Name
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
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors"
                />
              </div>
              <div>
                <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                  Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors"
                >
                  <option>Recording</option>
                  <option>Mixing</option>
                  <option>Mastering</option>
                  <option>Beat Leasing</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                  Preferred Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                  placeholderText="Select a date"
                  dateFormat="MMMM d, yyyy"
                  className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors"
                  calendarClassName="studio-datepicker"
                />
              </div>
              <div>
                <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tell us about the project, references, or anything else..."
                className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-studio-blue hover:bg-studio-bluelight disabled:opacity-50 transition-all duration-300 text-white py-4 rounded-md font-mono uppercase tracking-widest text-sm font-semibold"
            >
              {status === "sending" ? "Sending..." : "Confirm Booking Request"}
            </button>

            {status === "success" && (
              <p className="text-center text-studio-bluelight font-body">
                Thanks! Your request has been sent — we'll confirm shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-red-400 font-body">
                Please select a date and time, or try again.
              </p>
            )}
          </form>
        </section>
      )}
    </div>
  );
}
