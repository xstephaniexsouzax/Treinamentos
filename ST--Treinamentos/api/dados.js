import { verificarToken } from './_lib/token.js';
import { carregarEProcessarDados } from './_lib/processarDados.js';

const PRODUTOS_VALIDOS = ['TODOS', 'TELEBRAS', 'DPE', 'DETRAN'];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ sucesso: false, mensagem: 'Método não permitido.' });
  }

  // Exige o token emitido por /api/login — sem ele, ninguém chega nos dados.
  const cabecalhoAuth = req.headers.authorization || '';
  const token = cabecalhoAuth.startsWith('Bearer ') ? cabecalhoAuth.slice(7) : null;

  const resultado = verificarToken(token);
  if (!resultado.valido) {
    return res.status(401).json({ sucesso: false, mensagem: 'Sessão inválida ou expirada. Faça login novamente.' });
  }

  // Só quem tem papel de gestão pode ver os resultados de todo mundo — mesmo que
  // um operador tente chamar esse endpoint direto, sem passar pela tela.
  if (resultado.payload.papel !== 'gestao') {
    return res.status(403).json({ sucesso: false, mensagem: 'Acesso restrito à equipe de gestão.' });
  }

  const produto = (req.query.produto || 'TODOS').toUpperCase();
  if (!PRODUTOS_VALIDOS.includes(produto)) {
    return res.status(400).json({ sucesso: false, mensagem: 'Produto inválido.' });
  }

  try {
    const operadores = await carregarEProcessarDados(produto);
    return res.status(200).json({ sucesso: true, operadores });
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar os dados. Tente novamente.' });
  }
}
