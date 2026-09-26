import { useState, useEffect, useCallback } from 'react';
import type { CurriculoBase } from '../types/curriculo';
import { CURRICULO_PADRAO } from '../utils/dadosPadrao';

/**
 * Chave de armazenamento no localStorage para manter a integridade dos dados.
 */
export const CHAVE_STORAGE = 'curriculo-adaptativo:dados';

/**
 * Função utilitária para ler os dados do localStorage com tratamento de erros.
 * Se o dado não existir ou estiver corrompido, retorna os dados padrão iniciais.
 */
function carregarDoStorage(): CurriculoBase {
  try {
    const dadosBrutos = localStorage.getItem(CHAVE_STORAGE);
    if (!dadosBrutos) {
      return CURRICULO_PADRAO;
    }
    const objeto = JSON.parse(dadosBrutos) as CurriculoBase;
    
    // Validação mínima para garantir que o objeto possui as propriedades necessárias
    if (objeto && typeof objeto === 'object' && objeto.dadosPessoais && Array.isArray(objeto.experiencias)) {
      return objeto;
    }
    
    console.warn('Estrutura de dados do currículo incompatível no storage. Restaurando dados padrão.');
    return CURRICULO_PADRAO;
  } catch (erro) {
    console.error('Falha ao ler currículo do localStorage:', erro);
    return CURRICULO_PADRAO;
  }
}

/**
 * Hook customizado para gerenciamento do estado do currículo do usuário.
 * Mantém o estado sincronizado em tempo real com o localStorage.
 */
export function useCurriculo() {
  // Estado local inicializado a partir da função carregarDoStorage
  const [curriculo, setCurriculoState] = useState<CurriculoBase>(carregarDoStorage);

  // Sincroniza o estado com o localStorage sempre que o currículo for alterado
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(curriculo));
    } catch (erro) {
      console.error('Falha ao salvar currículo no localStorage:', erro);
    }
  }, [curriculo]);

  // Função para atualizar o currículo completamente
  const setCurriculo = useCallback((novoCurriculo: CurriculoBase | ((prev: CurriculoBase) => CurriculoBase)) => {
    setCurriculoState(novoCurriculo);
  }, []);

  // Função para restaurar o currículo aos dados padrão iniciais
  const restaurarPadrao = useCallback(() => {
    setCurriculoState(CURRICULO_PADRAO);
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(CURRICULO_PADRAO));
  }, []);

  return {
    curriculo,
    setCurriculo,
    restaurarPadrao,
  };
}
