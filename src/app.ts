import * as readline from 'readline';

import Robot from 'models/robot';
import {MESSAGE} from 'consts';
import {
    getCommandHandler,
    initializeCommands
} from "commands";


// Initialize the readline interface for input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// Initialize Robot object
const robot = new Robot();


// Initialize the command handlers
initializeCommands(robot, rl);

// Print welcome message
console.log(MESSAGE.WELCOME);

// Start console interface
rl.on('line', (input: string) => {
    const [command, args] = input.trim().split(' ');

    const commandHandler = getCommandHandler(command, robot, rl);
    commandHandler(args);
});