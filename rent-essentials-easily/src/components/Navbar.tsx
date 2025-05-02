
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '../pages/Login';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-gold font-playfair">
          RentEasy
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link font-montserrat ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/categories" className={`nav-link font-montserrat ${location.pathname === '/categories' ? 'active' : ''}`}>Categories</Link>
          <div className="flex items-center space-x-4 ml-4">
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-light hover:text-gold"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            {isLoggedIn ? (
              <Link to="/profile">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-light hover:text-gold"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="border-gold text-gold hover:bg-gold hover:text-dark font-montserrat"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMobileMenu} size="icon">
            {mobileMenuOpen ? <X className="h-6 w-6 text-gold" /> : <Menu className="h-6 w-6 text-gold" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-light absolute w-full">
          <div className="container mx-auto px-4 py-5 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-light hover:text-gold p-2 font-montserrat ${location.pathname === '/' ? 'text-gold' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className={`text-light hover:text-gold p-2 font-montserrat ${location.pathname === '/categories' ? 'text-gold' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <div className="flex items-center justify-between pt-4 border-t border-dark-lighter">
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="icon" className="text-light hover:text-gold">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              {isLoggedIn ? (
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="icon" className="text-light hover:text-gold">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dark font-montserrat">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
