import { describe, it, expect } from 'vitest';
import { separarSecoesPorHeuristica, converterSecoesParaCurriculoBase } from '../parser-heuristico';

describe('Parser Heurístico de Currículos', () => {
  it('deve identificar corretamente as seções de Experiência, Habilidades e Formação em um texto bruto', () => {
    const textoSimulado = `
      Jonas Ferreira da Silva
      jonas@exemplo.com | (11) 99999-8888

      Resumo
      Desenvolvedor Full Stack apaixonado por arquiteturas client-side.

      Experiência Profissional
      Desenvolvedor Front-End na Empresa X (2023 - 2024)
      Atuou com React, TypeScript e Tailwind CSS.

      Habilidades
      React, TypeScript, Node.js, SQL, Git

      Formação
      Bacharelado em Ciência da Computação - USP (2020 - 2024)
    `;

    const resultado = separarSecoesPorHeuristica(textoSimulado);

    expect(resultado.resumoProfissional).toContain('Desenvolvedor Full Stack');
    expect(resultado.experiencias).toContain('Empresa X');
    expect(resultado.habilidades).toContain('React, TypeScript, Node.js');
    expect(resultado.formacao).toContain('Ciência da Computação');
  });

  it('deve lidar de forma graciosa com um texto sem títulos reconhecidos', () => {
    const textoSemTitulos = 'Apenas um bloco continuo de texto sem secoes estruturadas.';
    const resultado = separarSecoesPorHeuristica(textoSemTitulos);

    expect(resultado.resumoProfissional).toBe(textoSemTitulos);
    expect(resultado.experiencias).toBe('');
    expect(resultado.habilidades).toBe('');
  });

  it('deve extrair e-mail, telefone e criar um rascunho de CurriculoBase via converterSecoesParaCurriculoBase', () => {
    const texto = `
      Carlos Eduardo
      carlos.eduardo@teste.com
      (11) 98765-4321

      Resumo
      Engenheiro de Software com foco em sistemas distribuídos.

      Habilidades
      Java, Spring Boot, Docker, Kubernetes
    `;

    const secoes = separarSecoesPorHeuristica(texto);
    const curriculoRascunho = converterSecoesParaCurriculoBase(secoes, texto);

    expect(curriculoRascunho.dadosPessoais.nome).toBe('Carlos Eduardo');
    expect(curriculoRascunho.dadosPessoais.email).toBe('carlos.eduardo@teste.com');
    expect(curriculoRascunho.dadosPessoais.telefone).toBe('(11) 98765-4321');
    expect(curriculoRascunho.habilidades.length).toBeGreaterThan(0);
  });
});
