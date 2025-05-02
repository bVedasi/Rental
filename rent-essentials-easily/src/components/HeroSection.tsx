
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gold/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight font-playfair"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-light">Rent Everyday</span>{" "}
            <span className="text-gold">Essentials</span>{" "}
            <span className="text-light">Easily</span>
          </motion.h1>
          
          <motion.p 
            className="text-light-dark text-lg md:text-xl mb-10 max-w-xl font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Why buy when you can rent? Access premium products for a fraction of the cost.
            No commitments, just convenience.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/categories">
              <Button 
                size="lg" 
                className="bg-gold text-dark hover:bg-gold/90 hover:animate-gold-glow text-lg px-8 py-6 font-montserrat"
              >
                Browse Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
