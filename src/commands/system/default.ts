/**
 * Uses the third-party package fuse.js@^7.0.0 to find similar commands from COMMANDS
 * and return suggestions to the user. If no similar command is found,
 * function return the default error message.
 */

import Fuse from "fuse.js"

import { MESSAGE, COMMANDS } from "consts"

export const defaultCommand = (command: string) => {
  const suggestion = commandHelper(command)
  if (suggestion) {
    console.log(`Invalid command '${command}'. Did you mean '${suggestion}'?`)
  } else {
    console.log(MESSAGE.ERRORS.INVALID_COMMAND)
  }
}

const COMMAND_LIST = Object.values(COMMANDS)

// Configuration options for Fuse.js
const options = {
  includeScore: true, // Include the similarity score in the result
  threshold: 0.4, // Threshold to determine how close the match needs to be
}

const fuse = new Fuse(COMMAND_LIST, options)

const commandHelper = (input: string) => {
  const result = fuse.search(input.toUpperCase())

  // If a close match is found with a score within the acceptable range, return the command
  if (
    result.length > 0 &&
    result[0].score !== undefined &&
    result[0].score <= options.threshold
  ) {
    return result[0].item
  }

  // If no suitable match is found, return null
  return null
}
