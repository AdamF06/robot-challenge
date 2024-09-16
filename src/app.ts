import * as readline from 'readline';

import Robot from 'models/robot';
import {MESSAGE} from 'consts';
import CommandManager from "commands/command-manager";


// Initialize the readline interface for input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// Initialize Robot object
const robot = new Robot();

// Initialize the CommandManager object
const commandManager = new CommandManager(robot, rl);

// Print welcome message
console.log(MESSAGE.WELCOME);

// Start console interface
rl.on('line', (input: string) => {
    const [command, args] = input.trim().split(' ');

    const commandHandler = commandManager.getCommandHandler(command);
    commandHandler(args);
});