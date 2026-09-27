import React, { useState } from 'react';
import { Search, Link as LinkIcon, Info, Sparkles, FileText, Trash2 } from 'lucide-react';

interface FormularioVagaProps {
  onAnalisarVaga: (descricao: string, linkVaga?: string, tituloVaga?: string) => void;
  onLimparAnalise?: () => void;
  temAnaliseAtiva: boolean;
}

/**
 * Componente para entrada e colagem da Descrição da Vaga desejada.
 * Inclui o campo de link como anotação (ADR-02) e dispara a extração NLP de palavras-chave.
 */
export const FormularioVaga: React.FC<FormularioVagaProps> = ({
  onAnalisarVaga,
  onLimparAnalise,
  temAnaliseAtiva,
}) => {
  const [tituloVaga, setTituloVaga] = useState('');
  const [descricao, setDescricao] = useState('');
  const [linkVaga, setLinkVaga] = useState('');

  // Vaga de exemplo para teste rápido do usuário
  const VAGA_EXEMPLO = `
Desenvolvedor Front-End Senior (React / TypeScript)

Buscamos um Desenvolvedor Front-End Senior apaixonado por criar interfaces modernas e responsivas.
Você fará parte do time de engenharia liderando o desenvolvimento de novas aplicações em React 19.

Requisitos Técnicos:
- Sólida experiência em React.js, TypeScript e Tailwind CSS.
- Conhecimento profundo em consumo de APIs RESTful e GraphQL.
- Experiência em testes unitários com Vitest ou Jest.
- Familiaridade com esteiras de CI/CD, Docker e Git.
- Bons conhecimentos em PostgreSQL e Node.js para integração com back-end.

Diferenciais:
- Vivência com metodologias ágeis (Scrum / Kanban).
- Experiência prévia em arquiteturas client-side e PWA.
  `.trim();

  const handleSubmeter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao.trim()) return;
    onAnalisarVaga(descricao, linkVaga.trim() || undefined, tituloVaga.trim() || undefined);
  };

  const carregarExemplo = () => {
    setTituloVaga('Desenvolvedor Front-End Senior (Exemplo)');
    setDescricao(VAGA_EXEMPLO);
    setLinkVaga('https://exemplo.com/vagas/dev-frontend-senior');
  };

  const handleLimpar = () => {
    setTituloVaga('');
    setDescricao('');
    setLinkVaga('');
    if (onLimparAnalise) onLimparAnalise();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      
      {/* Cabeçalho da Seção de Vaga */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-heading">
              Análise da Descrição da Vaga
            </h2>
            <p className="text-xs text-slate-400">
              Cole o texto da vaga para extrair termos técnicos e calcular o score de aderência
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={carregarExemplo}
            className="px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Carregar Vaga Exemplo
          </button>

          {temAnaliseAtiva && (
            <button
              type="button"
              onClick={handleLimpar}
              className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-rose-300 bg-slate-800 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Limpar Vaga
            </button>
          )}
        </div>
      </div>

      {/* Formulário de Envio da Vaga */}
      <form onSubmit={handleSubmeter} className="p-6 space-y-4">
        
        {/* Campo opcional de Título da Vaga */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-indigo-400" />
            Título da Vaga / Empresa (Opcional)
          </label>
          <input
            type="text"
            value={tituloVaga}
            onChange={(e) => setTituloVaga(e.target.value)}
            placeholder="Ex: Desenvolvedor Front-End Senior — Empresa X"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Textarea Principal para colagem do texto da vaga */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Descrição Completa da Vaga <span className="text-indigo-400">*</span>
          </label>
          <textarea
            rows={7}
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Cole aqui o texto completo da descrição da vaga (requisitos, responsabilidades, diferenciais, tecnologias exigidas)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
          />
        </div>

        {/* Campo opcional do Link da Vaga (ADR-02) */}
        <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <LinkIcon className="h-3.5 w-3.5 text-indigo-400" />
              Link da Vaga (Anotação Opcional)
            </label>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
              ADR-02
            </span>
          </div>

          <input
            type="url"
            value={linkVaga}
            onChange={(e) => setLinkVaga(e.target.value)}
            placeholder="https://linkedin.com/jobs/view/... (Guardado como anotação da candidatura)"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          />

          <div className="flex items-start gap-1.5 text-[11px] text-slate-400">
            <Info className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
            <span>
              <strong>Por que colar o texto?</strong> Conforme ADR-02, portais externos bloqueiam busca direta por CORS. Guardamos a URL como anotação para sua conveniência.
            </span>
          </div>
        </div>

        {/* Botão Principal de Ação */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={!descricao.trim()}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Extrair Palavras-Chave & Analisar</span>
          </button>
        </div>
      </form>
    </div>
  );
};
