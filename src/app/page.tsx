import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";
import { Terminal } from "@/components/sections/Terminal";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Terminal />
      <Contact />
      <footer className="section-pad border-t border-white/10 py-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] text-center text-sm text-white/45">
        <p>
          (c) {new Date().getFullYear()} Salahaldin Mohamed - Built with Next.js,
          R3F, GSAP, Framer Motion & Lenis
        </p>
      </footer>
    </SiteShell>
  );
}
