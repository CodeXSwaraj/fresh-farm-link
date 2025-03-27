
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ShoppingBag, Package, Calendar, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  shipping_address: string;
}

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Orders</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/marketplace')}
            >
              Continue Shopping
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Loading your orders...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-lg border">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                You haven't placed any orders yet. Browse our marketplace to find fresh produce directly from farmers.
              </p>
              <Button 
                className="mt-6" 
                onClick={() => navigate('/marketplace')}
              >
                Shop Marketplace
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-card rounded-lg border overflow-hidden">
                  <div className="bg-muted/30 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-medium">{order.id.slice(0, 8)}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>
                          {format(new Date(order.created_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      
                      <div 
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-start">
                          <Package className="mr-2 h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Shipping Address</p>
                            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                              {order.shipping_address}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0">
                        <p className="font-medium flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                          Order Total
                        </p>
                        <p className="text-xl font-bold mt-1">
                          ₹{order.total_amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full sm:w-auto"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      View Order Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
