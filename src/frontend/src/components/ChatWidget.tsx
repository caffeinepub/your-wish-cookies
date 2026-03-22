import {
  ArrowLeft,
  CheckCheck,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Cookie } from "../backend.d";
import { useGetAllCookies, useSendChatMessage } from "../hooks/useQueries";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
  showCookies?: boolean;
}

const COOKIE_IMAGES: Record<string, string> = {
  "Chocolate Chip Classic":
    "/assets/generated/cookie-choco-chip.dim_200x200.png",
  "Double Fudge Brownie":
    "/assets/generated/cookie-fudge-brownie.dim_200x200.png",
  "Snickerdoodle Delight":
    "/assets/generated/cookie-snickerdoodle.dim_200x200.png",
  "Peanut Butter Dream":
    "/assets/generated/cookie-peanut-butter.dim_200x200.png",
};

const FALLBACK_COOKIES: Cookie[] = [
  {
    id: 1n,
    name: "Chocolate Chip Classic",
    description: "Golden buttery dough loaded with rich chocolate chips",
    category: "Classic",
    price: "$3.50",
  },
  {
    id: 2n,
    name: "Double Fudge Brownie",
    description: "Dense dark chocolate with a fudgy center",
    category: "Chocolate",
    price: "$4.00",
  },
  {
    id: 3n,
    name: "Snickerdoodle Delight",
    description: "Soft cinnamon-sugar coated perfection",
    category: "Classic",
    price: "$3.00",
  },
  {
    id: 4n,
    name: "Peanut Butter Dream",
    description: "Creamy peanut butter with a crunchy finish",
    category: "Nut",
    price: "$3.75",
  },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
        <img
          src="/assets/generated/cookie-bot-avatar.dim_80x80.png"
          alt="Bot"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="rounded-2xl rounded-bl-sm px-4 py-3"
        style={{ backgroundColor: "oklch(1 0 0)", maxWidth: "120px" }}
      >
        <div className="flex gap-1 items-center h-5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full inline-block"
              style={{
                backgroundColor: "oklch(0.55 0.02 60)",
                animation: "bounce-dot 1.4s infinite ease-in-out both",
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CookieCards({ cookies }: { cookies: Cookie[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2 w-full max-w-xs sm:max-w-sm">
      {cookies.map((cookie, i) => (
        <motion.div
          key={String(cookie.id)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-xl overflow-hidden shadow-xs flex flex-col"
          data-ocid={`cookies.item.${i + 1}`}
        >
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={
                COOKIE_IMAGES[cookie.name] ||
                "/assets/generated/cookie-choco-chip.dim_200x200.png"
              }
              alt={cookie.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-2">
            <p
              className="font-semibold text-xs leading-tight"
              style={{ color: "oklch(0.22 0.03 50)" }}
            >
              {cookie.name}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.55 0.02 60)" }}
            >
              {cookie.description.slice(0, 36)}
              {cookie.description.length > 36 ? "…" : ""}
            </p>
            <p
              className="font-bold text-sm mt-1"
              style={{ color: "oklch(0.32 0.09 55)" }}
            >
              {cookie.price}
            </p>
            <button
              type="button"
              className="mt-2 w-full rounded-lg py-1.5 text-xs font-semibold transition-colors"
              style={{
                backgroundColor: "oklch(0.82 0.06 175)",
                color: "oklch(0.25 0.07 175)",
              }}
              data-ocid={`cookies.button.${i + 1}`}
            >
              Order
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const { data: backendCookies } = useGetAllCookies();
  const sendMsg = useSendChatMessage();
  const cookies =
    backendCookies && backendCookies.length > 0
      ? backendCookies
      : FALLBACK_COOKIES;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi! Welcome to Your Wish Cookies! 🍪 I'm your cookie assistant. Type 'menu' to see our cookies, or ask me anything!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const isMenuRequest = /menu|cookie|order|list|show/i.test(text);

    try {
      const response = await sendMsg.mutateAsync(text);
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: "bot",
        text: response,
        timestamp: new Date(),
        showCookies: isMenuRequest,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: "bot",
        text: isMenuRequest
          ? "Here are our delicious cookies! 🍪"
          : "Thanks for reaching out! Our cookies are baked fresh daily. Type 'menu' to see all available flavors!",
        timestamp: new Date(),
        showCookies: isMenuRequest,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="w-full shadow-chat rounded-3xl overflow-hidden flex flex-col"
      style={{
        maxWidth: "780px",
        width: "90%",
        height: "620px",
        backgroundColor: "oklch(1 0 0)",
      }}
      data-ocid="chat.panel"
    >
      {/* Chat Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ backgroundColor: "oklch(0.35 0.08 175)" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-white opacity-80 hover:opacity-100"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/30">
            <img
              src="/assets/generated/cookie-bot-avatar.dim_80x80.png"
              alt="Cookie Bot"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">
              Cookie Bot
            </p>
            <p className="text-xs" style={{ color: "oklch(0.82 0.06 175)" }}>
              ● Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white opacity-80">
          <Phone size={18} />
          <Video size={18} />
          <MoreVertical size={18} />
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{ backgroundColor: "oklch(0.94 0.015 75)" }}
      >
        {/* Date chip */}
        <div className="flex justify-center mb-4">
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{
              backgroundColor: "oklch(0.82 0.04 200 / 0.35)",
              color: "oklch(0.35 0.06 200)",
            }}
          >
            Today
          </span>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex mb-4 ${msg.role === "user" ? "justify-end" : "items-end gap-2"}`}
            >
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 self-end">
                  <img
                    src="/assets/generated/cookie-bot-avatar.dim_80x80.png"
                    alt="Bot"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[75%]`}
              >
                <div
                  className="rounded-2xl px-4 py-2.5"
                  style={{
                    backgroundColor:
                      msg.role === "user"
                        ? "oklch(0.91 0.06 140)"
                        : "oklch(1 0 0)",
                    borderBottomRightRadius:
                      msg.role === "user" ? "4px" : undefined,
                    borderBottomLeftRadius:
                      msg.role === "bot" ? "4px" : undefined,
                    color: "oklch(0.22 0.03 50)",
                  }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                  {msg.showCookies && <CookieCards cookies={cookies} />}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.6 0.01 60)" }}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                  {msg.role === "user" && (
                    <CheckCheck
                      size={13}
                      style={{ color: "oklch(0.42 0.09 175)" }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div
        className="flex items-center gap-2 px-3 py-3 flex-shrink-0 border-t border-border"
        style={{ backgroundColor: "oklch(1 0 0)" }}
      >
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Emoji"
        >
          <Smile size={22} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          data-ocid="chat.input"
        />
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Attachment"
        >
          <Paperclip size={20} />
        </button>
        {input.trim() ? (
          <button
            type="button"
            onClick={handleSend}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "oklch(0.35 0.08 175)" }}
            data-ocid="chat.submit_button"
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        ) : (
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Voice"
          >
            <Mic size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
