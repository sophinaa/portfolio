import { barclays, duis, ducs, addva, standrews } from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

export const contact = {
  email: "sophinaakram2004@gmail.com",
  github: "https://github.com/sophinaa",
  linkedin: "https://www.linkedin.com/in/sophinaa",
};

export const heroRoles = ["full-stack apps", "backend systems", "AI & data things", "mobile apps"];

export const highlights = [
  {
    big: "Final year",
    detail: "BSc (Hons) Computer Science: Data Science & AI, University of Dundee (2023–2027).",
    color: "bg-lime",
  },
  {
    big: "Barclays",
    detail: "Technology Developer Summer Intern, 2026. C#, GitLab CI/CD & Duo, Power BI dashboards and stakeholder demos.",
    color: "bg-lilac",
  },
  {
    big: "2x hackathon winner",
    detail: "Won the DUCS and GUTS (BlackRock) hackathons. Also co-organised the 2026 DUCS hackathon.",
    color: "bg-mint",
  },
  {
    big: "Bilingual",
    detail: "Fluent in English and Arabic.",
    color: "bg-butter",
  },
];

// `art` picks the little animated illustration in the Projects window (see ProjectArt)
export const projects = [
  {
    name: "Unclaimed",
    year: "2026",
    award: "GUTS hackathon winner (BlackRock)",
    blurb:
      "Helps people in Scotland work out which three benefits to claim first. It compares every combination that can be claimed together, so estimates are never double-counted, and explains why the others were left out.",
    points: [
      "Models how claims interact: some need another claim first, some lower each other",
      "Ranks the best three with estimated first-year value and the order to claim them",
      "No account needed and nothing is saved",
    ],
    tags: ["Next.js", "TypeScript", "API", "Railway"],
    color: "bg-butter",
    art: "plan",
    live: "https://web-production-82b74.up.railway.app",
    link: null,
  },
  {
    name: "HalalWay",
    year: "2025 – now",
    blurb:
      "A cross-platform app for finding halal food, prayer spaces and halal-friendly services, built from scratch without scaffolding tools to understand every layer of the stack.",
    points: [
      "React Native (Expo) app + Node.js/TypeScript/Express backend in a Turborepo monorepo",
      "Auth, map-based discovery and user reviews",
      "REST APIs with MongoDB indexing, schema validation and defensive error handling",
    ],
    tags: ["React Native", "TypeScript", "Express", "MongoDB"],
    color: "bg-lime",
    art: "map",
    link: "https://github.com/sophinaa/HalalWay",
  },
  {
    name: "Real-Time Analytics Platform",
    year: "2025 – now",
    blurb: "A distributed analytics platform that ingests and streams events in real time.",
    points: [
      "ASP.NET Core ingestion API with REST and WebSocket endpoints",
      "Go API gateway with JWT auth, rate limiting and concurrent request handling",
      "Every service containerised with Docker Compose",
    ],
    tags: ["C#", "Go", "TypeScript", "Docker"],
    color: "bg-lilac",
    art: "bars",
    // TODO: add the repo URL once it's public
    link: null,
  },
  {
    name: "Campus Companion",
    year: "2026",
    award: "Hackathon winner",
    blurb: "An AI-powered student learning platform built in 24 hours with a cross-university team.",
    points: [
      "Python, Flask, JavaScript and SQLite",
      "LLM-powered, chat-based Q&A for personalised learning support",
    ],
    tags: ["Python", "Flask", "LLM", "SQLite"],
    color: "bg-mint",
    art: "chat",
    link: null,
  },
  {
    name: "F1 Telemetry & Race Pace Simulator",
    year: "2025 – now",
    blurb: "A race-engineering-style desktop tool for exploring F1 telemetry and lap-time strategy.",
    points: [
      "Loads speed, throttle, brake, gear and delta data from CSV/JSON",
      "Interactive charts, lap overlays, stint and sector comparison",
      "Models fuel load, tyre wear, aero trim and ERS effects on lap time",
    ],
    tags: ["C#", ".NET 8", "Data viz"],
    color: "bg-tomato",
    art: "laps",
    link: "https://github.com/sophinaa/AlpineTelemetryDashboard",
  },
  {
    name: "HTTP Digest Authentication",
    year: "2025",
    blurb: "Custom Python middleware implementing HTTP Digest Authentication with SHA-256.",
    points: [
      "Built secure and deliberately vulnerable versions side by side",
      "Used them to analyse replay attacks and hashing weaknesses",
    ],
    tags: ["Python", "Security", "HTTP"],
    color: "bg-butter",
    art: "auth",
    link: null,
  },
  {
    name: "Go URL Shortener",
    year: "2025",
    blurb: "A URL shortener with a REST API and a small browser frontend, built to learn Go properly.",
    points: ["Base62 hash generator", "Routing with Go's standard library and a file-backed store"],
    tags: ["Go", "REST API"],
    color: "bg-mint",
    art: "console",
    link: "https://github.com/sophinaa/go-url-shortener",
  },
  {
    name: "FocusFlight",
    year: "2025",
    blurb: "A personal focus timer inspired by \"study flights\": pick a route, set a duration and stay locked in until you land.",
    points: [],
    tags: ["React Native", "Expo", "TypeScript"],
    color: "bg-lilac",
    art: "console",
    link: "https://github.com/sophinaa/FocusFlight",
  },
  {
    name: "Lap Delta Comparator",
    year: "2024",
    blurb: "Loads two laps, computes delta-time by distance and highlights where time is gained or lost.",
    points: ["Quick stint, driver and tyre comparisons"],
    tags: ["C#", "Data viz"],
    color: "bg-lilac",
    art: "laps",
    link: null,
  },
  {
    name: "Graph Pathfinding System",
    year: "2024",
    blurb: "Dijkstra's shortest-path algorithm on an adjacency-matrix graph, powering a map navigation game.",
    points: [],
    tags: ["C", "Algorithms"],
    color: "bg-mint",
    art: "graph",
    link: null,
  },
  {
    name: "Process Scheduling Simulator",
    year: "2024",
    blurb: "Simulates Round-Robin and Shortest Time-to-Completion-First CPU scheduling and compares their performance.",
    points: [],
    tags: ["C++", "Operating systems"],
    color: "bg-lime",
    art: "gantt",
    link: null,
  },
  {
    name: "Java Library Manager",
    year: "2024",
    blurb: "A console library system with borrow/return flows, search and sorting, built to learn Java properly.",
    points: ["Clean model / service / storage / ui packages", "JSON persistence, validation and JUnit 5 tests"],
    tags: ["Java", "Maven", "JUnit 5"],
    color: "bg-butter",
    art: "console",
    link: "https://github.com/sophinaa/java-library-manager",
  },
  {
    name: "Selkies and Munros",
    year: "2023",
    blurb: "A text-based adventure game set in Scotland, saving player progress to an Oracle database.",
    points: [],
    tags: ["Java", "Oracle SQL"],
    color: "bg-tomato",
    art: "console",
    link: null,
  },
];

