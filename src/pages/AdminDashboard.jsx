import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const statusColors = {
  pending: "text-yellow-400 border-yellow-400/40",
  confirmed: "text-studio-bluelight border-studio-bluelight/40",
  declined: "text-red-400 border-red-400/40",
  completed: "text-green-400 border-green-400/40",
};

function BookingsPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking permanently?")) return;
    await supabase.from("bookings").delete().eq("id", id);
    fetchBookings();
  };

  if (loading) {
    return <p className="text-studio-white/60 font-body">Loading bookings...</p>;
  }

  if (bookings.length === 0) {
    return <p className="text-studio-white/60 font-body">No bookings yet.</p>;
  }

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-studio-black border border-studio-gray rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-mono text-studio-white font-bold">{b.name}</h3>
              <span
                className={`text-xs font-mono uppercase tracking-widest border rounded-full px-2 py-0.5 ${statusColors[b.status]}`}
              >
                {b.status}
              </span>
            </div>
            <p className="text-studio-white/60 text-sm font-body">
              {b.service} · {b.session_date} at {b.session_time}
            </p>
            <p className="text-studio-white/50 text-sm font-body">
              {b.email} {b.phone && `· ${b.phone}`}
            </p>
            {b.notes && (
              <p className="text-studio-white/50 text-sm font-body mt-1 italic">"{b.notes}"</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest">
            <select
              value={b.status}
              onChange={(e) => updateStatus(b.id, e.target.value)}
              className="bg-studio-charcoal border border-studio-gray rounded-md px-3 py-2 text-studio-white focus:outline-none focus:border-studio-bluelight"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="declined">Declined</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={() => deleteBooking(b.id)}
              className="border border-red-400/40 text-red-400 hover:bg-red-400/10 transition-colors px-3 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [sendingReply, setSendingReply] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id, read) => {
    await supabase.from("messages").update({ read: !read }).eq("id", id);
    fetchMessages();
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return;
    await supabase.from("messages").delete().eq("id", id);
    fetchMessages();
  };

  const sendReply = async (id) => {
    const replyText = replyDrafts[id];
    if (!replyText || !replyText.trim()) return;

    setSendingReply(id);
    await supabase
      .from("messages")
      .update({ admin_reply: replyText, replied_at: new Date().toISOString(), read: true })
      .eq("id", id);
    setReplyDrafts({ ...replyDrafts, [id]: "" });
    setSendingReply(null);
    fetchMessages();
  };

  if (loading) {
    return <p className="text-studio-white/60 font-body">Loading messages...</p>;
  }

  if (messages.length === 0) {
    return <p className="text-studio-white/60 font-body">No messages yet.</p>;
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      {unreadCount > 0 && (
        <p className="text-studio-bluelight font-mono text-xs uppercase tracking-widest mb-4">
          {unreadCount} unread
        </p>
      )}
      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`bg-studio-black border rounded-xl p-5 ${
              m.read ? "border-studio-gray" : "border-studio-bluelight/50"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-mono text-studio-white font-bold">{m.name}</h3>
                  {!m.read && (
                    <span className="text-xs font-mono uppercase tracking-widest border border-studio-bluelight/40 text-studio-bluelight rounded-full px-2 py-0.5">
                      New
                    </span>
                  )}
                  {m.admin_reply && (
                    <span className="text-xs font-mono uppercase tracking-widest border border-green-400/40 text-green-400 rounded-full px-2 py-0.5">
                      Replied
                    </span>
                  )}
                </div>
                <p className="text-studio-white/50 text-sm font-body mb-2">{m.email}</p>
                <p className="text-studio-white/70 font-body">{m.message}</p>
                <p className="text-studio-white/40 text-xs font-mono mt-2">
                  {new Date(m.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest">
                <button
                  onClick={() => markAsRead(m.id, m.read)}
                  className="border border-studio-gray hover:border-studio-bluelight text-studio-white/70 hover:text-studio-bluelight transition-all px-3 py-2 rounded-md"
                >
                  {m.read ? "Mark Unread" : "Mark Read"}
                </button>
                <button
                  onClick={() => deleteMessage(m.id)}
                  className="border border-red-400/40 text-red-400 hover:bg-red-400/10 transition-colors px-3 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Existing reply, if any */}
            {m.admin_reply && (
              <div className="mt-4 pl-4 border-l-2 border-studio-bluelight/40">
                <p className="text-studio-bluelight text-xs font-mono uppercase tracking-widest mb-1">
                  Your Reply
                </p>
                <p className="text-studio-white/70 font-body">{m.admin_reply}</p>
              </div>
            )}

            {/* Reply box */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={m.admin_reply ? "Send a new reply..." : "Type a reply..."}
                value={replyDrafts[m.id] || ""}
                onChange={(e) => setReplyDrafts({ ...replyDrafts, [m.id]: e.target.value })}
                className="flex-1 bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white text-sm focus:outline-none focus:border-studio-bluelight transition-colors"
              />
              <button
                onClick={() => sendReply(m.id)}
                disabled={sendingReply === m.id}
                className="bg-studio-blue hover:bg-studio-bluelight disabled:opacity-50 transition-all duration-300 text-white px-5 py-2 rounded-md font-mono uppercase tracking-widest text-xs font-semibold"
              >
                {sendingReply === m.id ? "Sending..." : "Reply"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState("bookings");
  const { profile, signOut } = useAuth();

  const tabs = [
    { id: "bookings", label: "Bookings" },
    { id: "messages", label: "Messages" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "studio", label: "Studio Photos" },
    { id: "users", label: "Admin Access" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-sm mb-2">
            Admin Dashboard
          </p>
          <h1 className="font-mono text-3xl font-bold uppercase tracking-wide text-studio-white">
            Welcome, {profile?.name || "Admin"}
          </h1>
        </div>
        <button
          onClick={signOut}
          className="border border-studio-gray hover:border-studio-bluelight text-studio-white/70 hover:text-studio-bluelight transition-all duration-300 px-5 py-2 rounded-md font-mono text-xs uppercase tracking-widest"
        >
          Log Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs uppercase tracking-widest">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-md border transition-all duration-300 ${
              tab === t.id
                ? "bg-studio-blue border-studio-blue text-white"
                : "border-studio-gray text-studio-white/60 hover:border-studio-bluelight hover:text-studio-bluelight"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="bg-studio-charcoal border border-studio-gray rounded-2xl p-6 md:p-8">
        {tab === "bookings" && <BookingsPanel />}
        {tab === "messages" && <MessagesPanel />}
        {tab === "services" && (
          <p className="text-studio-white/60 font-body">Services editor — coming next.</p>
        )}
        {tab === "portfolio" && (
          <p className="text-studio-white/60 font-body">Portfolio editor — coming next.</p>
        )}
        {tab === "studio" && (
          <p className="text-studio-white/60 font-body">Studio photo manager — coming next.</p>
        )}
        {tab === "users" && (
          <p className="text-studio-white/60 font-body">Admin access management — coming next.</p>
        )}
      </div>
    </div>
  );
}
