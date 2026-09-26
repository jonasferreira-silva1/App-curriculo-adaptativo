import React, { useState } from 'react';
import type { CurriculoBase } from '../types/curriculo';
import { Check, ArrowLeft, AlertTriangle } from 'lucide-react';

interface RevisaoImportacaoProps {
  rascunho: CurriculoBase;
  onConfirmar: (curriculoRevisado: CurriculoBase) => void;
  onCancelar: () => void;
}

/**
 * Componente de revisão do currículo importado.
 * Permite que o usuário inspecione e corrija os dados extraídos pelo parser heurístico
 * antes de aplicar a atualização ao currículo oficial.
 */
export const RevisaoImportacao: React.FC<RevisaoImportacaoProps> = ({
  rascunho,
  onConfirmar,
  onCancelar,
}) => {
  const [dadosEditados, setDadosEditados] = useState<CurriculoBase>(rascunho);

  return (
    <div className="space-y-6">
      
      {/* Alerta de confirmação */}
      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-3.5 rounded-xl text-xs flex items-center gap-2.5">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
        <span>
          O parser heurístico realizou o pré-preenchimento dos campos. Revise os dados abaixo antes de confirmar a importação.
        </span>
      </div>

      {/* Formulário resumido de revisão */}
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        
        {/* Nome e Contato */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Nome Completo</label>
            <input
              type="text"
              value={dadosEditados.dadosPessoais.nome}
              onChange={(e) =>
                setDadosEditados({
                  ...dadosEditados,
                  dadosPessoais: { ...dadosEditados.dadosPessoais, nome: e.target.value },
                })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">E-mail Extraído</label>
            <input
              type="text"
              value={dadosEditados.dadosPessoais.email}
              onChange={(e) =>
                setDadosEditados({
                  ...dadosEditados,
                  dadosPessoais: { ...dadosEditados.dadosPessoais, email: e.target.value },
                })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
            />
          </div>
        </div>

        {/* Resumo Profissional */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Resumo Profissional</label>
          <textarea
            rows={3}
            value={dadosEditados.resumoProfissional}
            onChange={(e) =>
              setDadosEditados({ ...dadosEditados, resumoProfissional: e.target.value })
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
          />
        </div>

        {/* Bloco de Experiências */}
        {dadosEditados.experiencias.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Texto de Experiências Extraído</label>
            <textarea
              rows={4}
              value={dadosEditados.experiencias[0]?.descricao || ''}
              onChange={(e) => {
                const exps = [...dadosEditados.experiencias];
                if (exps[0]) exps[0].descricao = e.target.value;
                setDadosEditados({ ...dadosEditados, experiencias: exps });
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300"
            />
          </div>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao Upload
        </button>

        <button
          type="button"
          onClick={() => onConfirmar(dadosEditados)}
          className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
        >
          <Check className="h-4 w-4" /> Confirmar e Aplicar Dados
        </button>
      </div>
    </div>
  );
};
