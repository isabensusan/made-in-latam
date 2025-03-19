
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X } from "lucide-react";
import { Startup } from "@/types/startup";

interface StartupDetailProps {
  startup: Startup | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StartupDetail = ({ startup, isOpen, onClose }: StartupDetailProps) => {
  if (!startup) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-auto sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{startup.name}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription>{startup.description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 overflow-hidden border rounded-lg">
          <img
            src={startup.imageUrl}
            alt={startup.name}
            className="object-cover w-full max-h-[500px]"
          />
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {startup.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium">Category</h3>
          <Badge>{startup.category}</Badge>
        </div>

        <DialogFooter className="mt-6">
          <Button asChild>
            <a href={startup.url} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
