
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Farmer } from '@/components/FarmerCard';

const FarmerFeature = () => {
  const [featuredFarmer, setFeaturedFarmer] = useState<Farmer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedFarmer = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('farmers')
          .select('*')
          .eq('featured', true)
          .limit(1)
          .maybeSingle();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setFeaturedFarmer(data);
        }
      } catch (error) {
        console.error('Error fetching featured farmer:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedFarmer();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-muted/0 to-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">For Farmers</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Grow Your Business, Connect With Customers
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our platform and sell your produce directly to consumers. 
              No middlemen, higher profits, and a sustainable business model.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 rounded-full bg-primary/10 mr-4 mt-1">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Direct Sales Channel</h3>
                  <p className="text-muted-foreground">
                    Sell your products directly to consumers without middlemen, increasing your profits.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 rounded-full bg-primary/10 mr-4 mt-1">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Simple Management Tools</h3>
                  <p className="text-muted-foreground">
                    Easy-to-use dashboard to manage your inventory, orders, and customer relationships.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 rounded-full bg-primary/10 mr-4 mt-1">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Market Insights</h3>
                  <p className="text-muted-foreground">
                    Access to real-time price trends and consumer preferences to optimize your offerings.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                Join as a Farmer
                <ArrowRight size={16} />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/farmers">Meet Our Farmers</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {isLoading ? (
              <div className="relative rounded-lg overflow-hidden shadow-2xl bg-muted h-[500px] animate-pulse" />
            ) : featuredFarmer ? (
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <img 
                  src={featuredFarmer.image} 
                  alt={featuredFarmer.name} 
                  className="w-full h-[500px] object-cover"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    {featuredFarmer.rating && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Star size={12} className="fill-secondary-foreground" />
                        {featuredFarmer.rating.toFixed(1)}
                      </Badge>
                    )}
                    {featuredFarmer.organic && (
                      <Badge variant="farm">Organic Farmer</Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{featuredFarmer.name}</h3>
                  <p className="text-white/90">
                    "KisanDirect helped me increase my profits by 40% by selling directly to customers."
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mt-3"
                    asChild
                  >
                    <Link to={`/farmers/${featuredFarmer.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <img 
                  src="https://images.unsplash.com/photo-1592878849122-5c6e3c2a75f1?q=80&w=1480&auto=format&fit=crop" 
                  alt="Local farmer" 
                  className="w-full h-[500px] object-cover"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star size={12} className="fill-secondary-foreground" />
                      4.9
                    </Badge>
                    <Badge variant="farm">Organic Farmer</Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">Indian Farmer</h3>
                  <p className="text-white/90">
                    "KisanDirect helped me increase my profits by 40% by selling directly to customers."
                  </p>
                </div>
              </div>
            )}
            
            <div className="absolute -bottom-6 -right-6 rounded-lg bg-background p-4 shadow-lg border border-border hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">+65%</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average profit increase</p>
                  <p className="font-medium">for our partner farmers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerFeature;
