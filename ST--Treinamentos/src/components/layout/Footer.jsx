import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-surface-card transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>© 2026 ST - Serviços Empresariais. Todos os direitos reservados.</p>
        <p className="text-xs mt-1 text-slate-400 dark:text-slate-500">
          Plataforma Interna de Treinamento e Capacitação de Operadores.
        </p>
      </div>
    </footer>
  );
}
