import TextType from "../../TextType";
import { sophinaPixel } from "../../../assets";
import { heroRoles, highlights } from "../../../constants";

const AboutApp = ({ open }) => (
  <div className='grid gap-6 bg-paper p-5 sm:grid-cols-[220px_1fr] sm:p-6'>
    <div>
      <div className='bevel-in p-1.5'>
        <img
          src={sophinaPixel}
          alt='Pixel-art portrait of Sophina in a hijab, big headphones and a fluffy white scarf, with star stickers on her face'
          className='block aspect-square w-full [image-rendering:pixelated]'
        />
      </div>
      <p className='mt-2 text-center font-label text-[11px] uppercase text-ink/60'>me.jpg · 627×627</p>
    </div>

    <div>
      <p className='font-term text-2xl text-ink/60'>hello world, my name is</p>
      <h2 className='font-display text-5xl font-bold leading-none text-navy [text-shadow:4px_4px_0_#ff4f8b] sm:text-6xl'>
        Sophina
      </h2>

      <p className='crt mt-4 border-2 border-ink px-3 py-2 font-term text-2xl text-lime'>
        &gt; I build{" "}
        <TextType
          as='span'
          text={heroRoles}
          typingSpeed={70}
          pauseDuration={1600}
          deletingSpeed={40}
          cursorCharacter='█'
          cursorClassName='text-lime'
        />
      </p>

      <ul className='mt-5 grid gap-3'>
        {highlights.map(({ big, detail, color }) => (
          <li key={big} className='flex items-start gap-3'>
            <span className={`mt-1 h-4 w-4 shrink-0 border-2 border-ink ${color}`} aria-hidden='true' />
            <p className='text-sm leading-relaxed'>
              <strong className='font-display text-lg'>{big}.</strong> {detail}
            </p>
          </li>
        ))}
      </ul>

      <div className='mt-6 flex flex-wrap gap-3'>
        <button type='button' className='btn' onClick={() => open("projects")}>
          ▸ My projects
        </button>
        <button type='button' className='btn' onClick={() => open("contact")}>
          ✉ Say hi
        </button>
      </div>
    </div>
  </div>
);

export default AboutApp;
