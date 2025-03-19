
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

      const startup: Startup = {
        id: String(i),
        name: values[0]?.trim() || "",
        description: values[1]?.trim() || "",
        imageUrl: values[2]?.trim() || "https://via.placeholder.com/800x600?text=No+Image",
        url: values[3]?.trim() || "#",
        tags: values[4]?.split(',').map(tag => tag.trim()) || [],
        category: validateCategory(values[5]?.trim()),
        dateAdded: values[6]?.trim() || new Date().toISOString().slice(0, 10),
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
