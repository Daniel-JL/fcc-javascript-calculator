import React from 'react';
import './Calculator.css';
// eslint-disable-next-line import/extensions
import { Button } from './components/button.jsx';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: '0',
      result: '',
    };
  }

  clear() {
    this.setState({
      input: '',
      output: '0',
      result: '',
    });
  }

  handleNumberClick(number) {
    const { input, output } = this.state;
    const resultUpdate = '';
    const inputUpdate = `${input}${number}`;
    let outputUpdate = `${output}${number}`;

    if (!this.lastOperationWasCalculation()) {
      if ((this.lastInputWasOperator() || this.calculatorIsCleared()) && !this.numberIsAlreadyDecimal()) {
        outputUpdate = `${number}`;
      }

      this.updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate);
    }
  }

  handleNumberZeroClick() {
    const { input, output } = this.state;
    const resultUpdate = '';
    let inputUpdate = `${input}0`;
    let outputUpdate = `${output}0`;

    if (!this.lastOperationWasCalculation()) {
      if (this.lastInputWasOperator() || this.calculatorIsCleared()) {
        inputUpdate = `${input}0`;
        outputUpdate = '0';
      } else if (this.numberStartsWithZero()) {
        inputUpdate = `${input}`;
        outputUpdate = `${output}`;
      }

      this.updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate);
    }
  }

  handleOperatorClick(operator) {
    const { input, output, result } = this.state;
    const resultUpdate = '';
    let inputUpdate = `${input}${operator}`;
    let outputUpdate = `${operator}`;

    if (!this.lastOperationWasCalculation() && !this.calculatorIsCleared()) {
      if (this.lastInputWasOperator()) {
        if (operator === '-') {
          if (this.lastInputWasSubtract()) {
            inputUpdate = `${input}`;
            outputUpdate = `${output}`;
          } else {
            inputUpdate = `${input}${operator}`;
          }
        } else if (this.secondLastInputWasOperator()) {
          inputUpdate = input.replace(/..$/, operator);
        } else {
          inputUpdate = input.replace(/.$/, operator);
        }
      }
      this.updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate);
    } else if (this.lastOperationWasCalculation()) {
      inputUpdate = `${result}${operator}`;
      this.updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate);
    }
  }

  handleDecimalClick() {
    const { input, output } = this.state;
    const resultUpdate = '';
    let inputUpdate = `${input}.`;
    let outputUpdate = `${output}.`;

    if (!this.lastOperationWasCalculation() && !this.numberIsAlreadyDecimal()) {
      if (this.lastInputWasOperator()) {
        inputUpdate = `${input}0.`;
        outputUpdate = '0.';
      }
      this.updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate);
    }
  }

  handleEqualsClick() {
    const { input } = this.state;
    let resultUpdate = '';
    let inputUpdate = '';
    let outputUpdate = '';

    if (!this.lastOperationWasCalculation() && !this.lastInputWasOperator()) {
      if (this.inputContainsDivisionByZero()) {
        outputUpdate = 'Cannot divide by 0';
      } else {
        resultUpdate = setTo4DecimalPlaces(performCalculation(input));
        if (numberIsOutOfRange(resultUpdate)) {
          resultUpdate = '';
          inputUpdate = input;
          outputUpdate = 'Result out of range';
        } else {
          inputUpdate = parseFloat(resultUpdate);
          outputUpdate = inputUpdate;
        }
      }

      this.updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate);
    }
  }

  lastOperationWasCalculation() {
    const { result } = this.state;
    return result !== '';
  }

  lastInputWasOperator() {
    const { output } = this.state;
    return /^x|-|\+|\/$/.test(output);
  }

  lastInputWasSubtract() {
    const { output } = this.state;
    return (output === '-');
  }

  secondLastInputWasOperator() {
    const { input } = this.state;
    return /[x+/]-$/.test(input);
  }

  calculatorIsCleared() {
    const { input, output, result } = this.state;
    return (output === '0' && input === '' && result === '');
  }

  numberStartsWithZero() {
    const { output } = this.state;
    return output === '0';
  }

  numberIsAlreadyDecimal() {
    const { output } = this.state;
    return output.includes('.');
  }

  inputContainsOperator() {
    const { input } = this.state;
    return /x|-|\+|\//.test(input);
  }

  inputContainsDivisionByZero() {
    const { input } = this.state;
    return /(\/0\D)|(\/0$)/.test(input);
  }

  updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate) {
    this.setState({
      input: inputUpdate,
      output: outputUpdate,
      result: resultUpdate,
    });
  }

  render() {
    const { input, output } = this.state;

    return (
      <div className="calculator-container">
        <div className="Calculator">
          <div id="display" className="display">
            <textarea readOnly className="display-section" id="input" value={input} />
            <textarea readOnly className="display-section" id="output" value={output} />
          </div>
          <div className="button-container">
            <div className="button-grid">
              <div className="calculator-col1">
                <div className="calculator-row">
                  <Button
                    id="clear"
                    type="button"
                    buttonStyle="btn--clear--solid"
                    buttonSize="btn--wide"
                    onClick={() => this.clear()}
                  >
                    AC
                  </Button>
                  <Button
                    id="divide"
                    type="button"
                    buttonStyle="btn--operator--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleOperatorClick('/')}
                  >
                    /
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button
                    id="seven"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleNumberClick(7)}
                  >
                    7
                  </Button>
                  <Button
                    id="eight"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleNumberClick(8)}
                  >
                    8
                  </Button>
                  <Button
                    id="nine"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleNumberClick(9)}
                  >
                    9
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button
                    id="four"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleNumberClick(4)}
                  >
                    4
                  </Button>
                  <Button
                    id="five"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleNumberClick(5)}
                  >
                    5
                  </Button>
                  <Button
                    id="six"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleNumberClick(6)}
                  >
                    6
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button
                    id="one"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleNumberClick(1)}
                  >
                    1
                  </Button>
                  <Button
                    id="two"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleNumberClick(2)}
                  >
                    2
                  </Button>
                  <Button
                    id="three"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleNumberClick(3)}
                  >
                    3
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button
                    id="zero"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--wide"
                    onClick={() => this.handleNumberZeroClick()}
                  >
                    0
                  </Button>
                  <Button
                    id="decimal"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleDecimalClick('.')}
                  >
                    .
                  </Button>
                </div>
              </div>

              <div className="calculator-col2">
                <div className="calculator-row">
                  <Button
                    id="multiply"
                    type="button"
                    buttonStyle="btn--operator--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleOperatorClick('x')}
                  >
                    x
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button
                    id="subtract"
                    type="button"
                    buttonStyle="btn--operator--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleOperatorClick('-')}
                  >
                    -
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button
                    id="add"
                    type="button"
                    buttonStyle="btn--operator--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleOperatorClick('+')}
                  >
                    +
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button
                    id="equals"
                    type="button"
                    buttonStyle="btn--equals--solid"
                    buttonSize="btn--long"
                    onClick={() => this.handleEqualsClick()}
                  >
                    =
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function performCalculation(formula) {
  const numStrArr = formula.split(/x|-|\+|\//).filter(Number);
  const numArr = numStrArr.map(Number);
  const opArr = formula.split(/[\d|.]/).filter(Boolean);
  const multDivAndAddSubCounter = 2;
  const matchArrayMultDivThenAddSub = [/x|\//, /^\+|-$/];

  for (let i = 0; i < multDivAndAddSubCounter; i++) {
    for (let j = 0; j < opArr.length; j++) {
      if (firstNumberInFormulaIsNegative(opArr.length, numArr.length) && j === 0) {
        numArr[0] *= -1;
        j = 1;
      }
      if (opArr[j].match(matchArrayMultDivThenAddSub[i])) {
        if (opArr[j].includes('-') && opArr[j] !== '-') {
          numArr[j + 1] *= -1;
        }
        if (opArr[j].includes('x')) {
          numArr[j] *= numArr[j + 1];
        } else if (opArr[j].includes('/')) {
          numArr[j] /= numArr[j + 1];
        } else if (opArr[j].includes('+')) {
          numArr[j] += numArr[j + 1];
        } else {
          numArr[j] -= numArr[j + 1];
        }
        numArr.splice(j + 1, 1);
        opArr.splice(j, 1);
        j -= 1;
      }
    }
  }
  return numArr[0];
}

function firstNumberInFormulaIsNegative(opArrLength, numArrLength) {
  return opArrLength === numArrLength;
}

function setTo4DecimalPlaces(number) {
  return number.toFixed(4);
}

function numberIsOutOfRange(number) {
  return number.includes('e');
}

export default Calculator;
export {
  Calculator,
  performCalculation,
};
