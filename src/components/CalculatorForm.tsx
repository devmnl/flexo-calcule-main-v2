import React, { useState, useEffect } from 'react';
import { Calculator, Weight, Layers, Ruler, Scissors, Loader2 } from 'lucide-react';
import { calculateMetragem, type CalculationResult } from '../utils/calculations';

interface CalculatorFormProps {
  onCalculate: (result: CalculationResult) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    pesoDesejado: '',
    tipoMaterial: '',
    larguraBobina: '',
    larguraFinal: '',
    tipoCalculo: 'unica' as 'unica' | 'corte',
    quantidadeCortes: '2'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fill largura final when bobina width changes if in single mode
  useEffect(() => {
    if (formData.tipoCalculo === 'unica' && formData.larguraBobina) {
      setFormData(prev => ({ ...prev, larguraFinal: prev.larguraBobina }));
    }
  }, [formData.larguraBobina, formData.tipoCalculo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 600));

      const result = calculateMetragem(
        parseFloat(formData.pesoDesejado),
        formData.tipoMaterial,
        parseFloat(formData.larguraBobina),
        parseFloat(formData.larguraFinal),
        formData.tipoCalculo
      );

      onCalculate(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Configurações de Cálculo
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Peso Desejado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Weight className="w-4 h-4 text-blue-600" />
            Peso Desejado
          </label>
          <div className="relative">
            <input
              type="number"
              name="pesoDesejado"
              value={formData.pesoDesejado}
              onChange={handleChange}
              step="0.1"
              min="0.1"
              required
              placeholder="Ex: 10.5"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">kg</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Digite o peso em quilogramas</p>
        </div>

        {/* Tipo de Material */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            Tipo de Material
          </label>
          <div className="relative">
            <select
              name="tipoMaterial"
              value={formData.tipoMaterial}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none bg-white"
            >
              <option value="">Selecione o material</option>
              <optgroup label="BOPP (Biaxial Oriented Polypropylene)">
                <option value="bopp30">BOPP 30µ - Transparente</option>
                <option value="bopp20">BOPP 20µ - Transparente</option>
                <option value="bopp17">BOPP 17µ - Transparente</option>
                <option value="boppPerola22">BOPP Pérola 22µ - Metalizado</option>
              </optgroup>
              <optgroup label="PET (Polyethylene Terephthalate)">
                <option value="pet12">PET 12µ - Transparente</option>
              </optgroup>
              <optgroup label="Outros Materiais">
                <option value="pp">Polipropileno (PP)</option>
                <option value="pe">Polietileno (PE)</option>
              </optgroup>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">Escolha o tipo de substrato</p>
        </div>

        {/* Largura da Bobina Original */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-blue-600" />
            Largura da Bobina Original
          </label>
          <div className="relative">
            <input
              type="number"
              name="larguraBobina"
              value={formData.larguraBobina}
              onChange={handleChange}
              step="1"
              min="1"
              required
              placeholder="Ex: 1400"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">mm</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Largura da bobina antes do corte</p>
        </div>

        {/* Largura Final Desejada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Scissors className="w-4 h-4 text-blue-600" />
            Largura Final Desejada
          </label>
          <div className="relative">
            <input
              type="number"
              name="larguraFinal"
              value={formData.larguraFinal}
              onChange={handleChange}
              step="1"
              min="1"
              required
              placeholder="Ex: 700"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">mm</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Largura final após corte</p>
        </div>

        {/* Tipo de Cálculo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" />
            Tipo de Cálculo
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`
              relative flex items-center p-4 cursor-pointer rounded-lg border-2 transition-all
              ${formData.tipoCalculo === 'unica' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
            `}>
              <input
                type="radio"
                name="tipoCalculo"
                value="unica"
                checked={formData.tipoCalculo === 'unica'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.tipoCalculo === 'unica' ? 'border-blue-500' : 'border-gray-400'}`}>
                {formData.tipoCalculo === 'unica' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
              </div>
              <span className="font-medium text-gray-900">Bobina única</span>
            </label>

            <label className={`
              relative flex items-center p-4 cursor-pointer rounded-lg border-2 transition-all
              ${formData.tipoCalculo === 'corte' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
            `}>
              <input
                type="radio"
                name="tipoCalculo"
                value="corte"
                checked={formData.tipoCalculo === 'corte'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.tipoCalculo === 'corte' ? 'border-blue-500' : 'border-gray-400'}`}>
                {formData.tipoCalculo === 'corte' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
              </div>
              <span className="font-medium text-gray-900">Corte específico</span>
            </label>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-100 flex items-start gap-2">
             <span className="font-bold">Erro:</span> {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Calculando...
            </>
          ) : (
            <>
              <Calculator className="w-5 h-5" />
              Calcular Metragem
            </>
          )}
        </button>
      </form>
    </div>
  );
};
