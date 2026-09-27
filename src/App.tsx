import { useState, useMemo } from 'react';
import { useCurriculo } from './hooks/useCurriculo';
import { Header } from './components/Header';
import { FormularioCurriculo } from './components/FormularioCurriculo';
import { ModalImportacao } from './components/ModalImportacao';
import { FormularioVaga } from './components/FormularioVaga';
import { PainelPalavrasChave } from './components/PainelPalavrasChave';
import { BadgeScoreGeral } from './components/BadgeScoreGeral';
import { extrairPalavrasChave, calcularEstatisticasVaga } from './services/motor-extracao';
import { calcularMatching } from './services/motor-matching';
import type { CurriculoBase } from './types/curriculo';
import type { DadosVaga } from './types/vaga';
import type { ResultadoMatching } from './types/matching';
import { Sparkles, ShieldCheck, Cpu, FileCheck } from 'lucide-react';

/**
 * Componente Raiz da Aplicação Currículo Adaptativo (Sprint 1, 2 e 3).
 * Gerencia a base do currículo, a análise de palavras-chave da vaga
 * e o cálculo do resultado de matching de aderência.
 */
export function App() {
  const { curriculo, setCurriculo, restaurarPadrao } = useCurriculo();
  const [modalImportacaoAberto, setModalImportacaoAberto] = useState(false);

  // Estado da Vaga Analisada (Sprint 2)
  const [vagaAnalisada, setVagaAnalisada] = useState<DadosVaga | null>(null);

  // Manipulador de salvamento do currículo base
  const handleSalvarCurriculo = (novoCurriculo: CurriculoBase) => {
    setCurriculo(novoCurriculo);
  };

  // Manipulador de análise de descrição de vaga (Sprint 2 & 3)
  const handleAnalisarVaga = (descricao: string, linkVaga?: string, tituloVaga?: string) => {
    // Extrai palavras-chave uma única vez (Sprint 2)
    const palavrasChave = extrairPalavrasChave(descricao);

    const dadosVaga: DadosVaga = {
      id: `vaga-${Date.now()}`,
      tituloVaga,
      descricao,
      linkVaga,
      palavrasChave,
      dataAnalise: new Date().toISOString(),
    };

    setVagaAnalisada(dadosVaga);
  };

  const handleLimparVaga = () => {
    setVagaAnalisada(null);
  };

  // Cálculo reativo do Resultado de Matching (Sprint 3)
  // Utiliza useMemo para recalcular instantaneamente se o currículo base ou a vaga mudar,
  // sem precisar re-extrair as palavras-chave (desacoplamento limpo).
  const resultadoMatching: ResultadoMatching | null = useMemo(() => {
    if (!vagaAnalisada || vagaAnalisada.palavrasChave.length === 0) {
      return null;
    }
    return calcularMatching(curriculo, vagaAnalisada.palavrasChave, vagaAnalisada.linkVaga);
  }, [curriculo, vagaAnalisada]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Cabeçalho Superior */}
      <Header
        onAbrirModalImportacao={() => setModalImportacaoAberto(true)}
        onRestaurarPadrao={restaurarPadrao}
        totalExperiencias={curriculo.experiencias.length}
        totalProjetos={curriculo.projetos.length}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Informativo */}
        <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white font-heading">
                  Currículo Adaptativo — Sprint 3
                </h2>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Algoritmo determinístico de matching: cruzamento de tokens de vaga com histórico profissional e pontuação de aderência em tempo real.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
              <span className="flex items-center gap-1 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Zero Backend
              </span>
              <span className="flex items-center gap-1 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Cpu className="h-4 w-4 text-indigo-400" />
                Matching Determinístico
              </span>
            </div>
          </div>
        </div>

        {/* SEÇÃO 1: Entrada da Vaga, Matching e Palavras-Chave (Sprints 2 e 3) */}
        <section className="space-y-6">
          <FormularioVaga
            onAnalisarVaga={handleAnalisarVaga}
            onLimparAnalise={handleLimparVaga}
            temAnaliseAtiva={!!vagaAnalisada}
          />

          {/* Se houver resultado de matching, exibe o Badge de Semáforo (Sprint 3) */}
          {resultadoMatching && (
            <BadgeScoreGeral scoreGeral={resultadoMatching.scoreGeral} />
          )}

          {/* Se houver análise ativa, exibe o Painel de Palavras-Chave (Sprint 2) */}
          {vagaAnalisada && (
            <PainelPalavrasChave
              palavrasChave={vagaAnalisada.palavrasChave}
              estatisticas={calcularEstatisticasVaga(
                vagaAnalisada.descricao,
                vagaAnalisada.palavrasChave
              )}
              tituloVaga={vagaAnalisada.tituloVaga}
              linkVaga={vagaAnalisada.linkVaga}
            />
          )}
        </section>

        {/* SEÇÃO 2: Gestão do Currículo Base (Sprint 1) */}
        <section className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-heading">
              <FileCheck className="h-5 w-5 text-indigo-400" />
              Sua Base de Currículo Estruturada
            </h2>
            <span className="text-xs text-slate-400">
              Dados salvos localmente
            </span>
          </div>

          <FormularioCurriculo
            curriculo={curriculo}
            onSalvar={handleSalvarCurriculo}
          />
        </section>
      </main>

      {/* Rodapé da Aplicação */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>Currículo Adaptativo — Projeto Open Source 100% Client-Side</p>
      </footer>

      {/* Modal de Importação de PDF / DOCX */}
      {modalImportacaoAberto && (
        <ModalImportacao
          onFechar={() => setModalImportacaoAberto(false)}
          onImportarSucesso={handleSalvarCurriculo}
        />
      )}
    </div>
  );
}

export default App;
