import React from 'react';
import { Check } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="text-center py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Calculadora de Metragem Profissional
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Para materiais flexíveis: BOPP, PET, PP, PE e outros substratos
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {[
            'Cálculos precisos',
            'Múltiplos materiais',
            'Interface moderna'
          ].map((feature, index) => (
            <span key={index} className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-100">
              <Check className="w-4 h-4" />
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
