import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
  
	context.subscriptions.push(vscode.commands.registerCommand('isfs-root-tuner.showMapped', (resource: vscode.Uri) => {
		console.log('showMapped', resource.toString());
		updateParam(resource, 'mapped', true, true);
	}));
  
	context.subscriptions.push(vscode.commands.registerCommand('isfs-root-tuner.hideMapped', (resource: vscode.Uri) => {
		console.log('hideMapped', resource.toString());
		updateParam(resource, 'mapped', false, true);
 	}));
  
	context.subscriptions.push(vscode.commands.registerCommand('isfs-root-tuner.showGenerated', (resource: vscode.Uri) => {
		console.log('showGenerated', resource.toString());
		updateParam(resource, 'generated', true, false);
	}));
  
	context.subscriptions.push(vscode.commands.registerCommand('isfs-root-tuner.hideGenerated', (resource: vscode.Uri) => {
		console.log('hideGenerated', resource.toString());
		updateParam(resource, 'generated', false, false);
 	}));
  
	context.subscriptions.push(vscode.commands.registerCommand('isfs-root-tuner.showSystem', (resource: vscode.Uri) => {
		console.log('showSystem', resource.toString());
		updateParam(resource, 'system', true, false);
	}));
  
	context.subscriptions.push(vscode.commands.registerCommand('isfs-root-tuner.hideSystem', (resource: vscode.Uri) => {
		console.log('hideSystem', resource.toString());
		updateParam(resource, 'system', false, false);
 	}));
}

function updateParam(resource: vscode.Uri, name: string, value: boolean, defaultValue: boolean) {
	const index = vscode.workspace.workspaceFolders?.findIndex(folder => folder.uri.toString() === resource.toString());
	if (index !== undefined && index !== -1) {
		const folder = vscode.workspace.workspaceFolders![index];
		const params = new URLSearchParams(resource.query);
		if (!value) {
			if (!defaultValue) {
				params.delete(name);
			}
			else {
				params.set(name, '0');
			}
		}
		else {
			if (defaultValue) {
				params.delete(name);
			}
			else {
				params.set(name, '1');
			}
		}
		vscode.workspace.updateWorkspaceFolders(index, 1, { ...folder, uri: resource.with({ query: params.toString() }) });
	}
}

export function deactivate() {

}
