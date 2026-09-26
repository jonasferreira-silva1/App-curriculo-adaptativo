import type { SecoesBrutasDetectadas, CurriculoBase } from '../types/curriculo';

/**
 * Padrões de expressões regulares para identificar os títulos de seções mais comuns em currículos.
 * Suporta variações com e sem acentuação em português e inglês.
 */
const TITULOS_SECAO: Record<keyof SecoesBrutasDetectadas, RegExp> = {
  resumoProfissional: /resumo|sobre|perfil|apresenta[çc][ãa]o|summary|about/i,
  experiencias: /experi[êe]ncias?|hist[óo]rico profissional|trajet[óo]ria|work experience|experience/i,
  projetos: /projetos?|portfolio|portf[óo]lio|projects/i,
  habilidades: /habilidades|compet[êe]ncias|skills|conhecimentos|tecnologias/i,
  formacao: /forma[çc][ãa]o|educa[çc][ãa]o|escolaridade|education|cursos/i,
};

/**
 * Analisa o texto bruto extraído de um arquivo e tenta identificar os limites
 * das principais seções de um currículo por meio de heurística.
 * 
 * @param textoCompleto Texto bruto contendo todo o conteúdo do arquivo
 * @returns Objeto com as seções separadas para pré-preenchimento e revisão
 */
export function separarSecoesPorHeuristica(textoCompleto: string): SecoesBrutasDetectadas {
  const linhas = textoCompleto.split('\n');

  // Armazena as posições (índices das linhas) onde os títulos foram localizados
  const indicesEncontrados: { chave: keyof SecoesBrutasDetectadas; linha: number }[] = [];

  for (let i = 0; i < linhas.length; i++) {
    const linhaTrim = linhas[i].trim();
    // Ignora linhas muito longas para evitar falso positivo no meio de um parágrafo
    if (linhaTrim.length > 50) continue;

    for (const [chave, padrao] of Object.entries(TITULOS_SECAO)) {
      if (padrao.test(linhaTrim)) {
        indicesEncontrados.push({
          chave: chave as keyof SecoesBrutasDetectadas,
          linha: i,
        });
        break; // Evita associar a mesma linha a múltiplos títulos
      }
    }
  }

  // Ordena os títulos identificados pela sua ordem de aparição no documento
  indicesEncontrados.sort((a, b) => a.linha - b.linha);

  const resultado: SecoesBrutasDetectadas = {
    resumoProfissional: '',
    experiencias: '',
    projetos: '',
    habilidades: '',
    formacao: '',
  };

  // Se nenhuma seção foi encontrada, coloca o texto completo em resumoProfissional para o usuário ajustar
  if (indicesEncontrados.length === 0) {
    resultado.resumoProfissional = textoCompleto.trim();
    return resultado;
  }

  // Extrai o conteúdo entre as seções encontradas
  for (let i = 0; i < indicesEncontrados.length; i++) {
    const atual = indicesEncontrados[i];
    const proximo = indicesEncontrados[i + 1];
    const linhaFim = proximo ? proximo.linha : linhas.length;

    const trecho = linhas.slice(atual.linha + 1, linhaFim).join('\n').trim();
    resultado[atual.chave] = trecho;
  }

  return resultado;
}

/**
 * Converte as seções brutas identificadas no parser em uma estrutura `CurriculoBase` inicial.
 * Esta função fornece um rascunho estruturado que o usuário pode revisar na tela.
 * 
 * @param secoes Bruto das seções extraídas pelo parser heurístico
 * @param textoOriginal Texto completo para tentativa de extração de nome e contato
 * @returns Rascunho inicial do CurriculoBase
 */
export function converterSecoesParaCurriculoBase(
  secoes: SecoesBrutasDetectadas,
  textoOriginal: string
): CurriculoBase {
  const linhas = textoOriginal.split('\n').map((l) => l.trim()).filter(Boolean);
  
  // Tenta capturar o e-mail via RegEx simples no texto
  const emailMatch = textoOriginal.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  
  // Tenta capturar telefone via RegEx simples
  const telefoneMatch = textoOriginal.match(/(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}[-\s]?\d{4}/);

  // Primeira linha geralmente é o nome do candidato
  const nomeExtraido = linhas[0] && linhas[0].length < 60 ? linhas[0] : 'Seu Nome Completo';

  // Processamento simples das habilidades encontradas em texto
  const habilidadesArray = secoes.habilidades
    ? secoes.habilidades
        .split(/[,;\n•|]/)
        .map((h) => h.trim())
        .filter((h) => h.length > 1 && h.length < 30)
        .map((nome, index) => ({
          id: `hab-imp-${index}-${Date.now()}`,
          nome,
          categoria: 'outro' as const,
        }))
    : [];

  return {
    dadosPessoais: {
      nome: nomeExtraido,
      email: emailMatch ? emailMatch[0] : '',
      telefone: telefoneMatch ? telefoneMatch[0] : '',
    },
    resumoProfissional: secoes.resumoProfissional || 'Insira aqui seu resumo profissional...',
    experiencias: secoes.experiencias
      ? [
          {
            id: `exp-imp-1-${Date.now()}`,
            cargo: 'Cargo Extraído (Revisar)',
            empresa: 'Empresa Extraída (Revisar)',
            periodo: 'Período (ex: 2022 - Atual)',
            descricao: secoes.experiencias,
            tecnologias: [],
          },
        ]
      : [],
    projetos: secoes.projetos
      ? [
          {
            id: `proj-imp-1-${Date.now()}`,
            nome: 'Projeto Extraído (Revisar)',
            descricao: secoes.projetos,
            tecnologias: [],
          },
        ]
      : [],
    habilidades: habilidadesArray,
    formacao: secoes.formacao
      ? [
          {
            id: `form-imp-1-${Date.now()}`,
            curso: 'Curso / Graduação (Revisar)',
            instituicao: 'Instituição (Revisar)',
            periodo: 'Período',
          },
        ]
      : [],
  };
}
