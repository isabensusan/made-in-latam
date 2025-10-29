
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStartupById, getStartups } from "@/data/startups";
import { Startup } from "@/types/startup";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  ArrowLeft, 
  DollarSign, 
  Globe, 
  Briefcase, 
  Code, 
  Users, 
  Rocket, 
  Calendar, 
  Building, 
  BarChart 
} from "lucide-react";

const StartupDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStartup = async () => {
      setLoading(true);
      if (!id) return;

      // Make sure startups are loaded first
      await getStartups();
      const foundStartup = getStartupById(id);
      
      if (foundStartup) {
        setStartup(foundStartup);
      }
      setLoading(false);
    };

    loadStartup();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Startup not found</h1>
        <p className="text-gray-500">The startup you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        {startup.ogImage && (
          <img
            src={startup.ogImage}
            alt={startup.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-10 relative z-10">
          <Button 
            variant="ghost" 
            asChild 
            size="sm" 
            className="absolute top-8 left-4 text-white hover:bg-white/20"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Startups
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{startup.name}</h1>
          {startup.ogDescription && (
            <p className="text-xl text-gray-200 max-w-3xl">{startup.ogDescription}</p>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Startup Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {startup.fundingAmount && (
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Funding Amount</p>
                    <p className="font-medium">{startup.fundingAmount}</p>
                  </div>
                </div>
              )}

              {startup.country && (
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <Globe className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium">{startup.country}</p>
                  </div>
                </div>
              )}

              {startup.industry && (
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <Building className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-medium">{startup.industry}</p>
                  </div>
                </div>
              )}

              {startup.sector && (
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <Briefcase className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sector</p>
                    <p className="font-medium">{startup.sector}</p>
                  </div>
                </div>
              )}

              {startup.techVertical && (
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <Code className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tech Vertical</p>
                    <p className="font-medium">{startup.techVertical}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {startup.investors && startup.investors.length > 0 && (
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Investors</p>
                    <p className="font-medium">{startup.investors.join(", ")}</p>
                  </div>
                </div>
              )}

              {startup.roundStage && (
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <Rocket className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Round Stage</p>
                    <p className="font-medium">{startup.roundStage}</p>
                  </div>
                </div>
              )}

              {startup.roundSize && (
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <BarChart className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Round Size</p>
                    <p className="font-medium">{startup.roundSize}</p>
                  </div>
                </div>
              )}

              {startup.roundDate && (
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Round Date</p>
                    <p className="font-medium">{startup.roundDate}</p>
                  </div>
                </div>
              )}

              {startup.foundationYear && (
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Founded</p>
                    <p className="font-medium">{startup.foundationYear}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Website Button */}
          {startup.website && (
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg">
                <a href={startup.website} target="_blank" rel="noopener noreferrer" className="px-6">
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartupDetailPage;
