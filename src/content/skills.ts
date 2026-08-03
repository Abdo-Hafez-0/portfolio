export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    skills: [
      "C#",
      "ASP.NET Core",
      "ASP.NET MVC",
      "REST APIs",
      "Entity Framework Core",
      "Entity Framework",
      "SQL Server",
      "MySQL",
      "LINQ",
      "Authentication & Authorization (JWT, Identity)",
      "SignalR",
      "Clean Architecture",
      "Repository Pattern",
      "Dependency Injection",
    ],
  },
  {
    title: "Database",
    skills: [
      "SQL Server",
      "MySQL",
      "Database Design",
      "Query Optimization",
      "Stored Procedures",
      "Views",
      "Indexes",
      "Transactions",
    ],
  },
  {
    title: "Languages",
    skills: ["C#", "SQL", "JavaScript", "C++", "Java"],
  },
  {
    title: "Frontend",
    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Razor Views",
      "Tailwind CSS (learning)",
    ],
  },
  {
    title: "Tools",
    skills: [
      "Git & GitHub",
      "Visual Studio",
      "Visual Studio Code",
      "Postman",
      "Swagger / OpenAPI",
      "Docker (learning)",
    ],
  },
  {
    title: "Software Engineering",
    skills: [
      "Object-Oriented Programming (OOP)",
      "SOLID Principles",
      "Clean Code",
      "Design Patterns",
      "API Design",
      "Agile Team Collaboration",
      "AI-assisted Development Workflows",
    ],
  },
] as const;