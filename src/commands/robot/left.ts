/**
 * LeftCommand rotates the robot 90 degrees to the left without changing its position.
 */

import { Command } from "commands/command"
import Robot from "models/robot"

export class LeftCommand extends Command {
  private robot: Robot

  constructor(robot: Robot) {
    super()
    this.robot = robot
  }

  execute(): void {
    this.robot.left()
  }
}
