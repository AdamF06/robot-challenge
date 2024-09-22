import { PlaceCommand } from "commands/robot/place"
import Robot from "models/robot"
import Table from "models/table"
import { ERRORS } from "consts/messages"
import { DIRECTION } from "consts/directions"
import { Logger } from "utils/logger"

describe("PlaceCommand", () => {
  let robot: Robot
  let command: PlaceCommand
  let logSpy: jest.SpyInstance

  beforeEach(() => {
    const table = new Table(5, 5)
    robot = new Robot(table, 1)
    logSpy = jest.spyOn(Logger, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    logSpy.mockRestore()
  })

  test("should place robot with valid arguments", () => {
    command = new PlaceCommand(robot, `0,0,${DIRECTION.NORTH}`)
    command.execute()
    expect(robot.report()).toBe(`0,0,${DIRECTION.NORTH}`)

    // should ignore space, case insensitive
    command = new PlaceCommand(robot, `0,  0,  north`)
    command.execute()
    expect(robot.report()).toBe(`0,0,${DIRECTION.NORTH}`)
  })

  test("should not place robot with invalid position arguments", () => {
    command = new PlaceCommand(robot, `5,5,${DIRECTION.NORTH}`)
    command.execute()
    expect(robot.report()).toBe(ERRORS.INVALID_ROBOT)
  })

  test("should not place robot with invalid direction arguments", () => {
    command = new PlaceCommand(robot, `5,5,nor`)
    command.execute()
    expect(robot.report()).toBe(ERRORS.INVALID_ROBOT)
    expect(logSpy).toHaveBeenCalledWith(ERRORS.INVALID_PLACE_COMMAND)
  })

  test("should handle missing arguments", () => {
    command = new PlaceCommand(robot)
    command.execute()
    expect(logSpy).toHaveBeenCalledWith(ERRORS.INVALID_PLACE_COMMAND)
  })
})
