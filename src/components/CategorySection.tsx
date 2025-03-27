
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

interface CategorySectionProps {
  title: string;
  subtitle?: string;
  categories: Category[];
}

const CategorySection = ({ title, subtitle, categories }: CategorySectionProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/category/${category.id}`}
              className="group relative rounded-lg overflow-hidden aspect-square transition-all duration-500 hover:shadow-md"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent z-10" />
              
              <img
                src={category.image}
                alt={category.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  hoveredId === category.id ? 'scale-110' : 'scale-100'
                }`}
              />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm mb-4">{category.count} Products</p>
                
                <Button 
                  variant="outline"
                  size="sm"
                  className={`w-fit bg-white/10 text-white border-white/20 hover:bg-white/20 transition-opacity duration-300 ${
                    hoveredId === category.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Browse
                  <ArrowRight size={14} className={`ml-2 transition-transform duration-300 ${
                    hoveredId === category.id ? 'translate-x-1' : ''
                  }`} />
                </Button>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <a href="/categories">
              View All Categories
              <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
