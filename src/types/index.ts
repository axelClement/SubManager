export type BillingCycle = 'monthly' | 'yearly';

export type Category = 
  | 'streaming' 
  | 'utilities' 
  | 'mobile' 
  | 'internet' 
  | 'gaming' 
  | 'software' 
  | 'insurance' 
  | 'gym' 
  | 'other';

export interface CancellationMethod {
  type: 'online' | 'letter' | 'phone' | 'email';
  steps: string[];
  link?: string; // URL for online cancellation
  address?: string; // Address for letter
  phoneNumber?: string;
  email?: string;
}

export interface Alternative {
  id: string;
  name: string;
  price: number;
  description: string;
  savings: number; // Potential savings per month
  link?: string;
}

export interface Subscription {
  id: string;
  name: string;
  serviceName: string; // e.g., "Netflix", "EDF"
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  nextPaymentDate: string; // ISO date string
  startDate: string; // ISO date string
  category: Category;
  logoUrl?: string; // URL to logo image
  cancellationMethod?: CancellationMethod;
  alternatives?: Alternative[];
  active: boolean;
}
