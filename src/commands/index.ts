import * as readline from 'readline';
import Robot from "../models/robot";

import {robotPlace} from "./robot-place";
import {robotLeft} from "./robot-left";
import {robotRight} from "./robot-right";
import {robotMove} from "./robot-move";
import {robotReport} from "./robot-report";

import {defaultCommand} from "./system-default";
import {exitCommand} from "./system-exit";
import {helpCommand} from "./system-help";

import {COMMANDS} from "consts";

// Commands mapping object
const commandHandlers: Record<string, (args?: string) => void> = {};

// Function to initialize the COMMANDS mapping
export function initializeCommands(robot: Robot, rl: readline.Interface): void {
    commandHandlers[COMMANDS.PLACE] = (args: string | undefined) => robotPlace(args, robot);
    commandHandlers[COMMANDS.MOVE] = () => robotMove(robot);
    commandHandlers[COMMANDS.LEFT] = () => robotLeft(robot);
    commandHandlers[COMMANDS.RIGHT] = () => robotRight(robot);
    commandHandlers[COMMANDS.REPORT] = () => robotReport(robot);
    commandHandlers[COMMANDS.EXIT] = () => exitCommand(rl);
    commandHandlers[COMMANDS.HELP] = () => helpCommand();
}

// Function to get the command handler
export const getCommandHandler = (
    command: string,
    robot: Robot,
    rl: readline.Interface
): ((args?: string) => void) => {
    // Check if commandHandlers is empty using Object.keys()
    if (Object.keys(commandHandlers).length === 0) {
        initializeCommands(robot, rl);
    }

    // Return the corresponding handler or a default handler for unmatched commands
    return commandHandlers[command.toUpperCase()] || (() => defaultCommand(command));
};
