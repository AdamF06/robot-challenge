/**
 * Simple logger utility for consistent logging
 */

export class Logger {
  static info(message: string): void {
    console.log(message)
  }

  static error(message: string): void {
    console.error(`ERROR: ${message}`)
  }
}
