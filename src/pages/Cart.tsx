
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomerInfoForm from "@/components/CustomerInfoForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CustomerInfo {
  name: string;
  email: string;
}

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const handleCustomerInfoSubmit = async (customerInfo: CustomerInfo) => {
    setIsCheckingOut(true);
    
    try {
      // Prepare order details for the email
      const orderDetails = {
        items: cart.map(item => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor,
        })),
        total: cartTotal,
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
      };
      
      console.log("Sending order details:", orderDetails);
      
      // Send order details via edge function
      const { data, error } = await supabase.functions.invoke('send-order-email', {
        body: orderDetails
      });
      
      if (error) {
        console.error("Error sending emails:", error);
        toast({
          title: "Email Error",
          description: "Failed to send order confirmation emails. Please contact support.",
          variant: "destructive",
        });
        setIsCheckingOut(false);
        return;
      }
      
      console.log("Emails sent successfully:", data);
      
      toast({
        title: "Order emails sent!",
        description: "Order details sent to store and receipt sent to customer.",
      });
      
      // Simulate redirect to payment after brief delay
      setTimeout(() => {
        toast({
          title: "Redirecting to payment...",
          description: "You'll be redirected to complete your payment.",
        });
        
        // Redirect to payment link (replace with your actual payment link)
        window.location.href = "https://your-payment-link.com";
        
        setIsCheckingOut(false);
        clearCart(); // Only clear cart after successful payment in production
      }, 2000);
      
    } catch (error) {
      console.error("Error in checkout process:", error);
      toast({
        title: "Checkout Error",
        description: "Something went wrong during checkout. Please try again.",
        variant: "destructive",
      });
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl mb-6">Your Cart</h1>
          
          <Link to="/products" className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" /> Continue shopping
          </Link>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground opacity-20" />
            <h2 className="text-xl font-medium">Your cart is empty</h2>
            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-4">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="border rounded-md p-4 flex gap-4 animate-fade-in"
                >
                  <div className="w-24 h-24 bg-secondary rounded-md overflow-hidden">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between">
                      <Link to={`/product/${item.product.id}`} className="font-medium hover:underline">
                        {item.product.name}
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      ${item.product.price.toFixed(2)}
                    </p>
                    
                    <div className="text-sm text-muted-foreground">
                      {item.selectedSize && <span className="mr-2">Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 flex items-center justify-center border rounded-md"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      
                      <span className="mx-3 min-w-8 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center border rounded-md"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="md:col-span-4">
              <div className="border rounded-md p-6 space-y-6 sticky top-24">
                <h2 className="font-medium">Order Summary</h2>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  
                  <div className="flex justify-between font-medium pt-3 border-t">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                {!showCustomerForm ? (
                  <Button 
                    className="w-full h-10"
                    onClick={() => setShowCustomerForm(true)}
                    disabled={isCheckingOut}
                  >
                    Checkout
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-medium">Customer Information</h3>
                    <CustomerInfoForm 
                      onSubmit={handleCustomerInfoSubmit}
                      isLoading={isCheckingOut}
                    />
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setShowCustomerForm(false)}
                      disabled={isCheckingOut}
                    >
                      Back
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
