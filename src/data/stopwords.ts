/**
 * Lista de Stopwords (palavras comuns sem valor discriminativo) em português.
 * Inclui também termos corporativos genéricos comuns em descrições de vagas
 * que não devem ser contabilizados como competências técnicas.
 */
export const STOPWORDS = new Set<string>([
  // Preposições, artigos, pronomes e conjunções em Português
  'de', 'da', 'do', 'das', 'dos', 'para', 'com', 'em', 'e', 'a', 'o', 'as', 'os',
  'que', 'um', 'uma', 'uns', 'umas', 'no', 'na', 'nos', 'nas', 'por', 'ou', 'se',
  'como', 'mais', 'mas', 'foi', 'ao', 'aos', 'seu', 'sua', 'seus', 'suas', 'ele',
  'ela', 'eles', 'elas', 'este', 'esta', 'estes', 'estas', 'isto', 'aquilo',
  'entre', 'sem', 'sob', 'sobre', 'atras', 'ate', 'ser', 'ter', 'estar', 'haver',
  'fazer', 'pode', 'podera', 'deve', 'devera', 'tambem', 'assim', 'muito',
  'quando', 'onde', 'qual', 'quais', 'quem', 'cujo', 'cuja', 'tudo', 'nada',

  // Termos genéricos corporativos comuns em anúncios de emprego
  'vaga', 'empresa', 'trabalhar', 'busca', 'buscamos', 'equipe', 'time', 'grupo',
  'requisitos', 'requisito', 'diferencial', 'diferenciais', 'experiencia',
  'atividades', 'responsabilidades', 'conhecimento', 'conhecimentos', 'area',
  'atuacao', 'desejavel', 'obrigatorio', 'necessario', 'perfil', 'candidato',
  'candidatos', 'oportunidade', 'descricao', 'nivel', 'junior', 'pleno', 'senior',
  'remoto', 'hibrido', 'presencial', 'local', 'beneficios', 'salario', 'contratacao',
  'clt', 'pj', 'full', 'time', 'part', 'home', 'office', 'modelo', 'regime',
]);
