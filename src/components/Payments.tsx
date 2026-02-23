import React from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { MOCK_TRANSACTIONS, MOCK_TENANTS, MOCK_PROPERTIES } from '../mockData';
import { Modal } from './Modal';
import { CollectRentForm } from './CollectRentForm';

export function Payments() {
  const [isCollectModalOpen, setIsCollectModalOpen] = React.useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Rent Collection</h1>
          <p className="text-slate-500 mt-1">Track payments, manage arrears, and generate invoices.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
            <Download size={20} />
            Report
          </button>
          <button 
            onClick={() => setIsCollectModalOpen(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            <Plus size={20} />
            Collect Rent
          </button>
        </div>
      </div>

      <Modal 
        isOpen={isCollectModalOpen} 
        onClose={() => setIsCollectModalOpen(false)} 
        title="Collect Rent Payment"
      >
        <CollectRentForm 
          tenants={MOCK_TENANTS} 
          properties={MOCK_PROPERTIES} 
          onClose={() => setIsCollectModalOpen(false)} 
        />
      </Modal>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">February 2024</span>
          </div>
          <p className="text-sm font-medium opacity-80 uppercase tracking-wider mb-1">Total Collected</p>
          <h4 className="text-3xl font-bold">{formatCurrency(93000)}</h4>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold">
            <span className="px-2 py-0.5 bg-white/20 rounded-full">83% of Goal</span>
            <span className="opacity-60">Target: {formatCurrency(112000)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Clock size={24} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Total Arrears</p>
          <h4 className="text-3xl font-bold text-slate-900">{formatCurrency(15000)}</h4>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-600">
            <AlertCircle size={14} />
            3 Tenants Overdue
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <ArrowUpRight size={24} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Growth</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Avg. Payment Time</p>
          <h4 className="text-3xl font-bold text-slate-900">2.4 Days</h4>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600">
            <TrendingUpIcon size={14} />
            15% faster than last month
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tenant</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-mono text-slate-500">#{tx.id.toUpperCase()}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-bold text-slate-900">{tx.tenant_name}</p>
                      <p className="text-xs text-slate-500">{tx.property_name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-slate-600 font-medium">{tx.month_year}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-900">{formatCurrency(tx.amount_paid)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      tx.status === 'Paid' ? "bg-emerald-50 text-emerald-600" : 
                      tx.status === 'Partial' ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Download size={18} />
                    </button>
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

function TrendingUpIcon({ size, className }: any) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
