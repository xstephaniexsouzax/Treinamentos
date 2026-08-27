export const telebrasData = [
  // ==========================================
  // TELEBRAS - QUEM SOMOS
  // ==========================================
  {
    id: 100,
    produto: "TELEBRAS",
    tipo: "quem-somos",
    categoria: "Apresentação & Gestão",
    titulo: "Quem Somos - TELEBRAS",
    descricao: "Visão geral da operação Telebras, escopo dos serviços de conectividade e a estrutura de gestão responsável.",
    gestao: [
      {
        cargo: "Instrutoria de Treinamento",
        responsavel: "Stephanie Souza Miranda",
        papel: "Capacitação técnica inicial, atualização de instruções operacionais e elaboração de materiais de apoio."
      },
      {
        cargo: "Monitoria de Qualidade",
        responsavel: "Equipe de Qualidade ST",
        papel: "Acompanhamento dos atendimentos, feedbacks pontuais e garantia da conformidade com os padrões estabelecidos."
      },
      {
        cargo: "Supervisão Operacional",
        responsavel: "Supervisão ST / Telebras",
        papel: "Gestão diária da equipe, suporte em chamados críticos e acompanhamento de indicadores operacionais."
      }
    ]
  },

  // ==========================================
  // TELEBRAS - CAPACITAÇÕES (SEUS MÓDULOS ATUAIS)
  // ==========================================
  // Consulta de protocolo: circuito
  {
    id: 1,
    produto: "TELEBRAS",
    tipo: "capacitacao",
    titulo: "Consulta de protocolos: circuito",
    descricao: "Módulo dedicado à consulta de protocolos em sistema através do número do circuito.",
    tituloSecaoSlides: "Consulta de protocolo através do circuito (PDF)",
    tituloSecaoVideo: "Consulta de protocolo através do circuito (Vídeo)",
    textoIntroducaoQuiz: "Logo abaixo, encontra-se o formulário de avaliação sobre a consulta por CIRCUITO. Ele deverá ser respondido após a visualização completa do conteúdo acima.",
    tituloSecaoQuiz: "Avaliação Prática - Circuito",
    categoria: "Sistemas",
    imagemCapa: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80",
    modulos: [
      {
        idModulo: 101,
        tituloModulo: "Consulta de protocolo através do circuito",
        pdfUrl: "https://drive.google.com/file/d/1CS7yJDCj_ZR4qa9hmRH-orBTBwPlqjzu/preview",
        videoUrl: "https://drive.google.com/file/d/12OgssP26AzS8N_CNGn2BpKMHt06Rhsf9/preview",
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeymld4lX0lWbkKWhCYgwjWkiGGrAVtzffrvrlS6dnNwaqCLg/viewform?embedded=true"
      }
    ]
  },
    // Consulta de protocolo: protocolo
  {
    id: 2,
    produto: "TELEBRAS",
    tipo: "capacitacao",
    titulo: "Consulta de protocolos pelo protocolo",
    descricao: "Módulo dedicado à consulta de protocolos em sistema através do número do próprio protocolo.",
    tituloSecaoSlides: "Como localizar pelo Número do Protocolo (PDF)",
    tituloSecaoVideo: "Passo a passo no Sistema - Número do Protocolo (Vídeo)",
    textoIntroducaoQuiz: "ATENÇÃO OPERADOR: Este é o quiz específico sobre a consulta por NÚMERO DE PROTOCOLO. Responda com atenção para registrar sua nota.",
    tituloSecaoQuiz: "Testando Conhecimentos - Número do Protocolo",
    categoria: "Sistemas",
    imagemCapa: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80",
    modulos: [
      {
        idModulo: 102,
        tituloModulo: "Consulta através do próprio protocolo",
        pdfUrl: "https://drive.google.com/file/d/1p0LDa9zZmaxgcqEy4gXoebaYGuuTUJ2a/preview",
        videoUrl: "https://drive.google.com/file/d/1txkMZcPDAuBJCMduLn_XzojllBPYzwji/preview",
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-xZ6O9YZURumkSwRFZoRm4wVgxR4UN1n0ZwEy-TUYd_xtUw/viewform?embedded=true"
      }
    ]
  },
    // Conceitos teóricos
  {
    id: 3,
    produto: "TELEBRAS",
    tipo: "capacitacao",
    titulo: "Conceitos teóricos",
    descricao: "Esse módulo é dedicado a alguns conceitos teóricos da Telebras.",
    tituloSecaoSlides: "Conceito (PDF)",
    textoIntroducaoQuiz: "ATENÇÃO OPERADOR: Responda ao quiz após a leitura completa do material.",
    tituloSecaoQuiz: "Testando Conhecimentos - Conceitos",
    categoria: "Conceito",
    imagemCapa: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80",
    modulos: [
      {
        idModulo: 103,
        tituloModulo: "Conceitos Teóricos",
        pdfUrl: "https://drive.google.com/file/d/17i_lOe7Z8T_yMnq0iC_cwJmfSd2YNTTY/preview",
        videoUrl: "",
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd5Mos7K1x-DL7B8eCY7gUpffG7eMxYD_esnC8VvZzRAKIKOA/viewform?embedded=true"
      }
    ]
  },
  // GESAC puro EACE 
  {
    id: 4,
    produto: "TELEBRAS",
    tipo: "reciclagem",
    titulo: "GESAC puro e EACE",
    descricao: "Esse módulo é dedicado a alguns conceitos sobre clientes GESAC puro e EACE.",
    tituloSecaoSlides: "Conceito (PDF)",
    textoIntroducaoQuiz: "ATENÇÃO OPERADOR: Responda ao quiz sobre os clientes GESAC e EACE.",
    tituloSecaoQuiz: "Testando Conhecimentos - GESAC e EACE",
    categoria: "Conceito",
    imagemCapa: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80",
    modulos: [
      {
        idModulo: 104,
        tituloModulo: "GESAC e EACE",
        pdfUrl: "https://drive.google.com/file/d/1U5neEIxUj9YMct8US5_LYYpXK7ym0e1o/preview",
        videoUrl: "",
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd6dKKUWvDRZC3B8aOZf0zqVCyUeploOpctiWwllaqvloJtMA/viewform?embedded=true"
      }
    ]
  },
  // Clientes no geral
  {
    id: 5,
    produto: "TELEBRAS",
    tipo: "reciclagem",
    titulo: "Clientes no geral",
    descricao: "Este módulo é dedicado aos informativos destinados aos clientes em geral.",
    tituloSecaoSlides: "Conceito (PDF)",
    textoIntroducaoQuiz: "ATENÇÃO OPERADOR: Responda com atenção ao quiz sobre Clientes no Geral.",
    tituloSecaoQuiz: "Testando Conhecimentos - Clientes",
    categoria: "Conceito",
    imagemCapa: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80",
    modulos: [
      {
        idModulo: 105,
        tituloModulo: "Clientes no Geral",
        pdfUrl: "https://drive.google.com/file/d/1sFzndFY5evBymgGNmeIi6sllgEZHdAP3/preview",
        videoUrl: "",
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLScdALzkSKM48woPyw1Zfpi5Q13sJkTkVkoz7JFdfoG0ZjLGJg/viewform?embedded=true"
      }
    ]
  },
  // Bloco de notas
  {
    id: 6,
    produto: "TELEBRAS",
    tipo: "reciclagem",
    titulo: "Bloco de notas",
    descricao: "Este módulo é dedicado aos cuidados que devem ser adotados no momento de registrar as informações no sistema.",
    tituloSecaoSlides: "Conceito (Slide)",
    textoIntroducaoQuiz: "ATENÇÃO OPERADOR: Este é o quiz específico sobre os INFORMATIVOS (bloco de notas).",
    tituloSecaoQuiz: "Testando Conhecimentos - Bloco de notas",
    categoria: "Conceito",
    imagemCapa: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80",
    modulos: [
      {
        idModulo: 106,
        tituloModulo: "Bloco de notas",
        pdfUrl: "https://drive.google.com/file/d/1Qsa9LinK9nLhB-ubdYihHmyM1DkDYD5R/preview",
        videoUrl: "",
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLScD_MWwfr31zOtLMi2NJh9K9w8AE4tbGEhIrJAlzXWbpDe9zQ/viewform?embedded=true"
      }
    ]
  }
];