
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, X, Leaf } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import FarmerCard, { Farmer } from '@/components/FarmerCard';
import { supabase } from '@/integrations/supabase/client';

const locations = [
  "All Locations",
  "Gujarat",
  "Punjab", 
  "Andhra Pradesh",
  "Rajasthan"
];

const specialties = [
  "All",
  "Wheat",
  "Rice",
  "Cotton",
  "Millet",
  "Vegetables",
  "Lentils",
  "Chillies",
  "Turmeric",
  "Mustard"
];

const Farmers = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [isOrganic, setIsOrganic] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  
  // Extract search query from URL on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);
  
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('farmers')
          .select('*');
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setFarmers(data);
          setFilteredFarmers(data);
        }
      } catch (error) {
        console.error('Error fetching farmers:', error);
        toast({
          title: "Error",
          description: "Failed to load farmers data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFarmers();
  }, [toast]);
  
  // Apply filters when parameters change
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedLocation, selectedSpecialty, isOrganic, sortBy, farmers]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    navigate(`/farmers?search=${encodeURIComponent(searchQuery.trim())}`);
  };
  
  const applyFilters = () => {
    let result = [...farmers];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(farmer => 
        farmer.name.toLowerCase().includes(query) || 
        farmer.location.toLowerCase().includes(query) ||
        (farmer.specialty && farmer.specialty.some(s => s.toLowerCase().includes(query)))
      );
    }
    
    // Filter by location
    if (selectedLocation !== "All Locations") {
      result = result.filter(farmer => farmer.location === selectedLocation);
    }
    
    // Filter by specialty
    if (selectedSpecialty !== "All") {
      result = result.filter(farmer => 
        farmer.specialty?.includes(selectedSpecialty)
      );
    }
    
    // Filter by organic
    if (isOrganic) {
      result = result.filter(farmer => farmer.organic);
    }
    
    // Sort farmers
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "distance":
        // In a real app, would sort by actual distance
        result = [...result];
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Sort featured first
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }
    
    setFilteredFarmers(result);
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("All Locations");
    setSelectedSpecialty("All");
    setIsOrganic(false);
    setSortBy("featured");
    // Clear URL search params
    navigate('/farmers');
  };
  
  const hasActiveFilters = searchQuery !== "" || selectedLocation !== "All Locations" || 
    selectedSpecialty !== "All" || isOrganic;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Meet Our Kisan Farmers</h1>
                <p className="text-muted-foreground">Find and connect with local farmers across India</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="mb-8 max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search farmers by name or location..."
                className="pl-10 pr-24 py-6 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10">
                Search
              </Button>
            </form>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar filters */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Location</h3>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Specialty</h3>
                <div className="space-y-1">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => setSelectedSpecialty(specialty)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedSpecialty === specialty
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Filters</h3>
                <button
                  onClick={() => setIsOrganic(!isOrganic)}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted"
                >
                  {isOrganic ? (
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-primary">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  Organic Farmers Only
                </button>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Sort By</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {selectedLocation !== "All Locations" && (
                    <Badge variant="secondary" className="gap-1">
                      <MapPin size={12} />
                      {selectedLocation}
                      <button onClick={() => setSelectedLocation("All Locations")}>
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  {selectedSpecialty !== "All" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedSpecialty}
                      <button onClick={() => setSelectedSpecialty("All")}>
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  {isOrganic && (
                    <Badge variant="farm" className="gap-1">
                      <Leaf size={12} />
                      Organic
                      <button onClick={() => setIsOrganic(false)}>
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                </div>
                
                <div className="hidden sm:block">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={applyFilters}
                    className="h-8"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="border border-border rounded-lg overflow-hidden">
                      <div className="h-48 bg-muted animate-pulse" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                        <div className="h-8 bg-muted animate-pulse rounded mt-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredFarmers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    <SlidersHorizontal size={40} className="mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No farmers found</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Try changing your filters or search query
                  </p>
                  <Button onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    Showing {filteredFarmers.length} farmers
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredFarmers.map((farmer) => (
                      <FarmerCard key={farmer.id} farmer={farmer} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Farmers;
