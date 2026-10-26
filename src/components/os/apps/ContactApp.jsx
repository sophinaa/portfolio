import { useState } from "react";

import { contact } from "../../../constants";

// A tiny mail client. "Send" hands the message to the visitor's own email app.
const ContactApp = () => {
  const [subject, setSubject] = useState("hiya Sophina!");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <div className='flex h-full flex-col gap-3 bg-paper p-4 sm:p-5'>
      <div className='flex flex-wrap gap-2'>
        <a href={mailto} className='btn px-4 py-1.5 text-xs'>
          ✉ Send
        </a>
        <button type='button' onClick={copyEmail} className='btn px-4 py-1.5 text-xs'>
          {copied ? "✓ Copied!" : "⧉ Copy address"}
        </button>
        <a href={contact.linkedin} target='_blank' rel='noopener noreferrer' className='btn px-4 py-1.5 text-xs'>
          LinkedIn ↗
        </a>
        <a href={contact.github} target='_blank' rel='noopener noreferrer' className='btn px-4 py-1.5 text-xs'>
          GitHub ↗
        </a>
        <span className='sr-only' aria-live='polite'>
          {copied ? "Email address copied" : ""}
        </span>
      </div>

      <div className='grid grid-cols-[3.5rem_1fr] items-center gap-2 font-label text-xs uppercase'>
        <span>To:</span>
        <span className='bevel-in truncate px-3 py-2 font-sans text-sm normal-case'>{contact.email}</span>
        <label htmlFor='mail-subject'>Subj:</label>
        <input
          id='mail-subject'
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className='bevel-in px-3 py-2 font-sans text-sm normal-case outline-none focus:bg-butter/20'
        />
      </div>

      <label htmlFor='mail-body' className='sr-only'>
        Message
      </label>
      <textarea
        id='mail-body'
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Type your message here… I'm open to graduate roles and fun projects!"
        className='bevel-in min-h-[10rem] flex-1 resize-none p-3 font-sans text-sm outline-none focus:bg-butter/10'
      />
    </div>
  );
};

export default ContactApp;
