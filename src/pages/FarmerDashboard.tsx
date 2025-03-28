import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Edit, Trash2, Tag, ShoppingBag, Package } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AddEditProductModal from '@/components/farmer/AddEditProductModal';

interface FarmerProfile {
  id: string;
  name: string;
  location: string;
  // other farmer fields
}

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image?: string;
  description?: string;
  inventory: number;
  organic: boolean;
  discount?: number;
}

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchFarmerProfile = async () => {
      setIsLoading(true);
      try {
        // Fetch farmer profile associated with the current user
        const { data: farmerData, error: farmerError } = await supabase
          .from('farmers')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (farmerError) throw farmerError;

        if (!farmerData) {
          // User is not registered as a farmer
          toast({
            title: "Not registered as a farmer",
            description: "Please complete your farmer registration first",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        setFarmerProfile(farmerData);

        // Fetch products for this farmer
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('farmer_id', farmerData.id);

        if (productsError) throw productsError;
        
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error fetching farmer data:', error);
        toast({
          title: "Error",
          description: "Failed to load your farmer profile",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmerProfile();
  }, [user, navigate, toast]);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsAddProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsAddProductModalOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      setProducts(products.filter(p => p.id !== productId));
      toast({
        title: "Product deleted",
        description: "Your product has been removed successfully",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const handleProductSaved = (product: Product, isNew: boolean) => {
    if (isNew) {
      setProducts([...products, product]);
    } else {
      setProducts(products.map(p => p.id === product.id ? product : p));
    }
    setIsAddProductModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!farmerProfile) {
    return null; // This should not happen due to the navigation in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{farmerProfile.name} Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your farm and products</p>
          </div>
          
          <Tabs defaultValue="products">
            <TabsList className="mb-6">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="profile">Farm Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">My Products</h2>
                <Button onClick={handleAddProduct}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>
              
              {products.length === 0 ? (
                <Card>
                  <CardContent className="py-10">
                    <div className="text-center">
                      <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No products yet</h3>
                      <p className="text-muted-foreground mb-6">Start selling your farm products by adding your first product.</p>
                      <Button onClick={handleAddProduct}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Product
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id}>
                      <div className="aspect-square relative">
                        <img 
                          src={product.image || 'https://placehold.co/600x400/png?text=Product+Image'} 
                          alt={product.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                        <div className="flex items-baseline mt-2">
                          <span className="text-lg font-bold">₹{product.price}</span>
                          <span className="text-sm text-muted-foreground ml-1">/{product.unit}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm">{product.inventory} in stock</span>
                          </div>
                          <div>
                            {product.organic && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Organic</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            className="flex-1"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Orders</h2>
              </div>
              
              <Card>
                <CardContent className="py-10">
                  <div className="text-center">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground">Orders from customers will appear here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Farm Profile</h2>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Farm Name</h3>
                      <p>{farmerProfile.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                      <p>{farmerProfile.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {isAddProductModalOpen && (
        <AddEditProductModal 
          open={isAddProductModalOpen} 
          onOpenChange={setIsAddProductModalOpen}
          farmerId={farmerProfile.id}
          product={currentProduct}
          onSave={handleProductSaved}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default FarmerDashboard;
