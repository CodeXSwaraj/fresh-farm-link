
import { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1582652900294-d6ea373de4ae?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551649001-7a2482d98d05?q=80&w=2071&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1624461074603-1204d20451d8?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600353565370-27303ee0c52c?q=80&w=2070&auto=format&fit=crop',
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Redirect to marketplace with search query
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <section className="relative h-[600px] sm:h-[650px] flex items-center overflow-hidden">
      {/* Background images with crossfade effect */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentImage === index ? 1 : 0,
            zIndex: -10,
          }}
        />
      ))}
      
      {/* Overlay with Indian flag inspired colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/70 via-black/40 to-[#138808]/60 z-0" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-lg">
          <div className="animate-slide-down">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              भारतीय किसानों से<br />सीधे आपके घर तक
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Connect directly with local Indian farmers and get the freshest produce delivered to your doorstep. Support sustainable farming and eat healthier.
            </p>
          </div>
          
          <div className="animate-slide-up">
            <form onSubmit={handleSearch} className="flex max-w-md mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for fresh vegetables, fruits..."
                  className="pl-9 py-6 rounded-l-lg border-r-0 bg-white/95 backdrop-blur-sm focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="rounded-l-none px-6 bg-accent hover:bg-accent/90">
                Search
              </Button>
            </form>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" className="px-6 bg-accent hover:bg-accent/90">
                Shop Marketplace
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-6">
                Meet Our Farmers
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
