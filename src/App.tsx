import { useState } from 'react';
import { useCurriculo } from './hooks/useCurriculo';
import { Header } from './components/Header';
import { FormularioCurriculo } from './components/FormularioCurriculo';
import { ModalImportacao } from './components/ModalImportacao';
import type { CurriculoBase } from './types/curriculo';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';

/**
 * Componente Raiz da Aplicação Currículo Adaptativo.
 * Coordena o estado do currículo, modais e o formulário principal.
 */
export function App() {
  const { curriculo, setCurriculo, restaurarPadrao } = useCurriculo();
  const [modalImportacaoAberto, setModalImportacaoAberto] = useState(false);

  // Manipulador para atualização do currículo a partir do formulário ou modal
  const handleSalvarCurriculo = (novoCurriculo: CurriculoBase) => {
    setCurriculo(novoCurriculo);
  };

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
        
        {/* Banner Informativo da Sprint 1 */}
        <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white font-heading">
                  Base Unificada de Currículo
                </h2>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Cadastre ou importe seu histórico profissional uma única vez. Na Sprint 2, este currículo será cruzado automaticamente com descrições de vagas para reordenação inteligente de seções.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
              <span className="flex items-center gap-1 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Zero Backend
              </span>
              <span className="flex items-center gap-1 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Cpu className="h-4 w-4 text-indigo-400" />
                NLP Determinístico
              </span>
            </div>
          </div>
        </div>

        {/* Formulario Principal de Edição e Gestão do Currículo */}
        <FormularioCurriculo
          curriculo={curriculo}
          onSalvar={handleSalvarCurriculo}
        />
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
