import React, { useState } from 'react';
import { Lock, User, ShieldCheck, AlertTriangle, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [entrando, setEntrando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setEntrando(true);

    try {
      await login(usuario, senha);
    } catch (err) {
      setErro(err.message || 'Falha de conexão ao tentar entrar. Tente novamente.');
    } finally {
      setEntrando(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-surface p-4">
      <div className="max-w-md w-full">
        <div className="flex items-center justify-center gap-1.5 font-black tracking-tight text-xl text-brand-strong mb-6">
          <span>Portal</span>
          <span className="text-brand">Treina</span>
          <GraduationCap size={22} className="text-brand ml-0.5" />
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-card p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
          <div className="text-center space-y-2">
            <ShieldCheck size={40} className="mx-auto text-brand" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Acesso à Plataforma</h1>
          </div>

          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-800 dark:text-amber-300">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>Acesso restrito à equipe. Não compartilhe suas credenciais.</span>
          </div>

          {erro && <p className="text-xs text-red-500 font-bold text-center">{erro}</p>}

          <div>
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><User size={12} /> USUÁRIO</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><Lock size={12} /> SENHA</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={entrando}
            className="w-full py-3 bg-brand hover:opacity-90 disabled:opacity-50 text-white font-bold rounded-xl text-sm cursor-pointer"
          >
            {entrando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}