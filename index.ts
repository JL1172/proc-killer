import * as ora from "ora";
import chalk from "chalk";
import * as rl from "readline-sync";

class KillPort {
  private port: number;
  private readonly pid: number;

  constructor() {
    this.port = Infinity;
    this.pid = Infinity;
  }

  public async main(): Promise<void> {
    await this.getPort();
    await this.getPid();
  }

  private async getPort(): Promise<void> {
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
            `Inputted port: ${this.port}. Press ${chalk.blueBright(
              "[control + c]"
            )} to restart process or do nothing to proceed. \n You have ${count} second(s) remaining.`
          );
          count--;
        }
      }, 1000);
      await new Promise((resolve) => setTimeout(resolve, 6000));
    } catch (err) {
      this.reportError("getPort()", err + "");
    }
  }
  private async getPid(): Promise<void> {
    try {
      console.clear();
      const spinner = ora.default();
      spinner.start("Fetching PID");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      spinner.fail("Ending Fetch");
    } catch (err) {
      this.reportError("getPid", err + "");
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

const killPortInstance = new KillPort();
killPortInstance.main();
