/**
 * Abstract Command class that all concrete commands will extend.
 * Each command must implement the execute method.
 */
export abstract class Command {
  abstract execute(): void

  // implement more interfaces if needed in the future
  // abstract redo(): void
  // abstract undo(): void
  // ...
}
