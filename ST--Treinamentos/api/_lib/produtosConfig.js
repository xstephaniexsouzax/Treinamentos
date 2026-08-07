/**
 * URLs das planilhas de Quiz e Monitoria, por produto.
 *
 * IMPORTANTE: este arquivo vive dentro de /api, que roda só no servidor (Vercel
 * Serverless Functions). O Vite NUNCA empacota o conteúdo de /api no JavaScript
 * enviado ao navegador — diferente de como era antes em src/data/produto/*.js,
 * que acabava dentro do bundle público. Isso é o que fecha o vazamento.
 *
 * Quando criar um produto novo, basta adicionar aqui.
 */

export const PRODUTOS_CONFIG = {
  TELEBRAS: {
    quizzes: [
      { titulo: 'Conceito Técnico', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZTr-XgrhJsWNx1ZyV3ANbYlnxPHmOO8bHBWsDMdfAvprDHZp4epE-Tx5N3ciGsG2d2d1lz4dF8yC9/pub?gid=0&single=true&output=csv' },
      { titulo: 'Consulta: Circuito', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZTr-XgrhJsWNx1ZyV3ANbYlnxPHmOO8bHBWsDMdfAvprDHZp4epE-Tx5N3ciGsG2d2d1lz4dF8yC9/pub?gid=1868918943&single=true&output=csv' },
      { titulo: 'Outros Tipos de Cliente', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZTr-XgrhJsWNx1ZyV3ANbYlnxPHmOO8bHBWsDMdfAvprDHZp4epE-Tx5N3ciGsG2d2d1lz4dF8yC9/pub?gid=1507613300&single=true&output=csv' },
      { titulo: 'Bloco de Notas', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZTr-XgrhJsWNx1ZyV3ANbYlnxPHmOO8bHBWsDMdfAvprDHZp4epE-Tx5N3ciGsG2d2d1lz4dF8yC9/pub?gid=2017365352&single=true&output=csv' },
      { titulo: 'Consulta: protocolo', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZTr-XgrhJsWNx1ZyV3ANbYlnxPHmOO8bHBWsDMdfAvprDHZp4epE-Tx5N3ciGsG2d2d1lz4dF8yC9/pub?gid=417805429&single=true&output=csv' },
      { titulo: 'GESAC/EACE', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZTr-XgrhJsWNx1ZyV3ANbYlnxPHmOO8bHBWsDMdfAvprDHZp4epE-Tx5N3ciGsG2d2d1lz4dF8yC9/pub?gid=1776811410&single=true&output=csv' },
    ],
    monitorias: [
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTEPg5oPR9C8_vdW6C0K39gpUcD-1q8SGLy5gBRAISBN0iF02vTCEENDR7MgLC2UajbnSu4XkLXovqT/pub?gid=1528312139&single=true&output=csv',
      // Agosto
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTEPg5oPR9C8_vdW6C0K39gpUcD-1q8SGLy5gBRAISBN0iF02vTCEENDR7MgLC2UajbnSu4XkLXovqT/pub?gid=764105353&single=true&output=csv'
    ],
  },

  DPE: {
    quizzes: [
      // Substitua pela URL real do novo quiz do DPE que você publicou.
      { titulo: 'Família', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRQdF9I2hUhaORFK3qxFUE8tUiE77imyLJ-DdJ4dTHWxxgoUzEKzwH3D_50Be3VDYHBODHfEWuMfTHz/pub?gid=1739079265&single=true&output=csv' },
    ],
    monitorias: [
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHj0pibk1iQ0BmexHMvSTrccoo39JZmtXNZ9sr1kceuvCPoW4r7Bott7ycVwhl5sAVKvZK0IFNdHSC/pub?gid=0&single=true&output=csv',
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHj0pibk1iQ0BmexHMvSTrccoo39JZmtXNZ9sr1kceuvCPoW4r7Bott7ycVwhl5sAVKvZK0IFNdHSC/pub?gid=1582263519&single=true&output=csv'
    ],
  },

  DETRAN: {
    quizzes: [
      { titulo: 'Quiz DETRAN', url: 'https://docs.google.com/spreadsheets/d/e/.../pub?gid=XXXXX&single=true&output=csv' },
    ],
    monitorias: [
      // geral
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTEPg5oPR9C8_vdW6C0K39gpUcD-1q8SGLy5gBRAISBN0iF02vTCEENDR7MgLC2UajbnSu4XkLXovqT/pub?gid=1528312139&single=true&output=csv',
    ]
  },
};

/** Achata a config de todos os produtos numa lista única de { produto, titulo, url } de quizzes. */
export function listarTodosOsQuizzes() {
  return Object.entries(PRODUTOS_CONFIG).flatMap(([produto, cfg]) =>
    cfg.quizzes.map((q) => ({ ...q, produto }))
  );
}

/** Achata a config de todos os produtos numa lista única de URLs de monitoria. */
export function listarTodasAsMonitorias() {
  return Object.values(PRODUTOS_CONFIG).flatMap((cfg) => cfg.monitorias);
}
