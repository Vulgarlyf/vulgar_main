
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";

interface ProductsGridProps {
  products: Product[];
  showFilters: boolean;
}

const ProductsGrid = ({ products, showFilters }: ProductsGridProps) => {
  return (
    <div className={`${showFilters ? "lg:col-span-3" : "lg:col-span-4"} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
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
      
      {products.length === 0 && (
        <div className="col-span-full py-16 text-center">
          <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
