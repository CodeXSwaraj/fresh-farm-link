
import { CheckCircle, Truck, ShoppingBag, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Choose Your Farmer",
      description: "Browse profiles of local farmers and select those whose practices align with your values."
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-primary" />,
      title: "Select Fresh Produce",
      description: "Add fresh, seasonal produce directly from farms to your basket with transparent pricing."
    },
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: "Fast Delivery",
      description: "Get your order delivered to your doorstep within 24 hours of harvest for maximum freshness."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Enjoy & Repeat",
      description: "Enjoy nutritious, farm-fresh food and support sustainable local agriculture."
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How FreshLink Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform connects you directly with local farmers for the freshest produce, 
            supporting sustainable agriculture and your local economy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-6 border border-border transition-all hover:border-primary/30 hover:shadow-sm relative"
            >
              {index < steps.length - 1 && (
                <div className="absolute top-10 right-0 w-full h-[2px] bg-primary/20 hidden lg:block" style={{ transform: 'translateX(50%)' }} />
              )}
              
              <div className="flex justify-center mb-6 relative z-10">
                <div className="p-3 rounded-full bg-primary/10">
                  {step.icon}
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-primary/20 lg:block hidden" />
                <div className="absolute flex items-center justify-center top-0 right-0 w-6 h-6 rounded-full bg-primary text-white font-medium text-sm lg:hidden">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-center mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-center">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" className="px-8">
            Start Shopping
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
