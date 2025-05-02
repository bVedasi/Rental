import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Adjusted type to match Supabase schema
interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to load categories',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <p className="text-gold">Loading categories...</p>
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
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-light mb-4">
            Rental <span className="text-gold">Categories</span>
          </h1>
          <p className="text-light-dark max-w-2xl mx-auto">
            Browse our wide selection of rental categories and find exactly what you need
          </p>
        </motion.div>

        {categories.length === 0 ? (
          <p className="text-light-dark text-center">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
              >
                <Card className="overflow-hidden bg-dark-light border border-gold/30 h-full card-hover-effect">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-dark-lighter rounded-full flex items-center justify-center text-xl border border-gold/20">
                        
                      </div>
                      <h2 className="text-xl font-semibold text-gold">{category.name}</h2>
                    </div>
                    <p className="text-light-dark mb-4">{category.description}</p>
                    <Link
                      to={`/category/${category.name}`}
                      state={{ category: category.name }}
                    >
                      <Button className="w-full bg-dark border border-gold/50 text-gold hover:bg-gold hover:text-dark transition-all duration-300">
                        Browse {category.name}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
