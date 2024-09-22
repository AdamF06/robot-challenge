import { ReportCommand } from "commands/robot/report"
import Robot from "models/robot"
import Table from "models/table"
import { DIRECTION } from "consts/directions"
import { Logger } from "utils/logger"
import { ERRORS } from "consts/messages"

describe("ReportCommand", () => {
  let robot: Robot
  let command: ReportCommand
  let infoSpy: jest.SpyInstance
  let errorSpy: jest.SpyInstance

  beforeEach(() => {
    const table = new Table(5, 5)
    robot = new Robot(table, 1)
    command = new ReportCommand(robot)
    infoSpy = jest.spyOn(Logger, "info").mockImplementation(() => {})
    errorSpy = jest.spyOn(Logger, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test("should report error if robot is not placed", () => {
    command.execute()
    expect(errorSpy).toHaveBeenCalledWith(ERRORS.INVALID_ROBOT)
  })

  test("should report robot's position", () => {
    robot.place(2, 3, DIRECTION.SOUTH)
    command.execute()
    expect(infoSpy).toHaveBeenCalledWith(`2,3,${DIRECTION.SOUTH}`)
  })
})
