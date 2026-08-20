import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await signUp(formData.email, formData.password, formData.name);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    setTimeout(() => navigate("/login"), 2500);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-studio-charcoal border border-studio-gray rounded-2xl p-8 md:p-10">
        <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-2 text-center">
          Join Us
        </p>
        <h1 className="font-mono text-2xl font-bold uppercase tracking-wide text-studio-white text-center mb-8">
          Sign Up
        </h1>

        {success ? (
          <p className="text-center text-studio-bluelight font-body">
            Account created! Check your email to confirm, then log in. Redirecting...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                autoComplete="off"
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
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors"
              />
            </div>

            <div>
              <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 pr-12 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-studio-white/50 hover:text-studio-bluelight transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.94 10.94 0 0112 20c-5.5 0-9.5-4.5-10-8a15.6 15.6 0 014.22-5.94M9.9 4.24A9.6 9.6 0 0112 4c5.5 0 9.5 4.5 10 8a15.5 15.5 0 01-1.86 3.19M14.12 14.12a3 3 0 11-4.24-4.24" />
                      <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-8 10-8 10 8 10 8-3.5 8-10 8-10-8-10-8z" />
                      <circle cx="12" cy="12" r="3" strokeWidth="2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 pr-12 text-studio-white focus:outline-none focus:border-studio-bluelight transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-studio-white/50 hover:text-studio-bluelight transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.94 10.94 0 0112 20c-5.5 0-9.5-4.5-10-8a15.6 15.6 0 014.22-5.94M9.9 4.24A9.6 9.6 0 0112 4c5.5 0 9.5 4.5 10 8a15.5 15.5 0 01-1.86 3.19M14.12 14.12a3 3 0 11-4.24-4.24" />
                      <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-8 10-8 10 8 10 8-3.5 8-10 8-10-8-10-8z" />
                      <circle cx="12" cy="12" r="3" strokeWidth="2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm font-body text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-studio-blue hover:bg-studio-bluelight disabled:opacity-50 transition-all duration-300 text-white py-3 rounded-md font-mono uppercase tracking-widest text-sm font-semibold"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}

        <p className="text-center text-studio-white/60 font-body text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-studio-bluelight hover:underline underline-offset-4">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}