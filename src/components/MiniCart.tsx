
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MiniCart = () => {
  const { cart, cartCount, cartTotal, removeFromCart } = useCart();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button 
          className="relative p-2 transition-colors text-foreground"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-foreground text-background text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle>Your Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        
        <div className="flex-grow overflow-auto py-4">
          {cart.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-start gap-3 animate-fade-in">
                  <div className="w-16 h-16 bg-secondary rounded-sm overflow-hidden">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium truncate" title={item.product.name}>
                        {item.product.name}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.selectedSize && <span className="mr-2">Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm">{item.quantity} × ${item.product.price.toFixed(2)}</span>
                      <span className="text-sm font-medium">${(item.quantity * item.product.price).toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <Button 
              className="w-full"
              onClick={() => setOpen(false)}
              asChild
            >
              <Link to="/cart">Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MiniCart;
