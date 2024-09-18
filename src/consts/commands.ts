/**
 * This file contains all executable system commands.
 * If a new command needs to be added, please update this file
 * and implement the corresponding logic under the 'src/commands/' directory.
 */

export const COMMANDS = {
  PLACE: "PLACE", // PLACE command requires format: PLACE X,Y,F where X and Y are integers and F is a direction (NORTH, EAST, SOUTH, WEST)
  MOVE: "MOVE",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  REPORT: "REPORT",
  EXIT: "EXIT",
  HELP: "HELP",
} as const
export type Command = (typeof COMMANDS)[keyof typeof COMMANDS]
