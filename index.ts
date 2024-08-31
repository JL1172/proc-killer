import * as rl from "readline-sync";
import * as ora from "ora";
import chalk from "chalk";

class KillPort {
  private port: number;
  private readonly pid: number;
  constructor() {
    this.port = Infinity;
    this.pid = Infinity;
  }
  public getPort(): void {
    try {
      const portNumber: any = rl.questionInt(
        chalk.greenBright("Enter port you want to kill: ")
      );
      if (isNaN(Number(portNumber))) {
        throw new TypeError("Port number input must be integer.");
      } else {
        this.port = Number(portNumber);
      }
    } catch (err) {
      this.reportError("getPort", err + "");
    }
  }
  private reportError(methodName: string, err: string): void {
    console.error(chalk.red(`Error from ${methodName}: ${err}`));
    console.timeStamp();
    console.log("\n retrying in 2 seconds.");
    setTimeout(() => {
      this.getPort();
    }, 2000);
  }
}

const killPortInstance = new KillPort();
killPortInstance.getPort();
