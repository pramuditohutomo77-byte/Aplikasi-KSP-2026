declare module 'mammoth' {
  export interface MammothResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }

  export interface MammothOptions {
    arrayBuffer?: ArrayBuffer;
    buffer?: any;
    path?: string;
  }

  export function extractRawText(options: MammothOptions): Promise<MammothResult>;
  export function convertToHtml(options: MammothOptions): Promise<MammothResult>;
}
