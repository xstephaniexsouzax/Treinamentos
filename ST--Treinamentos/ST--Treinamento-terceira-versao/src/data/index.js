import { telebrasData } from './telebrasData';
import { dpeData } from './dpeData';
import { detranData } from './detranData';

// Junta todos em um único objeto centralizado
export const todosProdutosData = {
  TELEBRAS: telebrasData,
  DPE: dpeData,
  DETRAN: detranData
};