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

  it('deve retornar um array vazio ao receber texto vazio ou com apenas espaços', () => {
    expect(extrairPalavrasChave('')).toEqual([]);
    expect(extrairPalavrasChave('   ')).toEqual([]);
  });

  it('deve remover stopwords corporativas e diacríticos (ex: "Experiência", "Informação", "Requisitos")', () => {
    const textoComStopwords = 'Buscamos profissional com vasta experiência e excelentes conhecimentos em requisitos de informação.';
    const keywords = extrairPalavrasChave(textoComStopwords);
    const termos = keywords.map((k) => k.termo);

    expect(termos).not.toContain('experiencia');
    expect(termos).not.toContain('conhecimentos');
    expect(termos).not.toContain('requisitos');
    expect(termos).not.toContain('informacao');
  });

  it('deve aplicar multiplicador 3x a termos técnicos e priorizá-los sobre termos genéricos de maior frequência', () => {
    // 'lideranca' é termo genérico e aparece 2 vezes (peso = 2 * 1 = 2)
    // 'docker' é termo técnico e aparece 1 vez (peso = 1 * 3 = 3)
    const texto = 'Procuramos lideranca e forte lideranca no uso de Docker.';
    const palavrasChave = extrairPalavrasChave(texto);

    const termoDocker = palavrasChave.find((p) => p.termo === 'docker');
    const termoLideranca = palavrasChave.find((p) => p.termo === 'lideranca');

    expect(termoDocker).toBeDefined();
    expect(termoDocker?.ehTecnico).toBe(true);
    expect(termoDocker?.peso).toBe(3);

    expect(termoLideranca?.ehTecnico).toBe(false);
    expect(termoLideranca?.peso).toBe(2);

    // O termo técnico 'docker' (3pt) deve vir ANTES de 'lideranca' (2pt) apesar de ter menor frequência bruta
    expect(palavrasChave[0].termo).toBe('docker');
  });

  it('deve ordenar estritamente a lista de termos em ordem decrescente de peso', () => {
    const descricao = 'React React React TypeScript TypeScript Java';
    const palavrasChave = extrairPalavrasChave(descricao);

    for (let i = 0; i < palavrasChave.length - 1; i++) {
      expect(palavrasChave[i].peso).toBeGreaterThanOrEqual(palavrasChave[i + 1].peso);
    }
  });

  it('deve extrair palavras-chave com precisão em uma descrição de vaga real (Vaga Pontestur / TI)', () => {
    const vagaPontesturReal = `
      Pontestur — Vaga para Desenvolvedor Full Stack Senior
      
      Sobre a Vaga:
      Estamos contratando Desenvolvedor Full Stack com sólida vivência em React, TypeScript e Node.js.
      O profissional atuará no desenvolvimento de sistemas de alta escala para o setor de turismo.
      
      Requisitos Obrigatórios:
      - Domínio de React, TypeScript, Tailwind CSS e consumo de APIs REST.
      - Experiência prática em Node.js com PostgreSQL e Docker.
      - Conhecimento em testes automatizados com Vitest ou Jest.
      - Prática com metodologias ágeis (Scrum / Kanban).
      
      Diferenciais:
      - Conhecimento em AWS, GraphQL e micro-serviços.
    `;

    const palavrasChave = extrairPalavrasChave(vagaPontesturReal);
    const termosTecnicos = palavrasChave.filter((p) => p.ehTecnico).map((p) => p.termo);

    // Termos técnicos essenciais que DEVEM ser identificados no topo
    expect(termosTecnicos).toContain('react');
    expect(termosTecnicos).toContain('typescript');
    expect(termosTecnicos).toContain('node');
    expect(termosTecnicos).toContain('postgresql');
    expect(termosTecnicos).toContain('docker');
    expect(termosTecnicos).toContain('vitest');

    // Termos de ruído corporativo não devem estar na lista
    expect(termosTecnicos).not.toContain('experiencia');
    expect(termosTecnicos).not.toContain('requisitos');
    expect(termosTecnicos).not.toContain('diferenciais');
  });

  it('deve calcular estatísticas corretas sobre a descrição da vaga', () => {
    const vagaText = 'Procuramos dev React, TypeScript e Docker para equipe de alta performance.';
    const keywords = extrairPalavrasChave(vagaText);
    const stats = calcularEstatisticasVaga(vagaText, keywords);

    expect(stats.totalTokens).toBeGreaterThan(0);
    expect(stats.totalTecnicos).toBe(3); // React, TypeScript, Docker
  });
});
