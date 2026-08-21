import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const statusColors = {
  pending: "text-yellow-400 border-yellow-400/40",
  confirmed: "text-studio-bluelight border-studio-bluelight/40",
  declined: "text-red-400 border-red-400/40",
  completed: "text-green-400 border-green-400/40",
};

// ================= BOOKINGS PANEL =================

function BookingsPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);

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

// ================= MESSAGES PANEL =================

function MessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [sendingReply, setSendingReply] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);

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
      .update({
        admin_reply: replyText,
        replied_at: new Date().toISOString(),
        read: true,
      })
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
                    <span className="text-xs font-mono uppercase border border-studio-bluelight/40 text-studio-bluelight rounded-full px-2 py-0.5">
                      New
                    </span>
                  )}

                  {m.admin_reply && (
                    <span className="text-xs font-mono uppercase border border-green-400/40 text-green-400 rounded-full px-2 py-0.5">
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

              <div className="flex flex-wrap gap-2 font-mono text-xs uppercase">
                <button
                  onClick={() => markAsRead(m.id, m.read)}
                  className="border border-studio-gray text-studio-white/70 px-3 py-2 rounded-md"
                >
                  {m.read ? "Mark Unread" : "Mark Read"}
                </button>

                <button
                  onClick={() => deleteMessage(m.id)}
                  className="border border-red-400/40 text-red-400 px-3 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>

            {m.admin_reply && (
              <div className="mt-4 pl-4 border-l-2 border-studio-bluelight/40">
                <p className="text-studio-bluelight text-xs uppercase">Your Reply</p>
                <p className="text-studio-white/70">{m.admin_reply}</p>
              </div>
            )}

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={m.admin_reply ? "Send a new reply..." : "Type a reply..."}
                value={replyDrafts[m.id] || ""}
                onChange={(e) => setReplyDrafts({ ...replyDrafts, [m.id]: e.target.value })}
                className="flex-1 bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white"
              />

              <button
                onClick={() => sendReply(m.id)}
                disabled={sendingReply === m.id}
                className="bg-studio-blue text-white px-5 py-2 rounded-md"
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

// ================= SERVICES PANEL =================

function ServicesPanel() {
  const emptyForm = { title: "", price: "", description: "", features: "" };

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) console.error(error);

    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startEdit = (service) => {
    setEditingId(service.id);
    setForm({
      title: service.title,
      price: service.price,
      description: service.description || "",
      features: (service.features || []).join(", "),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      price: form.price,
      description: form.description,
      features: form.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    if (editingId) {
      await supabase.from("services").update(payload).eq("id", editingId);
    } else {
      await supabase.from("services").insert([{ ...payload, sort_order: services.length }]);
    }

    setSaving(false);
    cancelEdit();
    fetchServices();
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service permanently?")) return;
    await supabase.from("services").delete().eq("id", id);
    fetchServices();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-studio-black border border-studio-gray rounded-xl p-6 mb-8 space-y-4"
      >
        <h3 className="font-mono text-studio-white uppercase tracking-widest text-sm font-bold">
          {editingId ? "Edit Service" : "Add New Service"}
        </h3>

        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={form.title}
          onChange={handleChange}
          className="w-full bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white"
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          required
          value={form.price}
          onChange={handleChange}
          className="w-full bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white"
        />

        <input
          type="text"
          name="features"
          placeholder="Features separated by commas"
          value={form.features}
          onChange={handleChange}
          className="w-full bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-studio-blue text-white px-6 py-2 rounded-md"
          >
            {saving ? "Saving..." : editingId ? "Update Service" : "Add Service"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="border border-studio-gray text-white px-6 py-2 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-studio-white/60">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-studio-white/60">No services yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.id} className="bg-studio-black border border-studio-gray rounded-xl p-5">
              <h4 className="text-white font-bold">{s.title}</h4>
              <p className="text-studio-bluelight">{s.price}</p>
              <p className="text-studio-white/60">{s.description}</p>

              <ul className="text-sm text-studio-white/50 mt-2">
                {s.features?.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => startEdit(s)}
                  className="border border-studio-gray text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteService(s.id)}
                  className="border border-red-400 text-red-400 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ================= PORTFOLIO PANEL =================

function PortfolioPanel() {
  const emptyForm = { title: "", artist: "", genre: "", cover_url: "", youtube_id: "" };

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchTracks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("portfolio_tracks")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) console.error(error);

    setTracks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `portfolio-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);
    setForm((prev) => ({ ...prev, cover_url: data.publicUrl }));
    setUploading(false);
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setForm({
      title: t.title,
      artist: t.artist,
      genre: t.genre,
      cover_url: t.cover_url || "",
      youtube_id: t.youtube_id || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = { ...form };

    if (editingId) {
      await supabase.from("portfolio_tracks").update(payload).eq("id", editingId);
    } else {
      await supabase.from("portfolio_tracks").insert([{ ...payload, sort_order: tracks.length }]);
    }

    setSaving(false);
    cancelEdit();
    fetchTracks();
  };

  const deleteTrack = async (id) => {
    if (!window.confirm("Delete this track permanently?")) return;
    await supabase.from("portfolio_tracks").delete().eq("id", id);
    fetchTracks();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-studio-black border border-studio-gray rounded-xl p-6 mb-8 space-y-4"
      >
        <h3 className="font-mono text-studio-white uppercase tracking-widest text-sm font-bold">
          {editingId ? "Edit Track" : "Add New Track"}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Track Title"
            required
            value={form.title}
            onChange={handleChange}
            className="bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white text-sm focus:outline-none focus:border-studio-bluelight"
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            required
            value={form.artist}
            onChange={handleChange}
            className="bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white text-sm focus:outline-none focus:border-studio-bluelight"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="genre"
            placeholder="Genre (e.g. Hip-Hop)"
            required
            value={form.genre}
            onChange={handleChange}
            className="bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white text-sm focus:outline-none focus:border-studio-bluelight"
          />
          <input
            type="text"
            name="youtube_id"
            placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)"
            value={form.youtube_id}
            onChange={handleChange}
            className="bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white text-sm focus:outline-none focus:border-studio-bluelight"
          />
        </div>

        <div>
          <label className="block text-studio-white/70 font-mono text-xs uppercase tracking-widest mb-2">
            Cover Image
          </label>
          <div className="flex items-center gap-4">
            {form.cover_url && (
              <div
                className="w-16 h-16 rounded-md bg-cover bg-center border border-studio-gray flex-shrink-0"
                style={{ backgroundImage: `url('${form.cover_url}')` }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-studio-white/70 text-sm font-body file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-studio-blue file:text-white file:font-mono file:uppercase file:tracking-widest file:text-xs file:cursor-pointer hover:file:bg-studio-bluelight"
            />
            {uploading && (
              <span className="text-studio-bluelight text-xs font-mono">Uploading...</span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-studio-blue hover:bg-studio-bluelight disabled:opacity-50 transition-all text-white px-6 py-2 rounded-md font-mono uppercase tracking-widest text-xs font-semibold"
          >
            {saving ? "Saving..." : editingId ? "Update Track" : "Add Track"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="border border-studio-gray text-studio-white/70 hover:text-studio-bluelight px-6 py-2 rounded-md font-mono uppercase tracking-widest text-xs"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-studio-white/60 font-body">Loading tracks...</p>
      ) : tracks.length === 0 ? (
        <p className="text-studio-white/60 font-body">No tracks yet — add one above.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tracks.map((t) => (
            <div key={t.id} className="bg-studio-black border border-studio-gray rounded-xl p-5 flex gap-4">
              {t.cover_url && (
                <div
                  className="w-16 h-16 rounded-md bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url('${t.cover_url}')` }}
                />
              )}
              <div className="flex-1">
                <h4 className="font-mono text-studio-white uppercase tracking-wide font-bold text-sm">
                  {t.title}
                </h4>
                <p className="text-studio-white/60 text-sm font-body">{t.artist}</p>
                <span className="inline-block mt-1 text-xs font-mono text-studio-bluelight uppercase tracking-widest">
                  {t.genre}
                </span>
                <div className="flex gap-2 mt-3 font-mono text-xs uppercase tracking-widest">
                  <button
                    onClick={() => startEdit(t)}
                    className="border border-studio-gray hover:border-studio-bluelight text-studio-white/70 hover:text-studio-bluelight transition-all px-3 py-1.5 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTrack(t.id)}
                    className="border border-red-400/40 text-red-400 hover:bg-red-400/10 transition-colors px-3 py-1.5 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ================= STUDIO PHOTOS PANEL =================

function StudioPanel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("studio_images")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) console.error(error);

    setImages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `studio-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from("images").upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);

    await supabase.from("studio_images").insert([
      {
        image_url: data.publicUrl,
        caption: caption || null,
        sort_order: images.length,
      },
    ]);

    setCaption("");
    setUploading(false);
    e.target.value = "";
    fetchImages();
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this photo permanently?")) return;
    await supabase.from("studio_images").delete().eq("id", id);
    fetchImages();
  };

  return (
    <div>
      <div className="bg-studio-black border border-studio-gray rounded-xl p-6 mb-8 space-y-4">
        <h3 className="font-mono text-studio-white uppercase tracking-widest text-sm font-bold">
          Add New Photo
        </h3>

        <input
          type="text"
          placeholder="Caption (e.g. Recording Booth)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full bg-studio-charcoal border border-studio-gray rounded-md px-4 py-2 text-studio-white text-sm focus:outline-none focus:border-studio-bluelight"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="text-studio-white/70 text-sm font-body file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-studio-blue file:text-white file:font-mono file:uppercase file:tracking-widest file:text-xs file:cursor-pointer hover:file:bg-studio-bluelight disabled:opacity-50"
        />

        {uploading && (
          <p className="text-studio-bluelight text-xs font-mono">Uploading and saving...</p>
        )}
      </div>

      {loading ? (
        <p className="text-studio-white/60 font-body">Loading photos...</p>
      ) : images.length === 0 ? (
        <p className="text-studio-white/60 font-body">No photos yet — add one above.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-studio-black border border-studio-gray rounded-xl overflow-hidden">
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url('${img.image_url}')` }}
              />
              <div className="p-4 flex items-center justify-between gap-2">
                <p className="text-studio-white/70 text-sm font-mono truncate">
                  {img.caption || "Untitled"}
                </p>
                <button
                  onClick={() => deleteImage(img.id)}
                  className="border border-red-400/40 text-red-400 hover:bg-red-400/10 transition-colors px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-widest flex-shrink-0"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ================= ADMIN ACCESS PANEL =================

