/**
 * Tipos para o Motor de Extração de Palavras-Chave e Análise de Vagas (Sprint 2).
 */

// Estrutura de cada palavra-chave extraída da descrição da vaga
export interface PalavraChaveExtraida {
  termo: string; // O termo normalizado (ex: "react", "typescript")
  peso: number; // Pontuação final calculada (frequência * multiplicador)
  frequencia: number; // Quantidade de ocorrências no texto da vaga
  ehTecnico: boolean; // Indica se o termo foi reconhecido no Dicionário Técnico (peso 3x)
}

// Representa uma vaga processada pelo usuário
export interface DadosVaga {
  id: string; // Identificador único da análise
  tituloVaga?: string; // Título opcional da vaga (ex: "Desenvolvedor React Senior")
  descricao: string; // Texto bruto da vaga colado pelo usuário
  linkVaga?: string; // Anotação opcional da URL da vaga (ADR-02)
  palavrasChave: PalavraChaveExtraida[]; // Lista de palavras-chave ordenadas por peso
  dataAnalise: string; // Data da análise (ISO string)
}

// Estatísticas resumidas da extração da vaga
export interface EstatisticasVaga {
  totalTokens: number; // Total de palavras brutas no texto
  totalRelevantes: number; // Palavras após remoção de stopwords
  totalTecnicos: number; // Quantidade de termos técnicos identificados
}
