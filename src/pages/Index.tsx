
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { StartupGrid } from "@/components/StartupGrid";
import { StartupDetail } from "@/components/StartupDetail";
import { FilterType, Startup } from "@/types/startup";
import { getCategories, getStartups, getTags, getStartupById, filterStartups } from "@/data/startups";

const Index = () => {
  const [allStartups] = useState<Startup[]>(getStartups());
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>(allStartups);
  const [categories] = useState<string[]>(getCategories());
  const [tags] = useState<string[]>(getTags());
  const [filters, setFilters] = useState<FilterType>({
    category: null,
    tag: null,
    search: "",
  });
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    setFilteredStartups(
      filterStartups(allStartups, filters)
    );
  }, [allStartups, filters]);

  const handleFilterChange = (type: "category" | "tag", value: string | null) => {
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
        <h1 className="mb-8 text-3xl font-bold text-center">
          Discover Beautiful Startup Websites
        </h1>

        <Filters
          categories={categories}
          tags={tags}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
        />

        <StartupGrid
          startups={filteredStartups}
          onStartupClick={handleStartupClick}
        />

        <StartupDetail
          startup={selectedStartup}
          isOpen={detailOpen}
          onClose={handleCloseDetail}
        />
      </main>

      <footer className="py-8 mt-12 text-center border-t border-gray-200">
        <div className="container mx-auto">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Startups Gallery. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
