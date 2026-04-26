import {
  mobile, backend, creator, web,
  figma, git, javascript,
  premiere, photoshop, aftereffects,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

export const services = [
  { title: "Graphic Designer", icon: web },
  { title: "Video Editor", icon: mobile },
  { title: "React Developer", icon: backend },
  { title: "3D Artist", icon: creator },
];

export const experiences = [
  {
    title: "Freelance Graphic Designer",
    company_name: "Self Employed",
    icon: creator,
    iconBg: "#383E56",
    date: "2021 - Present",
    points: [
      "Designing brand identities, logos, and visual content for startups and artists.",
      "Worked with 4+ startups to build their brand from scratch.",
      "Created thumbnails, banners and social media content for YouTubers and music artists.",
      "Delivering high quality designs tailored to each client's vision.",
    ],
  },
  {
    title: "Video Editor",
    company_name: "Freelance",
    icon: mobile,
    iconBg: "#E6DEDD",
    date: "2021 - Present",
    points: [
      "Editing videos for music artists and YouTube content creators.",
      "Creating engaging reels, shorts and long form video content.",
      "Color grading, motion graphics and sound design.",
      "Collaborating with clients to deliver videos that match their brand.",
    ],
  },
  {
    title: "React Developer",
    company_name: "Freelance",
    icon: web,
    iconBg: "#383E56",
    date: "2022 - Present",
    points: [
      "Building modern responsive web applications using React.js.",
      "Developing websites for startups and small businesses.",
      "Integrating 3D visuals and animations using Three.js.",
      "Working closely with clients to deliver user friendly interfaces.",
    ],
  },
];

export const technologies = [
  { name: "JavaScript", icon: javascript },
  { name: "Adobe Photoshop", icon: photoshop },
  { name: "Adobe Premiere Pro", icon: premiere },
  { name: "Adobe After Effects", icon: aftereffects },
  { name: "Figma", icon: figma },
  { name: "Git", icon: git },
];
export const projects = [
  {
    name: "Portfolio Website",
    description: "A 3D interactive portfolio website built with React and Three.js showcasing my work as a graphic designer and video editor.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "threejs", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: creator,
    source_code_link: "https://github.com/",
  },
  {
    name: "Brand Design",
    description: "Complete brand identity design for a startup including logo, color palette, typography and social media assets.",
    tags: [
      { name: "photoshop", color: "blue-text-gradient" },
      { name: "illustrator", color: "green-text-gradient" },
      { name: "branding", color: "pink-text-gradient" },
    ],
    image: mobile,
    source_code_link: "https://github.com/",
  },
  {
    name: "Music Video Edit",
    description: "Professional music video editing with color grading, motion graphics and visual effects for a music artist.",
    tags: [
      { name: "premiere", color: "blue-text-gradient" },
      { name: "aftereffects", color: "green-text-gradient" },
      { name: "colorgrading", color: "pink-text-gradient" },
    ],
    image: backend,
    source_code_link: "https://github.com/",
  },
];
export const testimonials = [
  {
    testimonial: "Souvik designed our brand identity and it was exactly what we envisioned. Super talented!",
    name: "Rahul Sharma",
    designation: "CEO",
    company: "TechStartup",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    testimonial: "The video editing work was outstanding. Our music video got amazing response after his edit.",
    name: "DJ Aryan",
    designation: "Music Artist",
    company: "Independent",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    testimonial: "Built our website from scratch. Clean, fast and exactly what we needed. Highly recommend!",
    name: "Priya Mehta",
    designation: "Founder",
    company: "CreativeAgency",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];