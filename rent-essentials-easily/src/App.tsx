import { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import { CartProvider } from "./context/CartContext";
import ThankYou from "./pages/ThankYou"; 

// Create Auth Context
const AuthContext = createContext(null);

// Custom hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedInState] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    setIsLoggedInState(stored === "true");
  }, []);

  const setIsLoggedIn = (value) => {
    localStorage.setItem("isLoggedIn", value ? "true" : "false");
    setIsLoggedInState(value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <CartProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Redirect "/" to /login if not logged in */}
                <Route
                  path="/"
                  element={
                    isLoggedIn ? <Index /> : <Navigate to="/login" replace />
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route
                  path="/categories"
                  element={
                    <ProtectedRoute>
                      <Categories />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/category/:category"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CartProvider>
          </AuthContext.Provider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
