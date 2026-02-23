import React from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  Minus,
  MoreVertical, 
  MapPin, 
  Banknote,
  Eye,
  Edit2,
  Trash2,
  Filter,
  Camera,
  Flame,
  Droplets,
  Zap
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { MOCK_PROPERTIES } from '../mockData';
import { Modal } from './Modal';

export function PropertyGrid() {
  const [properties, setProperties] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<'All' | 'Rented' | 'Vacant'>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [editingProperty, setEditingProperty] = React.useState<any>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    address: '',
    property_type: 'Flat',
    base_rent: '',
    bedrooms: 2,
    bathrooms: 1,
    kitchens: 1,
    terraces: 1,
    gas_included: true,
    water_included: true,
    electricity_included: false
  });

  React.useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/properties');
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (property?: any) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        name: property.name,
        address: property.address,
        property_type: property.property_type,
        base_rent: property.base_rent.toString(),
        bedrooms: property.bedrooms || 2,
        bathrooms: property.bathrooms || 1,
        kitchens: property.kitchens || 1,
        terraces: property.terraces || 1,
        gas_included: property.gas_included ?? true,
        water_included: property.water_included ?? true,
        electricity_included: property.electricity_included ?? false
      });
    } else {
      setEditingProperty(null);
      setFormData({
        name: '',
        address: '',
        property_type: 'Flat',
        base_rent: '',
        bedrooms: 2,
        bathrooms: 1,
        kitchens: 1,
        terraces: 1,
        gas_included: true,
        water_included: true,
        electricity_included: false
      });
    }
    setIsAddModalOpen(true);
  };

  const handleSave = async () => {
    const propertyData = {
      name: formData.name,
      address: formData.address,
      property_type: formData.property_type,
      base_rent: parseFloat(formData.base_rent) || 0,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      kitchens: formData.kitchens,
      terraces: formData.terraces,
      gas_included: formData.gas_included,
      water_included: formData.water_included,
      electricity_included: formData.electricity_included,
    };

    try {
      if (editingProperty) {
        await fetch(`/api/properties/${editingProperty.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(propertyData)
        });
      } else {
        await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(propertyData)
        });
      }
      await fetchProperties();
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Failed to save property", err);
    }
  };

  const toggleUtility = (key: string) => {
    setFormData(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const filteredProperties = properties.filter(p => {
    const matchesFilter = filter === 'All' || p.status === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Properties</h1>
          <p className="text-slate-500 mt-1">Manage your real estate portfolio and unit availability.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          <Plus size={20} />
          Add Property
        </button>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title={editingProperty ? "Edit Property" : "Add Property"}
      >
        <div className="space-y-8 max-h-[80vh] overflow-y-auto px-1 pb-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Property Name / Title</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" 
                  placeholder="e.g. Greenwood Villa" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Address</label>
                <textarea 
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 min-h-[100px]" 
                  placeholder="Street, City, Zip Code" 
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Property Details</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Property Type</label>
                <div className="flex p-1 bg-slate-100 rounded-xl">
                  {['Flat', 'House', 'Shop'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, property_type: type })}
                      className={cn(
                        "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                        formData.property_type === type ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Bedrooms</label>
                  <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, bedrooms: Math.max(0, formData.bedrooms - 1) })}
                      className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-slate-900">{formData.bedrooms}</span>
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, bedrooms: formData.bedrooms + 1 })}
                      className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Bathrooms</label>
                  <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, bathrooms: Math.max(0, formData.bathrooms - 1) })}
                      className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-slate-900">{formData.bathrooms}</span>
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, bathrooms: formData.bathrooms + 1 })}
                      className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Expected Monthly Rent</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">৳</span>
                  <input 
                    type="number" 
                    value={formData.base_rent}
                    onChange={(e) => setFormData({ ...formData, base_rent: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900" 
                    placeholder="0.00" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Utility Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Utility Details</h3>
            <div className="space-y-2 bg-slate-50 rounded-2xl p-2">
              {[
                { id: 'gas_included', label: 'Gas Included', icon: Flame, color: 'text-orange-500', active: formData.gas_included },
                { id: 'water_included', label: 'Water Included', icon: Droplets, color: 'text-blue-500', active: formData.water_included },
                { id: 'electricity_included', label: 'Electricity Included', icon: Zap, color: 'text-yellow-500', active: formData.electricity_included },
              ].map((utility) => (
                <div key={utility.label} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <utility.icon size={20} className={utility.color} />
                    <span className="text-sm font-medium text-slate-700">{utility.label}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => toggleUtility(utility.id)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      utility.active ? "bg-indigo-600" : "bg-slate-200"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                      utility.active ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={handleSave} 
              className="w-full py-4 font-bold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
            >
              {editingProperty ? "Update Property" : "Save Property"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search by name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
          />
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl">
          {['All', 'Rented', 'Vacant'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                filter === f 
                  ? "bg-white text-indigo-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 shadow-sm">
          <Filter size={20} />
        </button>
      </div>

      {/* List View */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Rent</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      Loading properties...
                    </div>
                  </td>
                </tr>
              ) : filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No properties found.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Building2 size={20} />
                        </div>
                        <span className="font-bold text-slate-900">{property.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-slate-900">{property.property_type}</span>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{property.bedrooms || 0} Bed</span>
                          <span>•</span>
                          <span>{property.bathrooms || 0} Bath</span>
                          <span>•</span>
                          <span>{property.kitchens || 0} Kitchen</span>
                          <span>•</span>
                          <span>{property.terraces || 0} Terrace</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1 text-slate-900 font-bold">
                        <Banknote size={14} className="text-indigo-600" />
                        {formatCurrency(property.base_rent)}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        property.status === 'Rented' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      )}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleOpenModal(property)}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
