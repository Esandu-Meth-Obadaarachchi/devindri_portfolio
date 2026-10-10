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
import { Experience } from "./components/Experience";
import { Capabilities } from "./components/Capabilities";
import { Work } from "./components/Work";
import { Ufs } from "./components/Ufs";
import { ReelViewerProvider } from "./components/ReelViewer";
import { ScopeContext, useScopeState } from "./lib/scope";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const scope = useScopeState();
  useSmoothScroll(!reduce);

  return (
    <ScopeContext.Provider value={scope}>
      <ReelViewerProvider>
        <Preloader onDone={() => setReady(true)} />
        <Cursor />
        <Grain />
        <Nav />
        {/* The page mounts as the curtain lifts, so the hero plays its entrance in view
          instead of behind the preloader. The portrait is preloaded in index.html. */}
        {ready || reduce ? (
          <>
            <main>
              <Hero />
              <Ticker />
              <About />
              <Experience />
              <Ufs />
              <Work />
              <Capabilities />
              <Contact />
            </main>
            <Footer />
          </>
        ) : null}
      </ReelViewerProvider>
    </ScopeContext.Provider>
  );
}
