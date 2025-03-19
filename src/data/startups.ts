
import { Startup, FilterType } from "@/types/startup";
import { fetchStartupsFromSheet } from "@/utils/googleSheetParser";

// Initial empty array for startups
let cachedStartups: Startup[] = [];

// Function to load startups from Google Sheet
export const loadStartups = async (): Promise<Startup[]> => {
  try {
    const sheetStartups = await fetchStartupsFromSheet();
    cachedStartups = sheetStartups;
    return sheetStartups;
  } catch (error) {
    console.error("Failed to load startups from Google Sheet:", error);
    return [];
  }
};

// Get all startups (with optional loading if not cached)
export const getStartups = async (): Promise<Startup[]> => {
  if (cachedStartups.length === 0) {
    return await loadStartups();
  }
  return cachedStartups;
};

// Get a startup by ID
export const getStartupById = (id: string): Startup | undefined => {
  return cachedStartups.find(startup => startup.id === id);
};

// Get all unique categories
export const getCategories = (): string[] => {
  const categories = cachedStartups.map(startup => startup.category);
  return [...new Set(categories)];
};

// Get all unique tags
export const getTags = (): string[] => {
  const tags = cachedStartups.flatMap(startup => startup.tags);
  return [...new Set(tags)];
};

// Filter startups based on criteria
export const filterStartups = (
  startups: Startup[],
  { category, tag, search }: FilterType
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
