# React + Vite
Portal Treina

O **Portal Treina** é uma plataforma interna de treinamento e capacitação de operadores. Desenvolvida em React com Tailwind CSS, a aplicação conta com um sistema robusto de rotas, navegação fluida, layout responsivo.
---

## Funcionalidades Principais

* **Menu Lateral (Sidebar) Retrátil:** Ganhe mais espaço de tela para leitura e foco nos estudos.
* **Páginas Dedicadas:**
    * `Início / Quem Somos`: Visão geral da plataforma, informações sobre a empresa e estrutura de capacitação.
    * `Treinamentos`: Acesso a treinamentos disponíveis por produto (TELEBRAS, DPE, DETRAN).
    * `Perguntas Frequentes (FAQ)`: Dúvidas comuns com animações de sanfona (accordion).
    * `Contato / Suporte`: Atalhos e contatos diretos para a equipe técnica.
* **Design Responsivo:** Adaptado perfeitamente para computadores, tablets e celulares.

---

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes ferramentas:

* **[React](https://react.dev/):** Biblioteca Javascript para construção de interfaces.
* **[Tailwind CSS v4](https://tailwindcss.com/):** Framework utilitário para estilização rápida e responsiva.
* **[React Router Dom v6](https://reactrouter.com/):** Gerenciamento de navegação e rotas dinâmicas.
* **[Lucide React](https://lucide.dev/):** Biblioteca de ícones modernos e minimalistas.
* **[Vite](https://vite.dev/):** Ferramenta de build extremamente rápida para o desenvolvimento.

---

## Arquitetura e Contextos

O projeto utiliza a API de Contexto do React para gerenciar o estado global de comportamento de forma limpa:

* **`ThemeContext`**: Gerencia se o modo escuro está ativo (`isDark`) e se a barra lateral está aberta (`isSidebarOpen`), persistindo a escolha do usuário no `localStorage` do navegador para que o tema não se perca ao atualizar a página.

---

