/**
 * PlaceCommand places the robot on the table at a specified position and direction.
 * Usage: PLACE X,Y,F
 */

import { Command } from "commands/command"
import Robot from "models/robot"
import { Direction, DIRECTIONS } from "consts/directions"
import { ERRORS } from "consts/messages"
import { Logger } from "utils/logger"

export class PlaceCommand extends Command {
  private robot: Robot
  private args: string

  constructor(robot: Robot, args?: string) {
    super()
    this.robot = robot
    this.args = args || ""
  }

  execute(): void {
    // Parse and validate arguments
    const [xStr, yStr, directionStr] = this.args
      .split(",")
      .map((arg) => arg.trim())
    const x = parseInt(xStr)
    const y = parseInt(yStr)
    const direction = directionStr?.toUpperCase() as Direction

    if (!isNaN(x) && !isNaN(y) && DIRECTIONS.includes(direction)) {
      this.robot.place(x, y, direction)
    } else {
      Logger.error(ERRORS.INVALID_PLACE_COMMAND)
    }
  }
}
