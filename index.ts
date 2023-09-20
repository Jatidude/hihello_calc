import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Represents all buttons that can be pressed
type Button =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "0"
  | "c"
  | "+"
  | "-"
  | "*"
  | "/"
  | "!";

// Typeguard to ensure buttons are a button string
function isButton(s: string): s is Button {
  return !!s.match(/^[0-9\+\-\/\*c\!]$/);
}

class Calculator {
  display: number = 0;

  handleNumber(num: number) {
    this.display = this.display * 10 + num;
  }

  pressButton(button: Button) {
    if (button.match(/^[0-9]$/)) {
      this.handleNumber(Number(button));
    } else {
      throw new Error(`Button "${button}" is not handled`);
    }
  }

  printDisplay() {
    console.log(this.display);
  }
}

async function main() {
  const rl = readline.createInterface({ input, output });

  const calc = new Calculator();
  while (true) {
    const answer = await rl.question("> ");
    for (let button of answer) {
      if (isButton(button)) {
        calc.pressButton(button);
      }
    }
    calc.printDisplay();
  }

  rl.close();
}

main();
