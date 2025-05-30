
import { X } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

interface FiltersPanelProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  showFilters: boolean;
  toggleFilters: () => void;
}

const FiltersPanel = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  showFilters,
  toggleFilters
}: FiltersPanelProps) => {
  if (!showFilters) return null;
  
  return (
    <div className="lg:col-span-1 space-y-6 p-4 border rounded-md">
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      <PriceFilter 
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
    </div>
  );
};

export default FiltersPanel;
