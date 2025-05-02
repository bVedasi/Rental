
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Create a simple context for auth state management
export const useAuth = () => {
  // Use localStorage to persist login state
  const getIsLoggedIn = () => localStorage.getItem('isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedInState] = useState(getIsLoggedIn());
  
  const setIsLoggedIn = (value: boolean) => {
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
    setIsLoggedInState(value);
  };
  
  return { isLoggedIn, setIsLoggedIn };
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      
      // Update login state
      setIsLoggedIn(true);
      
      // Redirect to profile page
      navigate('/profile');
    } else {
      if (password !== confirmPassword) {
        toast({
          title: "Passwords do not match",
          description: "Please ensure your passwords match.",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
      });
      
      // Update login state
      setIsLoggedIn(true);
      
      // Redirect to profile page
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-dark-light border border-gold/30">
            <CardContent className="p-6">
              <div className="flex border-b border-gold/20 mb-6">
                <button 
                  className={`flex-1 pb-4 text-center text-lg font-medium font-playfair ${isLogin ? 'text-gold border-b-2 border-gold' : 'text-light-dark'}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button 
                  className={`flex-1 pb-4 text-center text-lg font-medium font-playfair ${!isLogin ? 'text-gold border-b-2 border-gold' : 'text-light-dark'}`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-light mb-1 font-montserrat">
                      Full Name
                    </label>
                    <input 
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold font-montserrat"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-light mb-1 font-montserrat">
                    Email Address
                  </label>
                  <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold font-montserrat"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-light mb-1 font-montserrat">
                    Password
                  </label>
                  <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold font-montserrat"
                    required
                  />
                </div>
                
                {!isLogin && (
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-light mb-1 font-montserrat">
                      Confirm Password
                    </label>
                    <input 
                      type="password"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold font-montserrat"
                      required
                    />
                  </div>
                )}
                
                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-gold hover:underline font-montserrat">
                      Forgot Password?
                    </button>
                  </div>
                )}
                
                <Button 
                  type="submit"
                  className="w-full bg-gold text-dark hover:bg-gold/90 font-montserrat"
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
                
                <p className="text-center text-sm text-light-dark font-montserrat">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    type="button" 
                    className="text-gold hover:underline font-montserrat"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </button>
                </p>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gold/20">
                <Button variant="outline" className="w-full border-gold/30 text-light hover:bg-gold/10 mb-2 font-montserrat">
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full border-gold/30 text-light hover:bg-gold/10 font-montserrat">
                  Continue with Facebook
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
