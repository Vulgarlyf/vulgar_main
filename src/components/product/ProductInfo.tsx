
import { useState } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import ProductVoting from "./ProductVoting";
import ProductComments from "./ProductComments";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    if (product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
    
    // Show added animation
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? 
        `${product.name} has been removed from your favorites.` : 
        `${product.name} has been added to your favorites.`,
    });
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = `Check out ${product.name}`;
    const shareText = `I found this amazing ${product.name} for $${product.price.toFixed(2)}`;
    
    try {
      if (navigator.share) {
        // Use the Web Share API if available
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        
        toast({
          title: "Shared successfully",
        });
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(`${shareTitle}\n${shareText}\n${shareUrl}`);
        
        toast({
          title: "Link copied to clipboard",
          description: "You can now paste and share it anywhere.",
        });
      }
    } catch (error) {
      console.error("Error sharing product:", error);
      
      toast({
        title: "Couldn't share product",
        description: "Please try copying the URL manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl md:text-3xl">{product.name}</h1>
        <p className="text-xl mt-2">${product.price.toFixed(2)}</p>
      </div>
      
      <p className="text-muted-foreground">{product.description}</p>
      
      {/* Size Selection */}
      {product.sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size, index) => (
              <motion.button
                key={index}
                className={`py-2 px-4 border rounded-md text-sm ${
                  selectedSize === size 
                    ? "bg-emerald-600 text-white border-emerald-600" 
                    : "border-border hover:border-emerald-600"
                }`}
                onClick={() => setSelectedSize(size)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>
      )}
      
      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3">Color</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color, index) => (
              <motion.button
                key={index}
                className={`w-8 h-8 rounded-full relative ${
                  selectedColor === color.name ? "ring-2 ring-offset-2 ring-emerald-600" : ""
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.name)}
                aria-label={`Select ${color.name} color`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Quantity */}
      <div>
        <h3 className="text-sm font-medium mb-3">Quantity</h3>
        <div className="flex items-center w-32">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <div className="flex-grow text-center">{quantity}</div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setQuantity(q => q + 1)}
          >
            +
          </Button>
        </div>
      </div>
      
      {/* Add to Cart */}
      <div className="pt-6 space-y-4">
        <AnimatePresence>
          <motion.div
            key="add-to-cart-button"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: addedToCart ? 0 : 1 }}
          >
            <Button 
              className="w-full h-12 text-base relative overflow-hidden bg-emerald-600 hover:bg-emerald-700"
              onClick={handleAddToCart}
              disabled={addedToCart}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </motion.div>
          
          {addedToCart && (
            <motion.div
              key="added-to-cart"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Button 
                className="w-full h-12 text-base bg-green-600 hover:bg-green-700"
                disabled
              >
                ✓ Added to Cart
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className={`flex-1 ${isLiked ? 'bg-pink-50 text-pink-500 border-pink-200' : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'}`}
            onClick={handleLike}
          >
            <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} /> 
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>
      
      {/* Product Voting Section */}
      <ProductVoting productId={product.id} productName={product.name} />
      
      {/* Product Comments Section */}
      <ProductComments productId={product.id} productName={product.name} />
      
      {/* Product Details */}
      <div className="border-t pt-6 mt-8">
        <h3 className="font-medium mb-4">Product Details</h3>
        <ul className="space-y-2">
          {product.details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span className="text-muted-foreground">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
