import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { mkdirRecursive, pathExists } from './utils/fileUtils';
import { disposeItem } from './utils/vscodeUtils';

let generateCCommandDisposable: vscode.Disposable | undefined;
let workspaceFolder: string | undefined;
let extensionPath: string | undefined;

const EXTENSION_NAME = 'Rust_Config';
const VSCODE_DIR_FILES = ['launch.json', 'settings.json'];
const ROOT_DIR_FILES = ['.editorconfig', '.gitattributes', '.gitignore'];

export function activate(context: vscode.ExtensionContext) {
  if (
    !vscode.workspace.workspaceFolders ||
    vscode.workspace.workspaceFolders.length !== 1 ||
    !vscode.workspace.workspaceFolders[0]
  ) {
    return;
  }

  workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
  extensionPath = context.extensionPath;

  initGenerateRustCommandDisposable(context);
}

export function deactivate() {
  disposeItem(generateCCommandDisposable);
}

function initGenerateRustCommandDisposable(context: vscode.ExtensionContext) {
  if (generateCCommandDisposable) return;

  const CommanddName = `${EXTENSION_NAME}.generateConfigRust`;
  generateCCommandDisposable = vscode.commands.registerCommand(
    CommanddName,
    async () => {
      const { templatePath, vscodePath } = getFilepaths();
      if (!templatePath || !vscodePath) return;

      if (!pathExists(vscodePath)) {
        const successful = mkdirRecursive(vscodePath);

        if (!successful) {
          vscode.window.showErrorMessage('Could not create .vscode folder.');
          return;
        }
      }

      VSCODE_DIR_FILES.forEach((filename) => {
        const targetFilename = path.join(vscodePath, filename);
        const templateFilename = path.join(templatePath, filename);

        try {
          const templateData = fs.readFileSync(templateFilename);

          fs.writeFileSync(targetFilename, templateData);
        } catch (err) {
          vscode.window.showErrorMessage(
            `Could not write file ${targetFilename}.`,
          );
          return;
        }
      });

      ROOT_DIR_FILES.forEach((filename) => {
        if (!workspaceFolder) return;

        const targetFilename = path.join(workspaceFolder, filename);
        const templateFilename = path.join(templatePath, filename);

        try {
          const templateData = fs.readFileSync(templateFilename);

          fs.writeFileSync(targetFilename, templateData);
        } catch (err) {
          vscode.window.showErrorMessage(
            `Could not write file ${targetFilename}.`,
          );
          return;
        }
      });
    },
  );

  context?.subscriptions.push(generateCCommandDisposable);
}

function getFilepaths() {
  if (!extensionPath || !workspaceFolder) return {};

  const templatePath = path.join(extensionPath, 'templates');
  const vscodePath = path.join(workspaceFolder, '.vscode');

  return { templatePath, vscodePath };
}
