import Robot from "models/robot"

// function type interface for all robot movement commends
export interface RobotCommand {
  (robot: Robot, args?: string): void
}
