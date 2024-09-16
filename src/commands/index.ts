import * as readline from 'readline';
import Robot from "models/robot";

import {robotPlace} from "./robot-place";
import {robotLeft} from "./robot-left";
import {robotRight} from "./robot-right";
import {robotMove} from "./robot-move";
import {robotReport} from "./robot-report";

import {defaultCommand} from "./system-default";
import {exitCommand} from "./system-exit";
import {helpCommand} from "./system-help";

import {COMMANDS} from "consts";

class CommandManager {
    private commandHandlers: Record<string, (args?: string) => void> = {};
    private readonly robot: Robot;
    private readonly rl: readline.Interface;

    constructor(robot: Robot, rl: readline.Interface) {
        this.robot = robot;
        this.rl = rl;
        this.initializeCommandHandlers();
    }

    private initializeCommandHandlers(): void {
        this.commandHandlers[COMMANDS.PLACE] = (args: string | undefined) => robotPlace(args, this.robot);
        this.commandHandlers[COMMANDS.MOVE] = () => robotMove(this.robot);
        this.commandHandlers[COMMANDS.LEFT] = () => robotLeft(this.robot);
        this.commandHandlers[COMMANDS.RIGHT] = () => robotRight(this.robot);
        this.commandHandlers[COMMANDS.REPORT] = () => robotReport(this.robot);
        this.commandHandlers[COMMANDS.EXIT] = () => exitCommand(this.rl);
        this.commandHandlers[COMMANDS.HELP] = () => helpCommand();
        // Extend here with further commands ...
    }

    public getCommandHandler(command: string): (args?: string) => void {
        // Return the corresponding handler or a default handler for unmatched commands
        return this.commandHandlers[command.toUpperCase()] || (() => defaultCommand(command));
    }
}

export default CommandManager;
