import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Studio", path: "/studio" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    await signOut();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-studio-black border-b border-studio-gray sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <span className="w-2 h-8 rounded-sm bg-gradient-to-b from-studio-bluelight to-studio-blue transition-transform duration-300 group-hover:scale-y-110" />
          <span className="font-mono text-lg font-bold tracking-widest">
            <span className="text-studio-white">YOH</span>{" "}
            <span className="text-studio-bluelight">TADEXX</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-1 transition-colors duration-300 ${
                  isActive ? "text-studio-bluelight" : "text-studio-white/60 hover:text-studio-white"
                } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-studio-bluelight after:transition-all after:duration-300 ${
                  isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `relative py-1 transition-colors duration-300 ${
                  isActive ? "text-studio-bluelight" : "text-studio-white/60 hover:text-studio-white"
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </div>

        {/* Right side buttons (desktop) */}
        <div className="hidden md:flex items-center gap-4 font-mono text-sm uppercase tracking-widest">
          {user ? (
            <>
              <NavLink
                to="/my-messages"
                className="text-studio-white/70 hover:text-studio-bluelight transition-colors duration-300"
              >
                My Messages
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-studio-white/70 hover:text-studio-bluelight transition-colors duration-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-studio-white/70 hover:text-studio-bluelight transition-colors duration-300"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="border border-studio-gray hover:border-studio-bluelight text-studio-white/80 hover:text-studio-bluelight transition-all duration-300 px-5 py-2 rounded-md"
              >
                Sign Up
              </NavLink>
            </>
          )}
          <NavLink
            to="/book"
            className="bg-studio-blue hover:bg-studio-bluelight hover:-translate-y-0.5 hover:shadow-lg hover:shadow-studio-blue/40 transition-all duration-300 text-white px-5 py-2 rounded-md"
          >
            Book a Session
          </NavLink>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-studio-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              className={`transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              strokeWidth="2"
              strokeLinecap="round"
              className={`transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
              d="M6 6l12 12M6 18L18 6"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[40rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 pb-6 font-mono text-sm uppercase tracking-widest">
          {links.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive ? "text-studio-bluelight translate-x-1" : "text-studio-white/70 hover:text-studio-bluelight hover:translate-x-1"
                }`
              }
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.name}
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive ? "text-studio-bluelight translate-x-1" : "text-studio-white/70 hover:text-studio-bluelight hover:translate-x-1"
                }`
              }
            >
              Admin
            </NavLink>
          )}

          {user ? (
            <>
              <NavLink
                to="/my-messages"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `transition-all duration-300 ${
                    isActive ? "text-studio-bluelight translate-x-1" : "text-studio-white/70 hover:text-studio-bluelight hover:translate-x-1"
                  }`
                }
              >
                My Messages
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-studio-white/80 text-center mt-2 border border-studio-gray rounded-md py-2"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-studio-white/80 text-center mt-2"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="border border-studio-gray text-studio-white/80 px-5 py-2 rounded-md text-center"
              >
                Sign Up
              </NavLink>
            </>
          )}
          <NavLink
            to="/book"
            onClick={() => setIsOpen(false)}
            className="bg-studio-blue text-white px-5 py-2 rounded-md text-center"
          >
            Book a Session
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
