import { Component, OnInit } from '@angular/core';
import { angularMath } from 'angular-ts-math';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;

  constructor() { }

  ngOnInit(): void {
  }

  public getNumber(v: string) {
    if (this.waitForSecondNumber) {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    } else if (v=='π') { 
      this.currentNumber = String(angularMath.getPi());
    } else if (v=='e') { 
      this.currentNumber = String(angularMath.getE());
    } else {
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
    }
  }

  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  private doCalculation(op, secondOp) {
    switch (op) {
      case 'ln':
        this.firstOperand = angularMath.logarithmOfNumber(secondOp);
        return this.firstOperand;
      case 'pow':
        this.firstOperand = angularMath.powerOfNumber(this.firstOperand, secondOp);
        return this.firstOperand;
      case '√':
        this.firstOperand = angularMath.powerOfNumber(this.firstOperand, Number(0.5));
        return this.firstOperand;
      case 'exp':
        this.firstOperand *= angularMath.powerOfNumber(10, secondOp);
        return this.firstOperand;
      case 'sin':
        this.firstOperand = angularMath.sinNumber(this.firstOperand);
        return this.firstOperand;
      case 'cos':
        this.firstOperand = angularMath.cosNumber(this.firstOperand);
        return this.firstOperand;
      case 'tan':
        this.firstOperand = angularMath.tanNumber(this.firstOperand);
        return this.firstOperand;
      case 'asin':
        this.firstOperand = angularMath.asinNumber(this.firstOperand);
        return this.firstOperand;
      case 'acos':
        this.firstOperand = angularMath.acosNumber(this.firstOperand);
        return this.firstOperand;
      case 'atan':
        this.firstOperand = angularMath.atanNumber(this.firstOperand);
        return this.firstOperand;
      case '+':
        return this.firstOperand += secondOp;
      case '-':
        return this.firstOperand -= secondOp;
      case '*':
        return this.firstOperand *= secondOp;
      case '/':
        return this.firstOperand /= secondOp;
      case '%':
        this.firstOperand = angularMath.percentOfNumber(this.firstOperand, secondOp); 
        return this.firstOperand;
      case '=':
        return secondOp;
    }
  }

  public getOperation(op: string) {

    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);

    } else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
  }


  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

}
