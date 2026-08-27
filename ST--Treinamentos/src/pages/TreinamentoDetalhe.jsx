import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Video, ClipboardCheck } from 'lucide-react';
import { todosProdutosData } from '../data';

export default function TreinamentoDetalhe() {
  const { id } = useParams();

  // Garante o tratamento correto caso todosProdutosData venha como Objeto ou Array
  const todosLista = Array.isArray(todosProdutosData)
    ? todosProdutosData
    : Object.values(todosProdutosData || {}).flat();

  // Busca o treinamento clicado comparando os IDs como String
  const treinamento = todosLista.find((t) => String(t.id) === String(id));
  const modulo = treinamento?.modulos?.[0];

  const scrollPos = useRef(0);

  useEffect(() => {
    // Guarda a posição exata do scroll enquanto o usuário navega na página
    const handleScroll = () => {
      if (document.activeElement?.tagName !== 'IFRAME') {
        scrollPos.current = window.scrollY;
      }
    };

    // Função que força o navegador a manter a mesma posição de scroll
    const manterScrollFixo = () => {
      window.scrollTo({
        top: scrollPos.current,
        behavior: 'instant'
      });
    };

    // Monitora quando o foco muda para um iframe (cliques em zoom, avançar, etc)
    const handleBlur = () => {
      setTimeout(() => {
        if (document.activeElement?.tagName === 'IFRAME') {
          manterScrollFixo();
        }
      }, 50);
    };

    // Rastreia cliques diretos na janela para capturar interações com os botões do slide
    const handleWindowClick = () => {
      setTimeout(() => {
        if (document.activeElement?.tagName === 'IFRAME') {
          manterScrollFixo();
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  // Se não encontrar o treinamento ou o módulo, exibe a mensagem amigável sem quebrar a tela
  if (!treinamento || !modulo) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-red-500 font-bold text-lg">
          Treinamento ou módulo não encontrado.
        </p>
        <Link
          to="/treinamentos"
          className="text-blue-600 dark:text-blue-400 underline font-medium inline-block hover:opacity-80"
        >
          Voltar para a central de treinamentos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 text-left animate-fade-in">

      {/* Cabeçalho Dinâmico com Boas-Vindas */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Link
            to={`/treinamentos/${treinamento.produto}/${treinamento.tipo}`}
            className="text-blue-600 dark:text-blue-400 flex items-center gap-2 font-medium hover:underline w-fit"
          >
            <ArrowLeft size={18} /> Voltar para os Treinamentos
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {treinamento.titulo}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 italic">
            {treinamento.descricao}
          </p>
        </div>

        {/* Card de Boas-Vindas e Regras de Entrada */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
              Bem-vindo ao treinamento!
            </h3>
            <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs w-fit">
              Elaborado por: <span className="text-blue-600 dark:text-blue-400">Stephanie Souza Miranda</span>
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Antes de iniciar:
            </p>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside pl-1">
              <li>Assista aos vídeos na íntegra, sempre que forem disponibilizados.</li>
              <li>Leia o material em PDF / Slides com atenção.</li>
              <li>Responda ao quiz ao final de cada módulo.</li>
              <li className="text-amber-600 dark:text-amber-400 font-semibold">
                É necessário obter pelo menos <strong>70% de acertos</strong> para aprovação.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 1. SEÇÃO SLIDE (PDF) */}
      {modulo.pdfUrl && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <FileText className="text-blue-500" /> {treinamento.tituloSecaoSlides || 'Material Didático / Slides'}
          </h2>
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
            <iframe
              src={modulo.pdfUrl}
              width="100%"
              height="100%"
              loading="lazy"
              title={treinamento.tituloSecaoSlides || 'Slides'}
            ></iframe>
          </div>
        </section>
      )}

      {/* 2. SEÇÃO VÍDEO (Apenas se houver link de vídeo) */}
      {modulo.videoUrl && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Video className="text-red-500" /> {treinamento.tituloSecaoVideo || 'Vídeo Explicativo'}
          </h2>
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-black">
            <iframe
              src={modulo.videoUrl}
              width="100%"
              height="100%"
              allowFullScreen
              title={treinamento.tituloSecaoVideo || 'Vídeo'}
            ></iframe>
          </div>
        </section>
      )}

      {/* 3. SEÇÃO QUIZ */}
      {modulo.quizUrl && (
        <section className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              {treinamento.textoIntroducaoQuiz || 'Responda ao questionário abaixo para validar seu aprendizado.'}
            </p>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <ClipboardCheck className="text-green-500" /> {treinamento.tituloSecaoQuiz || 'Avaliação de Conhecimento'}
          </h2>
          <div className="w-full h-[800px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
            <iframe
              src={modulo.quizUrl}
              width="100%"
              height="100%"
              title={treinamento.tituloSecaoQuiz || 'Quiz'}
            >
              Carregando…
            </iframe>
          </div>
        </section>
      )}
    </div>
  );
}