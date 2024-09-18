/**
 * ReportCommand announces the X, Y, and F of the robot's current position.
 */

import { Command } from "../command"
import Robot from "models/robot"
import { Logger } from "utils/logger"

export class ReportCommand extends Command {
  private robot: Robot

  constructor(robot: Robot) {
    super()
    this.robot = robot
  }

  execute(): void {
    Logger.info(this.robot.report())
  }
}
