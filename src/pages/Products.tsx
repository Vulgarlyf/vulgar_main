
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, getProductsByCategory } from "@/data/products";
import ProductsHeader from "@/components/products/ProductsHeader";
import FiltersPanel from "@/components/products/FiltersPanel";
import ProductsGrid from "@/components/products/ProductsGrid";

const Products = () => {
  const { category } = useParams<{ category?: string }>();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredProducts = selectedCategory 
    ? getProductsByCategory(selectedCategory) 
    : products.filter(product => 
        product.price >= priceRange[0] && 
        product.price <= priceRange[1]
      );

  const categories = Array.from(new Set(products.map(product => product.category)));
  
  const pageTitle = selectedCategory ? selectedCategory.toUpperCase() : "ALL PRODUCTS";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <ProductsHeader 
            title={pageTitle}
            showFilters={showFilters}
            toggleFilters={toggleFilters}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <FiltersPanel 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showFilters={showFilters}
              toggleFilters={toggleFilters}
            />
            
            <ProductsGrid 
              products={filteredProducts}
              showFilters={showFilters}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
