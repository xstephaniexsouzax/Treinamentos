import { verificarToken } from './_lib/token.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ sucesso: false, mensagem: 'Método não permitido.' });
  }

  const { token } = req.body || {};
  const resultado = verificarToken(token);

  if (!resultado.valido) {
    return res.status(401).json({ sucesso: false, mensagem: resultado.motivo });
  }

  return res.status(200).json({ sucesso: true, usuario: resultado.payload.usuario });
}
