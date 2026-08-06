import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Eye, X, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Instrucoes() {
  const { token, expirarSessao } = useAuth();

  const [operadores, setOperadores] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [produto, setProduto] = useState('TODOS');
  const [busca, setBusca] = useState('');
  const [detalhesOperador, setDetalhesOperador] = useState(null);

  const carregarDados = useCallback(async (produtoSelecionado = produto) => {
    if (!token) return;

    setCarregando(true);
    setErro('');
    try {
      const resposta = await fetch(`/api/dados?produto=${encodeURIComponent(produtoSelecionado)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resposta.status === 401) {
        setErro('Sessão expirada. Faça login novamente.');
        expirarSessao();
        return;
      }

      const dados = await resposta.json();

      if (!resposta.ok || !dados.sucesso) {
        console.error('Erro ao carregar dados:', dados.mensagem);
        setErro(dados.mensagem || 'Erro ao buscar os dados.');
        setOperadores([]);
        return;
      }

      setOperadores(dados.operadores);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setErro('Falha de conexão ao buscar os dados.');
    } finally {
      setCarregando(false);
    }
  }, [produto, token, expirarSessao]);

  useEffect(() => {
    carregarDados(produto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produto]);

  const operadoresFiltrados = operadores.filter((op) =>
    op.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 text-left pb-12">
      <div className="flex justify-between items-center bg-white dark:bg-surface-card p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Gestão de Desempenho</h1>
          <p className="text-xs text-slate-500">Acompanhamento Independente de Quiz e Monitoria</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => carregarDados(produto)} disabled={carregando} className="px-3.5 py-2 bg-brand/10 text-brand text-xs font-bold rounded-xl flex items-center gap-2 border border-brand/30 cursor-pointer">
            <RefreshCw size={14} className={carregando ? 'animate-spin' : ''} />
            {carregando ? 'Sincronizando...' : 'Sincronizar'}
          </button>
        </div>
      </div>

      {erro && (
        <div className="p-3 rounded-xl text-center font-semibold text-sm bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40">
          {erro}
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-between items-center bg-white dark:bg-surface-card p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-brand" />
          {['TODOS', 'TELEBRAS', 'DPE', 'DETRAN'].map((p) => (
            <button key={p} onClick={() => setProduto(p)} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${produto === p ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'}`}>
              {p}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input type="text" placeholder="Buscar operador..." value={busca} onChange={(e) => setBusca(e.target.value)} className="w-full pl-9 pr-3 py-1.5 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs" />
        </div>
      </div>

      <div className="bg-white dark:bg-surface-card rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase">
            <tr>
              <th className="p-4">Operador</th>
              <th className="p-4">Produto</th>
              <th className="p-4 text-center">Quiz (Meta ≥ 70%)</th>
              <th className="p-4 text-center">Monitoria (3 Faixas)</th>
              <th className="p-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {operadoresFiltrados.length > 0 ? (
              operadoresFiltrados.map((op) => (
                <tr key={op.nome} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{op.nome}</td>
                  <td className="p-4"><span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded font-bold text-slate-600 dark:text-slate-300">{op.produto}</span></td>

                  <td className="p-4 text-center">
                    {op.mediaQuiz !== null ? (
                      <div className="space-y-0.5">
                        <span className="font-bold text-sm text-slate-800 dark:text-white">{op.mediaQuiz}%</span>
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            op.statusQuiz === 'Aprovado' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                          }`}>
                            {op.statusQuiz}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">Sem Avaliação</span>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    {op.mediaMonitoria !== null ? (
                      <div className="space-y-0.5">
                        <span className="font-bold text-sm text-slate-800 dark:text-white">{op.mediaMonitoria}%</span>
                        <div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            op.statusMonitoria === 'Boa' ? 'bg-emerald-100 text-emerald-700' :
                            op.statusMonitoria === 'Regular' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'
                          }`}>
                            {op.statusMonitoria}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">Sem Avaliação</span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <button onClick={() => setDetalhesOperador(op)} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-bold flex items-center gap-1 ml-auto cursor-pointer transition-all">
                      <Eye size={12} /> Detalhes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">
                  {carregando ? 'Carregando dados da planilha...' : 'Nenhum registro encontrado.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {detalhesOperador && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-surface-card p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b dark:border-slate-700 pb-3">
              <div>
                <h2 className="font-bold text-lg text-slate-900 dark:text-white">{detalhesOperador.nome}</h2>
                <p className="text-xs text-slate-500">Operação: {detalhesOperador.produto}</p>
              </div>
              <button onClick={() => setDetalhesOperador(null)} className="cursor-pointer text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>

            <div className="space-y-4 max-h-72 overflow-y-auto text-xs pr-1">
              <div>
                <h3 className="font-bold text-brand mb-2">Histórico de Quizzes ({detalhesOperador.quizzes.length})</h3>
                {detalhesOperador.quizzes.length > 0 ? (
                  <div className="space-y-1.5">
                    {detalhesOperador.quizzes.map((q, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-300">{q.data} - {q.modulo}</span>
                        <span className="font-bold text-brand">{q.nota}%</span>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-slate-400 italic">Nenhum quiz realizado até o momento.</p>}
              </div>

              <div>
                <h3 className="font-bold text-amber-600 mb-2">Histórico de Monitorias ({detalhesOperador.monitorias.length})</h3>
                {detalhesOperador.monitorias.length > 0 ? (
                  <div className="space-y-1.5">
                    {detalhesOperador.monitorias.map((m, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-300">{m.data} - {m.avaliador}</span>
                        <span className="font-bold text-amber-600">{m.nota}%</span>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-slate-400 italic">Nenhuma monitoria registrada até o momento.</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
