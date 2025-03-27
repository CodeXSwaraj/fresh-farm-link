
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  farmer: {
    id: string;
    name: string;
    location: string;
  };
  organic: boolean;
  featured?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

const ProductCard = ({ product, layout = 'grid' }: ProductCardProps) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
        duration: 3000,
      });
      return;
    }
    
    setIsAdding(true);
    try {
      await addToCart(product, 1);
    } finally {
      setIsAdding(false);
    }
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
      duration: 3000,
    });
  };
  
  const discountedPrice = product.discount 
    ? (product.price * (1 - product.discount / 100)).toFixed(2) 
    : product.price.toFixed(2);
    
  if (layout === 'list') {
    return (
      <Link 
        to={`/product/${product.id}`}
        className="group block w-full"
      >
        <div className="flex flex-col sm:flex-row gap-4 overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300">
          <div className="relative sm:w-1/3 product-image-container">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-64 sm:h-full w-full object-cover product-image" 
            />
            {product.discount && (
              <Badge variant="accent" className="absolute top-2 left-2">
                {product.discount}% OFF
              </Badge>
            )}
            {product.organic && (
              <Badge variant="farm" className="absolute top-2 right-2 flex items-center gap-1">
                <Leaf size={12} />
                Organic
              </Badge>
            )}
          </div>
          
          <div className="p-4 sm:p-6 flex flex-col flex-grow justify-between sm:w-2/3">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <h3 className="text-xl font-semibold mt-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full text-muted-foreground hover:text-accent"
                  onClick={handleWishlist}
                >
                  <Heart size={18} />
                </Button>
              </div>
              
              <div className="mt-2 mb-4">
                <p className="text-sm">
                  By <span className="text-primary font-medium">{product.farmer.name}</span> 
                  <span className="mx-1">•</span> 
                  <span className="text-muted-foreground">{product.farmer.location}</span>
                </p>
              </div>
              
              <p className="text-muted-foreground mb-6 line-clamp-2">
                Fresh {product.name.toLowerCase()} harvested daily from our sustainable farm. Perfect for healthy meals and cooking.
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-end gap-2">
                <span className="text-lg font-semibold">₹{discountedPrice}</span>
                {product.discount && (
                  <span className="text-sm text-muted-foreground line-through">₹{product.price.toFixed(2)}</span>
                )}
                <span className="text-sm text-muted-foreground">/{product.unit}</span>
              </div>
              
              {user ? (
                <Button 
                  onClick={handleAddToCart} 
                  className="gap-2"
                  disabled={isAdding}
                >
                  <ShoppingCart size={16} />
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </Button>
              ) : (
                <AuthModal
                  trigger={
                    <Button className="gap-2">
                      <ShoppingCart size={16} />
                      Add to Cart
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300 product-card">
        <div className="relative product-image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-48 w-full object-cover product-image" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {product.discount && (
            <Badge variant="accent" className="absolute top-2 left-2">
              {product.discount}% OFF
            </Badge>
          )}
          
          {product.organic && (
            <Badge variant="farm" className="absolute top-2 right-2 flex items-center gap-1">
              <Leaf size={12} />
              Organic
            </Badge>
          )}
          
          <div className={`absolute bottom-0 left-0 right-0 p-2 flex justify-between transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/90 hover:bg-white border-none h-8 w-8"
              onClick={handleWishlist}
            >
              <Heart size={16} className="text-accent" />
            </Button>
            
            {user ? (
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/90 hover:bg-white border-none h-8 w-8"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                <ShoppingCart size={16} className="text-primary" />
              </Button>
            ) : (
              <AuthModal
                trigger={
                  <Button
                    variant="outline" 
                    size="icon" 
                    className="bg-white/90 hover:bg-white border-none h-8 w-8"
                  >
                    <ShoppingCart size={16} className="text-primary" />
                  </Button>
                }
              />
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">
              {product.farmer.name} • {product.category}
            </p>
          </div>
          
          <h3 className="font-medium group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-2 flex items-end gap-1">
            <span className="text-base font-semibold">₹{discountedPrice}</span>
            {product.discount && (
              <span className="text-xs text-muted-foreground line-through">₹{product.price.toFixed(2)}</span>
            )}
            <span className="text-xs text-muted-foreground">/{product.unit}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
