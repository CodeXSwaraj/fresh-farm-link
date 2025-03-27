
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Calendar, 
  Ruler, 
  Award, 
  ChevronLeft,
  Leaf
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Farmer } from '@/components/FarmerCard';
import { supabase } from '@/integrations/supabase/client';

const FarmerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFarmerDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('farmers')
          .select('*')
          .eq('id', id)
          .maybeSingle();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setFarmer(data);
        }
      } catch (error) {
        console.error('Error fetching farmer details:', error);
        toast({
          title: "Error",
          description: "Failed to load farmer details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFarmerDetails();
  }, [id, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!farmer) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Farmer Not Found</h2>
            <p className="text-muted-foreground mb-6">The farmer you're looking for does not exist or has been removed.</p>
            <Button asChild>
              <Link to="/farmers">Back to Farmers</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const initials = farmer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="mb-6">
            <Button variant="ghost" asChild className="pl-0">
              <Link to="/farmers" className="inline-flex items-center">
                <ChevronLeft size={16} className="mr-2" />
                Back to Farmers
              </Link>
            </Button>
          </div>
          
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <img 
              src={farmer.image} 
              alt={farmer.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-white">
                  <AvatarImage src={farmer.avatar} alt={farmer.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white text-shadow">{farmer.name}</h1>
                  <div className="flex items-center text-white/90 text-shadow">
                    <MapPin size={16} className="mr-1" />
                    {farmer.location}, India
                  </div>
                </div>
              </div>
              
              {farmer.rating && (
                <Badge variant="secondary" className="flex items-center h-8 px-3">
                  <Star size={14} className="mr-1.5 fill-secondary-foreground" />
                  {farmer.rating.toFixed(1)} Rating
                </Badge>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About {farmer.name}</CardTitle>
                  <CardDescription>Farmer Profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{farmer.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Farming Experience</h3>
                        <p className="text-muted-foreground">{farmer.years_farming} years</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Ruler className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Farm Size</h3>
                        <p className="text-muted-foreground">{farmer.farm_size}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Certifications</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {farmer.certification?.map((cert) => (
                            <Badge key={cert} variant="outline">{cert}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      {farmer.organic ? (
                        <>
                          <Leaf className="h-5 w-5 text-farm-600 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Farming Method</h3>
                            <Badge variant="farm" className="mt-2">Organic Certified</Badge>
                          </div>
                        </>
                      ) : (
                        <>
                          <Leaf className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <h3 className="font-medium">Farming Method</h3>
                            <p className="text-muted-foreground">Traditional</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Specialties and produce</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product Type</TableHead>
                          <TableHead>Availability</TableHead>
                          <TableHead>Specialty</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {farmer.specialty?.map((item) => (
                          <TableRow key={item}>
                            <TableCell className="font-medium">{item}</TableCell>
                            <TableCell>Year-round</TableCell>
                            <TableCell>
                              {farmer.specialty?.indexOf(item) === 0 ? (
                                <Badge variant="secondary">Primary</Badge>
                              ) : (
                                <Badge variant="outline">Secondary</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Get in touch with {farmer.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p>{farmer.contact_phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p>{farmer.contact_email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Distance</h3>
                      <p>{farmer.distance} from you</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Farmer</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Featured Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md overflow-hidden border border-border">
                    <img 
                      src={`https://source.unsplash.com/featured/?${farmer.specialty?.[0].toLowerCase()},farm`} 
                      alt={farmer.specialty?.[0]} 
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium">{farmer.specialty?.[0]}</h3>
                      <p className="text-sm text-muted-foreground">Premium quality</p>
                    </div>
                  </div>
                  
                  {farmer.specialty?.[1] && (
                    <div className="rounded-md overflow-hidden border border-border">
                      <img 
                        src={`https://source.unsplash.com/featured/?${farmer.specialty[1].toLowerCase()},farm`}
                        alt={farmer.specialty[1]} 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-medium">{farmer.specialty[1]}</h3>
                        <p className="text-sm text-muted-foreground">Seasonal availability</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Products</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FarmerProfile;
