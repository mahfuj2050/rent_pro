import React from 'react';
import { Property, Tenant } from '../types';
import { formatCurrency } from '../lib/utils';

interface CollectRentFormProps {
  tenants: Tenant[];
  properties: Property[];
  onClose: () => void;
}

export function CollectRentForm({ tenants, properties, onClose }: CollectRentFormProps) {
  const [selectedTenantId, setSelectedTenantId] = React.useState('');
  const [amountPaid, setAmountPaid] = React.useState(0);
  
  const selectedTenant = tenants.find(t => t.id === selectedTenantId);
  const totalDue = selectedTenant ? (selectedTenant.agreedRent || 0) : 0;
  const balance = Math.max(0, totalDue - amountPaid);

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Tenant</label>
        <select 
          className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
          value={selectedTenantId}
          onChange={(e) => setSelectedTenantId(e.target.value)}
          required
        >
          <option value="">Choose a tenant...</option>
          {tenants.map(t => (
            <option key={t.id} value={t.id}>{t.full_name} ({t.propertyName})</option>
          ))}
        </select>
      </div>

      {selectedTenant && (
        <div className="p-4 bg-indigo-50 rounded-2xl space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Monthly Rent:</span>
            <span className="font-bold text-slate-900">{formatCurrency(totalDue)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Arrears:</span>
            <span className="font-bold text-rose-600">{formatCurrency(0)}</span>
          </div>
          <div className="pt-2 border-t border-indigo-100 flex justify-between text-base">
            <span className="font-bold text-slate-900">Total Due:</span>
            <span className="font-bold text-indigo-600">{formatCurrency(totalDue)}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Amount Paid</label>
          <input 
            type="number" 
            className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
            placeholder="0.00"
            value={amountPaid || ''}
            onChange={(e) => setAmountPaid(Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Remaining Balance</label>
          <input 
            type="text" 
            className="w-full p-3 bg-slate-100 border-none rounded-xl text-slate-500 font-bold"
            value={formatCurrency(balance)}
            readOnly
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payment Method</label>
        <div className="grid grid-cols-3 gap-2">
          {['Cash', 'Bank Transfer', 'Check'].map(m => (
            <button 
              key={m}
              type="button"
              className="py-2 text-sm font-bold border border-slate-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all"
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <button 
          type="button" 
          onClick={onClose}
          className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="flex-1 py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
        >
          Confirm Payment
        </button>
      </div>
    </form>
  );
}
