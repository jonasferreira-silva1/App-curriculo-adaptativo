/**
 * Stopwords Gramaticais da Língua Portuguesa (Lista Fechada).
 * 
 * Contém apenas artigos, preposições, pronomes, conjunções e verbos auxiliares.
 * Esta lista é estável, imutável e sem acentuação (compatível com tokenização NFD).
 */
export const STOPWORDS_GRAMATICAIS = new Set<string>([
  'de', 'da', 'do', 'das', 'dos', 'para', 'com', 'em', 'e', 'a', 'o', 'as', 'os',
  'que', 'um', 'uma', 'uns', 'umas', 'no', 'na', 'nos', 'nas', 'por', 'ou', 'se',
  'como', 'mais', 'mas', 'foi', 'ao', 'aos', 'seu', 'sua', 'seus', 'suas', 'ele',
  'ela', 'eles', 'elas', 'este', 'esta', 'estes', 'estas', 'isto', 'aquilo',
  'entre', 'sem', 'sob', 'sobre', 'atras', 'ate', 'ser', 'ter', 'estar', 'haver',
  'fazer', 'pode', 'podera', 'deve', 'devera', 'tambem', 'assim', 'muito',
  'quando', 'onde', 'qual', 'quais', 'quem', 'cujo', 'cuja', 'tudo', 'nada',
]);
