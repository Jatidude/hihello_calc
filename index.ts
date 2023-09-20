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
  equalsMode: boolean = true;

  handleNumber(num: number) {
    // If we're in overwrite mode that means we probably just hit an operator
    if (this.overwriteMode) {
      this.buffer1 = num;
    } else {
      this.buffer1 = this.buffer1 * 10 + num;
    }
    this.display = this.buffer1;
    this.equalsMode = false;
    this.overwriteMode = false;
  }

  handlePlus() {
    if (!this.equalsMode) {
      this.operate();
      this.buffer2 = this.buffer1;
      this.buffer1 = 0;
    }
    this.currentOperator = "+";
    this.overwriteMode = true;
  }

  handleMinus() {
    if (!this.equalsMode) {
      this.operate();
      this.buffer2 = this.buffer1;
      this.buffer1 = 0;
    }
    this.currentOperator = "-";
    this.overwriteMode = true;
  }

  handleMult() {
    if (!this.equalsMode) {
      this.operate();
      this.buffer2 = this.buffer1;
      this.buffer1 = 0;
    }
    this.currentOperator = "*";
    this.overwriteMode = true;
  }

  handleDiv() {
    if (!this.equalsMode) {
      this.operate();
      this.buffer2 = this.buffer1;
      this.buffer1 = 0;
    }
    this.currentOperator = "/";
    this.overwriteMode = true;
  }

  operate() {
    if (this.currentOperator === "+") {
      this.buffer2 = this.buffer1 + this.buffer2;
      this.display = this.buffer2;
    } else if (this.currentOperator === "-") {
      this.buffer2 = this.buffer2 - this.buffer1;
      this.display = this.buffer2;
    } else if (this.currentOperator === "*") {
      this.buffer2 = this.buffer2 * this.buffer1;
      this.display = this.buffer2;
    } else if (this.currentOperator === "/") {
      this.buffer2 = this.buffer2 / this.buffer1;
      this.display = this.buffer2;
    }
    this.equalsMode = false;
  }

  pressButton(button: Button) {
    if (button.match(/^[0-9]$/)) {
      this.handleNumber(Number(button));
    } else if (button === "c") {
      this.clear();
    } else if (button === "=") {
      this.operate();
      this.equalsMode = true;
    } else if (button === "+") {
      this.handlePlus();
    } else if (button === "-") {
      this.handleMinus();
    } else if (button === "*") {
      this.handleMult();
    } else if (button === "/") {
      this.handleDiv();
    } else {
      throw new Error(`Button "${button}" is not handled`);
    }
  }

  clear() {
    this.buffer1 = 0;
    this.buffer2 = 0;
    this.display = 0;
    this.currentOperator = null;
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
