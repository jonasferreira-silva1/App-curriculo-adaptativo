import type { CurriculoBase } from '../types/curriculo';
import type { PalavraChaveExtraida } from '../types/vaga';
import type { ScoreItem, ResultadoMatching } from '../types/matching';
import { tokenizarTexto } from './motor-extracao';

/**
 * Calcula a pontuação individual e os termos correspondentes para um único item do currículo.
 * 
 * @param textoDoItem Texto bruto concatenado do item (ex: cargo + descrição + tecnologias)
 * @param palavrasChave Lista de palavras-chave da vaga já extraídas e ponderadas
 * @returns Objeto com a pontuação acumulada e o array de termos casados
 */
export function calcularScoreItem(
  textoDoItem: string,
  palavrasChave: PalavraChaveExtraida[]
): { score: number; termosCasados: string[] } {
  if (!textoDoItem || palavrasChave.length === 0) {
    return { score: 0, termosCasados: [] };
  }

  // Tokeniza o texto do item e converte em Set de termos únicos
  const tokensItem = new Set(tokenizarTexto(textoDoItem));
  
  let score = 0;
  const termosCasados: string[] = [];

  // Avalia o match de cada palavra-chave da vaga com os tokens do item
  for (const { termo, peso } of palavrasChave) {
    if (tokensItem.has(termo)) {
      score += peso; // Acumula o peso ponderado do termo (técnicos valem 3x)
      termosCasados.push(termo);
    }
  }

  return { score, termosCasados };
}

/**
 * Motor de Matching da Sprint 3.
 * 
 * Cruza o currículo do candidato com as palavras-chave já extraídas da vaga,
 * gerando a pontuação individual por seção e o Score Geral de Aderência (0 a 100%).
 * 
 * @param curriculo Base de dados do currículo do usuário
 * @param palavrasChave Palavras-chave extraídas da vaga (Sprint 2)
 * @param linkVaga URL opcional da vaga (anotação ADR-02)
 * @returns Estrutura ResultadoMatching pronta para consumo na UI
 */
export function calcularMatching(
  curriculo: CurriculoBase,
  palavrasChave: PalavraChaveExtraida[],
  linkVaga?: string
): ResultadoMatching {
  // Trata edge case de vaga sem palavras-chave
  if (!palavrasChave || palavrasChave.length === 0) {
    return {
      scoresExperiencias: curriculo.experiencias.map((e) => ({ id: e.id, score: 0, termosCasados: [] })),
      scoresProjetos: curriculo.projetos.map((p) => ({ id: p.id, score: 0, termosCasados: [] })),
      scoresHabilidades: curriculo.habilidades.map((h) => ({ id: h.id, score: 0, termosCasados: [] })),
      scoresFormacao: curriculo.formacao.map((f) => ({ id: f.id, score: 0, termosCasados: [] })),
      scoreGeral: 0,
      linkVaga,
    };
  }

  // 1. Calcula os scores para cada experiência profissional
  const scoresExperiencias: ScoreItem[] = curriculo.experiencias.map((exp) => {
    const textoCompleto = `${exp.cargo} ${exp.empresa} ${exp.descricao} ${exp.tecnologias.join(' ')}`;
    const { score, termosCasados } = calcularScoreItem(textoCompleto, palavrasChave);
    return { id: exp.id, score, termosCasados };
  });

  // 2. Calcula os scores para cada projeto relevante
  const scoresProjetos: ScoreItem[] = curriculo.projetos.map((proj) => {
    const textoCompleto = `${proj.nome} ${proj.descricao} ${proj.tecnologias.join(' ')}`;
    const { score, termosCasados } = calcularScoreItem(textoCompleto, palavrasChave);
    return { id: proj.id, score, termosCasados };
  });

  // 3. Calcula os scores para cada habilidade técnica
  const scoresHabilidades: ScoreItem[] = curriculo.habilidades.map((hab) => {
    const { score, termosCasados } = calcularScoreItem(hab.nome, palavrasChave);
    return { id: hab.id, score, termosCasados };
  });

  // 4. Calcula os scores para cada formação acadêmica
  const scoresFormacao: ScoreItem[] = curriculo.formacao.map((form) => {
    const textoCompleto = `${form.curso} ${form.instituicao}`;
    const { score, termosCasados } = calcularScoreItem(textoCompleto, palavrasChave);
    return { id: form.id, score, termosCasados };
  });

  // 5. Soma a pontuação máxima teoricamente possível da vaga
  const somaMaximaPossivel = palavrasChave.reduce((soma, p) => soma + p.peso, 0);

  // 6. Soma a pontuação total obtida pelo currículo em todas as seções
  const somaScoresObtidos =
    scoresExperiencias.reduce((soma, s) => soma + s.score, 0) +
    scoresProjetos.reduce((soma, s) => soma + s.score, 0) +
    scoresHabilidades.reduce((soma, s) => soma + s.score, 0) +
    scoresFormacao.reduce((soma, s) => soma + s.score, 0);

  // 7. Normaliza o Score Geral em porcentagem (0 a 100%)
  const scoreGeral =
    somaMaximaPossivel > 0
      ? Math.min(100, Math.round((somaScoresObtidos / somaMaximaPossivel) * 100))
      : 0;

  return {
    scoresExperiencias,
    scoresProjetos,
    scoresHabilidades,
    scoresFormacao,
    scoreGeral,
    linkVaga,
  };
}
