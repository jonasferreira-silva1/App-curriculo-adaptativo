/**
 * Tipos centrais da aplicação Currículo Adaptativo.
 * Este arquivo define os contratos de dados salvos no localStorage
 * e manipulados em toda a aplicação.
 */

// Representa um item individual de experiência profissional do usuário
export interface ItemExperiencia {
  id: string; // Identificador único (ex: UUID ou timestamp)
  cargo: string; // Título do cargo (ex: "Desenvolvedor Front-End Senior")
  empresa: string; // Nome da empresa (ex: "Tech Solutions")
  periodo: string; // Intervalo de tempo (ex: "Jan 2023 - Atual")
  descricao: string; // Descrição detalhada das atividades e realizações
  tecnologias: string[]; // Lista de tecnologias usadas (ex: ["React", "TypeScript", "Node.js"])
}

// Representa um projeto relevante desenvolvido pelo usuário
export interface ItemProjeto {
  id: string; // Identificador único
  nome: string; // Nome do projeto (ex: "Garimpo Dev")
  descricao: string; // Descrição dos objetivos e conquistas do projeto
  tecnologias: string[]; // Ferramentas/tecnologias utilizadas (ex: ["Vite", "Tailwind CSS"])
  link?: string; // URL opcional do repositório ou aplicação em produção
}

// Categorias possíveis para organizar as habilidades técnicas
export type CategoriaHabilidade = 
  | "linguagem" 
  | "framework" 
  | "banco-de-dados" 
  | "ferramenta" 
  | "outro";

// Representa uma competência ou habilidade técnica
export interface Habilidade {
  id: string; // Identificador único
  nome: string; // Nome da habilidade (ex: "TypeScript", "Docker", "PostgreSQL")
  categoria: CategoriaHabilidade; // Categoria técnica para organização visual
}

// Representa um curso ou grau acadêmico/formação
export interface Formacao {
  id: string; // Identificador único
  curso: string; // Nome do curso/graduação (ex: "Ciência da Computação")
  instituicao: string; // Nome da faculdade/instituição (ex: "Universidade Federal")
  periodo: string; // Intervalo de tempo (ex: "2020 - 2024")
}

// Estrutura de dados pessoais do candidato
export interface DadosPessoais {
  nome: string; // Nome completo
  email: string; // Endereço de e-mail de contato
  telefone?: string; // Telefone/WhatsApp opcional
  linkedin?: string; // Perfil do LinkedIn opcional
  github?: string; // Perfil do GitHub opcional
  localizacao?: string; // Cidade/Estado (ex: "São Paulo, SP - Remoto")
}

// Estrutura central unificada do Currículo do Usuário (salva no localStorage)
export interface CurriculoBase {
  dadosPessoais: DadosPessoais;
  resumoProfissional: string; // Texto "Sobre mim" ou resumo executivo
  experiencias: ItemExperiencia[];
  projetos: ItemProjeto[];
  habilidades: Habilidade[];
  formacao: Formacao[];
}

// Estruturas de saída para arquivos importados (PDF/DOCX)
export interface SecoesBrutasDetectadas {
  resumoProfissional: string;
  experiencias: string;
  projetos: string;
  habilidades: string;
  formacao: string;
}
