import Robot from "models/robot"
import { RobotCommand } from "./robot-command"

export const left: RobotCommand = (robot: Robot) => {
  robot.left()
}
