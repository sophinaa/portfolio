import Section, { SectionHeading } from "./Section";
import ProjectArt from "./ProjectArt";
import { projects } from "../constants";

// Cards stick and pile up on top of each other as you scroll
const ProjectCard = ({ project, index }) => (
  <article
    className='sticky'
    style={{ top: `${6 + index * 1.5}rem` }}
  >
    <div
      className={`relative mb-10 rounded-[2rem] border-2 border-ink p-6 text-ink shadow-[0_-8px_30px_rgba(0,0,0,0.35)] md:p-10 ${project.color}`}
    >
      <span className='absolute -top-5 left-8 rounded-full border-2 border-ink bg-paper px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest'>
        ✦ Project 0{index + 1}
      </span>

      <div className='grid items-center gap-8 md:grid-cols-[1.2fr_1fr]'>
        <div>
          <h3 className='font-display text-4xl leading-none md:text-6xl'>{project.name}</h3>
          <p className='mt-5 max-w-md text-lg leading-relaxed'>{project.blurb}</p>

          <ul className='mt-6 flex flex-wrap gap-2'>
            {project.tags.map((tag, tagIndex) => (
              <li
                key={tag}
                className={`rounded-full border-2 border-ink bg-paper px-3 py-1 font-mono text-xs font-bold ${
                  tagIndex % 2 ? "rotate-2" : "-rotate-2"
                }`}
              >
                {tag}
              </li>
            ))}
          </ul>

          {project.link ? (
            <a
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-8 inline-block rounded-full border-2 border-ink bg-ink px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-paper transition-transform hover:-rotate-2 hover:scale-105'
            >
              View code ↗
            </a>
          ) : (
            <p className='mt-8 font-hand text-2xl'>repo coming soon ✎</p>
          )}
        </div>

        <div className='h-64 md:h-72'>
          <ProjectArt kind={project.art} />
        </div>
      </div>
    </div>
  </article>
);

const Works = () => (
  <Section id='projects' className='ink-grid mx-2 rounded-[2.5rem] text-paper sm:mx-4'>
    <SectionHeading
      dark
      kicker='Projects'
      title='things i made.'
      note='keep scrolling, they stack ↓'
      squiggle='#d8f650'
    />

    <div>
      {projects.map((project, index) => (
        <ProjectCard key={project.name} project={project} index={index} />
      ))}
    </div>
  </Section>
);

export default Works;
