// Главная страница — собирает все секции портфолио
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import SkillCarousel from "@/components/sections/SkillCarousel";
import Expertise from "@/components/sections/Expertise";
import Contact from "@/components/sections/Contact";
import AboutMe from "@/components/sections/AboutMe";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Projects />
        <SkillCarousel />
        <AboutMe />
        <Expertise />
        <Contact />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
