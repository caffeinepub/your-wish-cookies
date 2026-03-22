import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollToChat = () => {
    document
      .getElementById("chat-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full py-24 px-4 flex flex-col items-center text-center"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.18 0.02 45) 0%, oklch(0.11 0.015 40) 100%)",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm uppercase tracking-widest mb-4"
        style={{ color: "oklch(0.82 0.06 175)" }}
      >
        Your Wish Cookies 🍪
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl"
      >
        Chat &amp; Order Your Perfect Cookies
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-5 text-base sm:text-lg max-w-xl"
        style={{ color: "oklch(0.78 0.01 80)" }}
      >
        Talk directly with our smart cookie bot to browse flavors, customize
        orders, and get freshly baked cookies delivered — all through a familiar
        chat experience.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-8"
      >
        <Button
          onClick={scrollToChat}
          className="rounded-full px-8 py-3 text-base font-semibold"
          style={{
            backgroundColor: "oklch(0.93 0.02 85)",
            color: "oklch(0.22 0.03 50)",
          }}
          data-ocid="hero.primary_button"
        >
          Start Chatting Below ↓
        </Button>
      </motion.div>
    </section>
  );
}
