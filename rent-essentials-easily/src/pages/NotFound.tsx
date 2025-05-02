
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-8xl font-bold text-gold mb-4">404</h1>
            <p className="text-2xl text-light mb-8">Oops! Page not found</p>
            <div className="w-32 h-1 bg-gold/50 mx-auto mb-8"></div>
            <p className="text-light-dark mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-gold text-dark hover:bg-gold/90 hover:animate-gold-glow"
            >
              <a href="/">Return to Home</a>
            </Button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
