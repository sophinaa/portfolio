import { motion } from "framer-motion";

import { styles } from "../styles";
import { socialLinks } from "../constants";
import { ComputersCanvas } from "./canvas";

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
            Full Stack Developer <br className='sm:block hidden' />
            AI and Data Enthusiast
          </p>
          <div className='mt-6 flex flex-wrap gap-3 pointer-events-auto'>
            {socialLinks.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center text-sm font-semibold tracking-wide text-white bg-black/30 border border-white/30 px-4 py-2 rounded-full backdrop-blur hover:bg-black/50 transition-colors duration-200'
              >
                {name}
              </a>
            ))}
            <a
              href='/Sophina.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center text-sm font-semibold tracking-wide text-white bg-[#415a77] px-4 py-2 rounded-full hover:bg-[#1b263b] transition-colors duration-200'
              download
            >
              View Resume
            </a>
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
