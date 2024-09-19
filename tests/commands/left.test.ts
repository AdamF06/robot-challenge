import { LeftCommand } from "commands/robot/left"
import Robot from "models/robot"
import Table from "models/table"
import { ERRORS } from "consts/messages"
import { DIRECTION } from "consts/directions"

describe("LeftCommand", () => {
  let robot: Robot
  let command: LeftCommand

  beforeEach(() => {
    const table = new Table(5, 5)
    robot = new Robot(table, 1)
    command = new LeftCommand(robot)
  })

  test("should not turn left before PLACE", () => {
    command.execute()
    expect(robot.report()).toBe(ERRORS.INVALID_ROBOT)
  })

  test("should turn robot left", () => {
    robot.place(0, 0, DIRECTION.NORTH)
    command.execute()
    expect(robot.report()).toBe(`0,0,${DIRECTION.WEST}`)
    command.execute()
    expect(robot.report()).toBe(`0,0,${DIRECTION.SOUTH}`)
    command.execute()
    expect(robot.report()).toBe(`0,0,${DIRECTION.EAST}`)
  })
})
