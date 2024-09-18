import * as readline from "readline"
import Robot from "models/robot"

import { place } from "./robot/place"
import { left } from "./robot/left"
import { right } from "./robot/right"
import { move } from "./robot/move"
import { report } from "./robot/report"

import { defaultCommand } from "./system/default"
import { exitCommand } from "./system/exit"
import { helpCommand } from "./system/help"

import { COMMANDS } from "consts"

class CommandManager {
  private commandHandlers: Record<string, (args?: string) => void> = {}
  private readonly robot: Robot
  private readonly rl: readline.Interface

  constructor(robot: Robot, rl: readline.Interface) {
    this.robot = robot
    this.rl = rl
    this.initializeCommandHandlers()
  }

  private initializeCommandHandlers(): void {
    this.commandHandlers[COMMANDS.PLACE] = (args?: string) =>
      place(this.robot, args)
    this.commandHandlers[COMMANDS.MOVE] = () => move(this.robot)
    this.commandHandlers[COMMANDS.LEFT] = () => left(this.robot)
    this.commandHandlers[COMMANDS.RIGHT] = () => right(this.robot)
    this.commandHandlers[COMMANDS.REPORT] = () => report(this.robot)
    this.commandHandlers[COMMANDS.EXIT] = () => exitCommand(this.rl)
    this.commandHandlers[COMMANDS.HELP] = () => helpCommand()
    // Extend here with further commands ...
  }

  public getCommandHandler(command: string): (args?: string) => void {
    // Return the corresponding handler or a default handler for unmatched commands
    return (
      this.commandHandlers[command.toUpperCase()] ||
      (() => defaultCommand(command))
    )
  }
}

export default CommandManager
