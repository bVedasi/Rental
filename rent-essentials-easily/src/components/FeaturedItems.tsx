
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type RentalItem = {
  id: number;
  name: string;
  image: string;
  rate: string;
  period: string;
};

const featuredItems: RentalItem[] = [
  {
    id: 1,
    name: "Professional Camera",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop",
    rate: "$25",
    period: "per day"
  },
  {
    id: 2,
    name: "High-End Laptop",
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&auto=format&fit=crop",
    rate: "$40",
    period: "per day"
  },
  {
    id: 3,
    name: "Projector",
    image: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?ixlib=rb-4.0.3&auto=format&fit=crop",
    rate: "$20",
    period: "per day"
  },
  {
    id: 4,
    name: "Event Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop",
    rate: "$15",
    period: "per day"
  },
  {
    id: 5,
    name: "Smart Home Devices",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop",
    rate: "$10",
    period: "per day"
  },
  {
    id: 6,
    name: "Audio Equipment",
    image: "https://images.unsplash.com/photo-1558537348-c0f8e733989d?ixlib=rb-4.0.3&auto=format&fit=crop",
    rate: "$30",
    period: "per day"
  }
];

const FeaturedItems = () => {
  return (
    <section className="py-20 bg-dark-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured <span className="text-gold">Items</span>
          </motion.h2>
          <motion.p 
            className="text-light-dark max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our most popular rental items for your next project or event
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="bg-dark border border-dark-lighter h-full overflow-hidden card-hover-effect">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="pt-5">
                  <h3 className="text-xl font-medium mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gold font-semibold">
                      {item.rate} <span className="text-light-dark text-sm font-normal">{item.period}</span>
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-dark-lighter border border-gold/50 text-gold hover:bg-gold hover:text-dark transition-all duration-300">
                    Rent Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
