import { DICIONARIO_TECNICO } from '../data/dicionarioTecnico';
import { STOPWORDS } from '../data/stopwords';
import type { PalavraChaveExtraida, EstatisticasVaga } from '../types/vaga';

/**
 * Normaliza uma string convertendo para minúsculas e removendo caracteres acentuados.
 * 
 * @param texto Texto de entrada em qualquer formato
 * @returns Texto em minúsculas e sem acentuação (ex: "Experiência" -> "experiencia")
 */
export function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove marcas diacríticas/acentos
}

/**
 * Divide o texto normalizado em um array de palavras/tokens individuais.
 * Trata exceções técnicas como "c++" ou "c#".
 * 
 * @param texto Texto normalizado
 * @returns Array de tokens filtrados
 */
export function tokenizarTexto(texto: string): string[] {
  const textoLimpo = normalizarTexto(texto);
  
  // Trata casos especiais como c# e c++ convertendo para aliases seguros antes do regex
  const textoProcessado = textoLimpo
    .replace(/\bc#\b/g, 'csharp')
    .replace(/\bc\+\+\b/g, 'cpp');

  return textoProcessado
    .replace(/[^a-z0-9\s]/g, ' ') // Substitui pontuação por espaço
    .split(/\s+/)
    .filter((palavra) => palavra.length > 1); // Descarta caracteres isolados
}

/**
 * Motor de Extração de Palavras-Chave de Descrições de Vagas.
 * 
 * Realiza tokenização, filtragem de stopwords e cálculo de peso com bônus (3x)
 * para termos técnicos conhecidos.
 * 
 * @param descricaoVaga Texto completo da descrição da vaga colado pelo usuário
 * @returns Lista de palavras-chave ordenadas do maior para o menor peso
 */
export function extrairPalavrasChave(descricaoVaga: string): PalavraChaveExtraida[] {
  if (!descricaoVaga || descricaoVaga.trim().length === 0) {
    return [];
  }

  const tokens = tokenizarTexto(descricaoVaga);

  // 1. Filtragem de Stopwords
  const tokensFiltrados = tokens.filter((token) => !STOPWORDS.has(token));

  // 2. Contagem da frequência bruta de ocorrência de cada termo
  const mapaFrequencias = new Map<string, number>();
  for (const token of tokensFiltrados) {
    const atual = mapaFrequencias.get(token) || 0;
    mapaFrequencias.set(token, atual + 1);
  }

  // 3. Aplicação da pesagem ponderada (multiplicador 3x para termos técnicos)
  const resultado: PalavraChaveExtraida[] = [];

  for (const [termo, frequencia] of mapaFrequencias.entries()) {
    const ehTecnico = DICIONARIO_TECNICO.has(termo);
    // Bônus: se for termo técnico reconhecido, o peso é a frequência triplicada
    const peso = ehTecnico ? frequencia * 3 : frequencia;

    resultado.push({
      termo,
      peso,
      frequencia,
      ehTecnico,
    });
  }

  // 4. Ordenação decrescente por peso (termos mais relevantes primeiro)
  return resultado.sort((a, b) => {
    if (b.peso !== a.peso) {
      return b.peso - a.peso;
    }
    // Desempate por ordem alfabética se o peso for idêntico
    return a.termo.localeCompare(b.termo);
  });
}

/**
 * Gera estatísticas gerais sobre a extração da vaga.
 * 
 * @param descricaoVaga Texto completo da vaga
 * @param palavrasChave Palavras-chave já extraídas
 * @returns Objeto com estatísticas resumidas
 */
export function calcularEstatisticasVaga(
  descricaoVaga: string,
  palavrasChave: PalavraChaveExtraida[]
): EstatisticasVaga {
  const tokensTotais = tokenizarTexto(descricaoVaga);
  const totalTecnicos = palavrasChave.filter((p) => p.ehTecnico).length;

  return {
    totalTokens: tokensTotais.length,
    totalRelevantes: palavrasChave.length,
    totalTecnicos,
  };
}
