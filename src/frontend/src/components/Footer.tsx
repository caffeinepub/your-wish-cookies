import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="w-full py-12 px-4"
      style={{ backgroundColor: "oklch(0.16 0.01 45)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="/assets/generated/cookie-bot-avatar.dim_80x80.png"
                  alt="Your Wish"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="font-serif font-bold text-lg"
                style={{ color: "oklch(0.93 0.02 85)" }}
              >
                YOUR WISH
              </span>
            </div>
            <p
              className="text-sm max-w-xs"
              style={{ color: "oklch(0.65 0.01 70)" }}
            >
              Freshly baked cookies crafted with love. Order your perfect batch
              through our chat bot, any time of day.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                style={{ color: "oklch(0.75 0.02 80)" }}
                aria-label="Instagram"
                data-ocid="footer.link"
              >
                <SiInstagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                style={{ color: "oklch(0.75 0.02 80)" }}
                aria-label="Facebook"
                data-ocid="footer.link"
              >
                <SiFacebook size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                style={{ color: "oklch(0.75 0.02 80)" }}
                aria-label="X / Twitter"
                data-ocid="footer.link"
              >
                <SiX size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-semibold text-sm mb-3"
              style={{ color: "oklch(0.93 0.02 85)" }}
            >
              Company
            </h4>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "oklch(0.65 0.01 70)" }}
            >
              <li>
                <span
                  className="hover:text-white transition-colors cursor-pointer"
                  data-ocid="footer.link"
                >
                  About Us
                </span>
              </li>
              <li>
                <span
                  className="hover:text-white transition-colors cursor-pointer"
                  data-ocid="footer.link"
                >
                  Our Story
                </span>
              </li>
              <li>
                <span
                  className="hover:text-white transition-colors cursor-pointer"
                  data-ocid="footer.link"
                >
                  Blog
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className="font-semibold text-sm mb-3"
              style={{ color: "oklch(0.93 0.02 85)" }}
            >
              Support
            </h4>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "oklch(0.65 0.01 70)" }}
            >
              <li>
                <span
                  className="hover:text-white transition-colors cursor-pointer"
                  data-ocid="footer.link"
                >
                  FAQ
                </span>
              </li>
              <li>
                <span
                  className="hover:text-white transition-colors cursor-pointer"
                  data-ocid="footer.link"
                >
                  Shipping Info
                </span>
              </li>
              <li>
                <span
                  className="hover:text-white transition-colors cursor-pointer"
                  data-ocid="footer.link"
                >
                  Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-6"
          style={{ borderColor: "oklch(1 0 0 / 10%)" }}
        >
          <p
            className="text-xs text-center"
            style={{ color: "oklch(0.5 0.01 60)" }}
          >
            © {year}. Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
