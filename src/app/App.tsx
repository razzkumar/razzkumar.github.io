import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Lifecycle } from "./components/Lifecycle";
import { GithubStats } from "./components/GithubStats";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Cursor } from "./components/Cursor";

export default function App() {
  return (
    <div style={{ background: "#0E0B09" }} className="min-h-screen">
      <Cursor />
      <Navbar />
      <section id="about">
        <Hero />
      </section>
      <Stats />
      <Skills />
      <Experience />
      <Lifecycle />
      <Projects />
      <GithubStats />
      <Contact />
      <Footer />
    </div>
  );
}
