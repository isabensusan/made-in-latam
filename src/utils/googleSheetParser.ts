
/**
 * Utility to fetch and parse data from a published Google Sheet
 */

import { Startup, StartupCategory } from "@/types/startup";

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTM_SokHVT-LPgKn7bVoMTVub9HLfNJpxTmH_PhUUhA9T_EVRNPQ6a0fPYxOb-aiZ-mDgiYvuhoDOni/pub?output=csv";

/**
 * Fetches and parses the Google Sheet data
 */
export const fetchStartupsFromSheet = async (): Promise<Startup[]> => {
  try {
    const response = await fetch(GOOGLE_SHEET_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`);
    }
    
    // Get the CSV data
    const csv = await response.text();
    
    // Parse the CSV data
    const rows = csv.split('\n');
    const headers = rows[0].split(',');
    
    const startups: Startup[] = [];
    
    // Start from index 1 to skip headers
    for (let i = 1; i < rows.length; i++) {
      if (!rows[i].trim()) continue; // Skip empty rows
      
      const values = parseCSVRow(rows[i]);
      if (values.length < headers.length) continue; // Skip invalid rows

      // Map values to respective fields
      // We're maintaining backward compatibility while adding new fields
      const startup: Startup = {
        id: values[0]?.trim() || "",
        name: values[1]?.trim() || "",
        website: values[2]?.trim() || "",
        fundingAmount: values[3]?.trim() || "",
        country: values[5]?.trim() || "",
        industry: values[6]?.trim() || "",
        sector: values[7]?.trim() || "",
        techVertical: values[8]?.trim() || "",
        investors: values[9]?.split(',').map(tag => tag.trim()) || [],
        roundStage: values[10]?.trim() || "",
        roundSize: values[11]?.trim() || undefined, 
        roundSizeRange: values[12]?.trim() || undefined, 
        roundDate: values[13]?.trim() || undefined,
        roundMonth: values[14]?.trim() || undefined,
        roundYear: values[15]?.trim() || undefined,
        foundationYear: values[16]?.trim() || undefined,
        ogTitle: values[17]?.trim() || undefined,
        ogDescription: values[18]?.trim() || undefined,
        ogImage: values[19]?.trim() || undefined,
      };
      
      startups.push(startup);
    }
    
    return startups;
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    return [];
  }
};

/**
 * Parses a CSV row respecting quotes and commas
 */
const parseCSVRow = (row: string): string[] => {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  
  result.push(current); // Add the last value
  return result;
};

/**
 * Validates if the category is a valid StartupCategory
 */
const validateCategory = (category: string): StartupCategory => {
  const validCategories: StartupCategory[] = [
    "SaaS", "AI", "Fintech", "E-commerce", "Health", "Education", "Productivity", "Other"
  ];
  
  return validCategories.includes(category as StartupCategory) 
    ? (category as StartupCategory) 
    : "Other";
};
