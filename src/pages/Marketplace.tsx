
import { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, Search, ChevronDown, Leaf, Circle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Dairy & Eggs",
  "Herbs",
  "Specialty"
];

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOrganic, setIsOrganic] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by organic
    if (isOrganic) {
      result = result.filter(product => product.organic);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        product.farmer.name.toLowerCase().includes(query)
      );
    }
    
    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, would sort by date
        result = [...result];
        break;
      default:
        // In a real app, would have a recommended sorting algorithm
        result = [...result];
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, isOrganic, sortBy]);
  
  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setIsOrganic(false);
    setSortBy("recommended");
  };
  
  const hasActiveFilters = selectedCategory !== "All" || searchQuery !== "" || isOrganic;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
                <p className="text-muted-foreground">Browse farm-fresh products from local farmers</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 md:hidden">
                      <Filter size={16} />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      <div className="mb-4">
                        <label className="text-sm font-medium block mb-2">Categories</label>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                selectedCategory === category
                                  ? 'bg-primary/10 text-primary'
                                  : 'hover:bg-muted'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="text-sm font-medium block mb-2">Sort By</label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recommended">Recommended</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="mb-4">
                        <button
                          onClick={() => setIsOrganic(!isOrganic)}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted"
                        >
                          {isOrganic ? (
                            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-primary">
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                          )}
                          Organic Only
                        </button>
                      </div>
                      
                      {hasActiveFilters && (
                        <Button 
                          variant="outline" 
                          className="w-full mt-4" 
                          onClick={clearFilters}
                        >
                          Clear All Filters
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
                
                <div className="hidden md:flex gap-2">
                  <Button 
                    variant={viewMode === 'grid' ? "default" : "outline"} 
                    size="icon" 
                    onClick={() => setViewMode('grid')}
                    className="h-9 w-9"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 1H6.5V6H1.5V1ZM8.5 1H13.5V6H8.5V1ZM1.5 8H6.5V13H1.5V8ZM8.5 8H13.5V13H8.5V8Z" fill="currentColor" />
                    </svg>
                  </Button>
                  
                  <Button 
                    variant={viewMode === 'list' ? "default" : "outline"} 
                    size="icon" 
                    onClick={() => setViewMode('list')}
                    className="h-9 w-9"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 2H13.5V4H1.5V2ZM1.5 6.5H13.5V8.5H1.5V6.5ZM1.5 11H13.5V13H1.5V11Z" fill="currentColor" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar filters - desktop only */}
            <div className="hidden lg:block space-y-6">
              <div>
                <h3 className="font-medium mb-4">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Filters</h3>
                <button
                  onClick={() => setIsOrganic(!isOrganic)}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted"
                >
                  {isOrganic ? (
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-primary">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  Organic Only
                </button>
              </div>
              
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {selectedCategory !== "All" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory("All")}>
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  {isOrganic && (
                    <Badge variant="farm" className="gap-1">
                      <Leaf size={12} />
                      Organic
                      <button onClick={() => setIsOrganic(false)}>
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="h-8 text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px] h-9">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Mobile search bar */}
              <div className="mb-6 lg:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    <SlidersHorizontal size={40} className="mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No products found</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Try changing your filters or search query
                  </p>
                  <Button onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    Showing {filteredProducts.length} products
                  </p>
                  
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} layout="list" />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
