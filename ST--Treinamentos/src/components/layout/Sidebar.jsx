import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, BookOpen, RotateCcw, HelpCircle, Folder, Users, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TODOS_OS_PRODUTOS = ['TELEBRAS', 'DPE', 'DETRAN'];

export default function Sidebar() {
  const location = useLocation();
  const { papel, produtos } = useAuth();
  const [abertoMobile, setAbertoMobile] = useState(false);
  const [produtosAbertos, setProdutosAbertos] = useState({
    TELEBRAS: true, // Começa aberto por padrão
    DPE: false,
    DETRAN: false
  });

  const toggleProduto = (prod) => {
    setProdutosAbertos(prev => ({ ...prev, [prod]: !prev[prod] }));
  };

  // Gestão vê os 3 produtos; operador só vê o(s) produto(s) atribuído(s) a ele.
  const listaProdutos = papel === 'gestao'
    ? TODOS_OS_PRODUTOS
    : TODOS_OS_PRODUTOS.filter((p) => produtos.includes(p));

  const subMenuAtivo = (prod, tipo) =>
    location.pathname === `/treinamentos/${prod}/${tipo}`
      ? "bg-brand/10 text-brand font-bold"
      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900";

  const conteudoMenu = (
    <div className="space-y-4">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-2">Estrutura Operacional</p>

      {listaProdutos.map((produto) => (
        <div key={produto} className="space-y-1">
          {/* Botão Superior do Produto */}
          <button
            onClick={() => toggleProduto(produto)}
            aria-expanded={produtosAbertos[produto]}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Folder size={16} className="text-brand" />
              <span>{produto}</span>
            </div>
            {produtosAbertos[produto] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {/* Submenus Isolados por Produto */}
          {produtosAbertos[produto] && (
            <div className="pl-4 space-y-1 border-l border-slate-100 dark:border-slate-800 ml-5 mt-1">
              <Link
                to={`/treinamentos/${produto}/quem-somos`}
                onClick={() => setAbertoMobile(false)}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${subMenuAtivo(produto, 'quem-somos')}`}
              >
                <Users size={14} /> Apresentação
              </Link>

              <Link
                to={`/treinamentos/${produto}/capacitacao`}
                onClick={() => setAbertoMobile(false)}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${subMenuAtivo(produto, 'capacitacao')}`}
              >
                <BookOpen size={14} /> Capacitação
              </Link>

              <Link
                to={`/treinamentos/${produto}/reciclagem`}
                onClick={() => setAbertoMobile(false)}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${subMenuAtivo(produto, 'reciclagem')}`}
              >
                <RotateCcw size={14} /> Reciclagem
              </Link>

              <Link
                to={`/treinamentos/${produto}/faq`}
                onClick={() => setAbertoMobile(false)}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${subMenuAtivo(produto, 'faq')}`}
              >
                <HelpCircle size={14} /> Perguntas Frequentes
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Botão flutuante que abre a sidebar em mobile/tablet */}
      <button
        onClick={() => setAbertoMobile(true)}
        aria-label="Abrir menu de treinamentos"
        className="md:hidden fixed bottom-5 right-5 z-40 p-3.5 rounded-full bg-brand text-white shadow-lg cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar fixa — só a partir de md */}
      <aside className="hidden md:block w-64 h-[calc(100vh-5rem)] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card fixed left-0 top-20 overflow-y-auto p-4 z-30 text-left">
        {conteudoMenu}
      </aside>

      {/* Drawer para mobile/tablet */}
      {abertoMobile && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setAbertoMobile(false)}
            aria-hidden="true"
          />
          <aside className="relative w-72 max-w-[80vw] h-full bg-white dark:bg-surface-card overflow-y-auto p-4 text-left shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-slate-900 dark:text-white">Menu</p>
              <button
                onClick={() => setAbertoMobile(false)}
                aria-label="Fechar menu"
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            {conteudoMenu}
          </aside>
        </div>
      )}
    </>
  );
}
