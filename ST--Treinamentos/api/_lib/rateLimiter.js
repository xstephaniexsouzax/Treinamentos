/**
 * Rate limiter em memória — reduz força bruta óbvia (ex.: script tentando 1000 senhas seguidas).
 *
 * LIMITAÇÃO IMPORTANTE: funções serverless da Vercel podem rodar em múltiplas instâncias
 * (cold starts diferentes), então esse contador não é garantidamente global. Para um limite
 * de taxa realmente robusto contra um atacante dedicado, o certo é usar um armazenamento
 * compartilhado (Vercel KV / Upstash Redis). Isso aqui já é uma barreira útil e gratuita
 * contra tentativas automatizadas simples, mas não é a defesa definitiva.
 */

const tentativasPorIp = new Map();

const JANELA_MS = 60 * 1000; // 1 minuto
const LIMITE_TENTATIVAS = 5;

export function ipEstaBloqueado(ip) {
  const agora = Date.now();
  const registro = tentativasPorIp.get(ip);

  if (!registro) return false;

  // Limpa registros antigos da janela.
  const tentativasRecentes = registro.filter((t) => agora - t < JANELA_MS);
  tentativasPorIp.set(ip, tentativasRecentes);

  return tentativasRecentes.length >= LIMITE_TENTATIVAS;
}

export function registrarTentativa(ip) {
  const agora = Date.now();
  const registro = tentativasPorIp.get(ip) || [];
  registro.push(agora);
  tentativasPorIp.set(ip, registro);
}

export function limparTentativas(ip) {
  tentativasPorIp.delete(ip);
}
