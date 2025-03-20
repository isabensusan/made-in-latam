
import { Startup, FilterType } from "@/types/startup";
import { fetchStartupsFromSheet } from "@/utils/googleSheetParser";
import { format, sub } from "date-fns";

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

// Get all tech verticals
export const getTechVerticals = (): string[] => {
  const verticals = cachedStartups.map(startup => startup.techVertical).filter(Boolean);
  return [...new Set(verticals)];
};

// Get all investors
export const getInvestors = (): string[] => {
  // Flatten the array of string arrays, then filter out empty values, then get unique values
  const investors = cachedStartups
    .flatMap(startup => startup.investors || [])
    .filter(Boolean);
  return [...new Set(investors)];
};

// Get all round stages
export const getRoundStages = (): string[] => {
  const stages = cachedStartups.map(startup => startup.roundStage).filter(Boolean);
  return [...new Set(stages)];
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

// Get all OG descriptions
export const getOgDescriptions = (): string[] => {
  const descriptions = cachedStartups.map(startup => startup.ogDescription).filter(Boolean);
  return [...new Set(descriptions)];
};

// Get all OG images
export const getOgImages = (): string[] => {
  const images = cachedStartups.map(startup => startup.ogImage).filter(Boolean);
  return [...new Set(images)];
};

// Get funding amount min and max values
export const getFundingAmountRange = (): [number, number] => {
  const amounts = cachedStartups
    .map(startup => {
      if (!startup.fundingAmount) return 0;
      // Remove any non-numeric characters except decimal point
      const cleanedAmount = startup.fundingAmount.replace(/[^0-9.]/g, '');
      return parseFloat(cleanedAmount) || 0;
    })
    .filter(amount => !isNaN(amount) && isFinite(amount));
  
  return [
    Math.min(...amounts, 0),
    Math.max(...amounts, 1000000) // Default max of 1M if no valid amounts
  ];
};

// Filter startups based on criteria
export const filterStartups = (
  startups: Startup[],
  filters: FilterType
): Startup[] => {
  const {
    techVertical,
    country,
    industry,
    sector,
    investors,
    roundStage,
    roundDate,
    fundingAmountRange,
    search
  } = filters;

  return startups.filter(startup => {
    // Search filter (name or description)
    const matchesSearch = !search || 
      startup.name.toLowerCase().includes(search.toLowerCase()) || 
      (startup.ogDescription && startup.ogDescription.toLowerCase().includes(search.toLowerCase()));
    
    // Tech Vertical filter
    const matchesVerticals = !techVertical?.length || 
      (startup.techVertical && techVertical.includes(startup.techVertical));
    
    // Country filter
    const matchesCountry = !country?.length || 
      (startup.country && country.includes(startup.country));
    
    // Industry filter
    const matchesIndustry = !industry?.length || 
      (startup.industry && industry.includes(startup.industry));
    
    // Sector filter
    const matchesSector = !sector?.length || 
      (startup.sector && sector.includes(startup.sector));
    
    // Investors filter
    const matchesInvestors = !investors?.length || 
      (startup.investors && startup.investors.some(investor => investors.includes(investor)));
    
    // Round Stage filter
    const matchesRoundStage = !roundStage?.length || 
      (startup.roundStage && roundStage.includes(startup.roundStage));
    
    // Funding Amount Range filter
    let matchesFundingAmount = true;
    if (fundingAmountRange && startup.fundingAmount) {
      const cleanedAmount = startup.fundingAmount.replace(/[^0-9.]/g, '');
      const amount = parseFloat(cleanedAmount);
      if (!isNaN(amount) && isFinite(amount)) {
        matchesFundingAmount = 
          amount >= fundingAmountRange[0] && 
          amount <= fundingAmountRange[1];
      }
    }
    
    // Round Date filter (last month, last quarter, last year)
    let matchesRoundDate = true;
    if (roundDate?.length && startup.roundDate) {
      try {
        const startupDate = new Date(startup.roundDate);
        const today = new Date();
        
        const lastMonth = sub(today, { months: 1 });
        const lastQuarter = sub(today, { months: 3 });
        const lastYear = sub(today, { years: 1 });
        
        matchesRoundDate = roundDate.some(period => {
          if (period === "Last Month" && startupDate >= lastMonth) {
            return true;
          }
          if (period === "Last Quarter" && startupDate >= lastQuarter) {
            return true;
          }
          if (period === "Last Year" && startupDate >= lastYear) {
            return true;
          }
          return false;
        });
      } catch (error) {
        // If date parsing fails, don't filter this startup out
        matchesRoundDate = true;
      }
    }
    
    return matchesSearch &&
           matchesVerticals &&
           matchesCountry &&
           matchesIndustry &&
           matchesSector &&
           matchesInvestors &&
           matchesRoundStage &&
           matchesFundingAmount &&
           matchesRoundDate;
  });
};
