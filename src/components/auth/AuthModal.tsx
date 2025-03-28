
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import FarmerSignUpForm from './FarmerSignUpForm';
import { Button } from '@/components/ui/button';

interface AuthModalProps {
  defaultTab?: 'signin' | 'signup' | 'farmer-signup';
  trigger?: React.ReactNode;
}

const AuthModal = ({ defaultTab = 'signin', trigger }: AuthModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Sign In</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Welcome to KisanDirect
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="farmer-signup">Farmer</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignInForm onSuccess={() => setOpen(false)} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm onSuccess={() => setOpen(false)} />
          </TabsContent>
          <TabsContent value="farmer-signup">
            <FarmerSignUpForm onSuccess={() => setOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
