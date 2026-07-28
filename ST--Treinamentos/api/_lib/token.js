import crypto from 'crypto';

/**
 * Token assinado simples (formato: base64(payload).assinatura), sem dependências externas.
 * Não é um JWT "de mercado", mas cumpre o mesmo papel aqui: provar que o servidor emitiu
 * o token e que ele não foi alterado, com expiração embutida.
 */

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET não configurado nas variáveis de ambiente da Vercel.');
  }
  return secret;
}

export function criarToken(payload, ttlSegundos = 30 * 60) {
  const corpo = {
    ...payload,
    exp: Date.now() + ttlSegundos * 1000,
  };

  const corpoBase64 = Buffer.from(JSON.stringify(corpo)).toString('base64url');
  const assinatura = crypto
    .createHmac('sha256', getSecret())
    .update(corpoBase64)
    .digest('base64url');

  return `${corpoBase64}.${assinatura}`;
}

export function verificarToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return { valido: false, motivo: 'Formato inválido' };
  }

  const [corpoBase64, assinatura] = token.split('.');

  const assinaturaEsperada = crypto
    .createHmac('sha256', getSecret())
    .update(corpoBase64)
    .digest('base64url');

  const assinaturaBuffer = Buffer.from(assinatura);
  const esperadaBuffer = Buffer.from(assinaturaEsperada);

  // Comparação em tempo constante — evita ataques de timing na verificação da assinatura.
  if (
    assinaturaBuffer.length !== esperadaBuffer.length ||
    !crypto.timingSafeEqual(assinaturaBuffer, esperadaBuffer)
  ) {
    return { valido: false, motivo: 'Assinatura inválida' };
  }

  let corpo;
  try {
    corpo = JSON.parse(Buffer.from(corpoBase64, 'base64url').toString('utf-8'));
  } catch {
    return { valido: false, motivo: 'Payload corrompido' };
  }

  if (!corpo.exp || Date.now() > corpo.exp) {
    return { valido: false, motivo: 'Token expirado' };
  }

  return { valido: true, payload: corpo };
}

/** Comparação de senha em tempo constante, evitando vazar informação por tempo de resposta. */
export function compararSenhaSegura(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));

  if (bufA.length !== bufB.length) {
    // Ainda assim faz uma comparação de tamanho fixo pra não vazar o tamanho da senha certa por timing.
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }

  return crypto.timingSafeEqual(bufA, bufB);
}
