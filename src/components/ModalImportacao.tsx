import React, { useState } from 'react';
import { extrairTextoDoArquivo } from '../services/importacao-arquivo';
import { separarSecoesPorHeuristica, converterSecoesParaCurriculoBase } from '../services/parser-heuristico';
import type { CurriculoBase } from '../types/curriculo';
import { RevisaoImportacao } from './RevisaoImportacao';
import { X, Upload, FileUp, Loader2, AlertCircle } from 'lucide-react';

interface ModalImportacaoProps {
  onFechar: () => void;
  onImportarSucesso: (curriculoExtraido: CurriculoBase) => void;
}

/**
 * Modal para upload e importação inteligente de currículos (PDF ou DOCX).
 * Realiza o parsing client-side do arquivo e apresenta a tela de revisão
 * antes de aplicar as alterações ao currículo principal.
 */
export const ModalImportacao: React.FC<ModalImportacaoProps> = ({
  onFechar,
  onImportarSucesso,
}) => {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [rascunhoCurriculo, setRascunhoCurriculo] = useState<CurriculoBase | null>(null);

  // Manipulador do envio do arquivo
  const processarArquivo = async (file: File) => {
    setErro(null);
    setCarregando(true);

    try {
      // 1. Extração do texto bruto no cliente (100% no navegador)
      const textoBruto = await extrairTextoDoArquivo(file);

      // 2. Segmentação heurística de seções
      const secoesDetectadas = separarSecoesPorHeuristica(textoBruto);

      // 3. Conversão em objeto CurriculoBase estruturado
      const rascunho = converterSecoesParaCurriculoBase(secoesDetectadas, textoBruto);

      setRascunhoCurriculo(rascunho);
    } catch (err: unknown) {
      const mensagem = err instanceof Error ? err.message : 'Falha ao processar o arquivo enviado.';
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processarArquivo(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processarArquivo(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <FileUp className="h-5 w-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white font-heading">
              Importar Currículo Existente (PDF / DOCX)
            </h2>
          </div>
          <button
            onClick={onFechar}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Se ainda não processou o rascunho, mostra a área de Upload */}
          {!rascunhoCurriculo ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                Selecione ou arraste seu currículo salvo em PDF ou Word (.docx). O processamento ocorre **100% no seu navegador** e seus dados pessoais nunca são enviados para nenhum servidor externo.
              </p>

              {/* Zona de Drop / Seleção */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-950/60 hover:bg-slate-950 rounded-2xl p-8 text-center transition-all cursor-pointer group"
              >
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <label htmlFor="fileInput" className="cursor-pointer block">
                  {carregando ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-4">
                      <Loader2 className="h-8 w-8 text-indigo-400 animate-spin" />
                      <span className="text-xs font-semibold text-slate-300">
                        Lendo e analisando a estrutura do arquivo...
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 py-4">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          Clique para selecionar ou arraste o arquivo aqui
                        </span>
                        <p className="text-xs text-slate-500 mt-1">
                          Suporta arquivos em formato .PDF ou .DOCX
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {/* Alerta de erro */}
              {erro && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3.5 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{erro}</span>
                </div>
              )}
            </div>
          ) : (
            /* Se o arquivo foi lido, exibe a tela de revisão e confirmação */
            <RevisaoImportacao
              rascunho={rascunhoCurriculo}
              onConfirmar={(curriculoConfirmado) => {
                onImportarSucesso(curriculoConfirmado);
                onFechar();
              }}
              onCancelar={() => setRascunhoCurriculo(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
