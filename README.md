# hihello_calc
Example project for HiHello Technical Interview


## Meta
Start time: 2023-09-21 14:00
End time: ???

## Problem Statement
Build a simple four function (addition, subtraction, multiplication,
division) calculator with an interactive command line interface.
The user enters a series of keys corresponding to buttons on the
calculator, and when the user presses enter, the program outputs
what would currently be displayed on the calculator if that series
of buttons had been pressed, and then presents another prompt to
enter more inputs.  The state is maintained between entered lines.

The “AC” button should be entered as “c”, the “+/-” button should
be entered as “!”, the “X” button should be entered as “*” and the
“÷” button should be entered as “/”.  The rest should be entered as
the character shown on the button in the image to the right.

## Features
- [x] Input numbers
- [x] Input operators
  - [x] +
  - [x] -
  - [x] *
  - [x] /
- [x] Display current state on enter
- [x] Clear button (c)
- [x] +/- button (!)
- [x] = button

## Plan

- Create an object that represents the state of the calculator
- Read in line and operate on each character individually to change the state of the calculator object
  - Should work as if each character is a button being pressed
- After processing each character, print the current "display" value in the calculator object


Calculator object will look something like this

```ts
type calc = {
  display: number,
  operator: "+"|"-"|"*"|"/",
  buffer: number,
}
```
