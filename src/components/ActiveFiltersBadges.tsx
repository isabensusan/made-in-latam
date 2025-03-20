
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FilterType } from "@/types/startup";

interface ActiveFiltersBadgesProps {
  filters: FilterType;
  onRemoveFilter: (type: keyof FilterType, value?: string) => void;
}

export const ActiveFiltersBadges = ({ filters, onRemoveFilter }: ActiveFiltersBadgesProps) => {
  // Format currency values for display
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  // Check if there are any active filters
  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'search') return false; // Exclude search from badges
    return value !== null && (Array.isArray(value) ? value.length > 0 : true);
  });

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Country Filters */}
      {filters.country?.map((country) => (
        <Badge key={`country-${country}`} variant="secondary" className="px-3 py-1">
          <span className="mr-1">Country: {country}</span>
          <X
            className="w-3 h-3 ml-1 cursor-pointer"
            onClick={() => onRemoveFilter("country", country)}
          />
        </Badge>
      ))}

      {/* Industry Filters */}
      {filters.industry?.map((industry) => (
        <Badge key={`industry-${industry}`} variant="secondary" className="px-3 py-1">
          <span className="mr-1">Industry: {industry}</span>
          <X
            className="w-3 h-3 ml-1 cursor-pointer"
            onClick={() => onRemoveFilter("industry", industry)}
          />
        </Badge>
      ))}

      {/* Sector Filters */}
      {filters.sector?.map((sector) => (
        <Badge key={`sector-${sector}`} variant="secondary" className="px-3 py-1">
          <span className="mr-1">Sector: {sector}</span>
          <X
            className="w-3 h-3 ml-1 cursor-pointer"
            onClick={() => onRemoveFilter("sector", sector)}
          />
        </Badge>
      ))}

      {/* Tech Vertical Filters */}
      {filters.techVertical?.map((vertical) => (
        <Badge key={`vertical-${vertical}`} variant="secondary" className="px-3 py-1">
          <span className="mr-1">Tech Vertical: {vertical}</span>
          <X
            className="w-3 h-3 ml-1 cursor-pointer"
            onClick={() => onRemoveFilter("techVertical", vertical)}
          />
        </Badge>
      ))}

      {/* Investors Filters */}
      {filters.investors?.map((investor) => (
        <Badge key={`investor-${investor}`} variant="secondary" className="px-3 py-1">
          <span className="mr-1">Investor: {investor}</span>
          <X
            className="w-3 h-3 ml-1 cursor-pointer"
            onClick={() => onRemoveFilter("investors", investor)}
          />
        </Badge>
      ))}

      {/* Round Stage Filters */}
      {filters.roundStage?.map((stage) => (
        <Badge key={`stage-${stage}`} variant="secondary" className="px-3 py-1">
          <span className="mr-1">Round: {stage}</span>
          <X
            className="w-3 h-3 ml-1 cursor-pointer"
            onClick={() => onRemoveFilter("roundStage", stage)}
          />
        </Badge>
      ))}

      {/* Round Date Filters */}
      {filters.roundDate?.map((date) => (
        <Badge key={`date-${date}`} variant="secondary" className="px-3 py-1">
          <span className="mr-1">Funding: {date}</span>
          <X
            className="w-3 h-3 ml-1 cursor-pointer"
            onClick={() => onRemoveFilter("roundDate", date)}
          />
        </Badge>
      ))}

      {/* Funding Amount Range Filter */}
      {filters.fundingAmountRange && (
        <Badge variant="secondary" className="px-3 py-1">
          <span className="mr-1">
            Funding: {formatCurrency(filters.fundingAmountRange[0])} - {formatCurrency(filters.fundingAmountRange[1])}
          </span>
          <X
            className="w-3 h-3 ml-1 cursor-pointer"
            onClick={() => onRemoveFilter("fundingAmountRange")}
          />
        </Badge>
      )}

      {/* Clear All Button */}
      {hasActiveFilters && (
        <Badge variant="outline" className="px-3 py-1 cursor-pointer border-dashed" onClick={() => {
          Object.keys(filters).forEach(key => {
            if (key !== 'search') {
              onRemoveFilter(key as keyof FilterType);
            }
          });
        }}>
          Clear All Filters
        </Badge>
      )}
    </div>
  );
};
