import React, { useState } from 'react';
import { Lock, User, ShieldCheck, AlertTriangle, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
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
      <div className="max-w-md w-full animate-fade-in">
        <div className="flex items-center justify-center gap-1.5 font-black tracking-tight text-xl text-brand-strong mb-8">
          <span>Portal</span>
          <span className="text-brand">Treina</span>
          <GraduationCap size={22} className="text-brand ml-0.5" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-surface-card p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center">
              <ShieldCheck size={24} className="text-brand" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Bem-vindo(a) de volta</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Informe seu usuário e senha para acessar a plataforma.
            </p>
          </div>

          {erro && (
            <div className="p-3 rounded-xl text-center font-semibold text-sm bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40">
              {erro}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Usuário
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="seu.usuario"
                  autoComplete="username"
                  autoFocus
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600/80 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-300 dark:border-slate-600/80 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors"
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={entrando}
            className="w-full py-3.5 bg-brand hover:opacity-90 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-sm cursor-pointer"
          >
            {entrando ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-800 dark:text-amber-300">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>Acesso restrito à equipe. Não compartilhe suas credenciais.</span>
          </div>
        </form>
      </div>
    </div>
  );
}