import Robot from '../models/robot';

export function robotReport(robot: Robot): void {
    console.log(robot.report());
}
