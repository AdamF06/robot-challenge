import CommandManager from "commands/command-manager"
import Robot from "models/robot"
import Table from "models/table"
import { Logger } from "utils/logger"
import successCases from "./data/success.json"
import invalidRobotCases from "./data/invalid-robot.json" // no valid commands before the final REPORT
import { ERRORS } from "consts/messages"

jest.mock("utils/logger")

describe("Robot Data-Driven Testing", () => {
  let robot: Robot
  let commandManager: CommandManager
  let errorSpy: jest.SpyInstance

  beforeEach(() => {
    const table = new Table(5, 5)
    robot = new Robot(table, 1)
    commandManager = new CommandManager(robot)
    errorSpy = jest.spyOn(Logger, "error").mockImplementation(() => {})
    jest.clearAllMocks()
  })

  // Testing successful cases
  describe("Success Cases", () => {
    successCases.forEach(({ commands, expected, description }) => {
      test(`${description}`, () => {
        commands.forEach((command) => {
          const commandInstance = commandManager.getCommand(command)
          commandInstance.execute()
        })
        expect(robot.report()).toBe(expected)
      })
    })
  })

  // Testing failed cases
  describe("Report when there's no valid robot Cases", () => {
    invalidRobotCases.forEach((commands, index) => {
      test(`log invalid error case ${index + 1}`, () => {
        commands.forEach((command) => {
          const commandInstance = commandManager.getCommand(command)
          commandInstance.execute()
        })
        expect(errorSpy).toHaveBeenCalledWith(ERRORS.INVALID_ROBOT)
      })
    })
  })
})
