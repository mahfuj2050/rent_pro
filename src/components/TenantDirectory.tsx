import React from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Calendar, 
  ShieldCheck,
  MoreHorizontal,
  Mail,
  MessageSquare
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { MOCK_TENANTS, MOCK_PROPERTIES } from '../mockData';
import { Modal } from './Modal';
import { AddTenantForm } from './AddTenantForm';

export function TenantDirectory() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const filteredTenants = MOCK_TENANTS.filter(t => 
    t.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tenant Directory</h1>
          <p className="text-slate-500 mt-1">Manage active tenants, their documentation, and contact info.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          <Plus size={20} />
          Add Tenant
        </button>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Register New Tenant"
      >
        <AddTenantForm properties={MOCK_PROPERTIES} onClose={() => setIsAddModalOpen(false)} />
      </Modal>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search tenants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">Export CSV</button>
            <button className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">Filter</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tenant</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Property</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rent Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                        {tenant.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{tenant.full_name}</p>
                        <p className="text-xs text-slate-500">Joined {tenant.created_at}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700">{tenant.propertyName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={14} className="text-slate-400" />
                        {tenant.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} className="text-slate-400" />
                        {tenant.full_name.toLowerCase().replace(' ', '.')}@email.com
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(tenant.agreedRent || 0)}/mo</p>
                      <p className="text-xs text-slate-500">Advance: {formatCurrency(tenant.advanceAmount || 0)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      tenant.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                    )}>
                      {tenant.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <MessageSquare size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
