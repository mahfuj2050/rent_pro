import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Home, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn, formatCurrency } from '../lib/utils';
import { MOCK_TRANSACTIONS } from '../mockData';

const incomeData = [
  { name: 'Jan', income: 420000, expense: 120000 },
  { name: 'Feb', income: 452000, expense: 150000 },
  { name: 'Mar', income: 380000, expense: 180000 },
  { name: 'Apr', income: 410000, expense: 140000 },
  { name: 'May', income: 480000, expense: 110000 },
  { name: 'Jun', income: 450000, expense: 130000 },
];

const occupancyData = [
  { name: 'Paid', value: 11, color: '#4F46E5' },
  { name: 'Partial', value: 1, color: '#F59E0B' },
  { name: 'Unpaid', value: 1, color: '#EF4444' },
];

export function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Health</h1>
          <p className="text-slate-500 mt-1">Welcome back, Mr. Rahman. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
            <option>Year to Date</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(126000)} 
          change="+8%" 
          isPositive={true}
          icon={TrendingUp}
          color="indigo"
        />
        <StatCard 
          title="Occupancy" 
          value="100%" 
          change="13/13 Units" 
          isPositive={true}
          icon={Home}
          color="emerald"
          progress={100}
        />
        <StatCard 
          title="Total Arrears" 
          value={formatCurrency(15000)} 
          change="3 Overdue" 
          isPositive={false}
          icon={AlertCircle}
          color="amber"
        />
        <StatCard 
          title="Maintenance" 
          value="5" 
          change="2 Urgent" 
          isPositive={false}
          icon={Users}
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Income vs Expense Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Financial Overview</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-600" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="income" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="expense" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Rent Status</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900">13</span>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Units</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {occupancyData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-slate-600">{item.name} ({item.value})</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{Math.round((item.value / 13) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recent Collections</h3>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{tx.tenant_name}</h4>
                  <p className="text-sm text-slate-500">{tx.property_name} • Today, 10:45 AM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">{formatCurrency(tx.amount_paid)}</p>
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mt-1",
                  tx.status === 'Paid' ? "bg-emerald-50 text-emerald-600" : 
                  tx.status === 'Partial' ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                )}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, isPositive, icon: Icon, color, progress }: any) {
  const colors: any = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", colors[color])}>
          <Icon size={24} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-sm font-bold",
          isPositive ? "text-emerald-600" : "text-rose-600"
        )}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
      </div>
      {progress !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <p className="text-xs font-medium text-slate-400 mt-2">13/13 Units Filled</p>
        </div>
      )}
    </div>
  );
}
