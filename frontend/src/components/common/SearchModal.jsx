import React, { useState } from 'react';
import { Search, X, ArrowRight, FileText, Cpu, BookOpen, ShoppingBag } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose, setCurrentPage }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchItems = [
    { title: 'LaserOptSimDESIGNER Ray Tracing Engine', page: 'designer', category: 'Software Feature', icon: <Cpu className="w-4 h-4 text-blue-500" /> },
    { title: 'Gaussian Beam M² Factor Analysis', page: 'designer', category: 'Physical Optics', icon: <Cpu className="w-4 h-4 text-cyan-500" /> },
    { title: 'Fiber Coupling Efficiency Calculation', page: 'applications', category: 'Application', icon: <FileText className="w-4 h-4 text-emerald-500" /> },
    { title: 'Thermal Lensing Crystal Simulation', page: 'applications', category: 'Application', icon: <FileText className="w-4 h-4 text-emerald-500" /> },
    { title: 'Software Licensing & Pricing Plans', page: 'shop', category: 'Pricing', icon: <ShoppingBag className="w-4 h-4 text-purple-500" /> },
    { title: 'Perpetual Commercial License', page: 'shop', category: 'License Store', icon: <ShoppingBag className="w-4 h-4 text-purple-500" /> },
    { title: 'User Manual & Video Tutorials', page: 'support', category: 'Documentation', icon: <BookOpen className="w-4 h-4 text-amber-500" /> },
    { title: 'GPU Acceleration & Service Specifications', page: 'servicespecs', category: 'Technical Specs', icon: <FileText className="w-4 h-4 text-blue-500" /> },
    { title: 'How to Order & Bank Wire Transfer', page: 'howtoorder', category: 'Order Guide', icon: <FileText className="w-4 h-4 text-blue-500" /> },
    { title: 'Legal Notice & Impressum', page: 'legal', category: 'Legal', icon: <FileText className="w-4 h-4 text-slate-500" /> },
    { title: 'GDPR Privacy Statement', page: 'privacy', category: 'Legal', icon: <FileText className="w-4 h-4 text-slate-500" /> },
  ];

  const filtered = query.trim() === '' 
    ? searchItems.slice(0, 6)
    : searchItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (page) => {
    setCurrentPage(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden">
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search LaserOptSim features, docs, license options..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-slate-800 placeholder-slate-400 outline-none text-base font-medium"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3">
          <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            {query ? 'Search Results' : 'Recommended Topics'}
          </div>
          
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No matching software topics found for "{query}".
            </div>
          ) : (
            filtered.map((item, index) => (
              <div 
                key={index}
                onClick={() => handleSelect(item.page)}
                className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-md group-hover:bg-blue-100 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 text-sm group-hover:text-blue-700">
                      {item.title}
                    </h5>
                    <span className="text-xs text-slate-500">{item.category}</span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
