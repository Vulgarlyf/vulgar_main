
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";

interface SimilarProductsProps {
  products: Product[];
}

const SimilarProducts = ({ products }: SimilarProductsProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-xl md:text-2xl">You Might Also Like</h2>
        <Button variant="link" asChild>
          <Link to="/products" className="flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.images[0]}
            hoverImage={product.images[1]}
            category={product.category}
          />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
