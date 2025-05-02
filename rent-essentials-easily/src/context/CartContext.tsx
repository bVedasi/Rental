
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  days: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'days' | 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, change: number) => void;
  updateDays: (id: number, days: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (item: Omit<CartItem, 'days' | 'quantity'>) => {
    // Check if item already exists in cart
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    
    if (existingItem) {
      // If item exists, increase quantity
      updateQuantity(item.id, 1);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { ...item, days: 1, quantity: 1 }]);
      
      toast({
        title: "Item added to cart",
        description: `${item.name} has been added to your cart`,
      });
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const updateDays = (id: number, days: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, days } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      updateDays,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
