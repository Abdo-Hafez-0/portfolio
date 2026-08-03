export type TimelineEntry = {
  period: string;
  title: string;
  subtitle?: string;
  description: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2020 — 2024",
    title: "B.Sc. Computer Science",
    subtitle: "Assiut University — Information Systems",
    description:
      "Graduated with a GPA of 3.64, building a strong foundation in software engineering, database systems, and backend development.",
  },
  {
    period: "Graduation Project",
    title: "TribeUp",
    subtitle: "Backend Developer (Team Project)",
    description:
      "Designed and implemented the posts, comments, likes, personalized feed, and leaderboard systems for a social media platform using ASP.NET Core and Clean Architecture.",
  },
  {
    period: "Academic Project",
    title: "Honey E-Commerce",
    subtitle: "ASP.NET MVC",
    description:
      "Built a complete e-commerce application with product management, shopping cart, order processing, authentication, and an admin dashboard.",
  },
  {
    period: "Academic Project",
    title: "E-Learning Platform",
    subtitle: "ASP.NET MVC",
    description:
      "Developed an educational management platform with course management, student enrollment, quizzes, and role-based authorization.",
  },
  {
    period: "Personal Project",
    title: "GameGear Store",
    subtitle: "React + Node.js",
    description:
      "Created a modern e-commerce application with a React frontend and Node.js backend, covering product catalog APIs, cart management, and order processing.",
  },
] as const;