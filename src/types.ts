export type Language = 'bg' | 'en' | 'de' | 'ru' | 'ro' | 'fr' | 'it';

export type Currency = 'BGN' | 'EUR';

export interface Room {
  id: string;
  nameKey: string;
  type: 'double' | 'suite' | 'villa';
  capacityAdults: number;
  capacityChildren: number;
  bedType: string;
  sizeSqm: number;
  priceBgnPerNight: number;
  priceEurPerNight: number;
  coverImage: string;
  galleryImages: string[];
  features: string[];
  amenities: string[];
  badge?: string;
  isPopular?: boolean;
}

export interface ExtraService {
  id: string;
  nameKey: string;
  descriptionKey: string;
  priceBgn: number;
  priceEur: number;
  perPerson?: boolean;
  perNight?: boolean;
  iconName: string;
}

export interface Reservation {
  id: string;
  referenceCode: string;
  createdAt: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  roomId: string;
  roomName: string;
  selectedExtras: {
    id: string;
    name: string;
    priceBgn: number;
    priceEur: number;
  }[];
  specialRequests?: string;
  estimatedArrival?: string;
  baseTotalBgn: number;
  baseTotalEur: number;
  extrasTotalBgn: number;
  extrasTotalEur: number;
  discountBgn: number;
  discountEur: number;
  promoCodeApplied?: string;
  finalTotalBgn: number;
  finalTotalEur: number;
  status: 'confirmed' | 'cancelled';
  currency: Currency;
  paymentPreference: 'pay_at_property' | 'bank_transfer' | 'card_guarantee';
}

export interface Dish {
  id: string;
  category: 'breakfast' | 'salads' | 'mains' | 'specialties' | 'desserts' | 'wines';
  nameKey: string;
  descKey: string;
  priceBgn: number;
  priceEur: number;
  isBalkanSpecialty?: boolean;
  isChefRecommendation?: boolean;
  dietary?: string[];
}

export interface Attraction {
  id: string;
  nameKey: string;
  descKey: string;
  distance: string;
  driveTime: string;
  imageUrl: string;
  highlightKey: string;
  mapCoordinates: { lat: number; lng: number };
}

export interface Review {
  id: string;
  author: string;
  cityCountry: string;
  date: string;
  rating: number; // out of 10 or 5
  commentKey: string;
  roomStayedKey: string;
  verified: boolean;
}

export interface TableReservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  specialRequests?: string;
  createdAt: string;
}
