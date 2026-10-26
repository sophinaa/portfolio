import { useState } from "react";

import { PixelIcon } from "../icons";

const trash = [
  { name: "old_3d_portfolio.zip", note: "Spinning planets. Too slow to load." },
  { name: "waffle.txt", note: "Three paragraphs of About Me." },
  { name: "lorem_ipsum.doc", note: "Never shipped." },
];

const RecycleBinApp = () => {
  const [items, setItems] = useState(trash);

  return (
    <div className='flex h-full flex-col bg-white'>
      <div className='border-b-2 border-ink bg-paper p-3'>
        <button type='button' className='btn px-4 py-1.5 text-xs' disabled={!items.length} onClick={() => setItems([])}>
          Empty Recycle Bin
        </button>
      </div>

      {items.length ? (
        <ul className='flex-1 divide-y divide-ink/10 overflow-auto'>
          {items.map(({ name, note }) => (
            <li key={name} className='flex items-center gap-3 px-4 py-3'>
              <PixelIcon name='notepad' className='h-7 w-8 shrink-0' />
              <div>
                <p className='text-sm font-medium'>{name}</p>
                <p className='text-xs text-ink/60'>{note}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='flex flex-1 items-center justify-center p-6 text-center font-term text-2xl'>
          All gone. The waffle is never coming back ✦
        </p>
      )}
    </div>
  );
};

export default RecycleBinApp;
