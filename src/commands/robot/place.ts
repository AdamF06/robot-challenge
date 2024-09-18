import { Direction, DIRECTIONS, MESSAGE } from "consts"
import Robot from "models/robot"
import { RobotCommand } from "./robot-command"

export const place: RobotCommand = (robot: Robot, args?: string) => {
  if (!args) {
    return console.log(MESSAGE.ERRORS.INVALID_PLACE_COMMAND)
  }

  // Parse and normalize arguments
  const [xStr, yStr, directionStr] = args.split(",").map((arg) => arg.trim())
  const direction = directionStr?.toUpperCase() as Direction

  const x = parseInt(xStr)
  const y = parseInt(yStr)

  // Validate X, Y, and Direction
  const isValidPosition = !isNaN(x) && !isNaN(y)
  const isValidDirection = DIRECTIONS.includes(direction)

  if (isValidPosition && isValidDirection) {
    robot.place(x, y, direction)
  } else {
    console.log(MESSAGE.ERRORS.INVALID_PLACE_COMMAND)
  }
}
