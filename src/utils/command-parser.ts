import { COMMANDS, CommandName } from "consts/commands"

// Parses the input string and returns the corresponding command name and arguments.
// If the command is unrecognized, returns null for commandName.
export const parseCommand = (
  input: string,
): {
  commandName: CommandName | null
  args?: string
} => {
  const [command, ...args] = input.trim().split(" ")
  const commandName = command.toUpperCase() as CommandName

  if (Object.values(COMMANDS).includes(commandName)) {
    return { commandName, args: args.join(" ") }
  }

  return { commandName: null }
}
