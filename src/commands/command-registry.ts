/**
 * Command registry that maps command names to their corresponding command classes.
 * This registry is used by the CommandManager to instantiate commands based on user input.
 */

import { COMMANDS, CommandName } from "consts/commands"
import { Command } from "./command"
import { PlaceCommand } from "./robot/place"
import { MoveCommand } from "./robot/move"
import { LeftCommand } from "./robot/left"
import { RightCommand } from "./robot/right"
import { ReportCommand } from "./robot/report"
import { ExitCommand } from "./system/exit"
import { HelpCommand } from "./system/help"
import { DefaultCommand } from "./system/default"

export const commandRegistry: {
  [key in CommandName | "DEFAULT"]: new (...args: any[]) => Command
} = {
  [COMMANDS.PLACE]: PlaceCommand,
  [COMMANDS.MOVE]: MoveCommand,
  [COMMANDS.LEFT]: LeftCommand,
  [COMMANDS.RIGHT]: RightCommand,
  [COMMANDS.REPORT]: ReportCommand,
  [COMMANDS.EXIT]: ExitCommand,
  [COMMANDS.HELP]: HelpCommand,
  DEFAULT: DefaultCommand,
}
