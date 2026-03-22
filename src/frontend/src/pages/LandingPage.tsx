import ChatWidget from "../components/ChatWidget";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TestimonialsSection from "../components/TestimonialsSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <section
          id="chat-section"
          className="bg-background py-12 flex justify-center"
        >
          <ChatWidget />
        </section>
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
