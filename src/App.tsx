import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PropertyGrid } from './components/PropertyGrid';
import { TenantDirectory } from './components/TenantDirectory';
import { Payments } from './components/Payments';
import { Download, Bell } from 'lucide-react';
import { MOCK_PROPERTIES, MOCK_TENANTS } from './mockData';
import { cn, formatCurrency } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <PropertyGrid />;
      case 'tenants':
        return <TenantDirectory />;
      case 'payments':
        return <Payments />;
      case 'reports':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Monthly Status Report</h1>
                <p className="text-slate-500 mt-1">Portfolio-wide financial performance and occupancy summary.</p>
              </div>
              <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100">
                <Download size={20} />
                Export PDF
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Property</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tenant</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Months</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Total Due</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_PROPERTIES.map((p, i) => {
                      const tenant = MOCK_TENANTS.find(t => t.propertyId === p.id);
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-900">{p.name}</p>
                            <p className="text-xs text-slate-500">{p.address}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-slate-700">{tenant?.full_name || '---'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                              p.status === 'Rented' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                            )}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs text-slate-500">{p.status === 'Rented' ? 'Feb' : '---'}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <p className="text-sm font-bold text-slate-900">{p.status === 'Rented' ? formatCurrency(0) : '---'}</p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50/50 font-bold">
                      <td colSpan={4} className="px-6 py-6 text-right text-slate-500 uppercase tracking-widest text-xs">Grand Total Outstanding</td>
                      <td className="px-6 py-6 text-right text-xl text-indigo-600">{formatCurrency(108000)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Settings</h2>
            <p>Configure SMS templates and application preferences here.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="font-bold text-slate-900">ProRent</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <span className="relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </span>
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6 lg:p-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
