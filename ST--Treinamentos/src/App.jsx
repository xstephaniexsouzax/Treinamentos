import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import RootLayout from './layouts/RootLayout';
import Login from './pages/Login';
import RotaGestao from './components/common/RotaGestao';
import RotaProduto from './components/common/RotaProduto';
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

function ConteudoAutenticado() {
  return (
    <RootLayout>
      <Suspense fallback={<CarregandoPagina />}>
        <Routes>
          {/* 1. PORTAL COP (Logo): Apresentação institucional */}
          <Route path="/" element={<Home />} />

          {/* 2. INÍCIO (Menu Central): Plataforma de Treinamentos */}
          <Route path="/treinamentos" element={<TreinamentosPlataforma />} />

          {/* 3. SUBMENUS DINÂMICOS: TELEBRAS, DPE, DETRAN — restrito ao(s) produto(s) do operador */}
          <Route
            path="/treinamentos/:produto/:tipo"
            element={
              <RotaProduto>
                <TreinamentosPlataforma />
              </RotaProduto>
            }
          />

          {/* Rotas gerais adicionais */}
          <Route path="/faq" element={<Faq />} />

          {/* Rotas de atendimento separadas */}
          <Route path="/contato" element={<ContatoInstrutor />} />
          <Route path="/suporte" element={<SuporteSistema />} />

          {/* Resultados de Quiz/Monitoria — restrito à gestão */}
          <Route
            path="/instrucoes"
            element={
              <RotaGestao>
                <Instrucoes />
              </RotaGestao>
            }
          />

          <Route path="/treinamento/:id" element={<TreinamentoDetalhe />} />
        </Routes>
      </Suspense>
    </RootLayout>
  );
}

function PortaoDeAcesso() {
  const { carregando, autenticado } = useAuth();

  if (carregando) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-slate-400 text-sm font-semibold">
        Verificando sessão...
      </div>
    );
  }

  if (!autenticado) {
    return <Login />;
  }

  return <ConteudoAutenticado />;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <PortaoDeAcesso />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
