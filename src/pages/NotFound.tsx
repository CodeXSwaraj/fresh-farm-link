
import { ArrowLeft } from 'lucide-react';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-7xl py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="text-primary mb-6">
              <svg 
                width="120" 
                height="120" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mx-auto"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Oops! We couldn't find the page you're looking for.
            </p>
            
            <Button size="lg" className="gap-2" asChild>
              <a href="/">
                <ArrowLeft size={16} />
                Back to Home
              </a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
