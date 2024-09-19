import { MoveCommand } from "commands/robot/move"
import Robot from "models/robot"
import Table from "models/table"
import { ERRORS } from "consts/messages"
import { DIRECTION } from "consts/directions"

describe("MoveCommand", () => {
  let robot: Robot
  let command: MoveCommand

  beforeEach(() => {
    const table = new Table(5, 5)
    robot = new Robot(table, 1)
    command = new MoveCommand(robot)
  })

  test("should not move before PLACE", () => {
    command.execute()
    expect(robot.report()).toBe(ERRORS.INVALID_ROBOT)
  })

  test("should not move if robot will fall off the table", () => {
    robot.place(4, 4, DIRECTION.NORTH)
    command.execute()
    expect(robot.report()).toBe(`4,4,${DIRECTION.NORTH}`)
  })

  test("should move robot forward", () => {
    robot.place(0, 0, DIRECTION.NORTH)
    command.execute()
    expect(robot.report()).toBe(`0,1,${DIRECTION.NORTH}`)
  })
})
