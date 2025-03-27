
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  rating: number;
  text: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const TestimonialSection = ({ testimonials }: TestimonialSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };
  
  const currentTestimonial = testimonials[activeIndex];
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "fill-secondary text-secondary" : "text-muted"} 
      />
    ));
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're proud to connect farmers and consumers, creating a sustainable food system 
            that benefits everyone.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-xl p-8 shadow-sm border border-border">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Avatar className="h-16 w-16 border-4 border-background">
                <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                <AvatarFallback className="bg-primary text-white text-lg">
                  {currentTestimonial.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="text-center pt-8 mb-6">
              <h3 className="font-semibold text-lg">{currentTestimonial.name}</h3>
              <p className="text-muted-foreground text-sm">{currentTestimonial.role}</p>
              <div className="flex justify-center mt-2">
                {renderStars(currentTestimonial.rating)}
              </div>
            </div>
            
            <blockquote className="text-center relative">
              <div className="text-6xl text-primary/20 absolute -top-8 left-0">"</div>
              <p className="text-lg relative z-10 px-8">
                {currentTestimonial.text}
              </p>
              <div className="text-6xl text-primary/20 absolute bottom-0 right-0 rotate-180">"</div>
            </blockquote>
            
            <div className="flex justify-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="h-10 w-10 rounded-full border-border"
              >
                <ArrowLeft size={18} />
                <span className="sr-only">Previous</span>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="h-10 w-10 rounded-full border-border"
              >
                <ArrowRight size={18} />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full mx-1 transition-all ${
                  activeIndex === index ? 'bg-primary w-4' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
