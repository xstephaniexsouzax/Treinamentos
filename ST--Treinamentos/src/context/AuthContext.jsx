import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Sessão validada no servidor (Vercel Serverless Function em /api/login).
// O front nunca conhece usuário/senha corretos — só envia o que foi digitado
// e recebe de volta um token assinado, válido por tempo limitado.
const CHAVE_SESSAO = 'st_sessao_usuario';

const AuthContext = createContext(null);

function lerSessaoSalva() {
  try {
    const bruto = sessionStorage.getItem(CHAVE_SESSAO);
    if (!bruto) return null;

    const sessao = JSON.parse(bruto);
    if (!sessao.token || !sessao.expiraEm || Date.now() > sessao.expiraEm) {
      sessionStorage.removeItem(CHAVE_SESSAO);
      return null;
    }
    return sessao;
  } catch {
    sessionStorage.removeItem(CHAVE_SESSAO);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [sessao, setSessao] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Ao montar, tenta restaurar uma sessão válida salva nesta aba (evita pedir login de novo a cada refresh).
  useEffect(() => {
    setSessao(lerSessaoSalva());
    setCarregando(false);
  }, []);

  // Expira a sessão automaticamente quando o token salvo vencer.
  useEffect(() => {
    if (!sessao) return undefined;

    const restante = sessao.expiraEm - Date.now();
    const timer = setTimeout(() => {
      sessionStorage.removeItem(CHAVE_SESSAO);
      setSessao(null);
    }, Math.max(restante, 0));

    return () => clearTimeout(timer);
  }, [sessao]);

  const login = useCallback(async (usuario, senha) => {
    const resposta = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha }),
    });

    const dados = await resposta.json();

    if (!resposta.ok || !dados.sucesso) {
      throw new Error(dados.mensagem || 'Usuário ou senha inválidos.');
    }

    const novaSessao = {
      token: dados.token,
      usuario: dados.usuario,
      papel: dados.papel,
      produtos: dados.produtos || [],
      expiraEm: Date.now() + dados.expiraEm * 1000,
    };

    sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(novaSessao));
    setSessao(novaSessao);
    return novaSessao;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(CHAVE_SESSAO);
    setSessao(null);
  }, []);

  // Usar quando uma chamada a alguma API retornar 401 no meio da navegação
  // (token expirou ou foi invalidado entre uma ação e outra).
  const expirarSessao = useCallback(() => {
    sessionStorage.removeItem(CHAVE_SESSAO);
    setSessao(null);
  }, []);

  const value = {
    carregando,
    autenticado: !!sessao,
    usuario: sessao?.usuario || null,
    papel: sessao?.papel || null,
    produtos: sessao?.produtos || [],
    token: sessao?.token || null,
    login,
    logout,
    expirarSessao,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth precisa ser usado dentro de um <AuthProvider>.');
  }
  return ctx;
}
