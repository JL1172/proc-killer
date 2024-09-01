import chalk from "chalk";
import * as rl from "readline-sync";
import { exec, execSync } from "child_process";

class KillPort {
  private port: number;
  private pid: number;
  constructor() {
    this.port = Infinity;
    this.pid = Infinity;
  }

  public async main(): Promise<void> {
    const int = await this.getPort();
    if (int === 1) {
      const int2 = await this.getPid();
      if (int2 === 1) {
        await this.killProcess();
      }
    }
  }
  public static async expediteKillProcess(port: number) {
    try {
      const pid = await new Promise((resolve) => {
        exec(`lsof -i :${port}`, (error, stdout) => {
          resolve(stdout);
        });
      });
      if (!pid) {
        throw new Error("No process detected at port " + port);
      }
      const pid_num: number = Number(
        (pid as string)
          .split(" ")
          .filter((n) => n)
          .at(-9)
      );
      await new Promise((resolve, reject) => {
        exec(`kill -9 ${pid_num}`, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve;
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
  private async getPort(): Promise<number | void> {
    try {
      console.clear();
      const answer: any = rl.question(
        chalk.greenBright("Enter port you want to kill: ")
      );
      this.parseNumber(answer);
      this.port = Number(answer);
      let count: number = 5;
      const intervalId = setInterval(() => {
        if (count === 0) {
          clearInterval(intervalId);
        } else {
          console.clear();
          console.log(
            `Inputted port: ${chalk.cyanBright(
              this.port
            )}. Press ${chalk.blueBright(
              "[control + c]"
            )} to restart process or do nothing to proceed. \n You have ${count} second(s) remaining.`
          );
          count--;
        }
      }, 1000);
      await new Promise((resolve) => setTimeout(resolve, 6000));
      return 1;
    } catch (err) {
      this.reportError("getPort", err + "");
    }
  }
  private async getPid(): Promise<void | number> {
    try {
      console.clear();
      const command = `sudo lsof -i :${this.port}`;
      const pid = await new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
          resolve(stdout);
        });
      });
      if (!pid) {
        throw new Error(
          chalk.red(`No process at port: ${this.port} is active.`)
        );
      } else {
        this.pid = Number(
          (pid as string)
            .split(" ")
            .filter((n) => n)
            .at(-9)
        );
        //* this might not always be 9 idk
      }
      console.log(`Successfully fetched PID ${chalk.blueBright(this.pid)}`);
      return 1;
    } catch (err) {
      this.reportError("getPid", err + "");
    }
  }
  private async killProcess(): Promise<void> {
    try {
      console.clear();
      const command = `sudo kill -9 ${this.pid}`;
      const result = await new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
          if (err) {
            reject(err);
          } else {
            resolve(stdout);
          }
        });
      });
      console.log(
        chalk.greenBright(`Successfully killed process: ${this.pid}`)
      );
      process.exit(0);
    } catch (err) {
      this.reportError("killProcess", err + "");
    }
  }
  private parseNumber(value: any) {
    if (isNaN(Number(value))) {
      throw new TypeError("Port number input must be integer.");
    }
    const working_value = Number(value);
    if (
      working_value < Number.MIN_SAFE_INTEGER ||
      working_value > Number.MAX_SAFE_INTEGER
    ) {
      throw new RangeError(
        "Value must be greater than 2^-63 and less than 2^63."
      );
    }
    if (isFinite(working_value) === false) {
      throw new RangeError("Value must be finite.");
    }
  }

  private reportError(methodName: string, err: string): void {
    let count: number = 5;
    const intervalId = setInterval(() => {
      if (count === 0) {
        clearInterval(intervalId);
        this.main();
      } else {
        console.clear();
        console.error(chalk.red(`Error from ${methodName}: ${err}`));
        console.timeStamp();
        console.trace();
        console.log(`\n retrying in ${count} seconds.`);
        count--;
      }
    }, 1000);
  }
}

function execute_file() {
  try {
    if (process.argv.length > 2) {
      const flags = Number(process.argv[2].split("").slice(2).join(""));
      if (isNaN(flags) === false && typeof flags === "number") {
        KillPort.expediteKillProcess(flags);
      } else {
        const killPortInstance = new KillPort();
        killPortInstance.main();
      }
    } else {
      const killPortInstance = new KillPort();
      killPortInstance.main();
    }
  } catch (err) {
    console.error(`Error: If you are running script with flags utilizing npm scripts, ensure it follows the following format: \n
      ${chalk.bgRgb(51, 51, 51)("npm start -- --<port>")} \n
      or if you are executing via ts-node, follow the following format: \n
         ${chalk.bgRgb(51, 51, 51)("(npx) ts-node --<port>")} \n
      `);
  }
}

execute_file();
