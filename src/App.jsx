import { MotionConfig } from "framer-motion";

import { About, Contact, Experience, Hero, Marquee, Navbar, Tech, Works } from "./components";

const App = () => (
  <MotionConfig reducedMotion='user'>
    <div className='paper-grid min-h-screen overflow-x-clip'>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Works />
        <Experience />
        <Tech />
        <Contact />
      </main>
    </div>
  </MotionConfig>
);

export default App;
