
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  icon: string;
  image: string;
  description: string;
};

const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop",
    description: "Cameras, laptops, phones, and more"
  },
  {
    id: 2,
    name: "Furniture",
    icon: "🛋️",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop",
    description: "Tables, chairs, sofas, and more"
  },
  {
    id: 3,
    name: "Tools",
    icon: "🔧",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop",
    description: "Power tools and equipment for any project"
  },
  {
    id: 4,
    name: "Event Supplies",
    icon: "🎪",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop",
    description: "Everything you need for your next event"
  }
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore <span className="text-gold">Categories</span>
          </motion.h2>
          <motion.p 
            className="text-light-dark max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find exactly what you need from our wide selection
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative overflow-hidden rounded-lg h-64 group"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent flex flex-col justify-end p-6">
                <div className="mb-3 bg-dark-light bg-opacity-70 w-14 h-14 rounded-full flex items-center justify-center text-2xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gold">{category.name}</h3>
                <p className="text-sm text-light-dark mb-3">{category.description}</p>
                <Link 
                  to={`/category/${category.name}`}
                  state={{ category: category.name }}
                >
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dark">
                    Browse {category.name}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/categories">
            <Button className="bg-dark-light border border-gold/50 text-gold hover:bg-gold hover:text-dark transition-all duration-300">
              View All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
