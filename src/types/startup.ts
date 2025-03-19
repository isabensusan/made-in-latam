
export interface Startup {
  id: string;
  name: string;
  techVertical?: string;
  roundStage?: string;
  ogDescription?: string;
  ogImage?: string;
  companyName?: string;
  website?: string;
  fundingAmount?: string;
  country?: string;
  industry?: string;
  sector?: string;
  investors?: string[];
  roundSize?: string;
  roundSizeRange?: string;
  roundDate?: string;
  roundMonth?: string;
  roundYear?: string;
  foundationYear?: string;
  ogTitle?: string;
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
  techVertical?: string | null;
  country: string | null;
  // category: string | null;
  // tag: string | null;
  search: string;
};
