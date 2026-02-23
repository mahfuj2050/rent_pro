export type PropertyStatus = 'Vacant' | 'Rented';
export type RentStatus = 'Unpaid' | 'Partial' | 'Paid';
export type ExpenseCategory = 'Maintenance' | 'Utility' | 'Tax' | 'Other';
export type SMSStatus = 'Sent' | 'Failed';

export interface Property {
  id: string;
  name: string;
  address: string;
  property_type: string;
  status: PropertyStatus;
  base_rent: number;
  bedrooms?: number;
  bathrooms?: number;
  kitchens?: number;
  terraces?: number;
  gas_included?: boolean;
  water_included?: boolean;
  electricity_included?: boolean;
  image_urls?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Tenant {
  id: string;
  full_name: string;
  phone: string;
  permanent_address: string;
  family_members_count: number;
  nid_number: string;
  dob: string;
  nid_front_url?: string;
  nid_back_url?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  // UI Helpers
  propertyId?: string;
  propertyName?: string;
  agreedRent?: number;
  advanceAmount?: number;
}

export interface Lease {
  id: string;
  property_id: string;
  tenant_id: string;
  start_date: string;
  end_date?: string;
  monthly_rent: number;
  utility_bills_included: boolean;
  advance_amount: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  // Joined fields for UI
  property_name?: string;
  tenant_name?: string;
}

export interface RentDue {
  id: string;
  lease_id: string;
  month_year: string;
  amount_due: number;
  amount_paid: number;
  status: RentStatus;
  created_at?: string;
  updated_at?: string;
  // Joined fields for UI
  tenant_name?: string;
  property_name?: string;
}

export interface Payment {
  id: string;
  rent_due_id: string;
  amount_paid: number;
  payment_date: string;
  payment_method: string;
  transaction_id?: string;
  received_by?: string;
  created_at?: string;
}

export interface Expense {
  id: string;
  property_id?: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  description?: string;
  created_at?: string;
}

export interface SMSLog {
  id: string;
  tenant_id?: string;
  message_body: string;
  sent_at: string;
  status: SMSStatus;
  created_at?: string;
}

export interface DashboardStats {
  totalFlats: number;
  totalRented: number;
  vacantUnits: number;
  rentPaidThisMonth: number;
  totalOutstanding: number;
}
