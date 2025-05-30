
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-display text-lg tracking-wider">VULGAR</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
            Bold streetwear for those who dare to be different. Express yourself with our premium collection.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/vulgarlyf" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-foreground">
                <Instagram size={20} />
              </a>
            
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products/t-shirts" className="text-muted-foreground hover:text-foreground transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/products/hoodies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link to="/products/pants" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pants
                </Link>
              </li>
              <li>
                <Link to="/products/accessories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                {/* <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link> */}
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to get special offers and early access to new drops.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border rounded-l-md focus:outline-none focus:ring-1 focus:ring-foreground"
              />
              <button
                type="submit"
                className="bg-foreground text-background px-4 py-2 text-sm font-medium rounded-r-md hover:bg-foreground/90 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vulgar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
