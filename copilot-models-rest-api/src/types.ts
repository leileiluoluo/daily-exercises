export interface ChatRequest {
    model?: string;
    messages: string[];
}

export interface ChatResponse {
    model?: string;
    reply?: string;
    error?: string;
}