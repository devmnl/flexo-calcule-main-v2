import React from 'react';
import { Copy, Check, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import type { CalculationResult } from '../utils/calculations';

interface ResultsProps {
  result: CalculationResult | null;
}

export const Results: React.FC<ResultsProps> = ({ result }) => {
  const [copied, setCopied] = React.useState(false);
  const resultsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.metragem.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatNumber = (num: number) => new Intl.NumberFormat('pt-BR').format(num);

  return (
    <div ref={resultsRef} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Resultado do Cálculo
          </h3>
          <button
            onClick={handleCopy}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
            title="Copiar resultado"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>

        <div className="p-8">
          <div className="text-center bg-green-50 rounded-2xl p-8 mb-8">
            <div className="text-5xl md:text-6xl font-bold text-green-700 mb-2 tracking-tight">
              {formatNumber(result.metragem)}
            </div>
            <div className="text-gray-500 font-medium text-lg uppercase tracking-wide">metros</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium">Peso Solicitado</span>
              <span className="text-gray-900 font-bold text-lg">{formatNumber(result.pesoDesejado)} kg</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium">Material</span>
              <span className="text-gray-900 font-bold text-lg text-right">{result.materialName}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium">Largura Original</span>
              <span className="text-gray-900 font-bold text-lg">{formatNumber(result.larguraBobina)} mm</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium">Densidade</span>
              <span className="text-gray-900 font-bold text-lg">{result.densidade} g/cm³</span>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100 text-yellow-800 text-sm">
            <p className="flex items-start gap-2 mb-2 font-medium">
              <Check className="w-5 h-5 text-green-600 shrink-0" />
              Cálculo realizado com sucesso!
            </p>
            
            {result.tipoCalculo === 'corte' && (
              <div className="ml-7 space-y-1 text-yellow-700">
                <p>✂️ Cálculo para parte específica de <strong>{result.larguraFinal}mm</strong></p>
                <p>🎯 Aproveitamento desta parte: <strong>{result.aproveitamento}%</strong></p>
                {result.aproveitamento && result.aproveitamento < 50 && (
                  <p className="flex items-center gap-1 text-orange-600 mt-2 font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    Atenção: Aproveitamento baixo. Verifique se a largura está correta.
                  </p>
                )}
              </div>
            )}
            
            {result.metragem > 10000 && (
              <p className="flex items-center gap-2 mt-3 text-orange-600 font-medium ml-7">
                <AlertTriangle className="w-4 h-4" />
                Metragem alta detectada. Verifique os valores.
              </p>
            )}

             {result.metragem < 100 && (
              <p className="flex items-center gap-2 mt-3 text-blue-600 font-medium ml-7">
                <Lightbulb className="w-4 h-4" />
                Metragem baixa. Verifique a largura final.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
