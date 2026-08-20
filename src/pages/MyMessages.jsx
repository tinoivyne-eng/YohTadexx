import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function MyMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setMessages(data || []);
      setLoading(false);
    };
    fetchMessages();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-4">
        Your Inbox
      </p>
      <h1 className="font-mono text-3xl font-bold uppercase tracking-wide text-studio-white mb-10">
        My Messages
      </h1>

      {loading ? (
        <p className="text-studio-white/60 font-body">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-studio-white/60 font-body">
          You haven't sent any messages yet.
        </p>
      ) : (
        <div className="space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className="bg-studio-charcoal border border-studio-gray rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <p className="text-studio-white/40 text-xs font-mono">
                  {new Date(m.created_at).toLocaleString()}
                </p>
                <span
                  className={`text-xs font-mono uppercase tracking-widest border rounded-full px-2 py-0.5 ${
                    m.read
                      ? "border-green-400/40 text-green-400"
                      : "border-studio-white/30 text-studio-white/50"
                  }`}
                >
                  {m.read ? "Seen by studio" : "Not yet seen"}
                </span>
              </div>

              <p className="text-studio-white/80 font-body mb-4">{m.message}</p>

              {m.admin_reply ? (
                <div className="pl-4 border-l-2 border-studio-bluelight/40">
                  <p className="text-studio-bluelight text-xs font-mono uppercase tracking-widest mb-1">
                    Studio Reply
                  </p>
                  <p className="text-studio-white/70 font-body">{m.admin_reply}</p>
                  {m.replied_at && (
                    <p className="text-studio-white/40 text-xs font-mono mt-1">
                      {new Date(m.replied_at).toLocaleString()}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-studio-white/40 text-sm font-body italic">
                  No reply yet — we'll get back to you soon.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
