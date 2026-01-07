import { materials } from './materials';

export interface CalculationResult {
  metragem: number;
  materialName: string;
  pesoDesejado: number;
  larguraBobina: number;
  larguraFinal: number;
  tipoCalculo: 'unica' | 'corte';
  densidade: number;
  aproveitamento?: number;
}

export const calculateMetragem = (
  pesoDesejado: number,
  tipoMaterial: string,
  larguraBobina: number,
  larguraFinal: number,
  tipoCalculo: 'unica' | 'corte'
): CalculationResult => {
  const material = materials[tipoMaterial];
  if (!material) {
    throw new Error('Material não encontrado');
  }

  let larguraCalculoCm: number;
  const pesoCalculo = pesoDesejado;

  if (tipoCalculo === 'unica') {
    larguraCalculoCm = larguraBobina / 10;
  } else {
    if (larguraFinal > larguraBobina) {
      throw new Error(`A largura final (${larguraFinal}mm) não pode ser maior que a largura original (${larguraBobina}mm).`);
    }
    larguraCalculoCm = larguraFinal / 10;
  }

  let metragem: number;

  if (tipoMaterial === 'pet12') {
    // Cálculo específico para PET 12µ
    metragem = (pesoCalculo * 1000) / (material.density * larguraCalculoCm * material.thickness);
  } else if (tipoMaterial === 'boppPerola22') {
    // Cálculo específico para BOPP Pérola 22µ
    metragem = pesoCalculo / (material.density * larguraCalculoCm * material.thickness);
  } else {
    // Cálculo padrão para outros materiais
    // Original logic: loop incrementing metragemTeste where peso = density * width * metragemTeste * 0.0001
    // Then metragem = metragemTeste / 2
    // Inverse: metragemTeste = peso / (density * width * 0.0001)
    // metragem = (peso / (density * width * 0.0001)) / 2
    
    const metragemTeste = pesoCalculo / (material.density * larguraCalculoCm * 0.0001);
    metragem = metragemTeste / 2;
  }

  let aproveitamento = 100;
  if (tipoCalculo === 'corte') {
    aproveitamento = parseFloat(((larguraFinal / larguraBobina) * 100).toFixed(1));
  }

  return {
    metragem: Math.round(metragem),
    materialName: material.name,
    pesoDesejado,
    larguraBobina,
    larguraFinal,
    tipoCalculo,
    densidade: material.density,
    aproveitamento
  };
};
