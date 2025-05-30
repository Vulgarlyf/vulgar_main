
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, products } from "@/data/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductVoting from "@/components/product/ProductVoting";
import ProductComments from "@/components/product/ProductComments";

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  const categories = [
    { title: "T-Shirts", image: "/assets/005.png", link: "/products/t-shirts" },
    { title: "Hoodies", image: "/assets/014.png", link: "/products/hoodies" },
    { title: "Accessories", image: "/assets/015.png", link: "/products/accessories" },
  ];

  // Get specific products for community voting
  const communityProducts = [
    products.find(p => p.id === "urban-fleece-hoodie"),
    products.find(p => p.id === "oversized-graphic-tee")
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] bg-black">
          <div className="absolute inset-0 opacity-90">
            <div className="h-full w-full bg-gradient-to-b from-transparent to-black/50" />
            <img 
              src="/assets/image01.png" 
              alt="Vulgar Collection" 
              className="h-full w-full object-cover object-center opacity-60"
            />
          </div>
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl text-white">
              <h1 className="font-display text-4xl md:text-6xl mb-4 tracking-wider text-emerald-400">
                VULGAR <br />COLLECTION
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/80">
                Bold streetwear for those who dare to be different. Express yourself with our premium collection.
              </p>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Link to="/products">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl mb-12 text-center">CATEGORIES</h2>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Link to={category.link} key={index} className="group relative h-[300px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="font-display text-white text-xl mb-2">{category.title}</h3>
                    <span className="inline-flex items-center text-emerald-400 text-sm font-medium group-hover:text-emerald-300 transition-colors">
                      Shop Now <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {categories.map((category, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5">
                      <Link to={category.link} className="group relative block h-[300px] overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <img 
                          src={category.image} 
                          alt={category.title} 
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <h3 className="font-display text-white text-xl mb-2">{category.title}</h3>
                          <span className="inline-flex items-center text-emerald-400 text-sm font-medium group-hover:text-emerald-300 transition-colors">
                            Shop Now <ChevronRight className="ml-1 h-4 w-4" />
                          </span>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          </div>
        </section>
        
        {/* Featured Products Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl">FEATURED PRODUCTS</h2>
              <Button variant="link" asChild className="text-emerald-600 hover:text-emerald-700">
                <Link to="/products" className="flex items-center">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
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
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/assets/image01.png" 
                  alt="About Vulgar" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="font-display text-2xl md:text-3xl">ABOUT VULGAR</h2>
                <p className="text-muted-foreground">
                  Vulgar was founded for those who refuse to blend in. We create bold streetwear 
                  that makes a statement. Our designs challenge conventions and celebrate 
                  individuality in urban culture.
                </p>
                <p className="text-muted-foreground">
                  We believe in authentic expression through premium quality garments. Every piece 
                  is crafted to help you stand out and speak your truth, no matter how vulgar 
                  it might be to others.
                </p>
                <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Feedback Section */}
        <section className="py-16 bg-emerald-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-3xl mb-4">COMMUNITY VOICE</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Vote on your favorite designs and share your thoughts. Your voice shapes the future of Vulgar merch.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {communityProducts.map((product) => (
                  <div key={product?.id} className="space-y-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={product?.images[0]} 
                          alt={product?.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-medium text-lg">{product?.name}</h3>
                          <p className="text-sm text-muted-foreground">${product?.price}</p>
                        </div>
                      </div>
                      
                      <ProductVoting 
                        productId={product?.id || ''} 
                        productName={product?.name || ''} 
                      />
                    </div>
                    
                    <ProductComments 
                      productId={product?.id || ''} 
                      productName={product?.name || ''} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl mb-4">JOIN THE VULGAR COMMUNITY</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Subscribe to our newsletter for exclusive drops, early access to new designs, and 
              behind-the-scenes content from the Vulgar universe.
            </p>
            <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto space-y-4 sm:space-y-0">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 flex-grow text-black rounded-l-md focus:outline-none"
              />
              <Button className="bg-emerald-600 text-white hover:bg-gray-800 rounded-r-md sm:rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
