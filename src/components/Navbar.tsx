
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MiniCart from "./MiniCart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { pathname } = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-display text-xl text-emerald-600">VULGAR</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Contact
          </Link>
        </nav>
        
        {/* Cart */}
        <div className="flex items-center">
          <MiniCart />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-30 p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              to="/"
              className="text-lg font-medium py-2 hover:text-emerald-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-lg font-medium py-2 hover:text-emerald-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-lg font-medium py-2 hover:text-emerald-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-lg font-medium py-2 hover:text-emerald-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
