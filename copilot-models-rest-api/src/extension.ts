import * as vscode from 'vscode';
import { ApiServer } from './apiServer';

let apiServer: ApiServer | null = null;

// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "copilot-models-rest-api" is now active!');

	// start API server command
	vscode.commands.registerCommand('copilot-models-rest-api.startServer', async () => {
		const port = 3001; // You can change the port number if needed
		apiServer = new ApiServer(port);

		try {
			await apiServer.start();
			vscode.window.showInformationMessage(`API Server started on port ${port}`);
		} catch (error) {
			vscode.window.showErrorMessage('Failed to start API Server');
		}
	});

	// stop API server command
	vscode.commands.registerCommand('copilot-models-rest-api.stopServer', async () => {
		if (apiServer) {
			try {
				await apiServer.stop();
				vscode.window.showInformationMessage('API Server stopped');
			} catch (error) {
				vscode.window.showErrorMessage('Failed to stop API Server');
			}
		} else {
			vscode.window.showWarningMessage('API Server is not running');
		}
	});
}

// This method is called when your extension is deactivated
export function deactivate() {
	if (apiServer) {
		apiServer.stop().catch((error: Error) => {
			console.error('Error stopping API Server:', error);
		});
	}
}
