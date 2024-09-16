import { MESSAGE } from 'consts';
import * as readline from 'readline';

export const exitCommand = (rl: readline.Interface) => {
    console.log(MESSAGE.EXIT);
    rl.close();
}
