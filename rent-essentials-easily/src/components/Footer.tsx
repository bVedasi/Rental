
import { Link } from "react-router-dom";
import { Instagram, Phone, Mail } from "lucide-react";

const Footer = () => {
  // Create placeholders for routes that don't exist yet
  const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    console.log(`Navigating to ${path} is not implemented yet`);
    // You could also add a toast notification here
  };

  return (
    <footer className="bg-dark-light pt-16 pb-8 text-light-dark border-t border-dark-lighter">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold text-gold mb-4">RentEasy</h3>
            <p className="mb-4">
              Making premium items accessible through our hassle-free rental service.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-dark flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-dark flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-colors"
              >
                <Mail size={18} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-dark flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-colors"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-light mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/categories" className="hover:text-gold transition-colors">Categories</Link></li>
              <li><Link 
                to="#" 
                onClick={(e) => handlePlaceholderClick(e, '/how-it-works')} 
                className="hover:text-gold transition-colors"
              >How It Works</Link></li>
              <li><Link 
                to="#" 
                onClick={(e) => handlePlaceholderClick(e, '/testimonials')} 
                className="hover:text-gold transition-colors"
              >Testimonials</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-light mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link 
                to="#" 
                onClick={(e) => handlePlaceholderClick(e, '/categories/electronics')} 
                className="hover:text-gold transition-colors"
              >Electronics</Link></li>
              <li><Link 
                to="#" 
                onClick={(e) => handlePlaceholderClick(e, '/categories/furniture')} 
                className="hover:text-gold transition-colors"
              >Furniture</Link></li>
              <li><Link 
                to="#" 
                onClick={(e) => handlePlaceholderClick(e, '/categories/tools')} 
                className="hover:text-gold transition-colors"
              >Tools & Equipment</Link></li>
              <li><Link 
                to="#" 
                onClick={(e) => handlePlaceholderClick(e, '/categories/event')} 
                className="hover:text-gold transition-colors"
              >Event Supplies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-light mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-gold" />
                <a href="mailto:info@renteasy.com" className="hover:text-gold transition-colors">info@renteasy.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-gold" />
                <a href="tel:+1234567890" className="hover:text-gold transition-colors">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-lighter pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} RentEasy. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link 
              to="#" 
              onClick={(e) => handlePlaceholderClick(e, '/terms')}
              className="hover:text-gold transition-colors"
            >Terms of Service</Link>
            <Link 
              to="#" 
              onClick={(e) => handlePlaceholderClick(e, '/privacy')} 
              className="hover:text-gold transition-colors"
            >Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
