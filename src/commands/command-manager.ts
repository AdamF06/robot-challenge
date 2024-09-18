/**
 * CommandManager is responsible for parsing user input and
 * instantiating the appropriate Command object.
 */

import { commandRegistry } from "./command-registry"
import { Command } from "./command"
import Robot from "models/robot"
import { parseCommand } from "utils/command-parser"

export default class CommandManager {
  private robot: Robot

  constructor(robot: Robot) {
    this.robot = robot
  }

  public getCommand(input: string): Command {
    const { commandName, args } = parseCommand(input)
    const CommandClass = commandRegistry[commandName || "DEFAULT"]

    if (commandName) {
      return new CommandClass(this.robot, args)
    } else {
      return new CommandClass(input) // For DefaultCommand, pass the raw input
    }
  }
}
