import React, { useState } from 'react';
import type { CurriculoBase, ItemExperiencia, ItemProjeto, Habilidade, Formacao } from '../types/curriculo';
import { User, Briefcase, FolderGit2, Award, GraduationCap, Plus, Trash2, Save, FileText } from 'lucide-react';

interface FormularioCurriculoProps {
  curriculo: CurriculoBase;
  onSalvar: (novoCurriculo: CurriculoBase) => void;
}

/**
 * Componente principal de formulário para edição do Currículo Base.
 * Permite alternar entre abas (Dados Pessoais, Experiências, Projetos, Habilidades e Formação)
 * e gerenciar coleções dinâmicas (adicionar/remover/editar itens).
 */
export const FormularioCurriculo: React.FC<FormularioCurriculoProps> = ({
  curriculo,
  onSalvar,
}) => {
  // Estado da aba ativa
  const [abaAtiva, setAbaAtiva] = useState<'pessoais' | 'experiencias' | 'projetos' | 'habilidades' | 'formacao'>('pessoais');

  // Estado local editável do formulário
  const [dadosLocais, setDadosLocais] = useState<CurriculoBase>(curriculo);
  const [salvoFeedback, setSalvoFeedback] = useState(false);

  // Manipula atualizações em tempo real e dispara salvamento
  const atualizarCurriculo = (novoEstado: CurriculoBase) => {
    setDadosLocais(novoEstado);
    onSalvar(novoEstado);
    setSalvoFeedback(true);
    setTimeout(() => setSalvoFeedback(false), 2000);
  };

  // ----- Manipulação de Experiências -----
  const adicionarExperiencia = () => {
    const novaExp: ItemExperiencia = {
      id: `exp-${Date.now()}`,
      cargo: 'Novo Cargo',
      empresa: 'Nome da Empresa',
      periodo: '2024 — Atual',
      descricao: 'Descreva aqui suas principais conquistas e tecnologias utilizadas...',
      tecnologias: ['React', 'TypeScript'],
    };
    atualizarCurriculo({
      ...dadosLocais,
      experiencias: [novaExp, ...dadosLocais.experiencias],
    });
  };

  const removerExperiencia = (id: string) => {
    atualizarCurriculo({
      ...dadosLocais,
      experiencias: dadosLocais.experiencias.filter((e) => e.id !== id),
    });
  };

  // ----- Manipulação de Projetos -----
  const adicionarProjeto = () => {
    const novoProj: ItemProjeto = {
      id: `proj-${Date.now()}`,
      nome: 'Novo Projeto',
      descricao: 'Descreva o projeto, objetivos e problemas resolvidos...',
      tecnologias: ['React', 'Node.js'],
    };
    atualizarCurriculo({
      ...dadosLocais,
      projetos: [novoProj, ...dadosLocais.projetos],
    });
  };

  const removerProjeto = (id: string) => {
    atualizarCurriculo({
      ...dadosLocais,
      projetos: dadosLocais.projetos.filter((p) => p.id !== id),
    });
  };

  // ----- Manipulação de Habilidades -----
  const adicionarHabilidade = () => {
    const novaHab: Habilidade = {
      id: `hab-${Date.now()}`,
      nome: 'Nova Habilidade',
      categoria: 'framework',
    };
    atualizarCurriculo({
      ...dadosLocais,
      habilidades: [...dadosLocais.habilidades, novaHab],
    });
  };

  const removerHabilidade = (id: string) => {
    atualizarCurriculo({
      ...dadosLocais,
      habilidades: dadosLocais.habilidades.filter((h) => h.id !== id),
    });
  };

  // ----- Manipulação de Formação -----
  const adicionarFormacao = () => {
    const novaForm: Formacao = {
      id: `form-${Date.now()}`,
      curso: 'Novo Curso / Graduação',
      instituicao: 'Nome da Instituição',
      periodo: '2020 — 2024',
    };
    atualizarCurriculo({
      ...dadosLocais,
      formacao: [...dadosLocais.formacao, novaForm],
    });
  };

  const removerFormacao = (id: string) => {
    atualizarCurriculo({
      ...dadosLocais,
      formacao: dadosLocais.formacao.filter((f) => f.id !== id),
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      
      {/* Navegação de Abas do Formulário */}
      <div className="flex flex-wrap border-b border-slate-800 bg-slate-950/40 p-2 gap-1">
        <button
          onClick={() => setAbaAtiva('pessoais')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            abaAtiva === 'pessoais'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Dados Pessoais</span>
        </button>

        <button
          onClick={() => setAbaAtiva('experiencias')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            abaAtiva === 'experiencias'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>Experiências ({dadosLocais.experiencias.length})</span>
        </button>

        <button
          onClick={() => setAbaAtiva('projetos')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            abaAtiva === 'projetos'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <FolderGit2 className="h-4 w-4" />
          <span>Projetos ({dadosLocais.projetos.length})</span>
        </button>

        <button
          onClick={() => setAbaAtiva('habilidades')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            abaAtiva === 'habilidades'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Award className="h-4 w-4" />
          <span>Habilidades ({dadosLocais.habilidades.length})</span>
        </button>

        <button
          onClick={() => setAbaAtiva('formacao')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            abaAtiva === 'formacao'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Formação ({dadosLocais.formacao.length})</span>
        </button>
      </div>

      {/* Indicador de Salvamento Automático */}
      {salvoFeedback && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-1.5 text-xs text-emerald-400 flex items-center gap-1.5 justify-end">
          <Save className="h-3 w-3" />
          <span>Alterações salvas no localStorage</span>
        </div>
      )}

      {/* Conteúdo das Abas */}
      <div className="p-6">
        
        {/* ABA: DADOS PESSOAIS E RESUMO */}
        {abaAtiva === 'pessoais' && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <User className="h-4 w-4" /> Informações de Contato
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={dadosLocais.dadosPessoais.nome}
                  onChange={(e) =>
                    atualizarCurriculo({
                      ...dadosLocais,
                      dadosPessoais: { ...dadosLocais.dadosPessoais, nome: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Ex: Jonas Ferreira"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">E-mail Profissional</label>
                <input
                  type="email"
                  value={dadosLocais.dadosPessoais.email}
                  onChange={(e) =>
                    atualizarCurriculo({
                      ...dadosLocais,
                      dadosPessoais: { ...dadosLocais.dadosPessoais, email: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="seu.email@exemplo.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  value={dadosLocais.dadosPessoais.telefone || ''}
                  onChange={(e) =>
                    atualizarCurriculo({
                      ...dadosLocais,
                      dadosPessoais: { ...dadosLocais.dadosPessoais, telefone: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="(11) 98765-4321"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Localização (Cidade / Estado)</label>
                <input
                  type="text"
                  value={dadosLocais.dadosPessoais.localizacao || ''}
                  onChange={(e) =>
                    atualizarCurriculo({
                      ...dadosLocais,
                      dadosPessoais: { ...dadosLocais.dadosPessoais, localizacao: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="São Paulo, SP — Remoto"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={dadosLocais.dadosPessoais.linkedin || ''}
                  onChange={(e) =>
                    atualizarCurriculo({
                      ...dadosLocais,
                      dadosPessoais: { ...dadosLocais.dadosPessoais, linkedin: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="https://linkedin.com/in/seu-perfil"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={dadosLocais.dadosPessoais.github || ''}
                  onChange={(e) =>
                    atualizarCurriculo({
                      ...dadosLocais,
                      dadosPessoais: { ...dadosLocais.dadosPessoais, github: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="https://github.com/seu-usuario"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <label className="block text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" /> Resumo Profissional ("Sobre Mim")
              </label>
              <textarea
                rows={4}
                value={dadosLocais.resumoProfissional}
                onChange={(e) =>
                  atualizarCurriculo({ ...dadosLocais, resumoProfissional: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
                placeholder="Escreva um breve resumo de sua trajetória e diferenciais técnicos..."
              />
            </div>
          </div>
        )}

        {/* ABA: EXPERIÊNCIAS PROFISSIONAIS */}
        {abaAtiva === 'experiencias' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> Experiências Profissionais
              </h2>
              <button
                onClick={adicionarExperiencia}
                className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar Experiência
              </button>
            </div>

            {dadosLocais.experiencias.map((exp, index) => (
              <div key={exp.id} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-3 relative group">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold text-slate-500">#{index + 1}</span>
                  <button
                    onClick={() => removerExperiencia(exp.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                    title="Excluir experiência"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Cargo</label>
                    <input
                      type="text"
                      value={exp.cargo}
                      onChange={(e) => {
                        const novas = [...dadosLocais.experiencias];
                        novas[index].cargo = e.target.value;
                        atualizarCurriculo({ ...dadosLocais, experiencias: novas });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Empresa</label>
                    <input
                      type="text"
                      value={exp.empresa}
                      onChange={(e) => {
                        const novas = [...dadosLocais.experiencias];
                        novas[index].empresa = e.target.value;
                        atualizarCurriculo({ ...dadosLocais, experiencias: novas });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Período</label>
                    <input
                      type="text"
                      value={exp.periodo}
                      onChange={(e) => {
                        const novas = [...dadosLocais.experiencias];
                        novas[index].periodo = e.target.value;
                        atualizarCurriculo({ ...dadosLocais, experiencias: novas });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Descrição das Conquistas</label>
                  <textarea
                    rows={3}
                    value={exp.descricao}
                    onChange={(e) => {
                      const novas = [...dadosLocais.experiencias];
                      novas[index].descricao = e.target.value;
                      atualizarCurriculo({ ...dadosLocais, experiencias: novas });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Tecnologias (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={exp.tecnologias.join(', ')}
                    onChange={(e) => {
                      const novas = [...dadosLocais.experiencias];
                      novas[index].tecnologias = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                      atualizarCurriculo({ ...dadosLocais, experiencias: novas });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABA: PROJETOS RELEVANTES */}
        {abaAtiva === 'projetos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <FolderGit2 className="h-4 w-4" /> Projetos Relevantes
              </h2>
              <button
                onClick={adicionarProjeto}
                className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar Projeto
              </button>
            </div>

            {dadosLocais.projetos.map((proj, index) => (
              <div key={proj.id} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold text-slate-500">#{index + 1}</span>
                  <button
                    onClick={() => removerProjeto(proj.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Nome do Projeto</label>
                    <input
                      type="text"
                      value={proj.nome}
                      onChange={(e) => {
                        const novos = [...dadosLocais.projetos];
                        novos[index].nome = e.target.value;
                        atualizarCurriculo({ ...dadosLocais, projetos: novos });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Link (GitHub / Demo)</label>
                    <input
                      type="text"
                      value={proj.link || ''}
                      onChange={(e) => {
                        const novos = [...dadosLocais.projetos];
                        novos[index].link = e.target.value;
                        atualizarCurriculo({ ...dadosLocais, projetos: novos });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Descrição</label>
                  <textarea
                    rows={2}
                    value={proj.descricao}
                    onChange={(e) => {
                      const novos = [...dadosLocais.projetos];
                      novos[index].descricao = e.target.value;
                      atualizarCurriculo({ ...dadosLocais, projetos: novos });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Tecnologias Utilizadas</label>
                  <input
                    type="text"
                    value={proj.tecnologias.join(', ')}
                    onChange={(e) => {
                      const novos = [...dadosLocais.projetos];
                      novos[index].tecnologias = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                      atualizarCurriculo({ ...dadosLocais, projetos: novos });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABA: HABILIDADES TÉCNICAS */}
        {abaAtiva === 'habilidades' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Award className="h-4 w-4" /> Habilidades Técnicas
              </h2>
              <button
                onClick={adicionarHabilidade}
                className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar Habilidade
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {dadosLocais.habilidades.map((hab, index) => (
                <div key={hab.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={hab.nome}
                      onChange={(e) => {
                        const novas = [...dadosLocais.habilidades];
                        novas[index].nome = e.target.value;
                        atualizarCurriculo({ ...dadosLocais, habilidades: novas });
                      }}
                      placeholder="Ex: React"
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
                    />
                    <select
                      value={hab.categoria}
                      onChange={(e) => {
                        const novas = [...dadosLocais.habilidades];
                        novas[index].categoria = e.target.value as Habilidade['categoria'];
                        atualizarCurriculo({ ...dadosLocais, habilidades: novas });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-[11px] text-slate-400 focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="linguagem">Linguagem</option>
                      <option value="framework">Framework / Lib</option>
                      <option value="banco-de-dados">Banco de Dados</option>
                      <option value="ferramenta">Ferramenta / DevOps</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removerHabilidade(hab.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 shrink-0"
                    title="Remover habilidade"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA: FORMAÇÃO ACADÊMICA */}
        {abaAtiva === 'formacao' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> Formação Acadêmica
              </h2>
              <button
                onClick={adicionarFormacao}
                className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar Formação
              </button>
            </div>

            {dadosLocais.formacao.map((form, index) => (
              <div key={form.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold text-slate-500">#{index + 1}</span>
                  <button
                    onClick={() => removerFormacao(form.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Curso / Graduação</label>
                    <input
                      type="text"
                      value={form.curso}
                      onChange={(e) => {
                        const novas = [...dadosLocais.formacao];
                        novas[index].curso = e.target.value;
                        atualizarCurriculo({ ...dadosLocais, formacao: novas });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Instituição</label>
                    <input
                      type="text"
                      value={form.instituicao}
                      onChange={(e) => {
                        const novas = [...dadosLocais.formacao];
                        novas[index].instituicao = e.target.value;
                        atualizarCurriculo({ ...dadosLocais, formacao: novas });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Período</label>
                    <input
                      type="text"
                      value={form.periodo}
                      onChange={(e) => {
                        const novas = [...dadosLocais.formacao];
                        novas[index].periodo = e.target.value;
                        atualizarCurriculo({ ...dadosLocais, formacao: novas });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
