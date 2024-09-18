/**
 * This file contains all executable system commands.
 * If a new command needs to be added, please update this file
 * and implement the corresponding logic under the 'src/commands/' directory.
 */

export const COMMANDS = {
  // robot commands
  PLACE: "PLACE",
  MOVE: "MOVE",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  REPORT: "REPORT",

  //system commands
  EXIT: "EXIT",
  HELP: "HELP",
} as const

export type CommandName = (typeof COMMANDS)[keyof typeof COMMANDS]
