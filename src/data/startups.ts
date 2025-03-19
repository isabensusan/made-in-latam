
import { Startup } from "@/types/startup";

export const startups: Startup[] = [
  {
    id: "1",
    name: "Notion",
    description: "All-in-one workspace for notes, tasks, wikis, and databases.",
    imageUrl: "https://via.placeholder.com/800x600?text=Notion",
    url: "https://www.notion.so",
    tags: ["productivity", "notes", "collaboration", "workspace"],
    category: "Productivity",
    dateAdded: "2023-01-15",
  },
  {
    id: "2",
    name: "Vercel",
    description: "Platform for frontend developers, providing speed and reliability.",
    imageUrl: "https://via.placeholder.com/800x600?text=Vercel",
    url: "https://vercel.com",
    tags: ["hosting", "development", "frontend", "deployment"],
    category: "SaaS",
    dateAdded: "2023-02-10",
  },
  {
    id: "3",
    name: "Linear",
    description: "The issue tracking tool you'll enjoy using.",
    imageUrl: "https://via.placeholder.com/800x600?text=Linear",
    url: "https://linear.app",
    tags: ["project-management", "issue-tracking", "collaboration"],
    category: "Productivity",
    dateAdded: "2023-03-05",
  },
  {
    id: "4",
    name: "Stripe",
    description: "Financial infrastructure for the internet.",
    imageUrl: "https://via.placeholder.com/800x600?text=Stripe",
    url: "https://stripe.com",
    tags: ["payments", "finance", "developer-tools"],
    category: "Fintech",
    dateAdded: "2023-01-20",
  },
  {
    id: "5",
    name: "Midjourney",
    description: "AI-powered image generation platform.",
    imageUrl: "https://via.placeholder.com/800x600?text=Midjourney",
    url: "https://www.midjourney.com",
    tags: ["ai", "image-generation", "creative"],
    category: "AI",
    dateAdded: "2023-04-12",
  },
  {
    id: "6",
    name: "Superhuman",
    description: "The fastest email experience ever made.",
    imageUrl: "https://via.placeholder.com/800x600?text=Superhuman",
    url: "https://superhuman.com",
    tags: ["email", "productivity", "communication"],
    category: "Productivity",
    dateAdded: "2023-02-25",
  },
  {
    id: "7",
    name: "Shopify",
    description: "All-in-one commerce platform for online stores and retail.",
    imageUrl: "https://via.placeholder.com/800x600?text=Shopify",
    url: "https://www.shopify.com",
    tags: ["e-commerce", "business", "online-store"],
    category: "E-commerce",
    dateAdded: "2023-03-18",
  },
  {
    id: "8",
    name: "Figma",
    description: "Collaborative interface design tool.",
    imageUrl: "https://via.placeholder.com/800x600?text=Figma",
    url: "https://www.figma.com",
    tags: ["design", "collaboration", "interface"],
    category: "SaaS",
    dateAdded: "2023-01-30",
  },
  {
    id: "9",
    name: "Duolingo",
    description: "Learn languages for free.",
    imageUrl: "https://via.placeholder.com/800x600?text=Duolingo",
    url: "https://www.duolingo.com",
    tags: ["education", "language", "learning"],
    category: "Education",
    dateAdded: "2023-02-08",
  },
  {
    id: "10",
    name: "Calm",
    description: "App for meditation and sleep.",
    imageUrl: "https://via.placeholder.com/800x600?text=Calm",
    url: "https://www.calm.com",
    tags: ["health", "meditation", "wellness"],
    category: "Health",
    dateAdded: "2023-04-05",
  },
  {
    id: "11",
    name: "Airtable",
    description: "Part spreadsheet, part database, all customizable.",
    imageUrl: "https://via.placeholder.com/800x600?text=Airtable",
    url: "https://airtable.com",
    tags: ["database", "productivity", "collaboration"],
    category: "Productivity",
    dateAdded: "2023-03-14",
  },
  {
    id: "12",
    name: "Coinbase",
    description: "Secure platform for buying, selling, and storing cryptocurrency.",
    imageUrl: "https://via.placeholder.com/800x600?text=Coinbase",
    url: "https://www.coinbase.com",
    tags: ["crypto", "finance", "blockchain"],
    category: "Fintech",
    dateAdded: "2023-01-25",
  },
];

export const getStartups = (): Startup[] => {
  return startups;
};

export const getStartupById = (id: string): Startup | undefined => {
  return startups.find(startup => startup.id === id);
};

export const getCategories = (): string[] => {
  const categories = startups.map(startup => startup.category);
  return [...new Set(categories)];
};

export const getTags = (): string[] => {
  const tags = startups.flatMap(startup => startup.tags);
  return [...new Set(tags)];
};

export const filterStartups = (
  startups: Startup[],
  { category, tag, search }: { category: string | null; tag: string | null; search: string }
): Startup[] => {
  return startups.filter(startup => {
    const matchesCategory = !category || startup.category === category;
    const matchesTag = !tag || startup.tags.includes(tag);
    const matchesSearch = !search || 
      startup.name.toLowerCase().includes(search.toLowerCase()) || 
      startup.description.toLowerCase().includes(search.toLowerCase());
    
    return matchesCategory && matchesTag && matchesSearch;
  });
};
