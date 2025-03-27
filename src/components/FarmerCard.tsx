
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ChevronRight, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface Farmer {
  id: string;
  name: string;
  location: string;
  image: string;
  avatar?: string;
  distance?: string;
  rating?: number;
  organic?: boolean;
  specialty?: string[];
  featured?: boolean;
}

interface FarmerCardProps {
  farmer: Farmer;
}

const FarmerCard = ({ farmer }: FarmerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const initials = farmer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
    
  return (
    <Link 
      to={`/farmers/${farmer.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={farmer.image} 
            alt={farmer.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-2 left-2 flex space-x-2">
            {farmer.organic && (
              <Badge variant="farm" className="flex items-center gap-1">
                <Leaf size={12} />
                Organic
              </Badge>
            )}
            
            {farmer.featured && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star size={12} className="fill-secondary-foreground" />
                Featured
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="flex items-center space-x-3">
              <Avatar className="border-2 border-white h-10 w-10">
                <AvatarImage src={farmer.avatar} alt={farmer.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-semibold text-white text-shadow">{farmer.name}</h3>
                <div className="flex items-center text-white/90 text-sm text-shadow">
                  <MapPin size={14} className="mr-1" />
                  {farmer.location}
                </div>
              </div>
            </div>
            
            {farmer.rating && (
              <Badge variant="secondary" className="flex items-center h-6">
                <Star size={12} className="mr-1 fill-secondary-foreground" />
                {farmer.rating.toFixed(1)}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              {farmer.distance && (
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  <span>{farmer.distance} away</span>
                </div>
              )}
            </div>
          </div>
          
          {farmer.specialty && farmer.specialty.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {farmer.specialty.map((item) => (
                <Badge key={item} variant="outline" className="bg-muted/50">
                  {item}
                </Badge>
              ))}
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full justify-between group-hover:text-primary transition-colors"
            asChild
          >
            <div>
              <span>View Profile</span>
              <ChevronRight size={16} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </div>
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default FarmerCard;
