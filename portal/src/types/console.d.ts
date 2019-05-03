// Helps prevent typescript vscode annoying auto-import.
declare module 'console' {
  export = typeof import('console')
}
