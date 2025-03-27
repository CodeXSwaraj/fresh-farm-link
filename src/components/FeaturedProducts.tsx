
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard, { Product } from '@/components/ProductCard';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

const FeaturedProducts = ({ 
  title, 
  subtitle, 
  products, 
  viewAllLink 
}: FeaturedProductsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % Math.max(1, products.length - 3)
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, products.length - 4) : prevIndex - 1
    );
  };
  
  const visibleProducts = products.slice(currentIndex, currentIndex + 4);
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="h-9 w-9 rounded-full border-border"
              >
                <ArrowLeft size={16} />
                <span className="sr-only">Previous</span>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex >= products.length - 4}
                className="h-9 w-9 rounded-full border-border"
              >
                <ArrowRight size={16} />
                <span className="sr-only">Next</span>
              </Button>
            </div>
            
            {viewAllLink && (
              <Button variant="link" asChild className="text-primary font-medium">
                <a href={viewAllLink}>View All</a>
              </Button>
            )}
          </div>
        </div>
        
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ 
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {visibleProducts.map((product) => (
            <div key={product.id} className="animate-scale-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
