import { RightCommand } from "commands/robot/right"
import Robot from "models/robot"
import Table from "models/table"
import { ERRORS } from "consts/messages"
import { DIRECTION } from "consts/directions"

describe("RightCommand", () => {
  let robot: Robot
  let command: RightCommand

  beforeEach(() => {
    const table = new Table(5, 5)
    robot = new Robot(table, 1)
    command = new RightCommand(robot)
  })

  test("should not turn right before PLACE", () => {
    command.execute()
    expect(robot.report()).toBe(ERRORS.INVALID_ROBOT)
  })

  test("should turn robot right", () => {
    robot.place(0, 0, DIRECTION.NORTH)
    command.execute()
    expect(robot.report()).toBe(`0,0,${DIRECTION.EAST}`)
    command.execute()
    expect(robot.report()).toBe(`0,0,${DIRECTION.SOUTH}`)
    command.execute()
    expect(robot.report()).toBe(`0,0,${DIRECTION.WEST}`)
    command.execute()
    expect(robot.report()).toBe(`0,0,${DIRECTION.NORTH}`)
  })
})
