
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const About = () => {
  const features = [
    "Direct farmer-to-consumer connection",
    "Support for local agriculture",
    "Fresher, healthier food options",
    "Transparent pricing and practices",
    "Reduced food miles and environmental impact",
    "Stronger local food economy"
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      bio: "Former agricultural economist with a passion for sustainable farming"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Farmer Relations",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Third-generation farmer turned technology advocate"
    },
    {
      name: "Emily Chen",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      bio: "UX specialist focused on creating seamless experiences"
    },
    {
      name: "David Wilson",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      bio: "Supply chain expert with 15+ years in the food industry"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-muted/30 -z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/0 -z-10" />
          
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <Badge variant="secondary" className="mb-4">Our Mission</Badge>
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">
                  Revolutionizing How Food Gets From Farm to Table
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  FreshLink is building a more equitable, transparent, and sustainable food system
                  by connecting farmers directly with consumers. We believe in fair prices for farmers
                  and fresh, local food for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="gap-2">
                    Join Our Mission
                    <ArrowRight size={16} />
                  </Button>
                  <Button size="lg" variant="outline">
                    Meet Our Team
                  </Button>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1470&auto=format&fit=crop" 
                  alt="Farmers and consumers" 
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=1376&auto=format&fit=crop" 
                    alt="Farmers at work" 
                    className="w-full rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white dark:bg-card p-6 rounded-lg shadow-lg border border-border hidden md:block">
                    <p className="font-medium mb-1">Founded</p>
                    <p className="text-3xl font-bold text-primary">2023</p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <Badge variant="secondary" className="mb-4">Our Story</Badge>
                <h2 className="text-3xl font-bold mb-6">From Idea to Impact</h2>
                <p className="text-muted-foreground mb-6">
                  FreshLink began with a simple observation: farmers were struggling to make ends meet while
                  consumers were paying premium prices for produce that wasn't always fresh. The disconnect
                  between these two groups was costing both sides.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our founder, Sarah Johnson, a former agricultural economist, saw an opportunity to use
                  technology to bridge this gap. She assembled a team of experts in agriculture, technology,
                  and supply chain management to create a platform that would make it easy for farmers to
                  sell directly to consumers.
                </p>
                <p className="font-medium">
                  Today, FreshLink is helping hundreds of farmers increase their profits while providing
                  consumers with fresher, more nutritious food at better prices.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl font-bold mb-4">Better for Farmers, Better for You</h2>
              <p className="text-muted-foreground">
                Our platform is designed to create value for everyone involved in the food system,
                from the farmers who grow the food to the consumers who enjoy it.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start p-6 bg-background rounded-lg border border-border shadow-sm">
                  <div className="p-2 rounded-full bg-primary/10 mr-4">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">Our Team</Badge>
              <h2 className="text-3xl font-bold mb-4">Meet the Faces Behind FreshLink</h2>
              <p className="text-muted-foreground">
                Our diverse team brings together expertise in agriculture, technology, 
                and business to create a better food system for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-background rounded-lg border border-border overflow-hidden transition-all hover:shadow-md">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Join the FreshLink Revolution</h2>
              <p className="text-white/90 mb-8">
                Whether you're a farmer looking to expand your market or a consumer seeking fresher food,
                FreshLink can help you connect with the people who matter most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="gap-2">
                  Join as a Farmer
                  <ArrowRight size={16} />
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Shop the Marketplace
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
