import { criarToken, compararSenhaSegura } from './_lib/token.js';
import { ipEstaBloqueado, registrarTentativa, limparTentativas } from './_lib/rateLimiter.js';
import { buscarOperador } from './_lib/operadores.js';

const TTL_GESTAO = 30 * 60;        // 30 minutos
const TTL_OPERADOR = 8 * 60 * 60;  // 8 horas (um turno de trabalho)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ sucesso: false, mensagem: 'Método não permitido.' });
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'desconhecido';

  if (ipEstaBloqueado(ip)) {
    return res.status(429).json({
      sucesso: false,
      mensagem: 'Muitas tentativas. Aguarde um minuto e tente novamente.',
    });
  }

  const { usuario, senha } = req.body || {};

  if (!usuario || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: 'Usuário e senha são obrigatórios.' });
  }

  const operador = buscarOperador(usuario);

  // Mesma mensagem genérica tanto pra usuário inexistente quanto pra senha errada,
  // pra não dar pista de qual dos dois está incorreto.
  if (!operador || !compararSenhaSegura(senha, operador.senha)) {
    registrarTentativa(ip);
    return res.status(401).json({ sucesso: false, mensagem: 'Usuário ou senha inválidos.' });
  }

  limparTentativas(ip);

  const papel = operador.papel === 'gestao' ? 'gestao' : 'operador';
  const produtos = papel === 'gestao'
    ? ['TODOS']
    : (Array.isArray(operador.produtos) ? operador.produtos.map((p) => String(p).toUpperCase()) : []);
  const ttl = papel === 'gestao' ? TTL_GESTAO : TTL_OPERADOR;

  const token = criarToken({ usuario: operador.usuario, papel, produtos }, ttl);

  return res.status(200).json({
    sucesso: true,
    token,
    expiraEm: ttl,
    usuario: operador.usuario,
    papel,
    produtos,
  });
}
