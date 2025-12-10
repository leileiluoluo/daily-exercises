import * as http from 'http';
import * as url from 'url';
import { LanguageModelService } from './languageModelService';
import { ChatRequest } from './types';

export class ApiServer {
    private server: http.Server | null = null;
    private port: number;
    private isRunning: boolean = false;
    private languageModelService: LanguageModelService;

    constructor(port: number) {
        this.port = port;
        this.languageModelService = LanguageModelService.getInstance();
    }

    private async handleRequest(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
        const parsedUrl = url.parse(req.url || '', true);
        const path = parsedUrl.pathname || '';

        try {
            if (req.method === 'GET') {
                await this.handleGetRequest(path, res);
            } else if (req.method === 'POST') {
                await this.handlePostRequest(path, req, res);
            } else {
                this.sendResponse(res, 405, { error: 'Method Not Allowed' });
            }
        } catch (error: any) {
            console.error('request failed', error);
            this.sendResponse(res, 500, { error: 'Internal Server Error' });
        }
    }

    private async handleGetRequest(path: string, res: http.ServerResponse): Promise<void> {
        if (path === '/v1/status') {
            this.sendResponse(res, 200, { status: 'running' });
        } else if (path === '/v1/models') {
            const models = await this.languageModelService.getAvailableModels();
            this.sendResponse(res, 200, { models });
        } else {
            this.sendResponse(res, 404, { error: 'Not Found' });
        }
    }

    private async handlePostRequest(path: string, req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
        if (path === '/v1/chat/completions') {
            const body = await this.readRequestBody(req);
            const chatRequest: ChatRequest = JSON.parse(body);
            const chatResponse = await this.languageModelService.createChatCompletion(chatRequest);
            this.sendResponse(res, 200, chatResponse);
        } else {
            this.sendResponse(res, 404, { error: 'Not Found' });
        }
    }

    private readRequestBody(req: http.IncomingMessage): Promise<string> {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
            req.on('error', reject);
        });
    }

    private sendResponse(res: http.ServerResponse, statusCode: number, data: any): void {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }

    public async start(): Promise<void> {
        if (this.isRunning) {
            console.log(`API Server is already running on port ${this.port}`);
            return;
        }

        this.server = http.createServer((req, res) => {
            console.log(`Received request: ${req.method} ${req.url}`);
            this.handleRequest(req, res);
        });

        return new Promise((resolve, reject) => {
            this.server?.listen(this.port, () => {
                this.isRunning = true;
                console.log(`API Server started on port ${this.port}`);
                resolve();
            });

            this.server?.on('error', (err) => {
                console.error('Failed to start API Server:', err);
                reject(err);
            });
        });
    }

    public async stop(): Promise<void> {
        if (!this.isRunning || !this.server) {
            console.log('API Server is not running.');
            return;
        }

        return new Promise((resolve, reject) => {
            this.server?.close((err) => {
                if (err) {
                    console.error('Failed to stop API Server:', err);
                    reject(err);
                    return;
                }
                this.isRunning = false;
                this.server = null;
                console.log('API Server stopped.');
                resolve();
            });
        });
    }

    public getStatus(): boolean {
        return this.isRunning;
    }
}