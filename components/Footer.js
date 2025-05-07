export default function Footer() {
    return (
      <footer className="bg-white border-t mt-10 py-6 text-center text-sm text-gray-500">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p>© 2025 SpicyRate. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/about" className="hover:text-red-600 transition">
              About
            </a>
            <a href="mailto:spicyrated@gmail.com" className="hover:text-red-600 transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    );
  }
  