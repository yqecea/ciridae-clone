import { Navigation } from "@/components/Navigation";
import { ThreeBackground } from "@/components/ThreeBackground";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Security } from "@/components/sections/Security";
import { Contact } from "@/components/sections/Contact";
import { Careers } from "@/components/sections/Careers";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Navigation */}
      <Navigation />

      {/* Page Sections */}
      <Hero />
      <Manifesto />
      <Services />
      <Team />
      <Gallery />
      <Testimonials />
      <Security />
      <Contact />
      <Careers />
      <Footer />
    </main>
  );
}
