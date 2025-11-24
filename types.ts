export type Category = 'Bags' | 'Watches' | 'Sneakers' | 'All';

export type Condition = 'Like New' | 'Gently Used' | 'Vintage';

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: Category;
  condition: Condition;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  sizes?: string[]; // Optional, watches don't have sizes
}

export interface CartItem extends Product {
  cartId: string;
  selectedSize?: string;
}

export interface User {
  name: string;
  email: string;
}

export interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}
