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

      <div className='grid min-h-0 flex-1 md:grid-cols-[250px_1fr]'>
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
                <span className='max-w-[12rem] truncate md:max-w-none md:whitespace-normal md:break-all' title={fileName(name)}>
                  {fileName(name)}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <article className={`overflow-auto p-5 sm:p-6 ${project.color}`}>
          <div className='flex flex-wrap items-center gap-2 font-label text-[11px] uppercase'>
            <span className='border-2 border-ink bg-paper px-2 py-0.5'>{project.year}</span>
            {project.award ? <span className='border-2 border-ink bg-butter px-2 py-0.5'>🏆 {project.award}</span> : null}
          </div>
          <h2 className='mt-3 font-display text-3xl font-bold leading-none sm:text-4xl'>{project.name}</h2>
          <p className='mt-3 max-w-xl leading-relaxed'>{project.blurb}</p>

          {project.points.length ? (
            <ul className='mt-3 max-w-xl space-y-1 text-sm'>
              {project.points.map((point) => (
                <li key={point} className='flex gap-2'>
                  <span aria-hidden='true'>▸</span>
                  {point}
                </li>
              ))}
            </ul>
          ) : null}

          <ul className='mt-4 flex flex-wrap gap-2'>
            {project.tags.map((tag) => (
              <li key={tag} className='border-2 border-ink bg-paper px-2.5 py-1 font-label text-xs'>
                {tag}
              </li>
            ))}
          </ul>

          <div className='mt-5 h-56'>
            <ProjectArt kind={project.art} project={project} />
          </div>

          {project.live || project.link ? (
            <div className='mt-5 flex flex-wrap gap-3'>
              {project.live ? (
                <a href={project.live} target='_blank' rel='noopener noreferrer' className='btn'>
                  ▸ Try it live
                </a>
              ) : null}
              {project.link ? (
                <a href={project.link} target='_blank' rel='noopener noreferrer' className='btn'>
                  ▸ View code on GitHub
                </a>
              ) : null}
            </div>
          ) : null}
        </article>
      </div>

      <p className='border-t-2 border-ink px-3 py-1 font-label text-[11px] uppercase'>
        {projects.length} object(s) · 1 selected
      </p>
    </div>
  );
};

export default ProjectsApp;
