import React from 'react';
import { PhoneCall, Sparkles, ShieldCheck, Target, Users, Code2, Award, Headset } from 'lucide-react';
import { Link } from 'react-router-dom';

import logoST from '../assets/logo.png'; 

export default function Home() {
  const produtosEmpresa = [
    { 
      nome: 'TELEBRAS', 
      desc: 'Suporte técnico especializado em infraestrutura e conectividade de rede nacional.', 
      rota: '/treinamentos/TELEBRAS/quem-somos',
      badge: 'Redes & Conectividade'
    },
    { 
      nome: 'DPE', 
      desc: 'Atendimento humanizado focado na triagem e suporte ao cidadão da Defensoria Pública.', 
      rota: '/treinamentos/DPE/quem-somos',
      badge: 'Atendimento Público'
    },
    { 
      nome: 'DETRAN', 
      desc: 'Soluções integradas para agendamentos, consultas de CNH e desmistificação de processos estaduais.', 
      rota: '/treinamentos/DETRAN/quem-somos',
      badge: 'Serviços Estaduais'
    }
  ];

  return (
    <div className="relative space-y-16 py-8 animate-fade-in text-left overflow-hidden">
      
      {/* 🌟 LUZES DE FUNDO (Efeito de Profundidade) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/10 dark:bg-green-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* ========== SEÇÃO 1: DESENVOLVIMENTO & IDEALIZAÇÃO (STEPHANIE) ========== */}
      <div className="max-w-4xl mx-auto">
        <div className="p-6 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-purple-950/30 border border-slate-200 dark:border-slate-700/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white dark:bg-[#1e293b] text-[#1f9443] dark:text-[#4ade80] rounded-xl shadow-xs">
              <Code2 size={22} />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Desenvolvimento & Idealização
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Stephanie Souza Miranda
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold bg-white dark:bg-[#1e293b] px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Projeto Portal Treina
          </span>
        </div>
      </div>

      {/* ========== SEÇÃO 2: APRESENTAÇÃO DA EMPRESA ========== */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* LOGO COM EFEITO HOVER & FLOATING */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
            <img 
              src={logoST} 
              alt="ST Serviços Empresariais Logo" 
              className="relative h-20 sm:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* TAG INTERATIVA */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800/60 text-green-700 dark:text-green-300 text-sm sm:text-base font-semibold shadow-xs">
            <Sparkles size={16} className="animate-pulse text-green-500" />
            <span>Plataforma de Capacitação Continuada</span>
          </div>
        </div>

        {/* TÍTULO COM GRADIENTE */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            ST <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">Serviços Empresariais</span>
          </h1>
        </div>
        
        <div className="text-center">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300"> 
            Excelência em <span className="text-green-600 dark:text-green-400 font-bold">Atendimento e Teleatendimento</span>
          </p>
        </div>
        
        <div className="space-y-5 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <p className="text-left">
            A ST Serviços Empresariais é uma empresa especializada em soluções de teleatendimento, atuando com foco na qualidade, eficiência e excelência no relacionamento com clientes.
          </p>
          
          <p className="text-left">
            Desenvolvemos operações de call center, oferecendo suporte estratégico para empresas que buscam aprimorar a comunicação com seus clientes, otimizar processos e fortalecer resultados.
          </p>
          
          <p className="text-left">
            Nossa equipe é composta por profissionais capacitados e comprometidos em prestar um atendimento ágil, humanizado e alinhado às necessidades de cada parceiro. Trabalhamos com responsabilidade, ética e foco em resultados, garantindo soluções personalizadas para diferentes segmentos de mercado.
          </p>
          
          <p className="text-left">
            Na ST Serviços Empresariais, acreditamos que a excelência no atendimento é um dos principais diferenciais para o sucesso dos negócios. Por isso, investimos continuamente em capacitação, tecnologia e melhoria de processos para entregar serviços que gerem valor e confiança aos nossos clientes.
          </p>
        </div>
      </div>

      {/* ========== SEÇÃO 3: SOBRE A PLATAFORMA ========== */}
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Sobre a Plataforma
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            Este Portal de Treinamentos foi desenvolvido para centralizar, simplificar e padronizar a capacitação técnica de nossos operadores. Aqui, você encontra de forma ágil todas as instruções operacionais necessárias para o dia a dia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="p-6 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs hover:shadow-sm transition-shadow">
            <div className="p-2.5 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 w-fit rounded-lg">
              <Target size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Objetivo</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Garantir que toda a equipe tenha acesso imediato aos procedimentos corretos, evitando erros operacionais.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs hover:shadow-sm transition-shadow">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 w-fit rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Qualidade</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Manter os padrões técnicos e de segurança exigidos pelas normas regulamentares da organização.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs hover:shadow-sm transition-shadow">
            <div className="p-2.5 bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 w-fit rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Autonomia</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Permitir que o colaborador estude, consulte materiais e realize avaliações no seu próprio ritmo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SEÇÃO 4: ROTINA DE QUALIDADE E CAPACITAÇÃO ========== */}
      <div className="max-w-4xl mx-auto">
        <div className="p-8 bg-white dark:bg-[#1e293b] rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 text-[#0b2545] dark:text-white">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Award size={24} />
            </div>
            <h2 className="text-2xl font-bold">Rotina de Qualidade e Capacitação</h2>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Nossa estrutura operacional integra a instrução técnica ao acompanhamento contínuo da qualidade, garantindo que o aprendizado se converta em um atendimento de excelência diário.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 bg-slate-50 dark:bg-[#161f30] rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Users size={18} className="text-[#1f9443]" />
                <h4>Instrutoria de Treinamento</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Capacitação inicial e contínua dos operadores, alinhamento de procedimentos técnicos e atualização das instruções operacionais.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-[#161f30] rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Headset size={18} className="text-blue-500" />
                <h4>Monitoria de Qualidade</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Acompanhamento de chamados, avaliação de performance e feedbacks direcionados para garantir a conformidade dos atendimentos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SEÇÃO 5: PRODUTOS ========== */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Nossos Produtos Atendidos
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Soluções especializadas para cada segmento de negócio
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0 max-w-6xl mx-auto">
          {produtosEmpresa.map((prod) => (
            <Link 
              key={prod.nome} 
              to={prod.rota}
              className="group relative p-6 bg-white dark:bg-[#182234] border border-slate-200/80 dark:border-slate-800 rounded-2xl flex flex-col justify-between 
                shadow-sm hover:shadow-lg hover:shadow-green-500/10 dark:hover:shadow-green-500/5 
                hover:-translate-y-1 hover:border-green-500/40 dark:hover:border-green-500/30 
                transition-all duration-300 ease-out active:scale-[0.98]"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="p-3 bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    <PhoneCall size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-right">
                    {prod.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {prod.nome}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}