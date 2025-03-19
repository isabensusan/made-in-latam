
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { StartupGrid } from "@/components/StartupGrid";
import { StartupDetail } from "@/components/StartupDetail";
import { FilterType, Startup } from "@/types/startup";
import { getStartupById, getStartups, getTechVerticals, getCountries, filterStartups } from "@/data/startups";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Index = () => {
  const [allStartups, setAllStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [techVertical, setTechVertical] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterType>({
    techVertical: null,
    country: null,
    search: "",
  });
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSearch = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      search: query,
    }));
  };

  const handleStartupClick = (id: string) => {
    const startup = getStartupById(id);
    if (startup) {
      setSelectedStartup(startup);
      setDetailOpen(true);
    }
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
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
            <Filters
              techVertical={techVertical}
              country={country}
              activeFilters={filters}
              onFilterChange={handleFilterChange}
            />

            <StartupGrid
              startups={filteredStartups}
              onStartupClick={handleStartupClick}
            />
          </>
        )}

        <StartupDetail
          startup={selectedStartup}
          isOpen={detailOpen}
          onClose={handleCloseDetail}
        />
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
