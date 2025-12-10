

import * as vscode from 'vscode';
import { ChatRequest, ChatResponse } from './types';
import { LanguageModelChat } from 'vscode';

export class LanguageModelService {
    private static instance: LanguageModelService;

    static getInstance(): LanguageModelService {
        if (!LanguageModelService.instance) {
            LanguageModelService.instance = new LanguageModelService();
        }
        return LanguageModelService.instance;
    }

    private constructor() { }

    public async getAvailableModels(): Promise<string[]> {
        try {
            const models = await vscode.lm.selectChatModels({
                vendor: 'copilot'
            });

            if (models.length === 0) {
                console.error('No Copilot models available');
                return [];
            }

            return models.map(model => model.id);
        } catch (error: any) {
            console.error('Error fetching models:', error);
            return [];
        }
    }

    public async getModelById(modelId?: string): Promise<LanguageModelChat | null> {
        try {
            const models = await vscode.lm.selectChatModels({
                vendor: 'copilot'
            });

            if (models.length === 0) {
                console.error('No Copilot models available');
                return null;
            }

            if (!modelId) {
                return models[0];
            }

            const model = models.find(m => m.id === modelId);
            return model || null;
        } catch (error: any) {
            console.error('Error fetching model by ID:', error);
            return null;
        }
    }

    public async createChatCompletion(req: ChatRequest): Promise<ChatResponse> {
        const model = await this.getModelById(req.model);
        if (!model) {
            console.error(`Model with ID ${req.model} not found`);
            return { error: `Model with ID ${req.model} not found` };
        }

        try {
            const messagePayload = req.messages.map(msg => vscode.LanguageModelChatMessage.User(msg));
            const resp = await model.sendRequest(messagePayload, {}, new vscode.CancellationTokenSource().token);

            let fullText: string = '';
            for await (const chunk of resp.text) {
                fullText += chunk;
            }
            return { reply: fullText, model: model.id };
        } catch (error: any) {
            console.error('Error creating chat completion:', error);
            return { error: 'Error creating chat completion: ' + error.message };
        }
    }
}