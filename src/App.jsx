import { BrowserRouter } from "react-router-dom";

import LetterGlitch from "./components/LetterGlitch";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='app-surface relative z-0 bg-primary'>
        <LetterGlitch
          className='fixed inset-0 z-0'
          glitchSpeed={50}
          centerVignette
          outerVignette={false}
          smooth
          speed={10}
          colors={["#2b4539", "#61dca3", "#61b3dc"]}
          showCenterVignette
          showOuterVignette={false}
        />
        <div className='relative'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
