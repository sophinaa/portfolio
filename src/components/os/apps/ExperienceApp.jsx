import { useState } from "react";

import { experiences } from "../../../constants";

const filters = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "leadership", label: "Leadership" },
];

const ExperienceApp = () => {
  const [filter, setFilter] = useState("all");
  const shown = experiences.filter((item) => filter === "all" || item.kind === filter);

  return (
    <div className='flex h-full flex-col bg-paper'>
      <div className='flex flex-wrap gap-2 border-b-2 border-ink p-3' role='group' aria-label='Filter experience'>
        {filters.map(({ id, label }) => (
          <button key={id} type='button' aria-pressed={filter === id} onClick={() => setFilter(id)} className='btn px-4 py-1.5 text-xs'>
            {filter === id ? "◉" : "○"} {label}
          </button>
        ))}
      </div>

      <ul className='min-h-0 flex-1 divide-y-2 divide-ink/10 overflow-auto bg-white'>
        {shown.map((item) => (
          <li key={`${item.org}-${item.role}`} className='flex gap-4 px-4 py-4'>
            <div className='flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border-2 border-ink bg-white'>
              {item.icon ? <img src={item.icon} alt='' className='h-full w-full object-cover' /> : <span className='font-display text-xl'>✎</span>}
            </div>
            <div className='min-w-0'>
              <div className='flex flex-wrap items-baseline gap-x-3'>
                <h3 className='font-display text-lg font-bold leading-tight'>{item.role}</h3>
                <span className='font-label text-[11px] uppercase text-ink/60'>{item.date}</span>
              </div>
              <p className='text-sm font-medium text-navy'>{item.org}</p>
              <p className='mt-1 text-sm leading-relaxed text-ink/80'>{item.line}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className='border-t-2 border-ink px-3 py-1 font-label text-[11px] uppercase'>{shown.length} item(s)</p>
    </div>
  );
};

export default ExperienceApp;
