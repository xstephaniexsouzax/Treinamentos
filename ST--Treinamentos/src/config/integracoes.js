// Chaves de integrações externas.
// Vêm de variáveis de ambiente (VITE_*) configuradas no .env local e no painel da Vercel.
// IMPORTANTE: variáveis VITE_* são incluídas no bundle JS público — isso evita vazar a
// chave no histórico do Git, mas não a esconde do usuário final. Para segredo real,
// use uma Serverless Function como proxy.

export const CHAVES_WEB3FORMS = {
  TELEBRAS: import.meta.env.VITE_WEB3FORMS_KEY_TELEBRAS || '',
  DPE: import.meta.env.VITE_WEB3FORMS_KEY_DPE || '',
  DETRAN: import.meta.env.VITE_WEB3FORMS_KEY_DETRAN || '',
};

export const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || '';
