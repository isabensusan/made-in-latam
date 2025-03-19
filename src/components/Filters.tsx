
import { Button } from "@/components/ui/button";
import { FilterType } from "@/types/startup";

interface FiltersProps {
  categories: string[];
  tags: string[];
  activeFilters: FilterType;
  onFilterChange: (type: "verticals" | "tag", value: string | null) => void;
}

export const Filters = ({
  categories,
  tags,
  activeFilters,
  onFilterChange,
}: FiltersProps) => {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-gray-500">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!activeFilters.verticals ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("verticals", null)}
          >
            All
          </Button>
          {categories.map((verticals) => (
            <Button
              key={verticals}
              variant={activeFilters.verticals === verticals ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("verticals", verticals)}
            >
              {verticals}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!activeFilters.tag ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("tag", null)}
          >
            All
          </Button>
          {tags.slice(0, 10).map((tag) => (
            <Button
              key={tag}
              variant={activeFilters.tag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("tag", tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
