import CommandManager from "commands/command-manager"
import Robot from "models/robot"
import Table from "models/table"
import { COMMANDS } from "consts/commands"
import { PlaceCommand } from "commands/robot/place"
import { MoveCommand } from "commands/robot/move"
import { LeftCommand } from "commands/robot/left"
import { RightCommand } from "commands/robot/right"
import { ReportCommand } from "commands/robot/report"
import { DefaultCommand } from "commands/system/default"
import { DIRECTION } from "consts/directions"

describe("CommandManager", () => {
  let robot: Robot
  let commandManager: CommandManager

  beforeEach(() => {
    const table = new Table(5, 5)
    robot = new Robot(table, 1)
    commandManager = new CommandManager(robot)
  })

  test("should return PlaceCommand for PLACE", () => {
    const command = commandManager.getCommand(
      `${COMMANDS.PLACE} 0,0,${DIRECTION.NORTH}`,
    )
    expect(command).toBeInstanceOf(PlaceCommand)
  })

  test("should return MoveCommand for MOVE", () => {
    const command = commandManager.getCommand(COMMANDS.MOVE)
    expect(command).toBeInstanceOf(MoveCommand)
  })

  test("should return LeftCommand for LEFT", () => {
    const command = commandManager.getCommand(COMMANDS.LEFT)
    expect(command).toBeInstanceOf(LeftCommand)
  })

  test("should return rightCommand for RIGHT", () => {
    const command = commandManager.getCommand(COMMANDS.RIGHT)
    expect(command).toBeInstanceOf(RightCommand)
  })

  test("should return reportCommand for REPORT", () => {
    const command = commandManager.getCommand(COMMANDS.REPORT)
    expect(command).toBeInstanceOf(ReportCommand)
  })

  test("should return DefaultCommand for invalid input", () => {
    const command = commandManager.getCommand("INVALID_COMMAND")
    expect(command).toBeInstanceOf(DefaultCommand)
  })
})
