import { motion } from "framer-motion";

import { styles } from "../styles";
import { socialLinks } from "../constants";
import BorderGlow from "./BorderGlow";
import { ComputersCanvas } from "./canvas";
import TextType from "./TextType";

const heroTitles = [
  "Full Stack Developer",
  "AI and Data Enthusiast",
  "Backend Engineer",
];

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#778da9]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#778da9]'>Sophina</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            <TextType
              as='span'
              className='inline-flex min-h-[80px] items-start'
              text={heroTitles}
              typingSpeed={75}
              pauseDuration={1500}
              deletingSpeed={50}
              showCursor
              cursorCharacter='_'
              cursorClassName='ml-1 text-[#778da9]'
              cursorBlinkDuration={0.5}
            />
          </p>
          <div className='mt-2 flex flex-wrap gap-3 pointer-events-auto'>
            {socialLinks.map(({ name, url }) => (
              <BorderGlow
                key={name}
                className='rounded-full'
                edgeSensitivity={24}
                glowColor='119 141 169'
                backgroundColor='transparent'
                borderRadius={999}
                glowRadius={28}
                glowIntensity={0.9}
                coneSpread={20}
                animated={false}
                colors={["#778da9", "#e0e1dd", "#415a77"]}
              >
                <a
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center text-base font-semibold tracking-wide text-white bg-black/30 border border-white/30 px-6 py-3 rounded-full backdrop-blur hover:bg-black/50 transition-colors duration-200'
                >
                  {name}
                </a>
              </BorderGlow>
            ))}
          </div>
        </div>
      </div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
