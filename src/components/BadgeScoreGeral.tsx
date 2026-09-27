import React from 'react';
import { Target, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface BadgeScoreGeralProps {
  scoreGeral: number;
}

/**
 * Componente que exibe o Score Geral de Aderência (0 a 100%) com o esquema de cores semáforo:
 * - 🟢 Verde (emerald): Alta Aderência (>= 70%)
 * - 🟡 Amarelo (amber): Média Aderência (40% a 69%)
 * - 🔴 Vermelho (rose): Baixa Aderência (< 40%)
 */
export const BadgeScoreGeral: React.FC<BadgeScoreGeralProps> = ({ scoreGeral }) => {
  // Determina a configuração visual do semáforo com base na porcentagem
  const getConfiguracaoSemaforo = (score: number) => {
    if (score >= 70) {
      return {
        estiloContainer: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
        estiloBarra: 'bg-emerald-500',
        estiloIcone: 'text-emerald-400',
        Icone: CheckCircle2,
        rotulo: 'Alta Aderência',
      };
    }

    if (score >= 40) {
      return {
        estiloContainer: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
        estiloBarra: 'bg-amber-500',
        estiloIcone: 'text-amber-400',
        Icone: AlertTriangle,
        rotulo: 'Média Aderência',
      };
    }

    return {
      estiloContainer: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
      estiloBarra: 'bg-rose-500',
      estiloIcone: 'text-rose-400',
      Icone: XCircle,
      rotulo: 'Baixa Aderência',
    };
  };

  const { estiloContainer, estiloBarra, estiloIcone, Icone, rotulo } = getConfiguracaoSemaforo(scoreGeral);

  return (
    <div className={`p-4 rounded-2xl border ${estiloContainer} flex items-center justify-between gap-4 shadow-lg transition-all`}>
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 shrink-0">
          <Icone className={`h-6 w-6 ${estiloIcone}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-1">
              <Target className="h-3.5 w-3.5" /> Aderência à Vaga
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800">
              {rotulo}
            </span>
          </div>
          <p className="text-2xl font-extrabold font-mono tracking-tight text-white mt-0.5">
            {scoreGeral}%
          </p>
        </div>
      </div>

      {/* Barra de Progresso do Semáforo */}
      <div className="w-32 sm:w-48 bg-slate-950/80 rounded-full h-3 p-0.5 border border-slate-800 shrink-0">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${estiloBarra}`}
          style={{ width: `${Math.min(100, Math.max(0, scoreGeral))}%` }}
        />
      </div>
    </div>
  );
};
