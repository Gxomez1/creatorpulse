export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10 py-6 text-center text-sm text-gray-500">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <p>© 2025 CreatorPulse. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/about" className="hover:text-[#e11d48] transition">
            About
          </a>
          <a href="mailto:support@creatorpulse.app" className="hover:text-[#e11d48] transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
