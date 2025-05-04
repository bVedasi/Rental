import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Edit, ShoppingCart, Calendar, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import axios from 'axios';

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
  const [activeTab, setActiveTab] = useState<'profile' | 'rentals' | 'current'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [currentRentals, setCurrentRentals] = useState<RentalHistory[]>([]);

  // States for profile data
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Get userId (assuming you have a way to track it after login)
  const userId = JSON.parse(localStorage.getItem('user') || '{}').id; // Replace this with the actual user ID from your auth context/session

  useEffect(() => {
    // Fetch the user data when the profile page loads
    const fetchUserData = async () => {
      try {
        // const response = await axios.get(`/api/user/${userId}`);  // Replace with actual endpoint
        const data = JSON.parse(localStorage.getItem('user') || '{}'); // Simulating API call

        // Update the state with the fetched data
        setUser({
          name: data.username || '',
          email: data.email || '',
          phone: data.phone_num || '',
          address: data.address || ''
        });

        setIsLoading(false);  // Set loading state to false once data is fetched
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user data.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, toast]);

  // Fetch current rentals from local storage
  useEffect(() => {
    try {
      const current = localStorage.getItem('current');
      if (current) {
        setCurrentRentals(JSON.parse(current));
      }
    } catch (error) {
      console.error("Error fetching current rentals:", error);
      toast({
        title: "Error",
        description: "Failed to load current rentals data.",
        variant: "destructive"
      });
    }
  }, [toast]);

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

  // Rental item display component - reused for both rental history and current rentals
  const RentalItem = ({ rental }: { rental: RentalHistory }) => (
    <Card key={rental.id} className="bg-dark-light border border-gold/30">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <img src={rental.image} alt={rental.name} className="w-24 h-24 object-cover rounded" />
          <div>
            <h3 className="text-lg text-gold">{rental.name}</h3>
            <p className={`${getStatusColor(rental.status)}`}>{getStatusText(rental.status)}</p>
            <p className="text-light-dark">Renting </p>
            <p className="text-gold text-xl">${rental.price}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <p className="text-gold text-xl">Loading...</p>
      </div>
    );
  }

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
                  <h2 className="text-xl font-semibold text-gold">{user.name}</h2>
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
                    <Calendar size={18} className="mr-2" />
                    Rental History
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'current' ? 'bg-gold/10 text-gold' : 'text-light hover:bg-gold/5 hover:text-gold'}`}
                    onClick={() => setActiveTab('current')}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Current Rentals
                  </Button>
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
            {activeTab === 'profile' && (
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
                          value={user.name}
                          onChange={(e) => setUser({ ...user, name: e.target.value })}
                          className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-light mb-1">
                          Email Address
                        </label>
                        <input 
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-light mb-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel"
                          value={user.phone}
                          onChange={(e) => setUser({ ...user, phone: e.target.value })}
                          className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-light mb-1">
                          Address
                        </label>
                        <textarea 
                          value={user.address}
                          onChange={(e) => setUser({ ...user, address: e.target.value })}
                          rows={3}
                          className="w-full bg-dark border border-gold/30 rounded p-2 text-light focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-gold text-dark mt-4"
                      >
                        Save Changes
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-light"><strong className="text-gold">Name:</strong> {user.name}</p>
                      <p className="text-light"><strong className="text-gold">Email:</strong> {user.email}</p>
                      <p className="text-light"><strong className="text-gold">Phone:</strong> {user.phone}</p>
                      <p className="text-light"><strong className="text-gold">Address:</strong> {user.address}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'rentals' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gold mb-6">Rental History</h2>
                {rentalHistory.length > 0 ? (
                  rentalHistory.map((rental) => (
                    <RentalItem key={rental.id} rental={rental} />
                  ))
                ) : (
                  <Card className="bg-dark-light border border-gold/30">
                    <CardContent className="p-6 text-center">
                      <p className="text-light-dark">No rental history available.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'current' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gold mb-6">Current Rentals</h2>
                {currentRentals && currentRentals.length > 0 ? (
                  currentRentals.map((rental) => (
                    <RentalItem key={rental.id} rental={rental} />
                  ))
                ) : (
                  <Card className="bg-dark-light border border-gold/30">
                    <CardContent className="p-6 text-center">
                      <p className="text-light-dark">You don't have any active rentals.</p>
                      <Link to="/catalog" className="block mt-4">
                        <Button className="bg-gold text-dark">
                          Browse Catalog
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;