import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Capabilities } from "@/components/sections/Capabilities";
import { AIShowcase } from "@/components/sections/AIShowcase";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <About />
      <Experience />
      <Capabilities />
      <AIShowcase />
      <Skills />
      <Projects />
      <Journey />
      <Contact />
      <footer className="section-pad border-t border-white/10 py-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] text-center text-sm text-white/45">
        <p>
          &copy; {new Date().getFullYear()} Salahaldin Mohamed Salahaldin &bull; Computer Science Engineer &amp; IT Technical Support Engineer
        </p>
      </footer>
    </SiteShell>
  );
}

