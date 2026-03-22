import { Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Home Baker & Cookie Enthusiast",
    text: "I ordered through the chat bot and it was SO easy! I just typed what I wanted and the bot guided me perfectly. The Chocolate Chip Classic arrived warm and absolutely divine. My family is obsessed!",
    rating: 5,
    stars: ["s1", "s2", "s3", "s4", "s5"],
  },
  {
    id: 2,
    name: "James Okonkwo",
    role: "Office Manager",
    text: "Ordered a custom assortment of 24 cookies for our team meeting through the chat bot. The bot helped me pick the perfect mix of flavors. Everyone kept asking where I got them — huge hit!",
    rating: 5,
    stars: ["s1", "s2", "s3", "s4", "s5"],
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Food Blogger",
    text: "The Double Fudge Brownie cookie is genuinely the best thing I've tasted this year. Ordering via chat was fast and intuitive — I was done in under 2 minutes. Will be a repeat customer for sure!",
    rating: 5,
    stars: ["s1", "s2", "s3", "s4", "s5"],
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      className="py-20 px-4"
      style={{ backgroundColor: "oklch(0.96 0.012 85)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-widest mb-2"
          style={{ color: "oklch(0.42 0.09 175)" }}
        >
          What Our Customers Say
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl sm:text-4xl font-bold mb-12"
          style={{ color: "oklch(0.22 0.03 50)" }}
        >
          Loved by Cookie Fans
        </motion.h2>

        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-xs text-left"
              data-ocid={`testimonials.item.${active + 1}`}
            >
              <div className="flex gap-1 mb-4">
                {current.stars.slice(0, current.rating).map((starKey) => (
                  <Star
                    key={`${current.id}-${starKey}`}
                    size={16}
                    fill="oklch(0.8 0.18 70)"
                    stroke="none"
                  />
                ))}
              </div>
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.32 0.02 50)" }}
              >
                "{current.text}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: "oklch(0.55 0.1 55)" }}
                >
                  {current.name[0]}
                </div>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.22 0.03 50)" }}
                  >
                    {current.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.6 0.01 60)" }}
                  >
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div
          className="flex justify-center gap-2 mt-6"
          data-ocid="testimonials.panel"
        >
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{
                backgroundColor:
                  i === active ? "oklch(0.42 0.09 175)" : "oklch(0.75 0.02 80)",
                transform: i === active ? "scale(1.3)" : "scale(1)",
              }}
              data-ocid="testimonials.toggle"
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
