import chalk from "chalk";

const clog = console.log

export const log = (str:string)=>clog(chalk.green(str))
export const error = (str:string)=>clog(chalk.red(str))
export const warn = (str:string)=>clog(chalk.yellow(str))