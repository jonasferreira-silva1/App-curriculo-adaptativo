/**
 * Tipos para o Motor de Matching e Cálculo de Scores (Sprint 3).
 */

// Pontuação de relevância e palavras-chave correspondentes para um item específico do currículo
export interface ScoreItem {
  id: string; // Identificador único do item (ex: ID da experiência, projeto ou habilidade)
  score: number; // Pontuação acumulada calculada para este item
  termosCasados: string[]; // Lista de termos da vaga que derem match com este item
}

// Estrutura consolidada do resultado do matching entre o currículo e a vaga
export interface ResultadoMatching {
  scoresExperiencias: ScoreItem[]; // Pontuações individuais para cada experiência
  scoresProjetos: ScoreItem[]; // Pontuações individuais para cada projeto
  scoresHabilidades: ScoreItem[]; // Pontuações individuais para cada habilidade
  scoresFormacao?: ScoreItem[]; // Pontuações individuais para a formação acadêmica
  scoreGeral: number; // Porcentagem de aderência geral normalizada (0 a 100%)
  linkVaga?: string; // Anotação opcional da URL da vaga (ADR-02)
}
