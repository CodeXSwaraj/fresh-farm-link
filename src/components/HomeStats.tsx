
import { ShieldCheck, Truck, Users, Leaf } from 'lucide-react';

const HomeStats = () => {
  const stats = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      value: '500+',
      label: 'Local Farmers',
      description: 'Supporting local communities across the region'
    },
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      value: '24h',
      label: 'Fast Delivery',
      description: 'From harvest to your table in under 24 hours'
    },
    {
      icon: <Leaf className="h-10 w-10 text-primary" />,
      value: '100%',
      label: 'Sustainable',
      description: 'Environmentally conscious farming practices'
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      value: 'Quality',
      label: 'Guaranteed',
      description: 'Fresh, nutritious, and chemical-free produce'
    }
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center text-center p-6 rounded-lg bg-background border border-border transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-1">{stat.value}</h3>
              <p className="font-medium mb-2">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
