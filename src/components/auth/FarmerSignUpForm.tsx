
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface FarmerSignUpFormProps {
  onSuccess?: () => void;
}

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  location: z.string().min(3, { message: 'Location is required' }),
  phone: z.string().min(10, { message: 'Phone number is required' }),
  description: z.string().optional(),
});

const FarmerSignUpForm = ({ onSuccess }: FarmerSignUpFormProps) => {
  const { signUp, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      location: '',
      phone: '',
      description: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // First, sign up the user
      const { error, user } = await signUp(values.email, values.password, {
        name: values.name,
        type: 'farmer'
      });
      
      if (error || !user) {
        throw error || new Error('Failed to create account');
      }

      // Register user as a farmer
      const { data, error: farmerError } = await supabase
        .from('farmers')
        .insert({
          name: values.name,
          location: values.location,
          description: values.description || 'Local farmer',
          contact_phone: values.phone,
          contact_email: values.email,
          user_id: user.id,
          distance: 'Nearby',
          farm_size: 'Small farm',
        })
        .select()
        .single();

      if (farmerError) {
        throw farmerError;
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error during signup:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Farm or Farmer Name</FormLabel>
              <FormControl>
                <Input placeholder="Your farm name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Your farm location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Contact number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Your Farm</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell customers about your farm and what you produce" 
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Register as Farmer
        </Button>
      </form>
    </Form>
  );
};

export default FarmerSignUpForm;
