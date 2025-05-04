import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, updateDays } = useCart();
  const { toast } = useToast();
  const [isCheckout, setIsCheckout] = useState(false); // Added state for checkout process

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.days * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
  
    toast({
      title: "Order Confirmed!",
      description: "Your rental has been successfully placed.",
      duration: 3000,
    });
  
    setTimeout(() => {
      // Clear cart
      cartItems.forEach((item) => removeFromCart(item.id));
  
      // Show QR code and Done button
      setIsCheckout(true);
    }, 1000);
  };

  const handleDone = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage or default to an empty array
    let current = JSON.parse(localStorage.getItem('current')) || []; // Get current from localStorage or default to an empty array
    
    // Append the items from cart to current
    current = [...current, ...cart];
    
    // Set the updated current back to localStorage
    localStorage.setItem('current', JSON.stringify(current));
     // Clear cart from localStorage
    window.location.href = "/thank-you"; // Redirect to thank-you page
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-8"
        >
          <ShoppingCart className="text-gold mr-3 h-7 w-7" />
          <h1 className="text-3xl md:text-4xl font-bold text-light font-playfair">Your <span className="text-gold">Cart</span></h1>
        </motion.div>
        
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="text-light-dark text-xl mb-6 font-playfair">Your cart is empty</div>
            <Link to="/categories">
              <Button className="bg-gold text-dark hover:bg-gold/90 font-montserrat">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : isCheckout ? (
          // Show QR code and Done button after checkout
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuIy6HNc3zXzJ9-y-rNEfnaSdhcgeXytmnQg&s" // Your static QR code image here
              alt="QR Code" 
              className="mx-auto mb-6"
            />
            <Button 
              className="bg-gold text-dark hover:bg-gold/90 font-montserrat"
              onClick={handleDone}
            >
              Done
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="bg-dark-light border border-gold/20">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-light font-playfair">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-light-dark hover:text-gold"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <p className="text-gold mt-1 font-montserrat">${item.price} / day</p>
                          
                          <div className="flex flex-col sm:flex-row justify-between mt-3 gap-3">
                            <div className="flex items-center">
                              <span className="text-light-dark mr-2 font-montserrat">Rental days:</span>
                              <select 
                                value={item.days}
                                onChange={(e) => updateDays(item.id, parseInt(e.target.value))}
                                className="bg-dark border border-gold/30 text-light rounded p-1 font-montserrat"
                              >
                                {[1, 2, 3, 4, 5, 7, 14, 30].map((day) => (
                                  <option key={day} value={day}>{day} day{day > 1 ? 's' : ''}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div className="flex items-center border border-gold/30 rounded">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-2 py-1 text-gold hover:bg-gold/10"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 border-x border-gold/30 font-montserrat">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-2 py-1 text-gold hover:bg-gold/10"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-right">
                            <p className="text-light font-montserrat">
                              Subtotal: <span className="text-gold font-semibold">
                                ${(item.price * item.days * item.quantity).toFixed(2)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-dark-light border border-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gold font-playfair">Order Summary</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-light-dark font-montserrat">Subtotal</span>
                      <span className="text-light font-montserrat">${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light-dark font-montserrat">Delivery Fee</span>
                      <span className="text-light font-montserrat">$9.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light-dark font-montserrat">Taxes</span>
                      <span className="text-light font-montserrat">${(calculateSubtotal() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gold/20 pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span className="text-light font-montserrat">Total</span>
                        <span className="text-gold font-playfair">
                          ${(calculateSubtotal() + 9.99 + calculateSubtotal() * 0.08).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gold text-dark hover:bg-gold/90 mt-4 font-montserrat"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <p className="text-xs text-light-dark mt-4 text-center font-montserrat">
                    By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
