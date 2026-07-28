import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Faq() {
  const [aberto, setAberto] = useState(null);

  const perguntas = [
    {
      q: "Como meu progresso e nota do Quiz são registrados?",
      a: "Os quizes são processados via Google Forms integrado. Ao finalizar o envio, a equipe de capacitação recebe automaticamente suas respostas vinculadas ao seu usuário."
    },
    {
      q: "O que fazer se o vídeo ou o slide não carregar?",
      a: "Verifique se você está conectado à rede interna ou se possui permissão de acesso ao arquivo no Google Drive. Tente atualizar a página (F5). Se persistir, contate o suporte."
    },
    {
      q: "Posso refazer um treinamento caso tenha dúvidas?",
      a: "Sim! O portal fica disponível 24/7. Você pode acessar os materiais didáticos e rever os slides sempre que precisar consultar um procedimento padrão."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12 text-left">
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <HelpCircle className="text-brand h-8 w-8" />
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Perguntas Frequentes</h1>
      </div>

      <div className="space-y-3">
        {perguntas.map((item, index) => (
          <div 
            key={index} 
            className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-surface-card overflow-hidden"
          >
            <button
              onClick={() => setAberto(aberto === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-surface/50 transition-colors"
            >
              <span>{item.q}</span>
              {aberto === index ? <ChevronUp size={18} className="text-brand" /> : <ChevronDown size={18} />}
            </button>
            {aberto === index && (
              <div className="p-5 pt-0 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}