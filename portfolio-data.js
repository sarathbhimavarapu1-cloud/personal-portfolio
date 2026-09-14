// ============================================================
// PORTFOLIO DATA CONFIGURATION
// Edit this file to customize your portfolio content.
// ============================================================

const PORTFOLIO_DATA = {

  // ── Profile ───────────────────────────────────────────────
  profile: {
    name: "Bhimavarapu Sarath",
    title: "Java Backend Developer",
    tagline: "I build robust backend systems with Spring Boot, REST APIs, and clean architecture principles.",
    bio: `Computer Science Engineering undergraduate (2027) with hands-on experience in Java backend development using Spring Boot, Hibernate (JPA), REST APIs, and MySQL. Strong foundation in Object-Oriented Programming, Data Structures & Algorithms, and problem solving. Passionate about writing clean, maintainable code and building scalable backend systems.`,
    resumeLink: "assets/resume.pdf",
    location: "India",
    timezone: "Asia/Kolkata",
    timezoneLabel: "IST (UTC+5:30)",
  },

  // ── Working Status ────────────────────────────────────────
  workingStatus: {
    currentMode: "available", // "available" | "busy" | "limited"
    modes: {
      available: {
        label: "Available",
        emoji: "🟢",
        description: "Open to internships & full-time roles",
        color: "var(--color-success)",
      },
      busy: {
        label: "Busy",
        emoji: "🔴",
        description: "Currently engaged — limited availability",
        color: "var(--color-danger)",
      },
      limited: {
        label: "Limited",
        emoji: "🟡",
        description: "Taking select freelance & project work",
        color: "var(--color-warning)",
      },
    },
    currentFocus: "Java Backend Development & DSA Practice",
    responseTime: "Usually within 24 hours",
    workingHours: "10:00 AM – 7:00 PM IST",
    preferredContact: "Email",
  },

  // ── Contact ───────────────────────────────────────────────
  contact: {
    email: "sarath*********@gmail.com",
    phone: "+91 90144*****",
    discord: "sarath#dev",
    location: "India",
    formTopics: ["Internship", "Full-time Role", "Freelance Project", "Just Saying Hi 👋"],
  },

  // ── Social Links ──────────────────────────────────────────
  socials: [
    { platform: "GitHub",   url: "https://github.com/sarathbhimavarapu1-cloud",                    icon: "github" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/sarath-bhimavarapu-06aba539a/", icon: "linkedin" },
    { platform: "LeetCode", url: "https://leetcode.com/u/sarath1718/", icon: "leetcode" },
  ],

  // ── Skills ────────────────────────────────────────────────
  skills: [
    {
      category: "Programming Languages",
      icon: "💻",
      items: ["Java (Core Java, OOP)", "SQL", "JavaScript"],
    },
    {
      category: "Backend Technologies",
      icon: "⚙️",
      items: ["Spring Boot", "REST APIs", "Hibernate (JPA)", "Maven"],
    },
    {
      category: "Database",
      icon: "🗄️",
      items: ["MySQL", "SQL Queries", "JOINs", "Aggregation"],
    },
    {
      category: "CS Fundamentals & Tools",
      icon: "🧩",
      items: ["Data Structures & Algorithms", "OOP", "Exception Handling", "Collections Framework", "Problem Solving", "Git", "GitHub"],
    },
  ],

  // ── Projects ──────────────────────────────────────────────
  projects: [
    {
      id: "event-registration",
      title: "Event Registration System",
      subtitle: "Spring Boot + MySQL",
      description: "A full-featured Event Registration System with REST APIs for event creation, search, registration, and cancellation. Includes duplicate prevention and automated slot management.",
      longDescription: "Built a Spring Boot and MySQL based Event Registration System. Developed REST APIs for event creation, search, registration, and cancellation. Implemented duplicate registration prevention using email-event validation. Designed entity relationships between events and registrations using Hibernate (JPA). Automated slot availability updates during registration and cancellation operations.",
      image: null,
      tags: ["Spring Boot", "MySQL", "Hibernate (JPA)", "REST APIs", "Java"],
      category: "backend",
      metrics: null,
      liveUrl: "#",
      githubUrl: "https://github.com/sarathbhimavarapu1-cloud",
      featured: true,
    },
    {
      id: "url-shortener",
      title: "URL Shortener",
      subtitle: "Spring Boot Web Application",
      description: "A URL Shortener application with REST APIs for short URL generation and redirection. Features unique short-code generation and layered architecture.",
      longDescription: "Developed a URL Shortener application using Spring Boot and MySQL. Built REST APIs for short URL generation and URL redirection. Implemented unique short-code generation and persistent URL storage. Designed database-driven URL mapping using Hibernate (JPA). Applied layered architecture with Controller, Service, and Repository components.",
      image: null,
      tags: ["Spring Boot", "MySQL", "Hibernate (JPA)", "REST APIs", "Java"],
      category: "backend",
      metrics: null,
      liveUrl: "#",
      githubUrl: "https://github.com/sarathbhimavarapu1-cloud",
      featured: true,
    },
  ],

  // ── Project Filter Categories ─────────────────────────────
  projectCategories: [
    { key: "all",       label: "All Projects" },
    { key: "backend",   label: "Backend" },
  ],

  // ── Experience ────────────────────────────────────────────
  experience: [
    {
      type: "education",
      role: "B.Tech – Computer Science Engineering",
      org: "Mohan Babu University",
      period: "2023 – 2027 (Expected)",
      description: "Pursuing Computer Science Engineering with a CGPA of 8.52. Focused on Java backend development, DSA, and software engineering principles.",
      current: true,
    },
  ],

  // ── Achievements ──────────────────────────────────────────
  achievements: [
    "Solved 100+ DSA problems on LeetCode, strengthening problem-solving and algorithmic thinking.",
    "Practiced Java programming with focus on Object-Oriented Programming (OOP) and core programming concepts.",
  ],

  // ── Navigation ────────────────────────────────────────────
  navLinks: [
    { label: "Home",       href: "#hero" },
    { label: "About",      href: "#about" },
    { label: "Skills",     href: "#skills" },
    { label: "Projects",   href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact",    href: "#contact" },
  ],
};
