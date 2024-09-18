/**
 * MoveCommand moves the robot one unit forward in the direction it is currently facing.
 */

import { Command } from "commands/command"
import Robot from "models/robot"

export class MoveCommand extends Command {
  private robot: Robot

  constructor(robot: Robot) {
    super()
    this.robot = robot
  }

  execute(): void {
    this.robot.move()
  }
}
