import Robot from "models/robot"
import { RobotCommand } from "./robot-command"

export const move: RobotCommand = (robot: Robot) => {
  robot.move()
}
