
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}: CategoryFilterProps) => {
  // Filter to only show Vulgar categories
  const vulgarCategories = categories.filter(cat => 
    ['t-shirts', 'hoodies', 'accessories'].includes(cat.toLowerCase())
  );

  return (
    <div>
      <h3 className="font-medium mb-3">Categories</h3>
      <div className="space-y-2">
        <button
          className={`text-sm w-full text-left py-2 px-3 rounded ${
            !selectedCategory 
              ? "bg-emerald-600 text-white" 
              : "text-foreground hover:bg-emerald-50 hover:text-emerald-600"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All Products
        </button>
        {vulgarCategories.map((cat, index) => (
          <button
            key={index}
            className={`text-sm w-full text-left py-2 px-3 rounded ${
              selectedCategory === cat 
                ? "bg-emerald-600 text-white" 
                : "text-foreground hover:bg-emerald-50 hover:text-emerald-600"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
