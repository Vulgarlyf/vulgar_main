
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);

  const handleImageLoad = (index: number) => {
    const newLoadedState = [...imageLoaded];
    newLoadedState[index] = true;
    setImageLoaded(newLoadedState);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden bg-secondary relative rounded-md">
        {!imageLoaded[currentImageIndex] && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={images[currentImageIndex]} 
          alt={productName} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded[currentImageIndex] ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => handleImageLoad(currentImageIndex)}
        />
      </div>
      
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`aspect-square overflow-hidden bg-secondary rounded-md relative transition-all ${
              currentImageIndex === index 
                ? "ring-2 ring-foreground" 
                : "hover:opacity-80"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img 
              src={image} 
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Mobile Image Carousel */}
      <div className="lg:hidden mt-8">
        <Carousel className="w-full max-w-md mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square overflow-hidden bg-secondary rounded-md relative">
                  <img 
                    src={image} 
                    alt={`${productName} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0 mx-0" />
            <CarouselNext className="static translate-y-0 mx-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ProductImageGallery;
