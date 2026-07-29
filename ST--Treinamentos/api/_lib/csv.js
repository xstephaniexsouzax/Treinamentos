import Papa from 'papaparse';

/**
 * Busca um CSV publicado do Google Sheets e retorna as linhas já parseadas.
 * Roda no servidor — usa fetch nativo do Node em vez do modo `download` do
 * PapaParse (que depende de XMLHttpRequest, disponível só no navegador).
 */
export async function buscarCSV(url) {
  if (!url || url.trim() === '' || url.includes('LINK_DO_CSV') || url.includes('XXXXX') || url.includes('YYYYY') || url.includes('...')) {
    return [];
  }

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      console.error(`Falha ao buscar CSV (${resposta.status}): ${url}`);
      return [];
    }

    const texto = await resposta.text();

    const resultado = Papa.parse(texto, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
    });

    return resultado.data;
  } catch (err) {
    console.error('Erro ao buscar/parsear CSV:', url, err.message);
    return [];
  }
}
