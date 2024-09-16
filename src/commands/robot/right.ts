import Robot from 'models/robot';
import {RobotCommand} from "./robot-command";

export const right:RobotCommand = (robot: Robot) =>{
    robot.right();
}
