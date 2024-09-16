import Robot from 'models/robot';
import {RobotCommand} from "./robot-command";

export const report:RobotCommand = (robot: Robot) =>{
    console.log(robot.report());
}
