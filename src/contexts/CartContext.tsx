
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { Product } from '@/components/ProductCard';

interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  cartTotal: number;
  createOrder: (shippingAddress: string) => Promise<{ success: boolean; orderId?: string; error?: any }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setCartItems([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      console.error('Error fetching cart items:', error.message);
      toast.error('Failed to load cart items');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity = 1) => {
    if (!user) {
      toast.error('Please sign in to add items to your cart');
      return;
    }

    try {
      // Check if product already exists in cart
      const existingItem = cartItems.find(item => item.product_id === product.id);
      
      if (existingItem) {
        // Update quantity if product already exists
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
        toast.success(`Updated quantity in cart`, {
          description: `${product.name} (${existingItem.quantity + quantity})`
        });
      } else {
        // Add new product to cart
        const { error } = await supabase.from('cart_items').insert({
          user_id: user.id,
          product_id: product.id,
          product_name: product.name,
          product_image: product.image,
          price: product.price,
          quantity
        });

        if (error) throw error;
        await fetchCartItems();
        toast.success('Added to cart', { description: product.name });
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error.message);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      setCartItems(cartItems.filter(item => item.id !== itemId));
      toast.success('Item removed from cart');
    } catch (error: any) {
      console.error('Error removing from cart:', error.message);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;
      
      setCartItems(
        cartItems.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error: any) {
      console.error('Error updating quantity:', error.message);
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems([]);
    } catch (error: any) {
      console.error('Error clearing cart:', error.message);
      toast.error('Failed to clear cart');
    }
  };

  const createOrder = async (shippingAddress: string) => {
    if (!user) {
      toast.error('Please sign in to complete your order');
      return { success: false, error: 'Not authenticated' };
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return { success: false, error: 'Cart is empty' };
    }

    try {
      // Calculate total amount
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 
        0
      );

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          shipping_address: shippingAddress,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart after successful order
      await clearCart();
      
      toast.success('Order placed successfully!', {
        description: `Order #${order.id.slice(0, 8)} has been placed`
      });
      
      return { success: true, orderId: order.id };
    } catch (error: any) {
      console.error('Error creating order:', error.message);
      toast.error('Failed to place order', {
        description: error.message
      });
      return { success: false, error };
    }
  };

  // Calculate derived values
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value = {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    cartTotal,
    createOrder
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
