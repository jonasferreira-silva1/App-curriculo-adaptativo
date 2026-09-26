import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configuração do Worker do PDF.js para navegadores (evita bloqueio na thread principal)
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
}

/**
 * Extrai o texto puro de um arquivo PDF no próprio navegador (100% Client-Side).
 * 
 * @param arquivo Arquivo PDF enviado pelo usuário
 * @returns Promessa com a string contendo o texto extraído do documento
 */
export async function extrairTextoDoPdf(arquivo: File): Promise<string> {
  try {
    const arrayBuffer = await arquivo.arrayBuffer();
    const carregador = pdfjsLib.getDocument({ data: arrayBuffer });
    const documento = await carregador.promise;

    let textoCompleto = '';
    
    // Concatena o texto extraído de cada página do PDF
    for (let numeroPagina = 1; numeroPagina <= documento.numPages; numeroPagina++) {
      const pagina = await documento.getPage(numeroPagina);
      const conteudo = await pagina.getTextContent();
      const textoDaPagina = conteudo.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ');
      
      textoCompleto += textoDaPagina + '\n';
    }

    return textoCompleto.trim();
  } catch (erro) {
    console.error('Erro ao ler arquivo PDF:', erro);
    throw new Error('Não foi possível ler o arquivo PDF. Verifique se o arquivo não está corrompido ou protegido por senha.');
  }
}

/**
 * Extrai o texto puro de um arquivo DOCX (Microsoft Word) no próprio navegador (100% Client-Side).
 * 
 * @param arquivo Arquivo DOCX enviado pelo usuário
 * @returns Promessa com a string contendo o texto extraído do documento
 */
export async function extrairTextoDoDocx(arquivo: File): Promise<string> {
  try {
    const arrayBuffer = await arquivo.arrayBuffer();
    const resultado = await mammoth.extractRawText({ arrayBuffer });
    return resultado.value.trim();
  } catch (erro) {
    console.error('Erro ao ler arquivo DOCX:', erro);
    throw new Error('Não foi possível ler o arquivo DOCX. Verifique se o formato é válido.');
  }
}

/**
 * Função unificada que identifica o formato (.pdf ou .docx) e extrai o texto bruto do arquivo.
 * 
 * @param arquivo Arquivo enviado pelo usuário (.pdf ou .docx)
 * @returns Promessa contendo o texto bruto extraído
 */
export async function extrairTextoDoArquivo(arquivo: File): Promise<string> {
  const extensao = arquivo.name.split('.').pop()?.toLowerCase();

  if (extensao === 'pdf') {
    return extrairTextoDoPdf(arquivo);
  }

  if (extensao === 'docx') {
    return extrairTextoDoDocx(arquivo);
  }

  throw new Error('Formato de arquivo não suportado. Por favor, envie um arquivo em formato PDF (.pdf) ou Word (.docx).');
}
