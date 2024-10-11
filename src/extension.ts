// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand(
		'RSnippetsExecutor.Selector', 
		async function () {
			const config = vscode.workspace.getConfiguration("RSnippetsExecutor").get("config");
      console.log(config);
			const names = config.map(item => item[0]);
			const codes = config.map(item => item[1]);
			

			const choice = await vscode.window.showQuickPick(names);

			if (choice == null) return;

      console.log(names);
      console.log(codes);
      console.log(names.indexOf(choice));
      console.log(codes[names.indexOf(choice)]);

			const code = codes[names.indexOf(choice)];

			vscode.commands.executeCommand(
				"workbench.action.executeCode.console",
				{
					"langId": "r",
					"code": code,
					"focus": true
      }
		);
	}
);

	context.subscriptions.push(disposable);
}
