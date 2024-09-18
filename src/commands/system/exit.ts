/**
 * ExitCommand terminates the application gracefully.
 */

import { Command } from "commands/command"
import { EXIT } from "consts/messages"
import { Logger } from "utils/logger"

export class ExitCommand extends Command {
  execute(): void {
    Logger.info(EXIT)
    process.exit(0)
  }
}
