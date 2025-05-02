
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Event Planner",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    content: "RentEasy saved my event! I was able to rent high-quality equipment at the last minute. The process was smooth and the customer service was excellent.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Photographer",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content: "As a freelance photographer, I can't afford to buy all the latest gear. RentEasy allows me to access premium equipment for specific shoots without breaking the bank.",
    rating: 4
  },
  {
    id: 3,
    name: "Emma Garcia",
    role: "Student",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    content: "The student discount on RentEasy is a lifesaver! I rented a laptop when mine broke down before finals week. Fast delivery and great condition.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    content: "RentEasy has helped my small business grow by allowing us to rent equipment as needed. It's much more cost-effective than purchasing everything outright.",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${index < rating ? 'text-gold fill-gold' : 'text-gray-400'}`} 
      />
    ));
  };

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
            What Our <span className="text-gold">Customers</span> Say
          </motion.h2>
          <motion.p 
            className="text-light-dark max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hear from people who have used our rental service
          </motion.p>
        </div>
        
        <div 
          className="relative max-w-3xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-shrink-0 w-full px-4">
                  <Card className="bg-dark border-2 border-gold/30 p-6 h-full card-hover-effect bg-gradient-to-b from-dark-light to-dark">
                    <div className="flex flex-col items-center md:items-start gap-6">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex mb-2">{renderStars(testimonial.rating)}</div>
                          <p className="mb-4 italic text-light-dark">{testimonial.content}</p>
                          <div>
                            <h4 className="font-semibold text-gold">{testimonial.name}</h4>
                            <p className="text-sm text-light-dark">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-colors duration-300 border border-gold ${
                  index === activeIndex ? "bg-gold" : "bg-dark-lighter"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-12 text-gold hover:bg-dark-lighter rounded-full bg-dark border border-gold/30"
            onClick={prevSlide}
          >
            ←
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-12 text-gold hover:bg-dark-lighter rounded-full bg-dark border border-gold/30"
            onClick={nextSlide}
          >
            →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
