import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle, 
  ListOrdered, 
  AlertTriangle, 
  Users, 
  Globe2, 
  HelpCircle,
  ChevronDown,
  Handshake,
  Headset
} from 'lucide-react';
import { todosProdutosData } from '../data';
import { quemSomosData } from '../data/quemSomosData';
import Card from '../components/common/Card';

export default function TreinamentosPlataforma() {
  const { produto, tipo } = useParams();
  const [faqAberta, setFaqAberta] = useState(null);

  // Unifica os treinamentos com proteção contra valores indefinidos
  const treinamentosData = Array.isArray(todosProdutosData)
    ? todosProdutosData
    : Object.values(todosProdutosData || {}).flat();

  // =========================================================================
  // 1. TELA INICIAL (Boas-vindas + Instruções da Plataforma)
  // =========================================================================
  if (!produto || !tipo) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-10 animate-fade-in text-left">
        <div className="relative overflow-hidden rounded-[40px] p-8 sm:p-16 text-white shadow-2xl transition-all
          bg-[linear-gradient(115deg,var(--accent)_0%,#0ea5e9_35%,#a855f7_70%,#f97316_100%)]">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest border border-white/30">
              Capacitação Interna
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Bem-vindo ao Portal de <br />
              <span className="text-white/90">Treinamentos</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-50/90 leading-relaxed font-medium">
              Acesse as instruções operacionais, manuais técnicos e capacitações corporativas de forma rápida, simples e direta.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-bold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20">
                <CheckCircle size={18} /> Conteúdo Atualizado
              </div>
              <div className="flex items-center gap-2 text-sm font-bold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20">
                <BookOpen size={18} /> Material de Apoio
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 bg-white dark:bg-surface-card p-8 sm:p-12 rounded-[40px] border border-slate-200 dark:border-slate-700/80 shadow-xs transition-colors duration-300">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-brand-strong dark:text-white">
              Como utilizar o Portal
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium">
              Siga atentamente as diretrizes abaixo para garantir o correto aproveitamento do seu treinamento técnico.
            </p>
            <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-700/80 pt-2"></div>
          </div>

          <div className="p-6 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl flex gap-4 items-start transition-colors">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl mt-0.5 shrink-0">
              <BookOpen size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-blue-950 dark:text-blue-200 text-base">Aba Módulos</h4>
              <p className="text-sm text-blue-800/80 dark:text-blue-300/90 leading-relaxed">
                Na barra lateral, escolha um produto e navegue pelas seções para visualizar os treinamentos disponíveis.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-brand-strong dark:text-white font-bold text-base sm:text-lg">
              <ListOrdered size={20} className="text-slate-400 dark:text-slate-500" />
              <h3>Orientações para o Operador</h3>
            </div>
            <div className="p-5 bg-slate-50/50 dark:bg-surface/60 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl flex gap-4 items-center">
              <div className="h-8 w-8 shrink-0 flex items-center justify-center font-bold text-sm bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-900/50">1</div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Realizar os módulos na ordem em que foram disponibilizados, iniciando pelo Módulo 1.
              </p>
            </div>
            <div className="p-5 bg-slate-50/50 dark:bg-surface/60 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl flex gap-4 items-center">
              <div className="h-8 w-8 shrink-0 flex items-center justify-center font-bold text-sm bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-900/50">2</div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Realizar a leitura e visualização completa de todo o material de apoio.
              </p>
            </div>
            <div className="p-5 bg-slate-50/50 dark:bg-surface/60 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl flex gap-4 items-center">
              <div className="h-8 w-8 shrink-0 flex items-center justify-center font-bold text-sm bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-900/50">3</div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Após cada módulo, valide o aprendizado por meio do Quiz.
              </p>
            </div>
          </div>

          <div className="p-6 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-extrabold text-xs uppercase tracking-wider">
              <AlertTriangle size={16} />
              <h4>Requisitos Obrigatórios</h4>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-amber-900/90 dark:text-amber-300/80 font-medium">
              <li>É obrigatória a visualização integral de todo o conteúdo.</li>
              <li>É obrigatório responder a todas as perguntas apresentadas no Quiz.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. CASO A: "QUEM SOMOS" (TOTALMENTE DINÂMICO DE quemSomosData.js)
  // =========================================================================
  // =========================================================================
// 2. CASO A: "QUEM SOMOS" (TOTALMENTE ADAPTÁVEL E DINÂMICO)
// =========================================================================
if (tipo === 'quem-somos') {
  const chaveProd = produto?.toUpperCase() || 'TELEBRAS';
  
  // Busca no arquivo quemSomosData
  const dadosQuemSomos = quemSomosData[chaveProd] || quemSomosData['TELEBRAS'];
  const listaEquipe = dadosQuemSomos?.equipe || [];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-8 animate-fade-in text-left pb-12">
      {/* Apresentação do Produto */}
      <div className="p-8 bg-white dark:bg-surface-card rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6 shadow-xs">
        <div className="flex items-center gap-3 text-brand-strong dark:text-white">
          <div className="p-2 bg-brand/10 text-brand rounded-xl">
            <Globe2 size={24} />
          </div>
          <h2 className="text-2xl font-bold">{dadosQuemSomos?.titulo || chaveProd}</h2>
        </div>
        <p className="text-justify text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {dadosQuemSomos?.descricao || 'Informações sobre o produto ainda não estão disponíveis.'}
        </p>
      </div>

      {/* Rotina de Qualidade e Capacitação (Grid Dinâmico) */}
      <div className="p-8 bg-white dark:bg-surface-card rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6 shadow-xs">
        <div className="flex items-center gap-3 text-brand-strong dark:text-white">
          <div className="p-2 bg-brand/10 text-brand rounded-xl">
            <CheckCircle size={24} />
          </div>
          <h2 className="text-2xl font-bold">Gestão Responsável pelo Produto</h2>
        </div>

        <p className="text-justify text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Nossa estrutura operacional integra a instrução técnica ao acompanhamento contínuo da qualidade, garantindo que o aprendizado se converta em um atendimento de excelência diário.
        </p>

        {/* 🚀 RENDERING DINÂMICO DOS SETORES */}
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(listaEquipe.length, 3)} gap-4 pt-2`}>
          {listaEquipe.map((blocoSetor, index) => (
            <div 
              key={index} 
              className="p-5 bg-slate-50 dark:bg-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <Users size={18} className="text-brand" />
                  <h4>{blocoSetor.setor}</h4>
                </div>

                {/* Mapeamento dos Membros do Setor */}
                {blocoSetor.membros?.map((membro, idx) => (
                  <div key={idx} className="pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                    <p className="font-extrabold text-base text-slate-900 dark:text-white">{membro.nome}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{membro.cargo}</p>
                  </div>
                ))}
              </div>

              {/* Descrição do Setor se existir */}
              {blocoSetor.descricaoSetor && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-2">
                  {blocoSetor.descricaoSetor}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Seção A Parceria */}
      <div className="p-8 bg-white dark:bg-surface-card rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
        <div className="flex items-center gap-3 text-brand-strong dark:text-white">
          <div className="p-2 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-xl">
            <Handshake size={24} />
          </div>
          <h2 className="text-2xl font-bold">A Parceria</h2>
        </div>

        <div className="space-y-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <p className="text-justify">
            A parceria entre a <strong className="font-bold text-slate-900 dark:text-white">ST Serviços Empresariais</strong> e a <strong className="font-bold text-slate-900 dark:text-white">{chaveProd}</strong> tem como objetivo proporcionar um atendimento de excelência aos clientes, garantindo suporte eficiente, agilidade na tratativa das demandas e uma experiência alinhada aos padrões de qualidade estabelecidos pela empresa.
          </p>
        </div>
      </div>
    </div>
  );
}
  // =========================================================================
  // 3. CASO B: "CAPACITAÇÃO" E "RECICLAGEM"
  // =========================================================================
  if (tipo === 'capacitacao' || tipo === 'reciclagem') {
    const listaTreinamentos = treinamentosData.filter(
      (t) => t.produto?.toUpperCase() === produto?.toUpperCase() && t.tipo === tipo
    );

    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-8 animate-fade-in text-left pb-12">
        <div className="p-8 bg-white dark:bg-surface-card rounded-[32px] border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-brand font-extrabold text-xs uppercase tracking-wider">
            <BookOpen size={16} />
            <span>Treinamentos Operacionais</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white capitalize">
                {tipo} - {produto.toUpperCase()}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                Selecione um dos módulos abaixo para acessar os slides, vídeos e avaliação prática.
              </p>
            </div>
            <Link
              to="/contato"
              className="inline-flex items-center justify-center bg-brand hover:opacity-90 text-white text-xs font-extrabold uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-xs whitespace-nowrap"
            >
              Falar com o Instrutor
            </Link>
          </div>
        </div>

        {listaTreinamentos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listaTreinamentos.map((item) => (
              <Card key={item.id} treinamento={item} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-surface-card rounded-3xl border border-slate-200 dark:border-slate-700/80">
            <p className="font-bold text-lg">Nenhum módulo cadastrado nesta seção ainda.</p>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 4. CASO C: "PERGUNTAS FREQUENTES" (FAQ DO PRODUTO)
  // =========================================================================
  if (tipo === 'faq') {
    const faqsPadrao = [
      {
        pergunta: `Como funciona o fluxo de atendimento da operação ${produto.toUpperCase()}?`,
        resposta: 'O fluxo segue rigorosamente os manuais técnicos e instruções de trabalho disponibilizados na aba de Capacitação.'
      },
      {
        pergunta: 'Onde encontro os materiais complementares do treinamento?',
        resposta: 'Todos os materiais em PDF e vídeos explicativos estão inseridos dentro do módulo de cada treinamento.'
      },
      {
        pergunta: 'Qual a pontuação mínima para aprovação no Quiz?',
        resposta: 'É necessário obter um rendimento mínimo de 70% de acertos para validar sua nota de aprovação.'
      }
    ];

    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-8 animate-fade-in text-left pb-12">
        <div className="p-8 bg-white dark:bg-surface-card rounded-[32px] border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-brand font-extrabold text-xs uppercase tracking-wider">
            <HelpCircle size={16} />
            <span>Perguntas Frequentes</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            FAQ - {produto.toUpperCase()}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Dúvidas recorrentes e orientações rápidas para a operação {produto.toUpperCase()}.
          </p>
        </div>

        <div className="space-y-4">
          {faqsPadrao.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-surface-card border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setFaqAberta(faqAberta === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
              >
                <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                  {faq.pergunta}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                    faqAberta === index ? 'rotate-180 text-brand' : ''
                  }`}
                />
              </button>
              {faqAberta === index && (
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                  {faq.resposta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}