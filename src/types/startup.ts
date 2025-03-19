
export interface Startup {
  id: string;
  name: string;
  description: string;
  ogDescription: string; // New field for og_description
  imageUrl: string;
  ogImageUrl: string; // New field for og_image
  url: string;
  tags: string[];
  category: string;
  techVertical: string; // New field for Tech Vertical
  roundStage: string; // New field for Round Stage
  dateAdded: string;
}

export type StartupCategory = 
  | "SaaS"
  | "AI"
  | "Fintech"
  | "E-commerce"
  | "Health"
  | "Education"
  | "Productivity"
  | "Other";

export type FilterType = {
  category: string | null;
  tag: string | null;
  search: string;
};
