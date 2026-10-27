import { useEffect, useRef, useState } from "react";

import { contact, experiences, projects, skills } from "../../../constants";

const PROMPT = "C:\\SOPHINA>";

const openable = ["about", "projects", "experience", "skills", "contact", "locker", "maps", "bin"];

const help = [
  "Available commands:",
  "  help          show this list",
  "  whoami        who is this?",
  "  projects      list my projects",
  "  experience    where I've worked",
  "  skills        what I work with",
  "  contact       how to reach me",
  "  open <app>    open a window: " + openable.join(", "),
  "  date          today's date",
  "  clear         clear the screen",
  "  exit          close this terminal",
];

// A small command prompt that can answer questions and open other windows
const TerminalApp = ({ open, close }) => {
  const [lines, setLines] = useState(["SophinaOS [Version 26.0]", "Type 'help' to see what I can do.", ""]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const run = (raw) => {
    const [command = "", ...args] = raw.trim().split(/\s+/);
    const name = command.toLowerCase();

    switch (name) {
      case "":
        return [];
      case "help":
        return help;
      case "whoami":
        return ["sophina: final-year CS student @ Dundee, ex-Barclays intern, 2x hackathon winner (DUCS + GUTS/BlackRock)."];
      case "projects":
        return projects.map((project) => `  ${project.year.padEnd(12)} ${project.name.padEnd(36)} ${project.tags.join(", ")}`);
      case "experience":
        return experiences.map((item) => `  ${item.date.padEnd(14)} ${item.role}, ${item.org}`);
      case "skills":
        return skills.map(({ category, items }) => `  ${category}: ${items.join(", ")}`);
      case "contact":
        return [`  email     ${contact.email}`, `  linkedin  ${contact.linkedin}`, `  github    ${contact.github}`];
      case "open": {
        const app = (args[0] || "").toLowerCase();
        if (!openable.includes(app)) {
          return [`Can't open '${args[0] || ""}'. Try: ${openable.join(", ")}`];
        }
        open(app);
        return [`Opening ${app}...`];
      }
      case "date":
        return [new Date().toDateString()];
      case "sudo":
        return ["Nice try. This incident will be reported to Sophina."];
      case "exit":
        close();
        return [];
      default:
        return [`'${command}' is not recognised as a command. Type 'help'.`];
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (input.trim().toLowerCase() === "clear") {
      setLines([]);
    } else {
      setLines((current) => [...current, `${PROMPT} ${input}`, ...run(input), ""]);
    }
    if (input.trim()) {
      setHistory((current) => [input, ...current]);
    }
    setHistoryIndex(-1);
    setInput("");
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(Math.max(next, -1));
      setInput(next >= 0 ? history[next] : "");
    }
  };

  return (
    <div
      className='crt h-full overflow-y-auto cursor-text p-3 font-term text-xl leading-tight text-lime'
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, index) => (
        <pre key={index} className='whitespace-pre-wrap font-term'>
          {line || " "}
        </pre>
      ))}
      <form onSubmit={onSubmit} className='flex gap-2'>
        <label htmlFor='terminal-input' className='shrink-0'>
          {PROMPT}
        </label>
        <input
          id='terminal-input'
          ref={inputRef}
          autoFocus
          autoComplete='off'
          autoCapitalize='off'
          spellCheck='false'
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          className='min-w-0 flex-1 bg-transparent text-lime caret-lime outline-none'
        />
      </form>
      <div ref={endRef} />
    </div>
  );
};

export default TerminalApp;
