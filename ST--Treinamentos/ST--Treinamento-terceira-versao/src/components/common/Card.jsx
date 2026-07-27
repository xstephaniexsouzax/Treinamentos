import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function Card({ treinamento }) {
  const totalModulos = treinamento.modulos.length;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      
      {/* Imagem de Capa */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={treinamento.imagemCapa}
          alt={treinamento.titulo}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-semibold text-blue-600 shadow-sm dark:bg-slate-900/90 dark:text-blue-400">
          {treinamento.categoria}
        </span>
      </div>

      {/* Conteúdo do Card */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
          <BookOpen className="h-3.5 w-3.5 text-blue-500" />
          <span>{totalModulos} {totalModulos === 1 ? 'Módulo' : 'Módulos'}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors">
          {treinamento.titulo}
        </h3>
        
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 flex-1">
          {treinamento.descricao}
        </p>

        {/* Botão de Ação */}
        <Link
          to={`/treinamento/${treinamento.id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-blue-600 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:text-white dark:bg-slate-900 dark:text-white dark:hover:bg-blue-600 transition-all"
        >
          Acessar treinamento
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}