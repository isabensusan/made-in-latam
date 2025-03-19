
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

// Get all startup names
export const getStartupNames = (): string[] => {
  return cachedStartups.map(startup => startup.name);
};

// Get all startup descriptions
export const getStartupDescriptions = (): string[] => {
  return cachedStartups.map(startup => startup.description);
};

// Get all startup image URLs
export const getStartupImageUrls = (): string[] => {
  return cachedStartups.map(startup => startup.imageUrl);
};

// Get all startup website URLs
export const getStartupUrls = (): string[] => {
  return cachedStartups.map(startup => startup.url);
};

// Get all dates added
export const getStartupDates = (): string[] => {
  return cachedStartups.map(startup => startup.dateAdded);
};

// Get all unique tech verticals
export const getTechVerticals = (): string[] => {
  const verticals = cachedStartups.map(startup => startup.techVertical).filter(Boolean);
  return [...new Set(verticals)];
};

// Get all unique funding rounds
export const getFundingRounds = (): string[] => {
  const rounds = cachedStartups.map(startup => startup.roundStage).filter(Boolean);
  return [...new Set(rounds)];
};

// Get all unique OG descriptions
export const getOgDescriptions = (): string[] => {
  const descriptions = cachedStartups.map(startup => startup.ogDescription).filter(Boolean);
  return [...new Set(descriptions)];
};

// Get all unique OG images
export const getOgImages = (): string[] => {
  const images = cachedStartups.map(startup => startup.ogImage).filter(Boolean);
  return [...new Set(images)];
};

// Get all company names
export const getCompanyNames = (): string[] => {
  const names = cachedStartups.map(startup => startup.companyName).filter(Boolean);
  return [...new Set(names)];
};

// Get all websites
export const getWebsites = (): string[] => {
  const websites = cachedStartups.map(startup => startup.website).filter(Boolean);
  return [...new Set(websites)];
};

// Get all funding amounts
export const getFundingAmounts = (): string[] => {
  const amounts = cachedStartups.map(startup => startup.fundingAmount).filter(Boolean);
  return [...new Set(amounts)];
};

// Get all countries
export const getCountries = (): string[] => {
  const countries = cachedStartups.map(startup => startup.country).filter(Boolean);
  return [...new Set(countries)];
};

// Get all industries
export const getIndustries = (): string[] => {
  const industries = cachedStartups.map(startup => startup.industry).filter(Boolean);
  return [...new Set(industries)];
};

// Get all sectors
export const getSectors = (): string[] => {
  const sectors = cachedStartups.map(startup => startup.sector).filter(Boolean);
  return [...new Set(sectors)];
};

// Get all investors
export const getInvestors = (): string[] => {
  const investors = cachedStartups.map(startup => startup.investors).filter(Boolean);
  return [...new Set(investors)];
};

// Get all round sizes
export const getRoundSizes = (): string[] => {
  const sizes = cachedStartups.map(startup => startup.roundSize).filter(Boolean);
  return [...new Set(sizes)];
};

// Get all round size ranges
export const getRoundSizeRanges = (): string[] => {
  const ranges = cachedStartups.map(startup => startup.roundSizeRange).filter(Boolean);
  return [...new Set(ranges)];
};

// Get all round dates
export const getRoundDates = (): string[] => {
  const dates = cachedStartups.map(startup => startup.roundDate).filter(Boolean);
  return [...new Set(dates)];
};

// Get all round months
export const getRoundMonths = (): string[] => {
  const months = cachedStartups.map(startup => startup.roundMonth).filter(Boolean);
  return [...new Set(months)];
};

// Get all round years
export const getRoundYears = (): string[] => {
  const years = cachedStartups.map(startup => startup.roundYear).filter(Boolean);
  return [...new Set(years)];
};

// Get all foundation years
export const getFoundationYears = (): string[] => {
  const years = cachedStartups.map(startup => startup.foundationYear).filter(Boolean);
  return [...new Set(years)];
};

// Get all OG titles
export const getOgTitles = (): string[] => {
  const titles = cachedStartups.map(startup => startup.ogTitle).filter(Boolean);
  return [...new Set(titles)];
};

// Filter startups based on criteria
export const filterStartups = (
  startups: Startup[],
  { verticals, tag, search }: FilterType
): Startup[] => {
  return startups.filter(startup => {
    const matchesVerticals = !verticals || startup.verticals === verticals;
    const matchesTag = !tag || startup.tags.includes(tag);
    const matchesSearch = !search || 
      startup.name.toLowerCase().includes(search.toLowerCase()) || 
      startup.description.toLowerCase().includes(search.toLowerCase());
    
    return matchesCategory && matchesTag && matchesSearch;
  });
};
