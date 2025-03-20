
import { StartupCard } from "@/components/StartupCard";
import { Startup } from "@/types/startup";

interface StartupGridProps {
  startups: Startup[];
}

export const StartupGrid = ({ startups }: StartupGridProps) => {
  if (startups.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500">No startups found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {startups.map((startup) => (
        <StartupCard
          key={startup.id}
          startup={startup}
        />
      ))}
    </div>
  );
};
