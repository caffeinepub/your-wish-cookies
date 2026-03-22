import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToChat = () => {
    document
      .getElementById("chat-section")
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "oklch(0.96 0.012 85)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-cocoa flex-shrink-0">
            <img
              src="/assets/generated/cookie-bot-avatar.dim_80x80.png"
              alt="Your Wish Cookies"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="font-serif font-bold text-lg tracking-wide"
            style={{ color: "oklch(0.32 0.09 55)" }}
          >
            YOUR WISH
          </span>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium"
          data-ocid="nav.section"
        >
          <button
            type="button"
            className="hover:text-teal transition-colors"
            data-ocid="nav.link"
          >
            Home
          </button>
          <button
            type="button"
            className="hover:text-teal transition-colors"
            data-ocid="nav.link"
          >
            Our Cookies
          </button>
          <button
            type="button"
            className="hover:text-teal transition-colors"
            data-ocid="nav.link"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={scrollToChat}
            className="text-sm font-medium transition-colors"
            style={{ color: "oklch(0.42 0.09 175)" }}
            data-ocid="nav.link"
          >
            Chat with Bot
          </button>
          <Button
            onClick={scrollToChat}
            className="rounded-full px-5 text-white"
            style={{ backgroundColor: "oklch(0.55 0.1 55)" }}
            data-ocid="nav.primary_button"
          >
            Order Now
          </Button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-border px-4 py-4 flex flex-col gap-3"
          style={{ backgroundColor: "oklch(0.96 0.012 85)" }}
        >
          <button
            type="button"
            className="py-1 font-medium text-left"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </button>
          <button
            type="button"
            className="py-1 font-medium text-left"
            onClick={() => setMenuOpen(false)}
          >
            Our Cookies
          </button>
          <button
            type="button"
            className="py-1 font-medium text-left"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={scrollToChat}
            className="py-1 font-medium text-left"
            style={{ color: "oklch(0.42 0.09 175)" }}
          >
            Chat with Bot
          </button>
          <Button
            onClick={scrollToChat}
            className="rounded-full w-full text-white"
            style={{ backgroundColor: "oklch(0.55 0.1 55)" }}
          >
            Order Now
          </Button>
        </div>
      )}
    </header>
  );
}
