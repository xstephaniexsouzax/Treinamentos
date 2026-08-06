import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/** Só deixa passar quem tem papel "gestao". Operador vê uma mensagem de acesso negado. */
export default function RotaGestao({ children }) {
  const { papel } = useAuth();

  if (papel !== 'gestao') {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-3">
        <ShieldAlert size={40} className="mx-auto text-red-500" />
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Acesso negado</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Esta área é restrita à equipe de gestão.
        </p>
      </div>
    );
  }

  return children;
}
