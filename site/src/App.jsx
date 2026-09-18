import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { useSmoothScroll } from "./lib/smoothScroll";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Grain } from "./components/Grain";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Ticker } from "./components/Ticker";
import { About } from "./components/About";
import { Capabilities } from "./components/Capabilities";
import { Work } from "./components/Work";
import { CaseStudy } from "./components/CaseStudy";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useSmoothScroll(!reduce);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Grain />
      <Nav />
      <main className={ready || reduce ? "" : "opacity-0"}>
        <Hero />
        <Ticker />
        <About />
        <Capabilities />
        <Work />
        <CaseStudy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
