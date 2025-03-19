
export interface Startup {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  url: string;
  tags: string[];
  category: string;
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
