import {
  mobile,
  backend,
  creator,
  web,
  meta,
  starbucks,
  tesla,
  addva,
  standrews,
  carrent,
  jobit,
  tripguide,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/sophinaa",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sophinaa",
  },
];

const services = [
  {
    title: "Backend & API Engineer",
    icon: web,
  },
  {
    title: "Mobile & React Native Developer",
    icon: mobile,
  },
  {
    title: "Distributed Systems & Cloud",
    icon: backend,
  },
  {
    title: "Full Stack Developer",
    icon: creator,
  },
];

const technologies = [
  {
    category: "Languages",
    items: [
      "Python",
      "Java",
      "C",
      "C++",
      "JavaScript",
      "TypeScript",
      "Go",
      "C#",
      "SQL",
    ],
  },
  {
    category: "Frameworks",
    items: ["React", "React Native", "Node.js", "Express.js", "Next.js", "ASP.NET Core"],
  },
  {
    category: "Tools & Platforms",
    items: [
      "Docker",
      "Git",
      "GitHub",
      "AWS",
      "MongoDB",
      "PostgreSQL",
      "Unix/Linux",
      "Shell Scripting",
      "VS Code",
    ],
  },
];

const experiences = [
  {
    title: "Welfare Officer",
    company_name: "Dundee University Computing Society",
    icon: meta,
    iconBg: "#415a77",
    date: "2025 - Present",
    points: [
      "Lead community wellbeing initiatives and collaborate with staff to keep 150+ members engaged.",
      "Organise socials, study circles, and mentoring sessions to support student inclusion.",
    ],
  },
  {
    title: "Promotion Lead",
    company_name: "Angus & Dundee District Volleyball",
    icon: addva,
    iconBg: "#415a77",
    date: "2025 - Present",
    points: [
      "Manage social media calendars and match-day content to grow regional outreach.",
      "Produce website updates and highlight reels that showcase community programmes.",
    ],
  },
  {
    title: "Research Project Assistant",
    company_name: "University of St Andrews",
    icon: standrews,
    iconBg: "#415a77",
    date: "2023 - 2023",
    points: [
      "Conducted literature searches and produced concise summaries of academic articles and interviews.",
      "Coded and analysed qualitative research data, organised fieldwork logistics, and transcribed interviews.",
      "Prepared interview archives and supported report writing, editing, and publication formatting.",
    ],
  },
  {
    title: "Assistant Sports Coach",
    company_name: "University of St Andrews",
    icon: standrews,
    iconBg: "#415a77",
    date: "2022 - 2023",
    points: [
      "Supported coaching sessions for student teams with a focus on fundamentals and wellbeing.",
      "Coordinated equipment, training schedules, and feedback loops with senior coaches.",
    ],
  },
  {
    title: "Private Tutor",
    company_name: "Self-Employed",
    icon: null,
    iconBg: "#415a77",
    date: "2022 - Present",
    points: [
      "Deliver one-on-one maths and science tutoring tailored to each student's learning style.",
      "Design revision plans, diagnostics, and progress reports that improve academic confidence.",
    ],
  },
];

const education = [
  {
    program: "BSc (Hons) Computer Science",
    institution: "University of Dundee",
    period: "Sep 2023 - Present",
    details: [
      "Currently in 3rd year specializing in Data Science and AI.",
      "Welfare Officer, Dundee University Computing Society, supporting 150+ members.",
      "Leading coursework in machine learning, distributed systems, and data visualization.",
      "Winner of the 2025 Dundee University Hackathon; co-organising the 2026 event.",
    ],
  },
];

const projects = [
  {
    name: "Real-Time Analytics Dashboard",
    description:
      "Multi-service analytics platform built with C#, Go, and TypeScript. Includes an ASP.NET Core ingestion API, a Go API gateway with JWT auth and rate limiting, and Docker Compose orchestration for isolated services.",
    tags: [
      {
        name: "csharp",
        color: "blue-text-gradient",
      },
      {
        name: "go",
        color: "green-text-gradient",
      },
      {
        name: "typescript",
        color: "pink-text-gradient",
      },
      {
        name: "docker",
        color: "blue-text-gradient",
      },
    ],
    // image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "HalalWay",
    description:
      "Cross-platform mobile app built with React Native and a Node.js/TypeScript backend. Features secure authentication, map-based location search, review submission, and a scalable REST API with optimised MongoDB indexing.",
    tags: [
      {
        name: "reactnative",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
    ],
    // image: jobit,
    source_code_link: "https://github.com/sophinaa/HalalWay",
  },
  {
    name: "Telemetry & Race Pace Simulator Dashboard (2025–Present)",
    description:
      "C#/.NET 8 desktop tool that ingests realistic F1 telemetry (speed, throttle, brake, gear, delta) from CSV/JSON, renders interactive charts and lap overlays, models lap-time effects from fuel load, tyre degradation, aero trim, and ERS deployment, and provides clear UI panels for stint comparison, sector analysis, and parameter tuning with layered ingestion, simulation, and visualization components backed by tested calculations.",
    tags: [
      {
        name: "csharp",
        color: "blue-text-gradient",
      },
      {
        name: "dotnet",
        color: "green-text-gradient",
      },
      {
        name: "data-viz",
        color: "pink-text-gradient",
      },
    ],
    // image: tripguide,
    source_code_link: "https://github.com/sophinaa/AlpineTelemetryDashboard",
  },
];

export { services, technologies, experiences, education, projects };
