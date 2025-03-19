
import { Button } from "@/components/ui/button";
import { FilterType } from "@/types/startup";

interface FiltersProps {
  techVertical: string[];
  country: string[];
  activeFilters: FilterType;
  onFilterChange: (type: "techVertical" | "country", value: string | null) => void;
}

export const Filters = ({
  techVertical,
  country,
  activeFilters,
  onFilterChange,
}: FiltersProps) => {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-gray-500">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!activeFilters.techVertical ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("techVertical", null)}
          >
            All
          </Button>
          {techVertical.map((techVertical) => (
            <Button
              key={techVertical}
              variant={activeFilters.techVertical === techVertical ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("techVertical", techVertical)}
            >
              {techVertical}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">Country</h3>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={!activeFilters.country ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("country", null)}
          >
            All
          </Button>
          {country.map((country) => (
            <Button
              key={country}
              variant={activeFilters.country === country ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("country", country)}
            >
              {country}
            </Button>
          ))}
        </div>

      </div>
    </div>
  );
};
