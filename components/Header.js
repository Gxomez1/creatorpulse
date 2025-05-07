import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleComingSoon = (e) => {
    e.preventDefault();
    alert("Coming Soon 🌶️");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/spicyrate-logo.png"
            alt="SpicyRate Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-xl font-bold">
            <span className="text-red-600">Spicy</span>
            <span className="text-black">Rate</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <a href="#" onClick={handleComingSoon} className="hover:text-red-600">Add Creator</a>
          <Link href="/about" className="hover:text-red-600">About</Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <Link href="/" className="hover:text-red-600" onClick={() => setOpen(false)}>
            Home
          </Link>
          <a href="#" onClick={(e) => { handleComingSoon(e); setOpen(false); }} className="hover:text-red-600">
            Add Creator
          </a>
          <Link href="/about" className="hover:text-red-600" onClick={() => setOpen(false)}>
            About
          </Link>
        </div>
      )}
    </header>
  );
}
