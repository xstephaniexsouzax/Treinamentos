import { telebrasConfig } from './telebras';
import { dpeConfig } from './dpe';
import { detrancConfig } from './detran';
// Quando criar um produto novo, basta importar ele aqui!

const TODOS_OS_PRODUTOS = [
  telebrasConfig,
  dpeConfig,
  detrancConfig

];

// Extrai todos os Quizzes de todos os produtos
export const URLS_QUIZZES_CSV = TODOS_OS_PRODUTOS.flatMap(p => p.quizzes);

// Extrai todas as Monitorias de todos os produtos
export const URLS_MONITORIAS_CSV = TODOS_OS_PRODUTOS.flatMap(p => p.monitorias);