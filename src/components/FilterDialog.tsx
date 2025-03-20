
import { useState, useEffect } from "react";
import { FilterType } from "@/types/startup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Filter, Globe, Briefcase, Code, Users, Rocket, Calendar as CalendarIcon } from "lucide-react";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterType;
  onApplyFilters: (filters: FilterType) => void;
  techVerticals: string[];
  countries: string[];
  industries: string[];
  sectors: string[];
  investors: string[];
  roundStages: string[];
  fundingAmountRange: [number, number];
}

export const FilterDialog = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  techVerticals,
  countries,
  industries,
  sectors,
  investors,
  roundStages,
  fundingAmountRange,
}: FilterDialogProps) => {
  const [localFilters, setLocalFilters] = useState<FilterType>(filters);
  const dateRangeOptions = ["Last Month", "Last Quarter", "Last Year"];

  // Reset local filters when parent filters change or dialog opens
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterType = {
      ...localFilters,
      techVertical: null,
      country: null,
      industry: null,
      sector: null,
      investors: null,
      roundStage: null,
      roundDate: null,
      fundingAmountRange: null,
    };
    setLocalFilters(resetFilters);
  };

  const handleMultipleSelectChange = (type: keyof FilterType, value: string, checked: boolean) => {
    setLocalFilters(prev => {
      const currentValues = prev[type] as string[] || [];
      if (checked) {
        return {
          ...prev,
          [type]: [...currentValues, value]
        };
      } else {
        return {
          ...prev,
          [type]: currentValues.filter(v => v !== value)
        };
      }
    });
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Advanced Filters
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Funding Amount Range */}
          <div className="space-y-4 col-span-full">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              <Label>Funding Amount</Label>
            </div>
            <div className="px-2">
              <Slider
                value={localFilters.fundingAmountRange || fundingAmountRange}
                min={fundingAmountRange[0]}
                max={fundingAmountRange[1]}
                step={(fundingAmountRange[1] - fundingAmountRange[0]) / 100}
                onValueChange={(value) => {
                  setLocalFilters({
                    ...localFilters,
                    fundingAmountRange: value as [number, number],
                  });
                }}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{formatCurrency(localFilters.fundingAmountRange?.[0] || fundingAmountRange[0])}</span>
                <span>{formatCurrency(localFilters.fundingAmountRange?.[1] || fundingAmountRange[1])}</span>
              </div>
            </div>
          </div>

          {/* Country */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              <Label>Countries</Label>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {countries.map(country => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={`country-${country}`}
                    checked={(localFilters.country || []).includes(country)}
                    onCheckedChange={(checked) => 
                      handleMultipleSelectChange("country", country, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`country-${country}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {country}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Industry */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              <Label>Industries</Label>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {industries.map(industry => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={(localFilters.industry || []).includes(industry)}
                    onCheckedChange={(checked) => 
                      handleMultipleSelectChange("industry", industry, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`industry-${industry}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {industry}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sector */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              <Label>Sectors</Label>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {sectors.map(sector => (
                <div key={sector} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sector-${sector}`}
                    checked={(localFilters.sector || []).includes(sector)}
                    onCheckedChange={(checked) => 
                      handleMultipleSelectChange("sector", sector, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`sector-${sector}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {sector}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Vertical */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Code className="w-4 h-4 mr-2" />
              <Label>Tech Verticals</Label>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {techVerticals.map(vertical => (
                <div key={vertical} className="flex items-center space-x-2">
                  <Checkbox
                    id={`vertical-${vertical}`}
                    checked={(localFilters.techVertical || []).includes(vertical)}
                    onCheckedChange={(checked) => 
                      handleMultipleSelectChange("techVertical", vertical, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`vertical-${vertical}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {vertical}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Investors */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <Label>Investors</Label>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {investors.map(investor => (
                <div key={investor} className="flex items-center space-x-2">
                  <Checkbox
                    id={`investor-${investor}`}
                    checked={(localFilters.investors || []).includes(investor)}
                    onCheckedChange={(checked) => 
                      handleMultipleSelectChange("investors", investor, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`investor-${investor}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {investor}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Round Stage */}
          <div className="space-y-4 col-span-full">
            <div className="flex items-center">
              <Rocket className="w-4 h-4 mr-2" />
              <Label>Round Stage</Label>
            </div>
            <div className="flex flex-wrap gap-2">
              {roundStages.map(stage => (
                <Badge
                  key={stage}
                  variant={(localFilters.roundStage || []).includes(stage) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const isSelected = (localFilters.roundStage || []).includes(stage);
                    handleMultipleSelectChange("roundStage", stage, !isSelected);
                  }}
                >
                  {stage}
                </Badge>
              ))}
            </div>
          </div>

          {/* Round Date */}
          <div className="space-y-4 col-span-full">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <Label>Round Date</Label>
            </div>
            <div className="flex flex-wrap gap-2">
              {dateRangeOptions.map(option => (
                <Badge
                  key={option}
                  variant={(localFilters.roundDate || []).includes(option) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const isSelected = (localFilters.roundDate || []).includes(option);
                    handleMultipleSelectChange("roundDate", option, !isSelected);
                  }}
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
          <Button onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