export const experiences = [
  {
    role: "Technology Developer Summer Intern",
    org: "Barclays",
    date: "Summer 2026",
    line: "Built C# software, worked with GitLab CI/CD and GitLab Duo, made Power BI dashboards and demoed work to senior stakeholders.",
    icon: barclays,
    kind: "work",
  },
  {
    role: "Vice Sister (Vice President)",
    org: "Dundee University Islamic Society",
    date: "2026 – now",
    line: "Helping lead DUIS through its 100th year: events, operations and work with university and external partners.",
    icon: duis,
    kind: "leadership",
  },
  {
    role: "Welfare Officer",
    org: "Dundee University Computing Society",
    date: "2025 – now",
    line: "Lead wellbeing initiatives with staff and students for an inclusive community of 150+ members.",
    icon: ducs,
    kind: "leadership",
  },
  {
    role: "Promotion Lead",
    org: "Angus & Dundee District Volleyball",
    date: "2025 – now",
    line: "Run social media, launched the Instagram and built the official website.",
    icon: addva,
    kind: "leadership",
  },
  {
    role: "Freelance Web Designer",
    org: "AI legal startup",
    date: "2025",
    line: "Designed and deployed a responsive, accessible website for the client.",
    icon: null,
    kind: "work",
  },
  {
    role: "Research Assistant",
    org: "University of St Andrews",
    date: "2023",
    line: "Women's entrepreneurship research: research design, data collection and analysis.",
    icon: standrews,
    kind: "work",
  },
  {
    role: "Private Tutor",
    org: "Self-employed",
    date: "2022 – now",
    line: "One-to-one maths and science tutoring, including students with learning difficulties.",
    icon: null,
    kind: "work",
  },
  {
    role: "Assistant Coach",
    org: "University of St Andrews",
    date: "2020 – 2021",
    line: "Ran drills and mentored younger players.",
    icon: standrews,
    kind: "leadership",
  },
];

export const skills = [
  {
    category: "Languages",
    color: "bg-tomato text-paper",
    items: ["C#", "Python", "Java", "C", "C++", "JavaScript", "TypeScript", "Go", "SQL"],
  },
  {
    category: "Frameworks",
    color: "bg-lilac",
    items: ["ASP.NET Core", "React", "React Native", "Node.js", "Express", "Next.js", "Flask"],
  },
  {
    category: "Tools & data",
    color: "bg-mint",
    items: ["Git", "GitLab", "CI/CD", "Docker", "AWS", "Power BI", "PostgreSQL", "MongoDB", "SQLite"],
  },
  {
    category: "Concepts",
    color: "bg-butter",
    items: ["REST APIs", "WebSockets", "Authentication", "Data structures & algorithms", "Agile"],
  },
];
