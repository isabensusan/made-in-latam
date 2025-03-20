
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="container py-2 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <div className="flex">
                <img src={`${import.meta.env.BASE_URL}/logo-sun.png`} className="w-8"></img>
                <p>made in latam</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search startups..."
                className="pl-8 w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            {/* <Button>Submit a Startup</Button> */}
          </div>
        </div>
      </div>
    </header>
  );
};
