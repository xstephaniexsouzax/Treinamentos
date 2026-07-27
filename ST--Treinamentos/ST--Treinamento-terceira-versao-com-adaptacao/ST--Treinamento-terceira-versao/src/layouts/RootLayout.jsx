import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

export default function RootLayout({ children }) {
  const location = useLocation();
  const mostraSidebar = location.pathname.startsWith('/treinamentos');

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-surface text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Topbar Fixa */}
      <Header />

      {/* 2. Corpo do Sistema */}
      <div className="flex flex-1 w-full relative">
        {mostraSidebar && <Sidebar />}

        <main className={`flex-1 flex flex-col min-h-[calc(100vh-5rem)] bg-slate-50 dark:bg-surface transition-colors duration-300 ${mostraSidebar ? 'md:pl-64' : 'md:pl-0'}`}>

          {/* Conteúdo da Página */}
          <div className="w-full max-w-7xl mx-auto flex-1 p-4 sm:p-6 lg:p-8 pb-16">
            {children}
          </div>

          {/* Footer na Base Real */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
