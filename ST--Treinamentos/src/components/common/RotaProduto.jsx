import React from 'react';
import { useParams } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Só deixa um operador ver o treinamento de um produto se esse produto estiver
 * na lista dele. Gestão sempre passa, sem restrição. Rotas sem :produto na URL
 * (ex: /treinamentos, a tela de boas-vindas) são liberadas pra qualquer autenticado.
 */
export default function RotaProduto({ children }) {
  const { produto } = useParams();
  const { papel, produtos } = useAuth();

  if (!produto) return children;

  const podeAcessar = papel === 'gestao' || produtos.includes(produto.toUpperCase());

  if (!podeAcessar) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-3">
        <ShieldAlert size={40} className="mx-auto text-red-500" />
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Acesso negado</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Você não tem acesso ao treinamento deste produto.
        </p>
      </div>
    );
  }

  return children;
}