function UsersPanel() {
  const { user } = useAuth();
  const [unlocked, setUnlocked] = useState(false);
  const [gatePassword, setGatePassword] = useState("");
  const [gateError, setGateError] = useState("");
  const [gateLoading, setGateLoading] = useState(false);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setGateLoading(true);
    setGateError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: gatePassword,
    });

    if (error) {
      setGateError("Incorrect password.");
      setGateLoading(false);
      return;
    }

    setUnlocked(true);
    setGateLoading(false);
  };

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto text-center py-8">
        <p className="text-studio-bluelight font-mono uppercase tracking-[0.3em] text-xs mb-3">
          Sensitive Section
        </p>
        <h3 className="font-mono text-studio-white uppercase tracking-widest text-sm font-bold mb-6">
          Confirm Your Password to Continue
        </h3>
        <form onSubmit={handleUnlock} className="space-y-4">
          <input
            type="password"
            name="admin-gate-password"
            placeholder="Your password"
            value={gatePassword}
            onChange={(e) => setGatePassword(e.target.value)}
            autoComplete="off"
            required
            className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-3 text-studio-white text-sm focus:outline-none focus:border-studio-bluelight text-center"
          />
          {gateError && <p className="text-red-400 text-xs font-body">{gateError}</p>}
          <button
            type="submit"
            disabled={gateLoading}
            className="w-full bg-studio-blue hover:bg-studio-bluelight disabled:opacity-50 transition-all text-white py-3 rounded-md font-mono uppercase tracking-widest text-xs font-semibold"
          >
            {gateLoading ? "Checking..." : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  return <UsersPanelContent />;
}

