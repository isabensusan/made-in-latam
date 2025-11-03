
import { Button } from "@/components/ui/button";
import { FilterType } from "@/types/startup";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex flex-wrap gap-2 w-max space-x-1">
            <Button
              variant={!activeFilters.techVertical?.length ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("techVertical", null)}
            >
              All
            </Button>
            {techVertical.map((tech) => (
              <Button
                key={tech}
                variant={activeFilters.techVertical?.includes(tech) ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange("techVertical", tech)}
              >
                {tech}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
      
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">Country</h3>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex flex-wrap gap-2 w-max space-x-1">
            <Button
              variant={!activeFilters.country?.length ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("country", null)}
            >
              All
            </Button>
            {country.map((c) => (
              <Button
                key={c}
                variant={activeFilters.country?.includes(c) ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange("country", c)}
              >
                {c}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </div>
  );
};
