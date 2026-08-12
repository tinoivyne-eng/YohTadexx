export default function Footer() {
  return (
    <footer className="bg-studio-black border-t border-studio-gray py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-heading text-studio-white/90">
          YOH TADEXX <span className="text-studio-bluelight">PRODUCTIONS</span>
        </p>
        <div className="flex gap-6 text-studio-white/70 text-sm">
          <a href="#" className="hover:text-studio-bluelight">Instagram</a>
          <a href="#" className="hover:text-studio-bluelight">YouTube</a>
          <a href="#" className="hover:text-studio-bluelight">Spotify</a>
           <a href="#" className="hover:text-studio-bluelight">TikTok</a>
            <a href="#" className="hover:text-studio-bluelight">Facebook</a>
        </div>
        <p className="text-studio-white/40 text-xs">
          © {new Date().getFullYear()} Yoh Tadexx Productions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}