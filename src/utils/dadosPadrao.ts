import type { CurriculoBase } from '../types/curriculo';

/**
 * Dados de exemplo pré-carregados para novos usuários.
 * Fornece um currículo inicial completo e bem formatado para
 * que a aplicação possa ser experimentada imediatamente.
 */
export const CURRICULO_PADRAO: CurriculoBase = {
  dadosPessoais: {
    nome: "Jonas Ferreira da Silva",
    email: "jonas.dev@exemplo.com",
    telefone: "(11) 98765-4321",
    linkedin: "https://linkedin.com/in/jonasferreira-dev",
    github: "https://github.com/jonasferreira-silva1",
    localizacao: "São Paulo, SP — Remoto"
  },
  resumoProfissional: "Desenvolvedor Software Full Stack com foco em React, TypeScript e Node.js. Apaixonado por criar aplicações modernas, responsivas e de altíssimo desempenho com arquitetura client-side limpa.",
  experiencias: [
    {
      id: "exp-1",
      cargo: "Desenvolvedor Front-End Senior",
      empresa: "Tech Solutions",
      periodo: "Jan 2024 — Atual",
      descricao: "Liderança técnica na migração de microsserviços front-end para React 19 e Vite. Otimização do tempo de carregamento inicial em 45% utilizando Lazy Loading e Server-Driven UI. Implementação de suíte de testes com Vitest.",
      tecnologias: ["React", "TypeScript", "Vite", "Tailwind CSS", "Vitest", "State Management"]
    },
    {
      id: "exp-2",
      cargo: "Desenvolvedor Full Stack Pleno",
      empresa: "Inovação Digital Labs",
      periodo: "Mar 2022 — Dez 2023",
      descricao: "Desenvolvimento de APIs RESTful em Node.js com PostgreSQL e interfaces dinâmicas em React. Automação de esteiras CI/CD com GitHub Actions e Docker. Integração de gateways de pagamento e autenticação JWT.",
      tecnologias: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "Git", "REST API"]
    }
  ],
  projetos: [
    {
      id: "proj-1",
      nome: "Garimpo Dev",
      descricao: "Plataforma de busca e curadoria de vagas de tecnologia com arquitetura client-side-first e salvamento local. Sem custos de servidores intermediários.",
      tecnologias: ["React", "TypeScript", "Tailwind CSS", "localStorage"],
      link: "https://github.com/jonasferreira-silva1/garimpo-dev"
    },
    {
      id: "proj-2",
      nome: "Currículo Adaptativo",
      descricao: "Aplicação inteligente para reordenação automática de seções de currículo com base em algoritmos de extração e matching de palavras-chave de descrições de vagas.",
      tecnologias: ["React 19", "TypeScript", "Vite", "NLP Clássico", "pdfjs-dist", "mammoth"],
      link: "https://github.com/jonasferreira-silva1/App-curriculo-adaptativo"
    }
  ],
  habilidades: [
    { id: "hab-1", nome: "React", categoria: "framework" },
    { id: "hab-2", nome: "TypeScript", categoria: "linguagem" },
    { id: "hab-3", nome: "JavaScript", categoria: "linguagem" },
    { id: "hab-4", nome: "Node.js", categoria: "framework" },
    { id: "hab-5", nome: "Tailwind CSS", categoria: "framework" },
    { id: "hab-6", nome: "PostgreSQL", categoria: "banco-de-dados" },
    { id: "hab-7", nome: "Docker", categoria: "ferramenta" },
    { id: "hab-8", nome: "Git", categoria: "ferramenta" }
  ],
  formacao: [
    {
      id: "form-1",
      curso: "Bacharelado em Ciência da Computação",
      instituicao: "Universidade de São Paulo (USP)",
      periodo: "2019 — 2023"
    }
  ]
};
