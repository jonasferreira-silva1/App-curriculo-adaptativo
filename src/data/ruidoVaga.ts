/**
 * Dicionário de Ruído de Anúncios de Vaga (Lista Viva / Aberta).
 * 
 * Contém jargões corporativos, palavras institucionais e termos de anúncios de emprego
 * que possuem significado, mas não representam competências técnicas discriminativas.
 * 
 * NOTA DE ARQUITETURA: Esta é uma lista aberta que cresce conforme novas descrições de vaga
 * são analisadas. Todos os termos DEVEM ser mantidos em minúsculas e sem acentuação (NFD).
 */
export const RUIDO_DE_VAGA = new Set<string>([
  // Termos institucionais e de anúncio
  'vaga', 'vagas', 'empresa', 'empresas', 'trabalhar', 'busca', 'buscamos', 'procuramos',
  'oferecemos', 'oferece', 'equipe', 'time', 'grupo', 'setor', 'departamento',

  // Estrutura de requisitos de vaga
  'requisitos', 'requisito', 'diferencial', 'diferenciais', 'experiencia', 'experiencias',
  'atividades', 'responsabilidades', 'conhecimento', 'conhecimentos', 'area', 'atuacao',
  'desejavel', 'obrigatorio', 'necessario', 'perfil', 'candidato', 'candidatos',
  'profissional', 'profissionais', 'oportunidade', 'descricao', 'nivel', 'vasta',
  'excelentes', 'informacao', 'informacoes', 'forte', 'solida', 'solidos',

  // Níveis e Regimes de Trabalho
  'junior', 'pleno', 'senior', 'remoto', 'hibrido', 'presencial', 'local', 'beneficios',
  'salario', 'contratacao', 'clt', 'pj', 'full', 'time', 'part', 'home', 'office',
  'modelo', 'regime', 'posicao', 'cargo',
]);
