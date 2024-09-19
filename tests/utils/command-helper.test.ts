import { commandHelper } from "utils/command-helper"
import { COMMANDS } from "consts/commands"

describe("CommandHelper", () => {
  test("should suggest similar commands", () => {
    expect(commandHelper("mov")).toBe(COMMANDS.MOVE)
    expect(commandHelper("plaec")).toBe(COMMANDS.PLACE)
    expect(commandHelper("righ")).toBe(COMMANDS.RIGHT)
    expect(commandHelper("leftt")).toBe(COMMANDS.LEFT)
    expect(commandHelper("rept")).toBe(COMMANDS.REPORT)
  })

  test("should return null for unrelated input", () => {
    expect(commandHelper("xyz")).toBeNull()
  })
})
