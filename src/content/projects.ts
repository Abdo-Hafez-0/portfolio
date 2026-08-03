export type Project = {
  name: string;
  role?: string;
  description: string;
  problemsSolved: string[];
  technologies: string[];
  link: string;
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
    link: "https://github.com/Abdulrahman-A0/TribeUp",
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
    link: "https://github.com/Abdo-Hafez-0/Honey-E-Commerce",
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
    link: "https://github.com/Abdo-Hafez-0/ELearning-Platform",
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
    link: "https://github.com/Abdo-Hafez-0/gamegear-store",
  },
] as const;

export const universityProjects: Project[] = [
  {
    name: "Amazon Reviews Big Data Analytics System",
    description:
      "A MongoDB-based big data analytics system built on the Amazon Reviews dataset containing millions of review records. Performed data analysis and sentiment-oriented exploration on sampled datasets to improve performance and testing efficiency.",
    problemsSolved: [
      "Processed millions of review records with MongoDB.",
      "Performed data analysis and sentiment-oriented exploration.",
      "Sampled large datasets to improve performance and testing efficiency.",
    ],
    technologies: ["MongoDB", "Big Data", "Data Analysis"],
    link: "https://github.com/Abdo-Hafez-0/ecommerce-recommendation-bigdata",
  },
  {
    name: "Distributed Database System in Go",
    description:
      "A distributed database system built with Go using a master-slave architecture and HTTP-based node communication. Implements data replication, distributed CRUD operations, and dynamic database/table management across multiple nodes.",
    problemsSolved: [
      "Implemented data replication across distributed nodes.",
      "Built distributed CRUD operations and dynamic database/table management.",
      "Designed basic fault-tolerance mechanisms.",
      "Integrated MySQL databases for each distributed node.",
    ],
    technologies: ["Go", "HTTP", "MySQL", "Distributed Systems"],
    link: "https://github.com/Abdo-Hafez-0/distributed-database-go",
  },
  {
    name: "Graph-Based Toxic Community Detection and Toxicity Propagation Analysis on Reddit Networks",
    description:
      "A graph analytics project focused on detecting toxic communities and analyzing toxicity propagation across Reddit networks using graph-based and machine learning techniques.",
    problemsSolved: [
      "Detected toxic communities in Reddit networks.",
      "Analyzed toxicity propagation patterns.",
      "Applied graph analytics and machine learning techniques.",
    ],
    technologies: ["Python", "Graph Analytics", "Machine Learning", "GNNs"],
    link: "https://github.com/Abdo-Hafez-0/reddit-toxic-network-analysis",
  },
] as const;