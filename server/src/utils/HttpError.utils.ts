export default class HttpError {
    public description: string;

    public details: string | undefined;

    public status: number;

    constructor(statusText: string, error: string, status: number) {
        this.description = statusText;
        this.details = error ?? undefined;
        this.status = status;
    }
}

// Utilidad para capturar mensajes de error
export function extractMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Ocurrió un error inesperado.";
}