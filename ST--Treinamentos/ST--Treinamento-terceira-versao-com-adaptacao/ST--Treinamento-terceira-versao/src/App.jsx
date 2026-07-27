import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import RootLayout from './layouts/RootLayout';
import './styles/index.css';

const Home = lazy(() => import('./pages/Home'));
const TreinamentosPlataforma = lazy(() => import('./pages/TreinamentosPlataforma'));
const TreinamentoDetalhe = lazy(() => import('./pages/TreinamentoDetalhe'));
const Faq = lazy(() => import('./pages/Faq'));
const ContatoInstrutor = lazy(() => import('./pages/ContatoInstrutor'));
const SuporteSistema = lazy(() => import('./pages/SuporteSistema'));
const Instrucoes = lazy(() => import('./pages/Instrucoes'));

function CarregandoPagina() {
  return (
    <div className="flex items-center justify-center py-24 text-slate-400 text-sm font-semibold">
      Carregando...
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RootLayout>
          <Suspense fallback={<CarregandoPagina />}>
            <Routes>
              {/* 1. PORTAL COP (Logo): Apresentação institucional */}
              <Route path="/" element={<Home />} />

              {/* 2. INÍCIO (Menu Central): Plataforma de Treinamentos */}
              <Route path="/treinamentos" element={<TreinamentosPlataforma />} />

              {/* 3. SUBMENUS DINÂMICOS: TELEBRAS, DPE, DETRAN */}
              <Route path="/treinamentos/:produto/:tipo" element={<TreinamentosPlataforma />} />

              {/* Rotas gerais adicionais */}
              <Route path="/faq" element={<Faq />} />

              {/* Rotas de atendimento separadas */}
              <Route path="/contato" element={<ContatoInstrutor />} />
              <Route path="/suporte" element={<SuporteSistema />} />

              <Route path="/instrucoes" element={<Instrucoes />} />
              <Route path="/treinamento/:id" element={<TreinamentoDetalhe />} />
            </Routes>
          </Suspense>
        </RootLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
