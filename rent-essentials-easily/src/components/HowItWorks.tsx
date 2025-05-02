
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    id: 1,
    title: "Browse & Select",
    description: "Choose from our wide range of rentable items",
    icon: "📱",
    bgColor: "from-gold/20 to-gold/5"
  },
  {
    id: 2,
    title: "Book & Pay",
    description: "Select your rental duration and complete payment",
    icon: "💳",
    bgColor: "from-gold/30 to-gold/10"
  },
  {
    id: 3,
    title: "Receive",
    description: "Get your items delivered or pick them up",
    icon: "📦",
    bgColor: "from-gold/20 to-gold/5"
  },
  {
    id: 4,
    title: "Return",
    description: "Return when done or extend your rental period",
    icon: "♻️",
    bgColor: "from-gold/30 to-gold/10"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 font-playfair"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How It <span className="text-gold">Works</span>
          </motion.h2>
          <motion.p 
            className="text-light-dark max-w-xl mx-auto font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Renting with us is simple and hassle-free
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 * index }}
            >
              <Card className="bg-dark-light border border-gold/30 h-full relative z-10 overflow-hidden card-hover-effect">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-20`}></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-dark-lighter rounded-full flex items-center justify-center mb-5 text-3xl shadow-lg border border-gold/20 animate-gold-glow">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-gold font-playfair">
                      {step.title}
                    </h3>
                    <p className="text-light-dark font-montserrat">
                      {step.description}
                    </p>
                    <div className="mt-4 text-2xl text-gold/40">
                      {index < steps.length - 1 ? "↓" : "✓"}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gold/50 to-transparent transform -translate-y-1/2 z-0" 
                     style={{width: "calc(100% - 2rem)", left: "calc(100% - 1rem)"}}></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
