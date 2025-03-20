
import { Startup } from "@/types/startup";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface StartupCardProps {
  startup: Startup;
}

export const StartupCard = ({ startup }: StartupCardProps) => {
  return (
    <Card className="overflow-hidden transition-all cursor-pointer hover:shadow-md">
      <Link to={`/startup/${startup.id}`}>
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <img
            src={startup.ogImage}
            alt={startup.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{startup.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{startup.ogDescription}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div className="flex flex-wrap gap-1">
            {startup.techVertical && (
              <Badge key={startup.techVertical} variant="outline" className="text-xs">
                {startup.techVertical}
              </Badge>
            )}
            {startup.country && (
              <Badge variant="outline" className="text-xs">
                {startup.country}
              </Badge>
            )}
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </CardFooter>
      </Link>
    </Card>
  );
};
