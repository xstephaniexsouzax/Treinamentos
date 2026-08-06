/**
 * Lista de usuários (operadores + gestão) da plataforma.
 *
 * Sem banco de dados: cada produto tem sua própria variável de ambiente na Vercel,
 * pra facilitar editar o time de um produto sem mexer nos outros. Cada variável
 * guarda um array JSON. Formato esperado de cada item:
 *
 *   {
 *     "usuario": "adriellen",
 *     "senha": "SenhaForte123",
 *     "papel": "operador",       // "operador" ou "gestao"
 *     "produtos": ["TELEBRAS"]   // 1 ou mais produtos; ignorado se papel = "gestao"
 *   }
 *
 * Variáveis usadas (crie as que fizerem sentido pra você — as que faltarem contam como vazias):
 *
 *   OPERADORES_TELEBRAS_JSON  -> operadores do TELEBRAS
 *   OPERADORES_DPE_JSON       -> operadores do DPE
 *   OPERADORES_DETRAN_JSON    -> operadores do DETRAN
 *   OPERADORES_GESTAO_JSON    -> usuários de gestão (acessam tudo, sem restrição de produto)
 *
 * Exemplo de valor pra colar em OPERADORES_TELEBRAS_JSON:
 *
 *   [
 *     { "usuario": "adriellen", "senha": "TrocarSenha1", "papel": "operador", "produtos": ["TELEBRAS"] },
 *     { "usuario": "joao.souza", "senha": "TrocarSenha2", "papel": "operador", "produtos": ["TELEBRAS", "DPE"] }
 *   ]
 *
 * Exemplo de valor pra colar em OPERADORES_GESTAO_JSON:
 *
 *   [
 *     { "usuario": "kaylane", "senha": "TrocarSenha3", "papel": "gestao", "produtos": [] }
 *   ]
 *
 * Importante: um operador que atende mais de um produto (ex: TELEBRAS e DPE) entra
 * em UMA só dessas variáveis, com os dois produtos na lista "produtos" — não precisa
 * duplicar o cadastro dele na variável do outro produto.
 *
 * Se por engano o mesmo "usuario" aparecer em mais de uma variável, vale o primeiro
 * encontrado, na ordem: TELEBRAS, DPE, DETRAN, GESTAO. Evite duplicar usuários.
 *
 * Pra adicionar, remover ou trocar a senha de alguém: edita a variável correspondente
 * no painel da Vercel e faz um redeploy (Vercel > Project > Settings > Environment Variables).
 */

const VARIAVEIS_POR_PRODUTO = {
  TELEBRAS: 'OPERADORES_TELEBRAS_JSON',
  DPE: 'OPERADORES_DPE_JSON',
  DETRAN: 'OPERADORES_DETRAN_JSON',
};

const VARIAVEL_GESTAO = 'OPERADORES_GESTAO_JSON';

function parsearLista(nomeVariavel) {
  const bruto = process.env[nomeVariavel];

  if (!bruto) {
    return [];
  }

  try {
    const lista = JSON.parse(bruto);
    return Array.isArray(lista) ? lista : [];
  } catch (err) {
    console.error(`${nomeVariavel} não é um JSON válido:`, err);
    return [];
  }
}

export function carregarOperadores() {
  const operadoresPorProduto = Object.values(VARIAVEIS_POR_PRODUTO).flatMap(parsearLista);
  const gestao = parsearLista(VARIAVEL_GESTAO);
  return [...operadoresPorProduto, ...gestao];
}

export function buscarOperador(usuario) {
  const alvo = String(usuario || '').trim().toLowerCase();
  if (!alvo) return null;

  const lista = carregarOperadores();
  return lista.find((op) => String(op.usuario || '').trim().toLowerCase() === alvo) || null;
}