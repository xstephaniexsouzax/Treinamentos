import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Sun, Moon, GraduationCap, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import LogoEmpresa from '../../assets/logo.png';

const LINKS_NAV = [
  { to: '/treinamentos', label: 'Início' },
  { to: '/', label: 'Quem Somos' },
  { to: '/instrucoes', label: 'Gestão' },
  { to: '/suporte', label: 'Suporte' },
];

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  // Função de estilo para indicar a página ativa
  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const linkAtivo = (path) => isActivePath(path)
    ? "text-brand font-extrabold border-b-2 border-brand pb-1 transition-all"
    : "text-slate-600 dark:text-slate-300 font-bold hover:text-brand pb-1 border-b-2 border-transparent transition-all";

  const linkAtivoMobile = (path) => isActivePath(path)
    ? "bg-brand/10 text-brand font-extrabold"
    : "text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800";

  return (
    <header className="w-full bg-white dark:bg-surface-card border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

        {/* ESQUERDA: Logo + Título */}
        <div className="flex items-center shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={LogoEmpresa}
              alt="ST Serviços Empresariais"
              className="h-14 w-auto object-contain"
            />
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

            <div className="flex items-center gap-1.5 font-black tracking-tight text-lg text-brand-strong">
              <span>Portal</span>
              <span className="text-brand">Treina</span>
              <GraduationCap size={20} className="text-brand ml-0.5 group-hover:rotate-12 transition-transform" />
            </div>
          </Link>
        </div>

        {/* CENTRO: Links de Navegação (desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 justify-center whitespace-nowrap">
          {LINKS_NAV.map((link) => (
            <Link key={link.to} to={link.to} className={`text-sm ${linkAtivo(link.to)}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* DIREITA: Grupo de Botões (Tema + Ação Rápida + Hambúrguer) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Botão de alternância de Tema */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            title={isDark ? "Modo Claro" : "Modo Escuro"}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center bg-transparent"
          >
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
          </button>

          {/* Botão verde exclusivo para dúvidas do instrutor (some em telas muito pequenas, vira ícone) */}
          <Link
            to="/contato"
            className="hidden sm:flex items-center gap-2 bg-brand hover:opacity-90 text-white text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-xs whitespace-nowrap"
          >
            <MessageSquare size={14} />
            Falar com o Instrutor
          </Link>
          <Link
            to="/contato"
            aria-label="Falar com o Instrutor"
            className="sm:hidden p-2 rounded-xl bg-brand text-white"
          >
            <MessageSquare size={18} />
          </Link>

          {/* Hambúrguer — visível só em mobile, onde a nav central some */}
          <button
            onClick={() => setMenuAberto((prev) => !prev)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center bg-transparent"
          >
            {menuAberto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Painel do menu mobile */}
      {menuAberto && (
        <nav className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-card px-4 py-3 flex flex-col gap-1">
          {LINKS_NAV.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuAberto(false)}
              className={`text-sm px-3 py-2.5 rounded-xl transition-colors ${linkAtivoMobile(link.to)}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
