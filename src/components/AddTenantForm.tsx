import React from 'react';
import { Property } from '../types';

interface AddTenantFormProps {
  properties: Property[];
  onClose: () => void;
}

export function AddTenantForm({ properties, onClose }: AddTenantFormProps) {
  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Personal Information</h4>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
            <input type="text" className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Anisur Rahman" required />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
            <input type="tel" className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="017XXXXXXXX" required />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Permanent Address</label>
            <textarea className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 h-24" placeholder="Full address..." required />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Lease Details</h4>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assign Property</label>
            <select className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" required>
              <option value="">Select a unit...</option>
              {properties.filter(p => p.status === 'Vacant').map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Agreed Rent</label>
              <input type="number" className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="0.00" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Advance Amount</label>
              <input type="number" className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="0.00" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Utility Setup</label>
            <select className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500">
              <option>Included in Rent</option>
              <option>Tenant Pays Separately</option>
              <option>Fixed Monthly Utility Fee</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Identification (NID)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer">
            <span className="text-2xl mb-2">🪪</span>
            <span className="text-xs font-bold uppercase tracking-widest">Upload NID Front</span>
          </div>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer">
            <span className="text-2xl mb-2">🪪</span>
            <span className="text-xs font-bold uppercase tracking-widest">Upload NID Back</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">NID Number</label>
            <input type="text" className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="OCR Data Field" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date of Birth</label>
            <input type="date" className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
      </div>

      <div className="pt-6 flex gap-3">
        <button 
          type="button" 
          onClick={onClose}
          className="flex-1 py-4 text-sm font-bold text-slate-600 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="flex-1 py-4 text-sm font-bold text-white bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
        >
          Save Tenant
        </button>
      </div>
    </form>
  );
}
