import readline from "readline";
import * as ora from "ora";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class KillPort {
  private port: number;
  private readonly pid: number;
  constructor() {
    this.port = Infinity;
    this.pid = Infinity;
  }

  public getPort(): void {
    try {
      console.clear();
      rl.question(
        chalk.greenBright("Enter port you want to kill: "),
        (answer: any) => {
          this.parseNumber(answer);
          rl.close();
        }
      );
    } catch (err) {
      this.reportError(this.getPort, err + "");
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
  private reportError(methodName: Function, err: string): void {
    console.error(chalk.red(`Error from ${methodName.name}: ${err}`));
    console.timeStamp();
    console.log("\n retrying in 2 seconds.");
    setTimeout(() => {
      methodName();
    }, 2000);
  }
}

const killPortInstance = new KillPort();
killPortInstance.getPort();
