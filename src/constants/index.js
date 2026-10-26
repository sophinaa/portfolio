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
    detail: "BSc (Hons) Computer Science, University of Dundee. Specialising in Data Science & AI.",
    color: "bg-lime",
  },
  {
    big: "Barclays",
    detail: "Technology Developer Summer Intern, 2026. Built with C#, GitLab CI/CD & Power BI.",
    color: "bg-lilac",
  },
  {
    big: "2x hackathon winner",
    detail: "Won the DUCS and GUTS (BlackRock) hackathons. Also co-organised the 2026 DUCS hackathon.",
    color: "bg-mint",
  },
];

export const projects = [
  {
    name: "Real-Time Analytics Dashboard",
    blurb: "A multi-service analytics platform: a .NET ingestion API, a Go gateway with JWT auth & rate limiting, all orchestrated with Docker.",
    tags: ["C#", "Go", "TypeScript", "Docker"],
    color: "bg-lilac",
    art: "bars",
    // TODO: add the repo URL once it's public
    link: null,
  },
  {
    name: "HalalWay",
    blurb: "A cross-platform mobile app with map-based search and reviews, backed by a Node/TypeScript REST API on MongoDB.",
    tags: ["React Native", "Node.js", "MongoDB"],
    color: "bg-lime",
    art: "map",
    link: "https://github.com/sophinaa/HalalWay",
  },
  {
    name: "F1 Telemetry & Race Pace Simulator",
    blurb: "Real F1 data, interactive charts, lap overlays and tunable race strategy, in a C#/.NET 8 desktop app.",
    tags: ["C#", ".NET 8", "Data viz"],
    color: "bg-tomato",
    art: "laps",
    link: "https://github.com/sophinaa/AlpineTelemetryDashboard",
  },
];

export const experiences = [
  {
    role: "Technology Developer Intern",
    org: "Barclays",
    date: "Summer 2026",
    line: "Shipped C# features with GitLab CI/CD and Power BI, and demoed the work to stakeholders.",
    icon: barclays,
    kind: "work",
  },
  {
    role: "Vice Sister (Vice President)",
    org: "Dundee University Islamic Society",
    date: "2026 – now",
    line: "Help run the society: governance, events and committee decisions.",
    icon: duis,
    kind: "leadership",
  },
  {
    role: "Welfare Officer",
    org: "Dundee University Computing Society",
    date: "2025 – now",
    line: "Wellbeing, socials and mentoring for 150+ members.",
    icon: ducs,
    kind: "leadership",
  },
  {
    role: "Promotion Lead",
    org: "Angus & Dundee District Volleyball",
    date: "2025 – now",
    line: "Social media, match-day content and highlight reels.",
    icon: addva,
    kind: "leadership",
  },
  {
    role: "Research Project Assistant",
    org: "University of St Andrews",
    date: "2023",
    line: "Literature reviews, qualitative data coding and report prep.",
    icon: standrews,
    kind: "work",
  },
  {
    role: "Assistant Sports Coach",
    org: "University of St Andrews",
    date: "2022 – 2023",
    line: "Ran training sessions and schedules alongside the senior coaches.",
    icon: standrews,
    kind: "leadership",
  },
  {
    role: "Private Tutor",
    org: "Self-employed",
    date: "2022 – now",
    line: "One-to-one maths and science tutoring.",
    icon: null,
    kind: "work",
  },
];

export const skills = [
  {
    category: "Languages",
    color: "bg-tomato text-paper",
    items: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "Go", "C#", "SQL"],
  },
  {
    category: "Frameworks",
    color: "bg-lilac",
    items: ["React", "React Native", "Node.js", "Express", "Next.js", "ASP.NET Core"],
  },
  {
    category: "Tools",
    color: "bg-mint",
    items: ["Docker", "Git", "AWS", "MongoDB", "PostgreSQL", "Linux", "Power BI", "GitLab CI/CD"],
  },
];
