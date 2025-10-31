export enum PackageCategory {
  National = 'national',
  International = 'international',
}

export interface TravelPackage {
  id: number;
  imageUrl: string;
  duration: string;
  title: string;
  priceFrom: number;
  tag?: string;
  locations?: string[];
}

export interface Addon {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface QuoteDetails {
  packageName: string;
  departureDate?: Date | null;
  adults?: number;
  children?: number;
  infants?: number;
  totalPrice?: number;
  addons?: Addon[];
}
