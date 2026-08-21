import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {}

    setStatus("sent");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-studio-charcoal border border-studio-gray rounded-2xl p-8 md:p-10">
        <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-2 text-center">
          Password Reset
        </p>
        <h1 className="font-mono text-2xl font-bold uppercase tracking-wide text-studio-white text-center mb-8">
          Forgot Password
        </h1>

        {status === "sent" ? (
          <p className="text-center text-studio-bluelight font-body">
            Check your email — we've sent a link to reset your password.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors"
              />
            </div>

            {error && <p className="text-red-400 text-sm font-body text-center">{error}</p>}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-studio-blue hover:bg-studio-bluelight disabled:opacity-50 transition-all duration-300 text-white py-3 rounded-md font-mono uppercase tracking-widest text-sm font-semibold"
            >
              {status === "sending" ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="text-center text-studio-white/60 font-body text-sm mt-6">
          Remembered your password?{" "}
          <Link to="/login" className="text-studio-bluelight hover:underline underline-offset-4">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
