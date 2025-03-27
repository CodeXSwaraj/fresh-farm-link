
import Hero from '@/components/Hero';
import HomeStats from '@/components/HomeStats';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategorySection from '@/components/CategorySection';
import HowItWorks from '@/components/HowItWorks';
import FarmerFeature from '@/components/FarmerFeature';
import TestimonialSection from '@/components/TestimonialSection';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { mockCategories, mockProducts, mockTestimonials } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        <Hero />
        
        <HomeStats />
        
        <FeaturedProducts 
          title="Featured Products" 
          subtitle="Freshly harvested and delivered directly to your doorstep"
          products={mockProducts.filter(p => p.featured)}
          viewAllLink="/marketplace"
        />
        
        <CategorySection 
          title="Browse by Category"
          subtitle="Explore our wide range of farm-fresh products"
          categories={mockCategories}
        />
        
        <HowItWorks />
        
        <FeaturedProducts 
          title="Weekly Special Offers" 
          subtitle="Take advantage of these limited-time deals"
          products={mockProducts.filter(p => p.discount)}
          viewAllLink="/deals"
        />
        
        <FarmerFeature />
        
        <TestimonialSection testimonials={mockTestimonials} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
