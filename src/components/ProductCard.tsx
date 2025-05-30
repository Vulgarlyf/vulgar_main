
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, hoverImage, category }: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/product/${id}`}
      className="group product-card-hover"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="product-image-container aspect-[5/6] overflow-hidden bg-secondary mb-4 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={isHovering && hoverImage ? hoverImage : image} 
          alt={name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-sm">{name}</h3>
        <p className="text-muted-foreground text-sm">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
