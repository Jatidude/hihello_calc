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
  | "!"
  | "=";

type Operator = "+" | "-" | "*" | "/" | "=";

// Typeguard to ensure buttons are a button string
function isButton(s: string): s is Button {
  return !!s.match(/^[0-9\+\-\/\*c\!\=]$/);
}

class Calculator {
  buffer1: number = 0;
  buffer2: number = 0;
  display: number = 0;
  currentOperator: Operator | null = null;
  overwriteMode: boolean = true;

  handleNumber(num: number) {
    // If we're in overwrite mode that means we probably just hit an operator
    if (this.overwriteMode) {
      this.display = num;
      this.overwriteMode = false;
    } else {
      this.display = this.display * 10 + num;
    }
    this.buffer1 = this.display;
  }

  handlePlus() {
    this.operate();
    if (this.currentOperator !== "+") {
      this.buffer2 = this.buffer1;
    }
    this.currentOperator = "+";
    this.overwriteMode = true;
  }

  operate() {
    if (this.currentOperator === "+") {
      this.buffer1 = this.buffer1 + this.buffer2;
      this.display = this.buffer1;
    }
  }

  pressButton(button: Button) {
    if (button.match(/^[0-9]$/)) {
      this.handleNumber(Number(button));
    } else if (button === "+") {
      this.handlePlus();
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
        console.log(calc);
      }
    }
    calc.printDisplay();
  }

  rl.close();
}

main();
