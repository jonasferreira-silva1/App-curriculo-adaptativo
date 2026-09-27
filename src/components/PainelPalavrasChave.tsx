import React, { useState } from 'react';
import type { PalavraChaveExtraida, EstatisticasVaga } from '../types/vaga';
import { Tag, Cpu, AlignLeft, Filter, ExternalLink, CheckCircle } from 'lucide-react';

interface PainelPalavrasChaveProps {
  palavrasChave: PalavraChaveExtraida[];
  estatisticas: EstatisticasVaga;
  tituloVaga?: string;
  linkVaga?: string;
}

/**
 * Componente para exibição visual interativa das palavras-chave extraídas da vaga.
 * Exibe badges com pesos ponderados, filtros por tipo (técnico vs geral) e estatísticas da extração.
 */
export const PainelPalavrasChave: React.FC<PainelPalavrasChaveProps> = ({
  palavrasChave,
  estatisticas,
  tituloVaga,
  linkVaga,
}) => {
  const [filtro, setFiltro] = useState<'todos' | 'tecnicos' | 'gerais'>('todos');
  const [busca, setBusca] = useState('');

  // Filtragem dos termos exibidos
  const termosFiltrados = palavrasChave.filter((item) => {
    const atendeTipo =
      filtro === 'todos' ||
      (filtro === 'tecnicos' && item.ehTecnico) ||
      (filtro === 'gerais' && !item.ehTecnico);

    const atendeBusca = item.termo.toLowerCase().includes(busca.toLowerCase());
    return atendeTipo && atendeBusca;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden space-y-6 p-6">
      
      {/* Cabeçalho do Painel e Título da Vaga */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Extração NLP Concluída
            </span>
            {tituloVaga && (
              <h3 className="text-sm font-bold text-white truncate max-w-xs">
                {tituloVaga}
              </h3>
            )}
          </div>
          <h2 className="text-base font-bold text-white mt-1 font-heading">
            Palavras-Chave Identificadas na Vaga
          </h2>
        </div>

        {/* Link da vaga como anotação (ADR-02) */}
        {linkVaga && (
          <a
            href={linkVaga}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>Acessar Link da Vaga</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {/* Cards de Estatísticas da Extração */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Card: Total de Palavras Brutas */}
        <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-800 text-slate-300">
            <AlignLeft className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Tokens no Texto</span>
            <p className="text-base font-bold text-white font-mono">{estatisticas.totalTokens}</p>
          </div>
        </div>

        {/* Card: Palavras Relevantes (Sem Stopwords) */}
        <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Tag className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Termos Relevantes</span>
            <p className="text-base font-bold text-indigo-300 font-mono">{estatisticas.totalRelevantes}</p>
          </div>
        </div>

        {/* Card: Termos Técnicos Identificados (Peso 3x) */}
        <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Termos Técnicos (3x)</span>
            <p className="text-base font-bold text-purple-300 font-mono">{estatisticas.totalTecnicos}</p>
          </div>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex-1 sm:flex-none ${
              filtro === 'todos' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos ({palavrasChave.length})
          </button>
          <button
            onClick={() => setFiltro('tecnicos')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex-1 sm:flex-none ${
              filtro === 'tecnicos' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Técnicos (3x) ({estatisticas.totalTecnicos})
          </button>
          <button
            onClick={() => setFiltro('gerais')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex-1 sm:flex-none ${
              filtro === 'gerais' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Gerais ({palavrasChave.length - estatisticas.totalTecnicos})
          </button>
        </div>

        {/* Input de Busca Rápida */}
        <div className="relative w-full sm:w-48">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Filtrar termo..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <Filter className="h-3.5 w-3.5 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Nuvem/Grid de Palavras-Chave com Badges Ponderadas */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 min-h-[140px]">
        {termosFiltrados.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            Nenhum termo encontrado com os filtros selecionados.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {termosFiltrados.map((item) => (
              <div
                key={item.termo}
                className={`group px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all hover:scale-105 cursor-default ${
                  item.ehTecnico
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-200 hover:bg-purple-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{item.termo}</span>
                <span
                  title={`Frequência: ${item.frequencia}x | Peso: ${item.peso}`}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    item.ehTecnico
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.peso}pt
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
