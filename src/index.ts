import { Student, greeter } from './student';
import chalk = require('chalk');

const user = new Student('Jane', 'M.', 'User');

console.log(chalk.green(greeter(user)));