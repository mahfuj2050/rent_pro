import { Property, Tenant, Lease, RentDue, Payment } from './types';

export const MOCK_PROPERTIES: Property[] = [
  // 1st Floor
  { id: '1', name: 'Flat 1A', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  { id: '2', name: 'Flat 1B', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  { id: '3', name: 'Flat 1C', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  { id: '4', name: 'Flat 1D', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  // 2nd Floor
  { id: '5', name: 'Flat 2A', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  { id: '6', name: 'Flat 2B', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  { id: '7', name: 'Flat 2C', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  { id: '8', name: 'Flat 2D', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  // 3rd Floor
  { id: '9', name: 'Flat 3A', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  // 4th Floor
  { id: '10', name: 'Flat 4A', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  { id: '11', name: 'Flat 4B', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  { id: '12', name: 'Flat 4C', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
  { id: '13', name: 'Flat 4D', address: '215/1, North Ibrahimpur, Kafrul, Dhaka', status: 'Rented', base_rent: 14000, property_type: 'Flat', bedrooms: 2, bathrooms: 1, kitchens: 1, terraces: 1, gas_included: true, water_included: true, electricity_included: false },
];

export const MOCK_TENANTS: Tenant[] = [
  {
    id: 't1',
    full_name: 'Anisur Rahman',
    phone: '01711223344',
    permanent_address: 'Comilla, Bangladesh',
    family_members_count: 4,
    nid_number: '1985269123456',
    dob: '1985-05-15',
    is_active: true,
    created_at: '2023-01-10',
    // UI Helpers
    propertyId: '1',
    propertyName: 'Flat 1A',
    agreedRent: 14000,
    advanceAmount: 28000,
  },
  {
    id: 't2',
    full_name: 'Farhana Ahmed',
    phone: '01812345678',
    permanent_address: 'Sylhet, Bangladesh',
    family_members_count: 2,
    nid_number: '1992269789012',
    dob: '1992-11-20',
    is_active: true,
    created_at: '2023-06-15',
    // UI Helpers
    propertyId: '5',
    propertyName: 'Flat 2A',
    agreedRent: 14000,
    advanceAmount: 28000,
  }
];

export const MOCK_LEASES: Lease[] = [
  {
    id: 'l1',
    property_id: '1',
    tenant_id: 't1',
    start_date: '2023-01-10',
    monthly_rent: 14000,
    utility_bills_included: false,
    advance_amount: 28000,
    is_active: true,
    property_name: 'Flat 1A',
    tenant_name: 'Anisur Rahman'
  },
  {
    id: 'l2',
    property_id: '5',
    tenant_id: 't2',
    start_date: '2023-06-15',
    monthly_rent: 14000,
    utility_bills_included: true,
    advance_amount: 28000,
    is_active: true,
    property_name: 'Flat 2A',
    tenant_name: 'Farhana Ahmed'
  }
];

export const MOCK_RENT_DUES: RentDue[] = [
  { id: 'rd1', lease_id: 'l1', month_year: '2024-02-01', amount_due: 14000, amount_paid: 14000, status: 'Paid', tenant_name: 'Anisur Rahman', property_name: 'Flat 1A' },
  { id: 'rd2', lease_id: 'l2', month_year: '2024-02-01', amount_due: 14000, amount_paid: 5000, status: 'Partial', tenant_name: 'Farhana Ahmed', property_name: 'Flat 2A' },
  { id: 'rd3', lease_id: 'l3', month_year: '2024-02-01', amount_due: 14000, amount_paid: 14000, status: 'Paid', tenant_name: 'Kamrul Islam', property_name: 'Flat 1B' },
];

// For backward compatibility during transition if needed, but I'll update components
export const MOCK_TRANSACTIONS = MOCK_RENT_DUES; 
