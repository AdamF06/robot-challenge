/**
 * HelpCommand displays a list of available commands and their descriptions.
 */

import { Command } from "commands/command"
import { COMMAND_INSTRUCTIONS } from "consts/messages"
import { Logger } from "utils/logger"

export class HelpCommand extends Command {
  execute(): void {
    Logger.info(COMMAND_INSTRUCTIONS)
  }
}
