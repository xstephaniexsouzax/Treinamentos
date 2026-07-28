import { criarToken, compararSenhaSegura } from './_lib/token.js';
import { ipEstaBloqueado, registrarTentativa, limparTentativas } from './_lib/rateLimiter.js';

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

  const usuarioEsperado = process.env.GESTAO_USUARIO;
  const senhaEsperada = process.env.GESTAO_SENHA;

  if (!usuarioEsperado || !senhaEsperada) {
    console.error('GESTAO_USUARIO / GESTAO_SENHA não configurados nas variáveis de ambiente da Vercel.');
    return res.status(500).json({ sucesso: false, mensagem: 'Login não configurado no servidor.' });
  }

  const usuarioValido = usuario === usuarioEsperado;
  const senhaValida = compararSenhaSegura(senha, senhaEsperada);

  if (!usuarioValido || !senhaValida) {
    registrarTentativa(ip);
    return res.status(401).json({ sucesso: false, mensagem: 'Usuário ou senha inválidos.' });
  }

  limparTentativas(ip);

  const token = criarToken({ usuario }, 30 * 60); // expira em 30 minutos

  return res.status(200).json({
    sucesso: true,
    token,
    expiraEm: 30 * 60,
  });
}
