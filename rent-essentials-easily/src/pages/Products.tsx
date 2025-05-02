import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from '@/context/CartContext';

// Type should match your Supabase items table structure
type Product = {
  id: string; // UUID from Supabase
  name: string;
  image_url: string; // matches column name in Supabase
  description: string;
  price: number; // assuming this is daily rate or base price
  category_id: string; // UUID referencing categories.id
  category?: string; // optional: populated later for filtering/display
  available?: boolean; // add if you have inventory tracking
};

const Products = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"hourly" | "daily" | "weekly">("daily");
  const { category } = useParams(); // e.g., from URL /products/electronics
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<{ id: string; name: string }[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        // Fetch all products
        const productsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const productsData = await productsRes.json();

        // Fetch all categories
        const categoriesRes = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
        const categoriesData = await categoriesRes.json();

        // Map category IDs to names for easier filtering and display
        const categoryMap = Object.fromEntries(categoriesData.map((cat: any) => [cat.id, cat.name]));
        const enhancedProducts = productsData.map((product: Product) => ({
          ...product,
          category: categoryMap[product.category_id] || 'Uncategorized',
        }));

        setAllCategories(categoriesData);
        setProducts(enhancedProducts);
      } catch (error) {
        console.error('Failed to fetch products or categories:', error);
      }
    };

    fetchData();
  }, [category, location.state]);

  const getRateByTimeframe = (product: Product) => {
    switch (selectedTimeframe) {
      case "hourly":
        return product.price / 24; // Divide daily price by 24 for hourly estimate
      case "daily":
        return product.price; // Use as-is for daily
      case "weekly":
        return product.price * 7; // Multiply by 7 for weekly
      default:
        return product.price;
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      image: product.image_url,
      price: getRateByTimeframe(product)
    });
  };

  const categoryName = category ? decodeURIComponent(category) : "All";

  // Filter by category if provided
  const displayedProducts = categoryName === "All"
    ? products
    : products.filter(p => p.category?.toLowerCase() === categoryName.toLowerCase());

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-light mb-4 font-playfair">
            {categoryName} <span className="text-gold">for Rent</span>
          </h1>
          <p className="text-light-dark max-w-2xl mx-auto font-montserrat">
            Browse our selection of high-quality rental items
          </p>
        </motion.div>

        {/* Timeframe selector remains unchanged */}
        <div className="flex justify-center mb-8">
          <div className="bg-dark-light rounded-lg p-2 inline-flex">
            <button 
              className={`px-4 py-2 rounded-md font-montserrat ${selectedTimeframe === 'hourly' ? 'bg-gold text-dark' : 'text-light'}`}
              onClick={() => setSelectedTimeframe('hourly')}
            >
              Hourly Rate
            </button>
            <button 
              className={`px-4 py-2 rounded-md font-montserrat ${selectedTimeframe === 'daily' ? 'bg-gold text-dark' : 'text-light'}`}
              onClick={() => setSelectedTimeframe('daily')}
            >
              Daily Rate
            </button>
            <button 
              className={`px-4 py-2 rounded-md font-montserrat ${selectedTimeframe === 'weekly' ? 'bg-gold text-dark' : 'text-light'}`}
              onClick={() => setSelectedTimeframe('weekly')}
            >
              Weekly Rate
            </button>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (parseInt(product.id.slice(0, 3), 16) % 3) }}
              >
                <Card className="overflow-hidden bg-dark-light border border-gold/30 h-full card-hover-effect">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {!product.available && (
                      <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground px-3 py-1">
                        Currently Unavailable
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gold mb-2 font-playfair">{product.name}</h2>
                    <p className="text-light-dark mb-3 text-sm font-montserrat">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-light">
                        <span className="text-xs uppercase font-montserrat">
                          {selectedTimeframe === 'hourly' ? 'Per Hour' : 
                           selectedTimeframe === 'daily' ? 'Per Day' : 'Per Week'}
                        </span>
                        <div className="text-gold text-2xl font-semibold font-playfair">
                          ${getRateByTimeframe(product).toFixed(2)}
                        </div>
                      </div>
                      <div className="text-xs text-light-dark font-montserrat">
                        {product.available ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-dark border border-gold/50 text-gold hover:bg-gold hover:text-dark transition-all duration-300 font-montserrat"
                      disabled={!product.available}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-light text-center col-span-full">No products found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;