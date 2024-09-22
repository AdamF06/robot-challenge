/**
 * This file contains all static string information used in the program.
 */

import { COMMANDS } from "./commands"

// WELCOME MESSAGE
const ROBOT_COMMANDS = [
  COMMANDS.PLACE,
  COMMANDS.LEFT,
  COMMANDS.RIGHT,
  COMMANDS.MOVE,
  COMMANDS.REPORT,
]
export const WELCOME = `
Welcome to Toy Robot Console Application V1.0.0 .
Please enter robot commands from: ${Object.values(ROBOT_COMMANDS).join(", ")}.
Commands are not case-sensitive.
To see more explanation, please type ${COMMANDS.HELP}.
To exit the application, please type ${COMMANDS.EXIT} or press 'Ctrl + C'.
`

// DETAILED COMMAND INSTRUCTIONS FOR THE USER
export const COMMAND_INSTRUCTIONS = `
- ${COMMANDS.PLACE} X,Y,F
  : Place the robot on the table at position (X, Y) facing direction F (NORTH, EAST, SOUTH, WEST). Example: PLACE 0,0,NORTH
- ${COMMANDS.MOVE}
  : Move the robot one unit forward in the direction it is currently facing.
- ${COMMANDS.LEFT}
  : Rotate the robot 90 degrees to the left without changing its position.
- ${COMMANDS.RIGHT}
  : Rotate the robot 90 degrees to the right without changing its position.
- ${COMMANDS.REPORT}
  : Announce the X, Y, and F of the robot's current position.
- ${COMMANDS.EXIT}
  : Exit the program.
`

// ERROR MESSAGES
export const ERRORS = {
  INVALID_PLACE_COMMAND: `Invalid PLACE command arguments. 
  Correct format: PLACE X,Y,F (e.g., PLACE 0,0,NORTH). X and Y must within table's size.`,
  INVALID_COMMAND: "Invalid command. Please try again.",
  INVALID_ROBOT: `There's no robot on the table yet.`,
}

// EXIT MESSAGE
export const EXIT = "Exiting the program..."
