// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
const fs = vscode.workspace.fs;

async function createTestFile(path: string) {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders) {
    const workspaceFolder = workspaceFolders[0]; // Get the first workspace folder
    const newFilePath = vscode.Uri.joinPath(
      workspaceFolder.uri,
      "/test/unit-tests/",
      path
    );
    // TODO check if file already exists
    await fs.writeFile(newFilePath, Buffer.from("Hello, World!"));
    vscode.window.showInformationMessage(
      "Created a new test file: " + newFilePath.toString()
    );
  } else {
    vscode.window.showErrorMessage("No workspace folder found.");
  }
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "testGenerator.helloWorld",
    () => {
      createTestFile("file.test.ts");
      vscode.window.showInformationMessage("Hello World from TestGenerator!");
    }
  );

  context.subscriptions.push(disposable);

  let testGenerationCommand = vscode.commands.registerCommand(
    "testGenerator.generateTest",
    (uri: vscode.Uri) => {
      console.log(uri.fsPath);

      const relativePathToSrc = uri.fsPath.split("/src")[1];
      const projectLocation = uri.fsPath.split("/src")[0];

      if (relativePathToSrc.endsWith(".test.ts")) {
        vscode.window.showInformationMessage(
          "Please select a non .test.ts file"
        );
        return;
      }

      const testFileLocation = `${projectLocation}/src/${relativePathToSrc}.test.ts`;

      vscode.window.showInformationMessage(testFileLocation);
    }
  );

  context.subscriptions.push(testGenerationCommand);
}

export function deactivate() {}
