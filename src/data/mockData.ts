
export const mockProducts = [
  {
    id: "p1",
    name: "Organic Tomatoes",
    price: 3.99,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1524593166156-312f362cada0?q=80&w=1470&auto=format&fit=crop",
    category: "Vegetables",
    farmer: {
      id: "f1",
      name: "Green Valley Farm",
      location: "Boulder, CO"
    },
    organic: true,
    featured: true
  },
  {
    id: "p2",
    name: "Fresh Strawberries",
    price: 4.99,
    unit: "basket",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1470&auto=format&fit=crop",
    category: "Fruits",
    farmer: {
      id: "f2",
      name: "Sunny Acres",
      location: "Santa Barbara, CA"
    },
    organic: true,
    discount: 10
  },
  {
    id: "p3",
    name: "Green Lettuce",
    price: 2.49,
    unit: "head",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=1376&auto=format&fit=crop",
    category: "Vegetables",
    farmer: {
      id: "f3",
      name: "River Creek Farm",
      location: "Eugene, OR"
    },
    organic: true,
    featured: true
  },
  {
    id: "p4",
    name: "Fresh Eggs",
    price: 5.99,
    unit: "dozen",
    image: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=1470&auto=format&fit=crop",
    category: "Dairy & Eggs",
    farmer: {
      id: "f1",
      name: "Green Valley Farm",
      location: "Boulder, CO"
    },
    organic: false
  },
  {
    id: "p5",
    name: "Organic Apples",
    price: 3.49,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=1470&auto=format&fit=crop",
    category: "Fruits",
    farmer: {
      id: "f4",
      name: "Apple Ridge Orchard",
      location: "Sebastopol, CA"
    },
    organic: true,
    featured: true,
    discount: 15
  },
  {
    id: "p6",
    name: "Fresh Carrots",
    price: 2.99,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?q=80&w=1472&auto=format&fit=crop",
    category: "Vegetables",
    farmer: {
      id: "f2",
      name: "Sunny Acres",
      location: "Santa Barbara, CA"
    },
    organic: true
  },
  {
    id: "p7",
    name: "Raw Honey",
    price: 8.99,
    unit: "jar",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=1480&auto=format&fit=crop",
    category: "Specialty",
    farmer: {
      id: "f5",
      name: "Meadow Bee Farm",
      location: "Portland, OR"
    },
    organic: true,
    featured: true
  },
  {
    id: "p8",
    name: "Fresh Basil",
    price: 2.49,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1600326145308-d7dee5e28de0?q=80&w=1471&auto=format&fit=crop",
    category: "Herbs",
    farmer: {
      id: "f3",
      name: "River Creek Farm",
      location: "Eugene, OR"
    },
    organic: true
  }
];

export const mockFarmers = [
  {
    id: "f1",
    name: "Green Valley Farm",
    location: "Boulder, CO",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1469&auto=format&fit=crop",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    distance: "5 miles",
    rating: 4.8,
    organic: true,
    specialty: ["Vegetables", "Eggs", "Herbs"],
    featured: true
  },
  {
    id: "f2",
    name: "Sunny Acres",
    location: "Santa Barbara, CA",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1470&auto=format&fit=crop",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    distance: "12 miles",
    rating: 4.6,
    organic: true,
    specialty: ["Fruits", "Vegetables"],
    featured: false
  },
  {
    id: "f3",
    name: "River Creek Farm",
    location: "Eugene, OR",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1471&auto=format&fit=crop",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    distance: "8 miles",
    rating: 4.9,
    organic: true,
    specialty: ["Greens", "Herbs", "Microgreens"],
    featured: true
  },
  {
    id: "f4",
    name: "Apple Ridge Orchard",
    location: "Sebastopol, CA",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1470&auto=format&fit=crop",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    distance: "15 miles",
    rating: 4.7,
    organic: false,
    specialty: ["Apples", "Pears", "Peaches"],
    featured: false
  }
];

export const mockCategories = [
  {
    id: "c1",
    name: "Fresh Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1384&auto=format&fit=crop",
    count: 48
  },
  {
    id: "c2",
    name: "Seasonal Fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1470&auto=format&fit=crop",
    count: 36
  },
  {
    id: "c3",
    name: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1434&auto=format&fit=crop",
    count: 24
  },
  {
    id: "c4",
    name: "Herbs & Flowers",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=1470&auto=format&fit=crop",
    count: 18
  }
];

export const mockTestimonials = [
  {
    id: "t1",
    name: "Sarah Johnson",
    role: "Regular Customer",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
    text: "FreshLink has completely changed how I shop for food. The produce is so much fresher than what I used to get at the supermarket, and I love knowing exactly where my food comes from."
  },
  {
    id: "t2",
    name: "Mark Williams",
    role: "Home Chef",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 5,
    text: "As a chef, the quality of ingredients is paramount. The difference in taste when cooking with fresh, locally grown produce from FreshLink is incredible. My customers can taste the difference!"
  },
  {
    id: "t3",
    name: "Emily Chen",
    role: "Health Enthusiast",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 4,
    text: "I've been trying to eat healthier and more sustainably. FreshLink makes it easy to get organic produce directly from farmers I trust. The mobile app is also super convenient."
  }
];
