
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ShoppingBag, Package, Calendar, FileText, ArrowLeft, Loader2, User, Phone, MapPin, CheckCircle2, Truck, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  shipping_address: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
}

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchOrder = async () => {
      try {
        // Fetch order details
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .single();

        if (orderError) throw orderError;
        if (!orderData) throw new Error('Order not found');
        
        setOrder(orderData);

        // Fetch order items
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', id)
          .order('product_name', { ascending: true });

        if (itemsError) throw itemsError;
        setOrderItems(itemsData || []);

      } catch (error: any) {
        console.error('Error fetching order:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user, navigate, id]);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="flex items-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Loading order details...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-5xl text-center py-12">
            <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
            <p className="mb-6">{error || 'Order not found'}</p>
            <Button onClick={() => navigate('/orders')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/orders')}
              className="mr-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Button>
            <h1 className="text-2xl font-bold">Order #{order.id.slice(0, 8)}</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="bg-card rounded-lg border">
                <div className="bg-muted/30 p-4 border-b">
                  <h2 className="font-medium flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Items in Your Order
                  </h2>
                </div>
                
                <div className="p-4 divide-y">
                  {orderItems.map((item) => (
                    <div key={item.id} className="py-4 flex">
                      <div className="h-20 w-20 rounded-md border overflow-hidden flex-shrink-0">
                        {item.product_image ? (
                          <img src={item.product_image} alt={item.product_name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-muted flex items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className="font-medium">{item.product_name}</h4>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} x {item.quantity}</span>
                          <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Shipping Details */}
              <div className="bg-card rounded-lg border">
                <div className="bg-muted/30 p-4 border-b">
                  <h2 className="font-medium flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Shipping Information
                  </h2>
                </div>
                
                <div className="p-4">
                  <div className="flex flex-col md:flex-row md:gap-8">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Delivery Address</p>
                          <p className="mt-1">{order.shipping_address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              {/* Order Summary */}
              <div className="bg-card rounded-lg border sticky top-24">
                <div className="bg-muted/30 p-4 border-b">
                  <h2 className="font-medium flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Order Summary
                  </h2>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center mr-3 ${
                      getStatusColor(order.status).replace('text-', 'bg-').replace('-100', '-600').replace('-200', '-600')}`
                    }>
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Order Date</p>
                      <p className="font-medium">{format(new Date(order.created_at), 'MMMM dd, yyyy')}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{order.total_amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{order.total_amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetails;
