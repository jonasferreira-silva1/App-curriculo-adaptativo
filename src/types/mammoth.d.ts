declare module 'mammoth' {
  export interface Options {
    arrayBuffer: ArrayBuffer;
  }
  export interface Result {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }
  export function extractRawText(options: Options): Promise<Result>;
}
