/**
 * ReportCommand announces the X, Y, and F of the robot's current position.
 */

import { Command } from "commands/command"
import { ERRORS } from "consts/messages"
import Robot from "models/robot"
import { Logger } from "utils/logger"

export class ReportCommand extends Command {
  private robot: Robot

  constructor(robot: Robot) {
    super()
    this.robot = robot
  }

  execute(): void {
    const report: string = this.robot.report()
    if (report == ERRORS.INVALID_ROBOT) {
      Logger.error(report)
    } else {
      Logger.info(report)
    }
  }
}
