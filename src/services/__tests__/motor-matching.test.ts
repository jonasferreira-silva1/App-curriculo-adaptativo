import { describe, it, expect } from 'vitest';
import { calcularScoreItem, calcularMatching } from '../motor-matching';
import type { CurriculoBase } from '../../types/curriculo';
import type { PalavraChaveExtraida } from '../../types/vaga';
import { CURRICULO_PADRAO } from '../../utils/dadosPadrao';

describe('Motor de Matching (Sprint 3)', () => {
  // Setup de Palavras-Chave de Exemplo
  const palavrasChaveExemplo: PalavraChaveExtraida[] = [
    { termo: 'react', peso: 6, frequencia: 2, ehTecnico: true },
    { termo: 'typescript', peso: 3, frequencia: 1, ehTecnico: true },
    { termo: 'docker', peso: 3, frequencia: 1, ehTecnico: true },
  ];

  it('deve calcular o score individual de um item e identificar os termos casados corretamente', () => {
    const textoItem = 'Desenvolvedor React e TypeScript com vivência em Docker.';
    const resultado = calcularScoreItem(textoItem, palavrasChaveExemplo);

    // Deve bater com os 3 termos: react (6) + typescript (3) + docker (3) = 12
    expect(resultado.score).toBe(12);
    expect(resultado.termosCasados).toContain('react');
    expect(resultado.termosCasados).toContain('typescript');
    expect(resultado.termosCasados).toContain('docker');
  });

  it('deve retornar score = 0 e termosCasados vazio para itens sem nenhuma correspondência', () => {
    const textoItem = 'Profissional especialista em Marketing Digital e Vendas.';
    const resultado = calcularScoreItem(textoItem, palavrasChaveExemplo);

    expect(resultado.score).toBe(0);
    expect(resultado.termosCasados).toHaveLength(0);
  });

  it('deve retornar scoreGeral = 0 quando a vaga não possuir nenhuma palavra-chave', () => {
    const resultado = calcularMatching(CURRICULO_PADRAO, []);

    expect(resultado.scoreGeral).toBe(0);
    expect(resultado.scoresExperiencias.every((e) => e.score === 0)).toBe(true);
  });

  it('deve calcular a matemática do scoreGeral com precisão em 0%, 50% e 100%', () => {
    const palavras: PalavraChaveExtraida[] = [
      { termo: 'react', peso: 10, frequencia: 1, ehTecnico: true },
      { termo: 'python', peso: 10, frequencia: 1, ehTecnico: true },
    ];

    // 1. Currículo sem correspondência (0%)
    const curriculoSemMatch: CurriculoBase = {
      ...CURRICULO_PADRAO,
      experiencias: [],
      projetos: [],
      habilidades: [],
      formacao: [],
    };
    const resZero = calcularMatching(curriculoSemMatch, palavras);
    expect(resZero.scoreGeral).toBe(0);

    // 2. Currículo com match de apenas 1 dos 2 termos (50%)
    const curriculoMetadeMatch: CurriculoBase = {
      ...CURRICULO_PADRAO,
      habilidades: [{ id: 'h1', nome: 'React', categoria: 'framework' }],
      experiencias: [],
      projetos: [],
      formacao: [],
    };
    const resMetade = calcularMatching(curriculoMetadeMatch, palavras);
    expect(resMetade.scoreGeral).toBe(50); // 10 de 20 max = 50%

    // 3. Currículo com match total de ambos os termos (100%)
    const curriculoTotalMatch: CurriculoBase = {
      ...CURRICULO_PADRAO,
      habilidades: [
        { id: 'h1', nome: 'React', categoria: 'framework' },
        { id: 'h2', nome: 'Python', categoria: 'linguagem' },
      ],
      experiencias: [],
      projetos: [],
      formacao: [],
    };
    const resTotal = calcularMatching(curriculoTotalMatch, palavras);
    expect(resTotal.scoreGeral).toBe(100);
  });

  it('deve realizar a análise ponta a ponta cruzando o currículo padrão com a vaga da Pontestur', () => {
    const palavrasVagaPontestur: PalavraChaveExtraida[] = [
      { termo: 'react', peso: 6, frequencia: 2, ehTecnico: true },
      { termo: 'typescript', peso: 6, frequencia: 2, ehTecnico: true },
      { termo: 'postgresql', peso: 3, frequencia: 1, ehTecnico: true },
      { termo: 'docker', peso: 3, frequencia: 1, ehTecnico: true },
    ];

    const resultado = calcularMatching(
      CURRICULO_PADRAO,
      palavrasVagaPontestur,
      'https://pontestur.com/vagas/dev'
    );

    expect(resultado.scoreGeral).toBeGreaterThan(50);
    expect(resultado.scoresExperiencias.length).toBe(CURRICULO_PADRAO.experiencias.length);
    expect(resultado.linkVaga).toBe('https://pontestur.com/vagas/dev');

    // Verifica se as habilidades React e TypeScript do currículo acumularam pontos
    const habReact = resultado.scoresHabilidades.find((h) => h.id === 'hab-1');
    expect(habReact?.score).toBeGreaterThan(0);
    expect(habReact?.termosCasados).toContain('react');
  });
});
