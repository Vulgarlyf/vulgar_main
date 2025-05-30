
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal, X } from "lucide-react";

interface ProductsHeaderProps {
  title: string;
  showFilters: boolean;
  toggleFilters: () => void;
}

const ProductsHeader = ({ title, showFilters, toggleFilters }: ProductsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="font-display text-2xl md:text-3xl">{title}</h1>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={toggleFilters}
      >
        {showFilters ? (
          <>
            <X className="h-4 w-4" /> Close Filters
          </>
        ) : (
          <>
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </>
        )}
      </Button>
    </div>
  );
};

export default ProductsHeader;
