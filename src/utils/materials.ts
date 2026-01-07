export interface Material {
  id: string;
  name: string;
  density: number;
  thickness: number;
  type: string;
  description: string;
}

export const materials: Record<string, Material> = {
  bopp30: {
    id: 'bopp30',
    name: 'BOPP 30µ',
    density: 1.3575,
    thickness: 0.003,
    type: 'BOPP',
    description: 'Filme transparente biaxialmente orientado'
  },
  bopp20: {
    id: 'bopp20',
    name: 'BOPP 20µ',
    density: 0.905,
    thickness: 0.002,
    type: 'BOPP',
    description: 'Filme transparente biaxialmente orientado'
  },
  bopp17: {
    id: 'bopp17',
    name: 'BOPP 17µ',
    density: 0.76925,
    thickness: 0.0017,
    type: 'BOPP',
    description: 'Filme transparente biaxialmente orientado'
  },
  boppPerola22: {
    id: 'boppPerola22',
    name: 'BOPP Pérola 22µ',
    density: 0.096,
    thickness: 0.0022,
    type: 'BOPP',
    description: 'Filme metalizado com efeito pérola'
  },
  pet12: {
    id: 'pet12',
    name: 'PET 12µ',
    density: 1.4,
    thickness: 0.0012,
    type: 'PET',
    description: 'Filme de polietileno tereftalato'
  },
  pp: {
    id: 'pp',
    name: 'Polipropileno (PP)',
    density: 0.9,
    thickness: 0.002,
    type: 'PP',
    description: 'Filme de polipropileno'
  },
  pe: {
    id: 'pe',
    name: 'Polietileno (PE)',
    density: 0.94,
    thickness: 0.002,
    type: 'PE',
    description: 'Filme de polietileno'
  }
};
