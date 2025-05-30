
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

interface PriceFilterProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const PriceFilter = ({ priceRange, setPriceRange }: PriceFilterProps) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  
  // Apply price filter only after user stops dragging
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localPriceRange !== priceRange) {
        setPriceRange(localPriceRange);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [localPriceRange, setPriceRange, priceRange]);

  return (
    <div>
      <h3 className="font-medium mb-3">Price Range</h3>
      <div className="space-y-4">
        <Slider
          defaultValue={[0, localPriceRange[1]]}
          max={200}
          step={10}
          value={[0, localPriceRange[1]]}
          onValueChange={(values) => setLocalPriceRange([0, values[1]])}
          className="py-4"
        />
        
        <div className="flex items-center justify-between">
          <span className="text-sm">$0</span>
          <span className="text-sm font-medium">Up to ${localPriceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
