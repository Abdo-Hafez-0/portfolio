export type Project = {
  name: string;
  role?: string;
  description: string;
  problemsSolved: string[];
  technologies: string[];
};

export const projects: Project[] = [
  {
    name: "TribeUp",
    role: "Backend Developer (Team Project)",
    description:
      "A social media platform built using ASP.NET Core and Onion Architecture. I was one of the backend developers on the team and was primarily responsible for designing and implementing the posts, comments, likes, personalized feed, and leaderboard systems.",
    problemsSolved: [
      "Designed scalable APIs for social interactions.",
      "Built a personalized feed system with filtering, ranking, and pagination.",
      "Implemented like and engagement logic.",
      "Designed leaderboard algorithms based on user engagement.",
      "Applied Onion Architecture principles to keep the codebase modular and maintainable.",
      "Worked with Entity Framework Core and SQL Server for efficient data access.",
    ],
    technologies: [
      "ASP.NET Core",
      "C#",
      "Entity Framework Core",
      "SQL Server",
      "Onion Architecture",
      "REST APIs",
      "JWT Authentication",
      "SignalR",
    ],
  },
  {
    name: "Honey E-Commerce",
    description:
      "A complete e-commerce web application developed using ASP.NET MVC.",
    problemsSolved: [
      "Product and category management.",
      "Shopping cart functionality.",
      "Order processing.",
      "User authentication and authorization.",
      "Database design and relationships.",
      "Admin dashboard functionality.",
    ],
    technologies: [
      "ASP.NET MVC",
      "C#",
      "Entity Framework",
      "SQL Server",
      "Razor Views",
    ],
  },
  {
    name: "E-Learning Platform",
    description:
      "An educational management platform built with ASP.NET MVC.",
    problemsSolved: [
      "Course management.",
      "Student enrollment.",
      "Quiz and assessment management.",
      "Authentication and role-based authorization.",
      "Database modeling for educational content.",
    ],
    technologies: [
      "ASP.NET MVC",
      "Entity Framework",
      "SQL Server",
      "Razor Views",
    ],
  },
  {
    name: "GameGear Store",
    description:
      "A modern e-commerce application with a React frontend and Node.js backend.",
    problemsSolved: [
      "Product catalog APIs.",
      "Shopping cart management.",
      "User authentication.",
      "Order processing.",
      "Backend integration with the frontend.",
    ],
    technologies: ["Node.js", "Express.js", "React", "JavaScript"],
  },
] as const;