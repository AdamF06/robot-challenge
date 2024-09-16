import { MESSAGE } from 'consts';
import * as readline from 'readline';

export function exitCommand(rl: readline.Interface): void {
    console.log(MESSAGE.EXIT);
    rl.close();
}
