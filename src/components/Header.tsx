import React from 'react';
import { Calculator, Info } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-blue-700">
          <Calculator className="w-8 h-8" />
          <h1 className="text-xl font-bold tracking-tight">Flexo Tools 2.0</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">v2.0</span>
          <button className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100" title="Informações">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
