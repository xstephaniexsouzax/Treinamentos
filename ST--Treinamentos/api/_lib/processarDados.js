import { buscarCSV } from './csv.js';
import { PRODUTOS_CONFIG, listarTodosOsQuizzes, listarTodasAsMonitorias } from './produtosConfig.js';

export async function carregarEProcessarDados(produtoFiltro = 'TODOS') {
  const filtro = produtoFiltro.trim().toUpperCase();

  const quizzesConfig = filtro === 'TODOS'
    ? listarTodosOsQuizzes()
    : (PRODUTOS_CONFIG[filtro]?.quizzes || []).map((q) => ({ ...q, produto: filtro }));

  const monitoriasConfig = filtro === 'TODOS'
    ? listarTodasAsMonitorias()
    : (PRODUTOS_CONFIG[filtro]?.monitorias || []);

  const promessasQuizzes = quizzesConfig.map(async (item) => {
    const dados = await buscarCSV(item.url);
    return dados.map((linha) => ({ ...linha, __tituloQuiz: item.titulo }));
  });

  const promessasMonitorias = monitoriasConfig.map((url) => buscarCSV(url));

  const [resultadosQuizzes, resultadosMonitorias] = await Promise.all([
    Promise.all(promessasQuizzes),
    Promise.all(promessasMonitorias),
  ]);

  const quizzes = resultadosQuizzes.flat();
  const monitorias = resultadosMonitorias.flat();

  const mapa = {};

  // --- PROCESSA QUIZZES ---
  quizzes.forEach((linha) => {
    const chaves = Object.keys(linha).filter((k) => k !== '__tituloQuiz');
    if (chaves.length < 4) return;

    const chaveData = chaves.find((k) => k.toLowerCase().includes('data') || k.toLowerCase().includes('carimbo')) || chaves[0];
    const chaveNome = chaves.find((k) => k.toLowerCase().includes('nome') || k.toLowerCase().includes('operador')) || chaves[1];
    const chaveProduto = chaves.find((k) => k.toLowerCase().includes('produto') || k.toLowerCase().includes('operação')) || chaves[2];
    const chavePontuacao = chaves.find((k) => k.toLowerCase().includes('nota') || k.toLowerCase().includes('pontuação')) || chaves[3];

    const nome = linha[chaveNome];
    if (!nome || !nome.trim() || nome.trim().toLowerCase() === 'teste') return;

    const produto = (linha[chaveProduto] ? linha[chaveProduto] : 'GERAL').trim().toUpperCase();

    if (filtro !== 'TODOS' && !produto.includes(filtro)) return;

    const chaveUnica = nome.trim().toLowerCase();
    const dataApenas = (linha[chaveData] || 'N/A').split(' ')[0];
    const pontuacaoTexto = linha[chavePontuacao] || '0';
    const notaPorcentagem = calcularPorcentagem(pontuacaoTexto);
    const tituloQuiz = linha.__tituloQuiz || 'Quiz';

    if (!mapa[chaveUnica]) {
      mapa[chaveUnica] = { nome: nome.trim(), produto, quizzes: [], monitorias: [] };
    }

    mapa[chaveUnica].quizzes.push({
      data: dataApenas,
      modulo: `${tituloQuiz} (${pontuacaoTexto})`,
      nota: notaPorcentagem,
    });
  });

  // --- PROCESSA MONITORIAS ---
  monitorias.forEach((linha) => {
    const chaves = Object.keys(linha);
    if (chaves.length < 3) return;

    const chaveData = chaves.find((k) => k.toLowerCase().includes('data')) || chaves[0];
    const chaveNome = chaves.find((k) => k.toLowerCase().includes('nome') || k.toLowerCase().includes('operador')) || chaves[1];
    const chaveProduto = chaves.find((k) => k.toLowerCase().includes('produto') || k.toLowerCase().includes('operação')) || chaves[2];
    const chaveNota = chaves.find((k) => k.toLowerCase().includes('nota') || k.toLowerCase().includes('resultado')) || chaves[3];
    const chaveAvaliador = chaves.find((k) => k.toLowerCase().includes('avaliador') || k.toLowerCase().includes('responsável'));

    const nome = linha[chaveNome];
    if (!nome || !nome.trim()) return;

    const produto = (linha[chaveProduto] ? linha[chaveProduto] : 'GERAL').trim().toUpperCase();
    if (filtro !== 'TODOS' && !produto.includes(filtro)) return;

    const chaveUnica = nome.trim().toLowerCase();
    const nota = parseFloat(linha[chaveNota] || 0) || 0;
    const data = linha[chaveData] || 'N/A';
    const avaliador = chaveAvaliador && linha[chaveAvaliador] ? linha[chaveAvaliador] : 'Monitoria';

    if (!mapa[chaveUnica]) {
      mapa[chaveUnica] = { nome: nome.trim(), produto, quizzes: [], monitorias: [] };
    }

    mapa[chaveUnica].monitorias.push({ data, avaliador, nota });
  });

  // --- CÁLCULO DAS MÉDIAS ---
  return Object.values(mapa).map((op) => {
    const temQuiz = op.quizzes.length > 0;
    const temMonitoria = op.monitorias.length > 0;

    const mediaQuiz = temQuiz
      ? Math.round(op.quizzes.reduce((acc, q) => acc + q.nota, 0) / op.quizzes.length)
      : null;

    const mediaMonitoria = temMonitoria
      ? Math.round(op.monitorias.reduce((acc, m) => acc + m.nota, 0) / op.monitorias.length)
      : null;

    let statusQuiz = 'Sem Avaliação';
    if (temQuiz) {
      statusQuiz = mediaQuiz >= 70 ? 'Aprovado' : 'Reciclagem';
    }

    let statusMonitoria = 'Sem Avaliação';
    if (temMonitoria) {
      if (mediaMonitoria >= 85) statusMonitoria = 'Boa';
      else if (mediaMonitoria >= 65) statusMonitoria = 'Regular';
      else statusMonitoria = 'Insatisfatória';
    }

    return { ...op, mediaQuiz, mediaMonitoria, statusQuiz, statusMonitoria };
  });
}

function calcularPorcentagem(pontuacao) {
  if (typeof pontuacao === 'number') return pontuacao;
  if (typeof pontuacao === 'string' && pontuacao.includes('/')) {
    const partes = pontuacao.split('/');
    const obtido = parseFloat(partes[0].trim());
    const total = parseFloat(partes[1].trim());
    return total > 0 ? Math.round((obtido / total) * 100) : 0;
  }
  return parseInt(pontuacao) || 0;
}
