import React from 'react';
import { RefreshCw } from 'lucide-react';

interface FooterProps {
  onReset: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReset }) => {
  return (
    <footer className="mt-12 pb-8 border-t border-gray-200 pt-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-4 mb-6">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Limpar Calculadora
          </button>
        </div>
        
        <p className="text-gray-400 text-sm mb-2">
          &copy; {new Date().getFullYear()} Desenvolvido por Manoel F. F. Neto.
        </p>
      </div>
    </footer>
  );
};
