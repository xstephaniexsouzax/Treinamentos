import React, { useState, useEffect } from 'react';
import { carregarEProcessarDados } from '../data/mockData';
import { Lock, User, LogOut, Search, ShieldCheck, Filter, Eye, X, RefreshCw, AlertTriangle } from 'lucide-react';

// ⚠️ IMPORTANTE — LEIA ANTES DE USAR EM PRODUÇÃO
// Este login é validado 100% no navegador porque o projeto não possui backend.
// Isso NÃO é segurança real: qualquer pessoa pode ler a senha no bundle JS
// ou pular a tela via DevTools. Trate esta tela como uma "porta fechada, não trancada":
// serve para não expor os dados por acidente, mas não protege contra alguém decidido.
// A correção definitiva é criar uma Vercel Serverless Function que valide a senha
// no servidor e devolva um token — o front nunca deveria conhecer a senha certa.
const USUARIO_GESTAO = import.meta.env.VITE_GESTAO_USUARIO || 'gestao';
const SENHA_GESTAO = import.meta.env.VITE_GESTAO_SENHA;
const SESSAO_DURACAO_MS = 30 * 60 * 1000; // 30 minutos

export default function Instrucoes() {
  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const [operadores, setOperadores] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [produto, setProduto] = useState('TODOS');
  const [busca, setBusca] = useState('');
  const [detalhesOperador, setDetalhesOperador] = useState(null);

  const carregarDados = async (produtoSelecionado = produto) => {
    setCarregando(true);
    try {
      const dados = await carregarEProcessarDados(produtoSelecionado);
      setOperadores(dados);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (autenticado) {
      carregarDados(produto);
    }
  }, [autenticado, produto]);

  // Expira a sessão automaticamente após SESSAO_DURACAO_MS
  useEffect(() => {
    if (!autenticado) return;
    const timer = setTimeout(() => {
      setAutenticado(false);
      setErro('Sessão expirada. Faça login novamente.');
    }, SESSAO_DURACAO_MS);
    return () => clearTimeout(timer);
  }, [autenticado]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!SENHA_GESTAO) {
      setErro('Login não configurado. Defina VITE_GESTAO_SENHA no ambiente.');
      return;
    }

    if (usuario === USUARIO_GESTAO && senha === SENHA_GESTAO) {
      setAutenticado(true);
      setErro('');
    } else {
      setErro('Usuário ou senha inválidos.');
    }
  };

  const operadoresFiltrados = operadores.filter((op) =>
    op.nome.toLowerCase().includes(busca.toLowerCase())
  );

  if (!autenticado) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-left">
        <form onSubmit={handleLogin} className="bg-white dark:bg-[#1e293b] p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
          <div className="text-center space-y-2">
            <ShieldCheck size={40} className="mx-auto text-brand" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Acesso à Gestão</h1>
          </div>

          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-800 dark:text-amber-300">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>Acesso restrito à equipe de gestão. Não compartilhe suas credenciais.</span>
          </div>

          {erro && <p className="text-xs text-red-500 font-bold text-center">{erro}</p>}

          <div>
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><User size={12} /> USUÁRIO</label>
            <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" required />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><Lock size={12} /> SENHA</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" required />
          </div>

          <button type="submit" className="w-full py-3 bg-brand hover:opacity-90 text-white font-bold rounded-xl text-sm cursor-pointer">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 text-left pb-12">
      <div className="flex justify-between items-center bg-white dark:bg-[#1e293b] p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Gestão de Desempenho</h1>
          <p className="text-xs text-slate-500">Acompanhamento Independente de Quiz e Monitoria</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => carregarDados(produto)} disabled={carregando} className="px-3.5 py-2 bg-brand/10 text-brand text-xs font-bold rounded-xl flex items-center gap-2 border border-brand/30 cursor-pointer">
            <RefreshCw size={14} className={carregando ? 'animate-spin' : ''} />
            {carregando ? 'Sincronizando...' : 'Sincronizar'}
          </button>
          <button onClick={() => setAutenticado(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer">
            <LogOut size={14} /> Sair
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center bg-white dark:bg-[#1e293b] p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
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

      <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
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
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
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
