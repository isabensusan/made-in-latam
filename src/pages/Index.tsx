
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { StartupGrid } from "@/components/StartupGrid";
import { FilterDialog } from "@/components/FilterDialog";
import { ActiveFiltersBadges } from "@/components/ActiveFiltersBadges";
import { FilterType, Startup } from "@/types/startup";
import { 
  getStartupById, 
  getStartups, 
  getTechVerticals, 
  getCountries, 
  getIndustries,
  getSectors,
  getInvestors,
  getRoundStages,
  getFundingAmountRange,
  filterStartups 
} from "@/data/startups";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const Index = () => {
  const [allStartups, setAllStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [techVertical, setTechVertical] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);
  const [industry, setIndustry] = useState<string[]>([]);
  const [sector, setSector] = useState<string[]>([]);
  const [investors, setInvestors] = useState<string[]>([]);
  const [roundStage, setRoundStage] = useState<string[]>([]);
  const [fundingAmountRange, setFundingAmountRange] = useState<[number, number]>([0, 1000000]);
  const [filters, setFilters] = useState<FilterType>({
    techVertical: null,
    country: null,
    industry: null,
    sector: null,
    investors: null,
    roundStage: null,
    roundDate: null,
    fundingAmountRange: null,
    search: "",
  });
  const [loading, setLoading] = useState(true);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  // Load startups from Google Sheet on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const loadedStartups = await getStartups();
        setAllStartups(loadedStartups);
        setFilteredStartups(loadedStartups);
        setTechVertical(getTechVerticals());
        setCountry(getCountries());
        setIndustry(getIndustries());
        setSector(getSectors());
        setInvestors(getInvestors());
        setRoundStage(getRoundStages());
        setFundingAmountRange(getFundingAmountRange());
      } catch (error) {
        console.error("Failed to load startups:", error);
        toast.error("Failed to load startups. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    setFilteredStartups(
      filterStartups(allStartups, filters)
    );
  }, [allStartups, filters]);

  const handleFilterChange = (type: "techVertical" | "country", value: string | null) => {
    if (value === null) {
      setFilters((prev) => ({
        ...prev,
        [type]: null,
      }));
    } else {
      // For country, use single-select; for techVertical, use multi-select
      if (type === "country") {
        setFilters((prev) => ({
          ...prev,
          [type]: [value],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [type]: prev[type] === null ? [value] : [...(prev[type] as string[]), value],
        }));
      }
    }
  };

  const handleSearch = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      search: query,
    }));
  };

  const handleApplyFilters = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (type: keyof FilterType, value?: string) => {
    if (!value) {
      // If no value is provided, clear the entire filter type
      setFilters(prev => ({
        ...prev,
        [type]: null
      }));
    } else {
      // If a value is provided, remove just that value from the array
      setFilters(prev => {
        const currentValues = prev[type] as string[] || [];
        return {
          ...prev,
          [type]: currentValues.filter(v => v !== value)
        };
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />

      <main className="container py-8 mx-auto">
        <h1 className="mt-16 mb-24 text-5xl font-semibold text-center">
          Discover Startups built in Latin America
        </h1>

        {loading ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <Filters
                techVertical={techVertical}
                country={country}
                activeFilters={filters}
                onFilterChange={handleFilterChange}
              />
              
              <Button
                onClick={() => setFilterDialogOpen(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                All Filters
              </Button>
            </div>

            <ActiveFiltersBadges 
              filters={filters} 
              onRemoveFilter={handleRemoveFilter} 
            />

            <StartupGrid startups={filteredStartups} />

            <FilterDialog
              isOpen={filterDialogOpen}
              onClose={() => setFilterDialogOpen(false)}
              filters={filters}
              onApplyFilters={handleApplyFilters}
              techVerticals={techVertical}
              countries={country}
              industries={industry}
              sectors={sector}
              investors={investors}
              roundStages={roundStage}
              fundingAmountRange={fundingAmountRange}
            />
          </>
        )}
      </main>

      <footer className="py-8 mt-12 text-center border-t border-gray-200">
        <div className="container mx-auto">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Built by @isabensusan . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
