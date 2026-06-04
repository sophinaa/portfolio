import { styles } from "../styles";
import { socialLinks } from "../constants";
import BorderGlow from "./BorderGlow";
import TextType from "./TextType";

const heroTitles = [
  "Full Stack Developer",
  "AI and Data Enthusiast",
  "Backend Engineer",
];

const longestHeroTitle = heroTitles.reduce((longest, current) =>
  current.length > longest.length ? current : longest
);

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 max-w-7xl mx-auto ${styles.paddingX} flex items-center justify-center z-10 pointer-events-none`}
      >
        <div className='text-center'>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#daf4f5]'>Sophina</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            <span className='relative inline-flex min-h-[80px] items-start justify-center'>
              <span className='invisible whitespace-nowrap'>
                {longestHeroTitle}_
              </span>
              <TextType
                as='span'
                className='absolute inset-0 inline-flex items-start justify-center whitespace-nowrap'
                text={heroTitles}
                typingSpeed={75}
                pauseDuration={1500}
                deletingSpeed={50}
                showCursor
                cursorCharacter='_'
                cursorClassName='ml-1 text-[#daf4f5]'
                cursorBlinkDuration={0.5}
              />
            </span>
          </p>
          <div className='mt-2 flex flex-wrap justify-center gap-3 pointer-events-auto'>
            {socialLinks.map(({ name, url }) => (
              <BorderGlow
                key={name}
                className='rounded-full'
                edgeSensitivity={24}
                glowColor='171 206 207'
                backgroundColor='transparent'
                borderRadius={999}
                glowRadius={28}
                glowIntensity={0.9}
                coneSpread={20}
                animated={false}
                colors={["#c4dce0", "#daf4f5", "#abcecf"]}
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

      <div className='absolute bottom-8 right-8 z-10 pointer-events-auto'>
        <BorderGlow
          className='rounded-full'
          edgeSensitivity={24}
          glowColor='171 206 207'
          backgroundColor='transparent'
          borderRadius={999}
          glowRadius={28}
          glowIntensity={0.9}
          coneSpread={20}
          animated={false}
          colors={["#c4dce0", "#daf4f5", "#abcecf"]}
        >
          <a
            href='#about'
            aria-label='Scroll to About section'
            className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl text-white backdrop-blur hover:bg-white/20 transition-colors duration-200'
          >
            ↓
          </a>
        </BorderGlow>
      </div>
    </section>
  );
};

export default Hero;
