
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Edit, ShoppingCart, Calendar, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

type RentalHistory = {
  id: number;
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
  status: 'active' | 'returned' | 'late';
};

const rentalHistory: RentalHistory[] = [
  {
    id: 1,
    name: "Professional Camera",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop",
    startDate: "2025-03-15",
    endDate: "2025-03-18",
    price: 75.00,
    status: 'returned'
  },
  {
    id: 2,
    name: "High-End Laptop",
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&auto=format&fit=crop",
    startDate: "2025-04-20",
    endDate: "2025-04-30",
    price: 200.00,
    status: 'active'
  },
  {
    id: 3,
    name: "Projector",
    image: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?ixlib=rb-4.0.3&auto=format&fit=crop",
    startDate: "2025-02-05",
    endDate: "2025-02-07",
    price: 40.00,
    status: 'returned'
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'rentals'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Profile form state
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "This is a demo. No actual logout will occur.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'returned': return 'text-light-dark';
      case 'late': return 'text-red-400';
      default: return 'text-light';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active Rental';
      case 'returned': return 'Returned';
      case 'late': return 'Late Return';
      default: return status;
    }
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
          <User className="text-gold mr-3 h-7 w-7" />
          <h1 className="text-3xl md:text-4xl font-bold text-light">Your <span className="text-gold">Profile</span></h1>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-dark-light border border-gold/30">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-dark-lighter border-2 border-gold flex items-center justify-center mb-4">
                    <User size={40} className="text-gold" />
                  </div>
                  <h2 className="text-xl font-semibold text-gold">John Doe</h2>
                  <p className="text-light-dark">Member since 2025</p>
                </div>
                
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'profile' ? 'bg-gold/10 text-gold' : 'text-light hover:bg-gold/5 hover:text-gold'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User size={18} className="mr-2" />
                    Profile Information
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'rentals' ? 'bg-gold/10 text-gold' : 'text-light hover:bg-gold/5 hover:text-gold'}`}
                    onClick={() => setActiveTab('rentals')}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Rental History
                  </Button>
                  <Link to="/cart">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-light hover:bg-gold/5 hover:text-gold"
                    >
                      <Calendar size={18} className="mr-2" />
                      Current Rentals
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-light hover:bg-gold/5 hover:text-gold"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' ? (
              <Card className="bg-dark-light border border-gold/30">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gold">Profile Information</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gold hover:bg-gold/10"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit size={18} className="mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-light mb-1">
                          Full Name
                        </label>
                        <input 
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-light mb-1">
                          Email Address
                        </label>
                        <input 
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-light mb-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-light mb-1">
                          Address
                        </label>
                        <textarea 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          rows={3}
                          className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="bg-gold text-dark hover:bg-gold/90"
                      >
                        Save Changes
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm text-light-dark">Full Name</h3>
                        <p className="text-light">{name}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-light-dark">Email Address</h3>
                        <p className="text-light">{email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-light-dark">Phone Number</h3>
                        <p className="text-light">{phone}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-light-dark">Address</h3>
                        <p className="text-light">{address}</p>
                      </div>
                      
                      <div className="pt-4 border-t border-gold/20">
                        <h3 className="text-sm font-medium text-gold mb-2">Account Security</h3>
                        <Button 
                          variant="outline"
                          className="border-gold/30 text-light hover:bg-gold/10 mr-3"
                        >
                          Change Password
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-gold/30 text-light hover:bg-gold/10"
                        >
                          Two-Factor Authentication
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-dark-light border border-gold/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gold mb-6">Rental History</h2>
                  
                  <div className="space-y-4">
                    {rentalHistory.map((rental) => (
                      <div 
                        key={rental.id}
                        className="flex flex-col md:flex-row gap-4 p-4 border border-gold/20 rounded-lg bg-dark"
                      >
                        <div className="w-full md:w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
                          <img 
                            src={rental.image} 
                            alt={rental.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between">
                            <h3 className="text-lg font-medium text-light">{rental.name}</h3>
                            <span className={`${getStatusColor(rental.status)}`}>
                              {getStatusText(rental.status)}
                            </span>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-light-dark">
                              {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-gold mt-1">${rental.price.toFixed(2)}</p>
                          </div>
                          {rental.status === 'active' && (
                            <Button 
                              className="mt-3 bg-dark-lighter border border-gold/50 text-gold hover:bg-gold hover:text-dark transition-all duration-300"
                              size="sm"
                            >
                              Extend Rental
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
