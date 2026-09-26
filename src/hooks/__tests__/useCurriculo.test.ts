import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCurriculo, CHAVE_STORAGE } from '../useCurriculo';
import { CURRICULO_PADRAO } from '../../utils/dadosPadrao';
import type { CurriculoBase } from '../../types/curriculo';

describe('useCurriculo Hook', () => {
  beforeEach(() => {
    // Limpa o localStorage antes de cada teste para evitar interferências
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('deve carregar o currículo padrão inicial quando o localStorage estiver vazio', () => {
    const { result } = renderHook(() => useCurriculo());
    expect(result.current.curriculo.dadosPessoais.nome).toBe(CURRICULO_PADRAO.dadosPessoais.nome);
    expect(result.current.curriculo.experiencias).toHaveLength(CURRICULO_PADRAO.experiencias.length);
  });

  it('deve carregar dados previamente salvos no localStorage', () => {
    const curriculoModificado: CurriculoBase = {
      ...CURRICULO_PADRAO,
      dadosPessoais: {
        ...CURRICULO_PADRAO.dadosPessoais,
        nome: 'Maria Silva Teste',
      },
    };

    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(curriculoModificado));

    const { result } = renderHook(() => useCurriculo());
    expect(result.current.curriculo.dadosPessoais.nome).toBe('Maria Silva Teste');
  });

  it('deve atualizar o estado e o localStorage ao chamar setCurriculo', () => {
    const { result } = renderHook(() => useCurriculo());

    act(() => {
      result.current.setCurriculo((prev) => ({
        ...prev,
        dadosPessoais: {
          ...prev.dadosPessoais,
          nome: 'Nome Atualizado',
        },
      }));
    });

    expect(result.current.curriculo.dadosPessoais.nome).toBe('Nome Atualizado');
    
    // Verifica se os dados foram persistidos no localStorage
    const armazenado = JSON.parse(localStorage.getItem(CHAVE_STORAGE) || '{}');
    expect(armazenado.dadosPessoais.nome).toBe('Nome Atualizado');
  });

  it('deve restaurar os dados padrão ao chamar restaurarPadrao', () => {
    const { result } = renderHook(() => useCurriculo());

    act(() => {
      result.current.setCurriculo((prev) => ({
        ...prev,
        dadosPessoais: {
          ...prev.dadosPessoais,
          nome: 'Nome Temporário',
        },
      }));
    });

    expect(result.current.curriculo.dadosPessoais.nome).toBe('Nome Temporário');

    act(() => {
      result.current.restaurarPadrao();
    });

    expect(result.current.curriculo.dadosPessoais.nome).toBe(CURRICULO_PADRAO.dadosPessoais.nome);
  });
});
