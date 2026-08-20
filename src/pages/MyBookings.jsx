import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const statusColors = {
  pending: "text-yellow-400 border-yellow-400/40",
  confirmed: "text-studio-bluelight border-studio-bluelight/40",
  declined: "text-red-400 border-red-400/40",
  completed: "text-green-400 border-green-400/40",
};

const statusMessages = {
  pending: "Waiting for the studio to confirm your session.",
  confirmed: "Your session is confirmed — see you then!",
  declined: "Unfortunately this session couldn't be scheduled. Try a different date/time.",
  completed: "This session has been completed. Thanks for booking with us!",
};

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setBookings(data || []);
      setLoading(false);
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <div>
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
            Your Sessions
          </p>
          <h1 className="font-mono text-3xl font-bold uppercase tracking-wide text-studio-white">
            My Bookings
          </h1>
        </div>
        <Link
          to="/book"
          className="bg-studio-blue hover:bg-studio-bluelight transition-all duration-300 text-white px-6 py-3 rounded-md font-mono uppercase tracking-widest text-xs font-semibold"
        >
          Book Another Session
        </Link>
      </div>

      {loading ? (
        <p className="text-studio-white/60 font-body">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-studio-white/60 font-body">
          You haven't booked a session yet.{" "}
          <Link to="/book" className="text-studio-bluelight hover:underline underline-offset-4">
            Book one now
          </Link>
          .
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-studio-charcoal border border-studio-gray rounded-2xl p-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                <h3 className="font-mono text-studio-white uppercase tracking-wide font-bold">
                  {b.service}
                </h3>
                <span
                  className={`text-xs font-mono uppercase tracking-widest border rounded-full px-3 py-1 ${statusColors[b.status]}`}
                >
                  {b.status}
                </span>
              </div>

              <p className="text-studio-white/70 font-body mb-1">
                {new Date(b.session_date).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {b.session_time}
              </p>

              {b.notes && (
                <p className="text-studio-white/50 text-sm font-body mt-2 italic">
                  "{b.notes}"
                </p>
              )}

              <p className="text-studio-white/60 text-sm font-body mt-4 pt-4 border-t border-studio-gray">
                {statusMessages[b.status]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
