import React from 'react';
import { Sparkles, Upload, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onAbrirModalImportacao: () => void;
  onRestaurarPadrao: () => void;
  totalExperiencias: number;
  totalProjetos: number;
}

/**
 * Componente de cabeçalho da aplicação.
 * Exibe o título, indicador de dados salvos localmente e ações rápidas (importação e restauração).
 */
export const Header: React.FC<HeaderProps> = ({
  onAbrirModalImportacao,
  onRestaurarPadrao,
  totalExperiencias,
  totalProjetos,
}) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logotipo e Identificação do Sistema */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight font-heading">
                Currículo Adaptativo
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                Sprint 1
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              100% Client-Side • Salvo no navegador
            </p>
          </div>
        </div>

        {/* Informações e Botões de Ação */}
        <div className="flex items-center gap-3">
          {/* Contador de dados do currículo */}
          <div className="hidden md:flex items-center gap-3 text-xs text-slate-400 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
            <span>{totalExperiencias} Experiências</span>
            <span className="text-slate-700">•</span>
            <span>{totalProjetos} Projetos</span>
          </div>

          {/* Botão de Restaurar Dados de Exemplo */}
          <button
            onClick={onRestaurarPadrao}
            title="Restaurar currículo padrão de exemplo"
            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Restaurar Exemplo</span>
          </button>

          {/* Botão para Importar Currículo (PDF/DOCX) */}
          <button
            onClick={onAbrirModalImportacao}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-md shadow-indigo-600/20 rounded-lg transition-all flex items-center gap-2"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Importar PDF / DOCX</span>
            <Sparkles className="h-3 w-3 text-indigo-200" />
          </button>
        </div>
      </div>
    </header>
  );
};
