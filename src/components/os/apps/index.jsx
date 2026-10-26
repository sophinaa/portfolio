import AboutApp from "./AboutApp";
import ProjectsApp from "./ProjectsApp";
import ExperienceApp from "./ExperienceApp";
import SkillsApp from "./SkillsApp";
import ContactApp from "./ContactApp";
import TerminalApp from "./TerminalApp";
import RecycleBinApp from "./RecycleBinApp";
import LockerApp from "./LockerApp";
import { PixelIcon } from "../icons";
import { sophinaPixel } from "../../../assets";

const MeIcon = ({ className = "" }) => (
  <img src={sophinaPixel} alt='' className={`border-2 border-ink object-cover [image-rendering:pixelated] ${className}`} />
);

// Everything that can open in a window. `label` is the desktop icon's file name.
export const apps = {
  about: {
    title: "About me",
    label: "me.jpg",
    desktopIcon: <MeIcon className='h-11 w-11' />,
    icon: <MeIcon className='h-4 w-4 border' />,
    width: 780,
    height: 640,
    Component: AboutApp,
  },
  projects: {
    title: "Projects",
    label: "Projects",
    desktopIcon: <PixelIcon name='folder' className='h-11 w-12' />,
    icon: <PixelIcon name='folder' className='h-4 w-4' />,
    width: 960,
    height: 660,
    Component: ProjectsApp,
  },
  experience: {
    title: "Experience",
    label: "Experience",
    desktopIcon: <PixelIcon name='briefcase' className='h-11 w-12' />,
    icon: <PixelIcon name='briefcase' className='h-4 w-4' />,
    width: 700,
    height: 620,
    Component: ExperienceApp,
  },
  skills: {
    title: "skills.zip",
    label: "skills.zip",
    desktopIcon: <PixelIcon name='toolbox' className='h-11 w-12' />,
    icon: <PixelIcon name='toolbox' className='h-4 w-4' />,
    width: 680,
    height: 480,
    Component: SkillsApp,
  },
  contact: {
    title: "New message",
    label: "Contact",
    desktopIcon: <PixelIcon name='mail' className='h-11 w-12' />,
    icon: <PixelIcon name='mail' className='h-4 w-4' />,
    width: 560,
    height: 480,
    Component: ContactApp,
  },
  locker: {
    title: "locker.exe",
    label: "locker.exe",
    desktopIcon: <PixelIcon name='locker' className='h-11 w-12' />,
    icon: <PixelIcon name='locker' className='h-4 w-4' />,
    width: 640,
    height: 720,
    Component: LockerApp,
  },
  terminal: {
    title: "Terminal",
    label: "Terminal",
    desktopIcon: <PixelIcon name='terminal' className='h-11 w-12' />,
    icon: <PixelIcon name='terminal' className='h-4 w-4' />,
    width: 620,
    height: 400,
    Component: TerminalApp,
  },
  bin: {
    title: "Recycle Bin",
    label: "Recycle Bin",
    desktopIcon: <PixelIcon name='bin' className='h-11 w-12' />,
    icon: <PixelIcon name='bin' className='h-4 w-4' />,
    width: 480,
    height: 360,
    Component: RecycleBinApp,
  },
};

export const desktopOrder = ["about", "projects", "experience", "skills", "contact", "locker", "terminal", "bin"];
