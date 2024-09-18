import * as readline from "readline"
import Robot from "models/robot"
import CommandManager from "commands/command-manager"
import { WELCOME } from "consts/messages"
import { Config } from "config"
import Table from "models/table"
import { Logger } from "utils/logger"

// Initialize readline interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

// Create Table instance
const table = new Table(Config.TABLE_WIDTH, Config.TABLE_HEIGHT)

// Create Robot instance with the table
const robot = new Robot(table, Config.CAR_SPEED)

// Create CommandManager instance
const commandManager = new CommandManager(robot)

// Print welcome message
Logger.info(WELCOME)

// Start listening for user input
rl.on("line", (input: string) => {
  const command = commandManager.getCommand(input)
  if (command) {
    command.execute()
  }
})
