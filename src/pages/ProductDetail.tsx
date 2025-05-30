
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getProduct, products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SimilarProducts from "@/components/product/SimilarProducts";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || "");
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Return to Products</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Link to="/products" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to products
            </Link>
          </div>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images - Desktop */}
            <div className="hidden lg:block">
              <ProductImageGallery images={product.images} productName={product.name} />
            </div>
            
            {/* Product Info */}
            <ProductInfo product={product} />
            
            {/* Product Images - Mobile (only visible on mobile) */}
            <div className="lg:hidden">
              <ProductImageGallery images={product.images} productName={product.name} />
            </div>
          </div>
          
          {/* Similar Products */}
          <SimilarProducts products={similarProducts} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
