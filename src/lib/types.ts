
export interface DailyMeals {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface MessListing {
  id: string;
  name: string;
  description: string;
  distanceFromCollege: number; // in km
  foodType: 'veg' | 'non-veg' | 'both';
  pricing: {
    monthly?: number;
    quarterly?: number;
    perMeal?: number;
  };
  imageIds: string[];
  averageRating: number;
  reviewCount: number;
  dailyMenu: {
    monday: DailyMeals;
    tuesday: DailyMeals;
    wednesday: DailyMeals;
    thursday: DailyMeals;
    friday: DailyMeals;
    saturday: DailyMeals;
    sunday: DailyMeals;
  };
  address: string;
  ownerId: string;
}


export interface Property {
  id: string;
  name: string;
  collegeName: string;
  address: string;
  rent: number;
  type: 'single' | 'shared' | 'studio';
  facilities: string[];
  imageIds: string[];
  distanceFromCollege: number; // in km
  totalCapacity: number;
  currentAvailability: number;
  ownerContactNumber: string;
  propertyOwnerId: string;
  averageRating?: number;
  reviewCount?: number;
  description: string;
  messDetails?: {
    available: boolean;
    type: 'veg' | 'non-veg' | 'both';
    pricingModel: 'included' | 'per-meal' | 'monthly';
    price?: number; // Optional price, applicable for per-meal or monthly
    mealPlans: string[]; // e.g., ["Breakfast + Dinner", "All Meals"]
    timings: string; // e.g., "8-10am, 1-3pm, 8-10pm"
    distanceFromRoom: number; // in meters
  };
}

export interface Review {
  id: string;
  propertyId?: string;
  messId?: string;
  studentId: string;
  studentName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO 8601 date string
}

export interface Student {
  id: string;
  name: string;
  email: string;
  collegeName: string;
}

export interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
}

    