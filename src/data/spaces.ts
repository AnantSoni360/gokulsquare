export interface Space {
  id: string;
  title: string;
  unit: string;
  floor: string;
  area: string;
  status: "Available Now" | "Leased" | "Coming Soon";
  image: string;
  description: string;
  amenities: string[];
  price?: string;
  category: "Retail" | "Office" | "Dining";
}

export const spacesData: Space[] = [
  {
    "id": "unit-1",
    "title": "Business",
    "unit": "Unit 1",
    "floor": "Ground Floor",
    "area": "1500 sqft",
    "status": "Available Now",
    "category": "Office",
    "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    "price": "Contact for pricing",
    "description": "Premium office space located on the Ground Floor. Ideal for business.",
    "amenities": [
      "all features"
    ]
  },
  {
    "id": "unit-104",
    "title": "Business / Ca Firm",
    "unit": "Unit 104",
    "floor": "First Floor",
    "area": "500 sqft",
    "status": "Available Now",
    "category": "Office",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424185/104_gxuxb8.jpg",
    "price": "Contact for pricing",
    "description": "Premium office space located on the First Floor. Ideal for buisness,ca firm.",
    "amenities": [
      "AC",
      "False Ceiling",
      "Glass Partition"
    ]
  },
  {
    "id": "unit-105",
    "title": "Business / Ca Firm",
    "unit": "Unit 105",
    "floor": "First Floor",
    "area": "500 sqft",
    "status": "Available Now",
    "category": "Office",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424185/105_rorz9f.jpg",
    "price": "Contact for pricing",
    "description": "Premium office space located on the First Floor. Ideal for buisness,ca firm.",
    "amenities": [
      "AC",
      "False Ceiling",
      "Glass Partition"
    ]
  },
  {
    "id": "unit-106",
    "title": "Business / Cafe / Shop",
    "unit": "Unit 106",
    "floor": "First Floor",
    "area": "1000 sqft",
    "status": "Available Now",
    "category": "Dining",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424185/106_yno4rq.jpg",
    "price": "Contact for pricing",
    "description": "Premium dining space located on the First Floor. Ideal for buisness,cafe,shop.",
    "amenities": [
      "AC",
      "False Ceiling",
      "Glass Partition"
    ]
  },
  {
    "id": "unit-202",
    "title": "Business / Cafe / Shop",
    "unit": "Unit 202",
    "floor": "Second Floor",
    "area": "1600 sqft",
    "status": "Available Now",
    "category": "Dining",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424185/202_uegzj5.jpg",
    "price": "Contact for pricing",
    "description": "Premium dining space located on the Second Floor. Ideal for buisness,cafe,shop.",
    "amenities": [
      "AC",
      "False Ceiling",
      "Glass Partition"
    ]
  },
  {
    "id": "unit-204",
    "title": "Business / Cafe / Shop",
    "unit": "Unit 204",
    "floor": "Second Floor",
    "area": "1000 sqft",
    "status": "Available Now",
    "category": "Dining",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424184/204_eczlur.jpg",
    "price": "Contact for pricing",
    "description": "Premium dining space located on the Second Floor. Ideal for buisness,cafe,shop.",
    "amenities": [
      "AC",
      "False Ceiling"
    ]
  },
  {
    "id": "unit-205",
    "title": "Business / Cafe / Shop",
    "unit": "Unit 205",
    "floor": "Second Floor",
    "area": "1200 sqft",
    "status": "Available Now",
    "category": "Dining",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424184/205_vgsijm.jpg",
    "price": "Contact for pricing",
    "description": "Premium dining space located on the Second Floor. Ideal for buisness,cafe,shop.",
    "amenities": [
      "AC",
      "False Ceiling"
    ]
  },
  {
    "id": "unit-206",
    "title": "Business / Cafe / Shop",
    "unit": "Unit 206",
    "floor": "Second Floor",
    "area": "1000 sqft",
    "status": "Available Now",
    "category": "Dining",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424184/206_fyadiv.jpg",
    "price": "Contact for pricing",
    "description": "Premium dining space located on the Second Floor. Ideal for buisness,cafe,shop.",
    "amenities": [
      "AC",
      "False Ceiling"
    ]
  },
  {
    "id": "unit-303",
    "title": "IT Office / CA Firm",
    "unit": "Unit 303",
    "floor": "Third Floor",
    "area": "250 sqft",
    "status": "Available Now",
    "category": "Office",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424184/303_ertgmm.jpg",
    "price": "Contact for pricing",
    "description": "Premium office space located on the Third Floor. Ideal for IT Office, CA Firm.",
    "amenities": [
      "AC",
      "False Ceiling"
    ]
  },
  {
    "id": "unit-307",
    "title": "IT Office / CA Firm",
    "unit": "Unit 307",
    "floor": "Third Floor",
    "area": "250 sqft",
    "status": "Available Now",
    "category": "Office",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424184/307_l2yio3.jpg",
    "price": "Contact for pricing",
    "description": "Premium office space located on the Third Floor. Ideal for IT Office, CA Firm.",
    "amenities": [
      "AC",
      "False Ceiling"
    ]
  },
  {
    "id": "unit-308",
    "title": "IT Office / CA Firm",
    "unit": "Unit 308",
    "floor": "Third Floor",
    "area": "250 sqft",
    "status": "Available Now",
    "category": "Office",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424184/308_zjzqz8.jpg",
    "price": "Contact for pricing",
    "description": "Premium office space located on the Third Floor. Ideal for IT Office, CA Firm.",
    "amenities": [
      "AC",
      "False Ceiling"
    ]
  },
  {
    "id": "unit-309",
    "title": "IT Office / CA Firm",
    "unit": "Unit 309",
    "floor": "Third Floor",
    "area": "250 sqft",
    "status": "Available Now",
    "category": "Office",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424184/309_f5jnqe.jpg",
    "price": "Contact for pricing",
    "description": "Premium office space located on the Third Floor. Ideal for IT Office, CA Firm.",
    "amenities": [
      "AC",
      "False Ceiling"
    ]
  },
  {
    "id": "unit-312",
    "title": "IT Office / CA Firm",
    "unit": "Unit 312",
    "floor": "Third Floor",
    "area": "250 sqft",
    "status": "Available Now",
    "category": "Office",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424184/312_aotccy.jpg",
    "price": "Contact for pricing",
    "description": "Premium office space located on the Third Floor. Ideal for IT Office, CA Firm.",
    "amenities": [
      "AC",
      "False Ceiling"
    ]
  },
  {
    "id": "unit-313",
    "title": "IT Office / CA Firm",
    "unit": "Unit 313",
    "floor": "Third Floor",
    "area": "250 sqft",
    "status": "Available Now",
    "category": "Office",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424183/313_u7huup.jpg",
    "price": "Contact for pricing",
    "description": "Premium office space located on the Third Floor. Ideal for IT Office, CA Firm.",
    "amenities": [
      "AC",
      "False Ceiling"
    ]
  },
  {
    "id": "unit-315",
    "title": "IT Office / CA Firm",
    "unit": "Unit 315",
    "floor": "Third Floor",
    "area": "230 sqft",
    "status": "Available Now",
    "category": "Office",
    "image": "https://res.cloudinary.com/dnjci8etz/image/upload/v1783424183/315_y0ibrl.jpg",
    "price": "Contact for pricing",
    "description": "Premium office space located on the Third Floor. Ideal for IT Office, CA Firm.",
    "amenities": [
      "AC",
      "False Ceiling"
    ]
  }
];
