/**
 * DefaultCommand handles unrecognized commands.
 * It suggests similar valid commands if possible.
 */

import { Command } from "commands/command"
import { Logger } from "utils/logger"
import { ERRORS } from "consts/messages"
import { commandHelper } from "utils/command-helper"

export class DefaultCommand extends Command {
  private inputCommand: string

  constructor(inputCommand: string) {
    super()
    this.inputCommand = inputCommand
  }

  execute(): void {
    const suggestion = commandHelper(this.inputCommand)
    if (suggestion) {
      Logger.error(
        `Invalid command '${this.inputCommand}'. Did you mean '${suggestion}'?`,
      )
    } else {
      Logger.error(ERRORS.INVALID_COMMAND)
    }
  }
}
