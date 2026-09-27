import { describe, it, expect } from 'vitest';
import { normalizarTexto, tokenizarTexto, extrairPalavrasChave, calcularEstatisticasVaga } from '../motor-extracao';

describe('Motor de Extração de Palavras-Chave (Sprint 2)', () => {
  it('deve normalizar textos removendo acentos e convertendo para minúsculas', () => {
    const textoBruto = 'Desenvolvedor FRONT-END & Análise de Requisitos!';
    const normalizado = normalizarTexto(textoBruto);
    expect(normalizado).toBe('desenvolvedor front-end & analise de requisitos!');
  });

  it('deve tokenizar o texto descartando pontuações e caracteres isolados', () => {
    const texto = 'React 19, TypeScript e Node.js no navegador!';
    const tokens = tokenizarTexto(texto);
    expect(tokens).toContain('react');
    expect(tokens).toContain('typescript');
    expect(tokens).toContain('node');
    expect(tokens).not.toContain('e'); // Caractere isolado descartado
  });

  it('deve extrair palavras-chave e atribuir bônus de peso 3x para termos técnicos conhecidos', () => {
    const descricaoVaga = `
      Vaga para Desenvolvedor React e TypeScript Senior.
      Buscamos profissional com vasta experiência em React, Node.js e banco de dados PostgreSQL.
      Conhecimento em Docker é um grande diferencial.
    `;

    const palavrasChave = extrairPalavrasChave(descricaoVaga);

    // Encontra os termos extraídos
    const termoReact = palavrasChave.find((p) => p.termo === 'react');
    const termoTypescript = palavrasChave.find((p) => p.termo === 'typescript');
    const termoPostgresql = palavrasChave.find((p) => p.termo === 'postgresql');

    expect(termoReact).toBeDefined();
    expect(termoReact?.ehTecnico).toBe(true);
    // 'react' aparece 2 vezes na vaga -> peso deve ser 2 * 3 = 6
    expect(termoReact?.frequencia).toBe(2);
    expect(termoReact?.peso).toBe(6);

    expect(termoTypescript?.ehTecnico).toBe(true);
    expect(termoTypescript?.peso).toBe(3); // 1 ocorrência * 3 = 3

    expect(termoPostgresql?.ehTecnico).toBe(true);

    // O termo de maior peso deve vir no topo
    expect(palavrasChave[0].termo).toBe('react');
  });

  it('deve calcular estatísticas corretas sobre a descrição da vaga', () => {
    const vagaText = 'Procuramos dev React, TypeScript e Docker para equipe de alta performance.';
    const keywords = extrairPalavrasChave(vagaText);
    const stats = calcularEstatisticasVaga(vagaText, keywords);

    expect(stats.totalTokens).toBeGreaterThan(0);
    expect(stats.totalTecnicos).toBe(3); // React, TypeScript, Docker
  });
});
