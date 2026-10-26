import { useState } from "react";

import ProjectArt from "../../ProjectArt";
import { PixelIcon } from "../icons";
import { projects } from "../../../constants";

const fileName = (name) => `${name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/_$/, "")}.exe`;

// Explorer-style: files on the left, details of the selected one on the right
const ProjectsApp = () => {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return (
    <div className='flex h-full flex-col bg-paper'>
      <div className='flex items-center gap-2 border-b-2 border-ink px-3 py-2 font-label text-[11px] uppercase'>
        <span>Address</span>
        <span className='bevel-in flex-1 truncate px-2 py-1 font-sans text-xs normal-case'>C:\Sophina\Projects\</span>
      </div>

      <div className='grid min-h-0 flex-1 md:grid-cols-[210px_1fr]'>
        <ul className='flex gap-1 overflow-x-auto border-b-2 border-ink bg-white p-2 md:flex-col md:border-b-0 md:border-r-2'>
          {projects.map(({ name }, index) => (
            <li key={name} className='shrink-0'>
              <button
                type='button'
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
                className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm ${
                  selected === index ? "bg-navy text-white" : "hover:bg-navy/10"
                }`}
              >
                <PixelIcon name='folder' className='h-6 w-7 shrink-0' />
                <span className='max-w-[12rem] truncate md:max-w-none'>{fileName(name)}</span>
              </button>
            </li>
          ))}
        </ul>

        <article className={`overflow-auto p-5 sm:p-6 ${project.color}`}>
          <h2 className='font-display text-3xl font-bold leading-none sm:text-4xl'>{project.name}</h2>
          <p className='mt-3 max-w-xl leading-relaxed'>{project.blurb}</p>

          <ul className='mt-4 flex flex-wrap gap-2'>
            {project.tags.map((tag) => (
              <li key={tag} className='border-2 border-ink bg-paper px-2.5 py-1 font-label text-xs'>
                {tag}
              </li>
            ))}
          </ul>

          <div className='mt-5 h-56'>
            <ProjectArt kind={project.art} />
          </div>

          {project.link ? (
            <a href={project.link} target='_blank' rel='noopener noreferrer' className='btn mt-5'>
              ▸ View code on GitHub
            </a>
          ) : (
            <p className='mt-5 font-term text-2xl'>&gt; repo coming soon_</p>
          )}
        </article>
      </div>

      <p className='border-t-2 border-ink px-3 py-1 font-label text-[11px] uppercase'>
        {projects.length} object(s) · 1 selected
      </p>
    </div>
  );
};

export default ProjectsApp;