function UsersPanelContent() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmTarget, setConfirmTarget] = useState(null); // profile being promoted/demoted
  const [password, setPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);

    setProfiles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const openConfirm = (profile) => {
    setConfirmTarget(profile);
    setPassword("");
    setConfirmError("");
  };

  const closeConfirm = () => {
    setConfirmTarget(null);
    setPassword("");
    setConfirmError("");
  };

  const handleConfirm = async () => {
    if (!password) {
      setConfirmError("Enter your password to confirm.");
      return;
    }

    setConfirmLoading(true);
    setConfirmError("");

    // Re-authenticate the currently logged-in admin with their own password
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });

    if (authError) {
      setConfirmError("Incorrect password.");
      setConfirmLoading(false);
      return;
    }

    const newRole = confirmTarget.role === "admin" ? "customer" : "admin";

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", confirmTarget.id);

    if (updateError) {
      setConfirmError("Something went wrong updating this user.");
      setConfirmLoading(false);
      return;
    }

    setConfirmLoading(false);
    closeConfirm();
    fetchProfiles();
  };

  if (loading) {
    return <p className="text-studio-white/60 font-body">Loading users...</p>;
  }

  return (
    <div>
      <p className="text-studio-white/60 font-body text-sm mb-6">
        Promoting a user to admin gives them full access to this dashboard, including bookings,
        messages, content editing, and the ability to manage other admins.
      </p>

      <div className="space-y-3">
        {profiles.map((p) => (
          <div
            key={p.id}
            className="bg-studio-black border border-studio-gray rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-3">
                <p className="font-mono text-studio-white font-bold text-sm">
                  {p.name || "Unnamed"}
                </p>
                <span
                  className={`text-xs font-mono uppercase tracking-widest border rounded-full px-2 py-0.5 ${
                    p.role === "admin"
                      ? "text-studio-bluelight border-studio-bluelight/40"
                      : "text-studio-white/50 border-studio-gray"
                  }`}
                >
                  {p.role}
                </span>
                {p.id === user.id && (
                  <span className="text-xs font-mono text-studio-white/40">(you)</span>
                )}
                {p.is_protected && (
                  <span className="text-xs font-mono text-yellow-400/80 uppercase tracking-widest">
                    Founder
                  </span>
                )}
              </div>
              <p className="text-studio-white/50 text-sm font-body">{p.email}</p>
            </div>

            {p.id !== user.id && !p.is_protected && (
              <button
                onClick={() => openConfirm(p)}
                className={`font-mono uppercase tracking-widest text-xs px-4 py-2 rounded-md border transition-all ${
                  p.role === "admin"
                    ? "border-red-400/40 text-red-400 hover:bg-red-400/10"
                    : "border-studio-bluelight/40 text-studio-bluelight hover:bg-studio-bluelight/10"
                }`}
              >
                {p.role === "admin" ? "Remove Admin" : "Make Admin"}
              </button>
            )}
            {p.id !== user.id && p.is_protected && (
              <span className="text-xs font-mono text-studio-white/30 italic">
                Protected — cannot be changed here
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Password confirmation modal */}
      {confirmTarget && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center px-4"
          onClick={closeConfirm}
        >
          <div
            className="w-full max-w-sm bg-studio-charcoal border border-studio-gray rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-mono text-studio-white uppercase tracking-widest text-sm font-bold mb-2">
              Confirm Your Password
            </h3>
            <p className="text-studio-white/60 text-sm font-body mb-4">
              {confirmTarget.role === "admin" ? "Remove admin access from" : "Grant admin access to"}{" "}
              <span className="text-studio-white">{confirmTarget.name || confirmTarget.email}</span>?
              This requires re-entering your password.
            </p>

            <input
              type="password"
              name="admin-confirm-password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="w-full bg-studio-black border border-studio-gray rounded-md px-4 py-2 text-studio-white text-sm mb-3 focus:outline-none focus:border-studio-bluelight"
            />

            {confirmError && (
              <p className="text-red-400 text-xs font-body mb-3">{confirmError}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                disabled={confirmLoading}
                className="flex-1 bg-studio-blue hover:bg-studio-bluelight disabled:opacity-50 transition-all text-white py-2 rounded-md font-mono uppercase tracking-widest text-xs font-semibold"
              >
                {confirmLoading ? "Confirming..." : "Confirm"}
              </button>
              <button
                onClick={closeConfirm}
                className="border border-studio-gray text-studio-white/70 hover:text-studio-bluelight px-4 py-2 rounded-md font-mono uppercase tracking-widest text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= ADMIN DASHBOARD =================

function AdminDashboard() {
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
          className="border border-studio-gray text-studio-white px-5 py-2 rounded-md"
        >
          Log Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs uppercase">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-md border ${
              tab === t.id
                ? "bg-studio-blue border-studio-blue text-white"
                : "border-studio-gray text-studio-white/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-studio-charcoal border border-studio-gray rounded-2xl p-6 md:p-8">
        {tab === "bookings" && <BookingsPanel />}
        {tab === "messages" && <MessagesPanel />}
        {tab === "services" && <ServicesPanel />}

        {tab === "portfolio" && <PortfolioPanel />}

        {tab === "studio" && <StudioPanel />}

        {tab === "users" && <UsersPanel />}
      </div>
    </div>
  );
}

export default AdminDashboard;
