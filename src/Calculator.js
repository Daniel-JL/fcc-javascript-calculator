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
    // this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  clear() {
    this.setState({
      input: '',
      output: '0',
      result: '',
    });
  }

  handleNumberClick(number) {
    const resultUpdate = '';
    const inputUpdate = `${this.state.input}${number}`;
    let outputUpdate = `${this.state.output}${number}`;

    if (!this.lastOperationWasCalculation()) {

      if ((this.lastInputWasOperator() || this.calculatorIsCleared()) && !this.numberIsAlreadyDecimal()) {
        outputUpdate = `${number}`;
      }

      this.updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate);
    }
  }
  
  handleNumberZeroClick() {
    const resultUpdate = '';
    let inputUpdate = `${this.state.input}0`;
    let outputUpdate = `${this.state.output}0`;

    debugger;
    if (!this.lastOperationWasCalculation()) {

      if (this.lastInputWasOperator() || this.calculatorIsCleared()) {
        inputUpdate = `${this.state.input}0`;
        outputUpdate = `0`;
      }else if (this.numberStartsWithZero()) {
        inputUpdate = `${this.state.input}`;
        outputUpdate = `${this.state.output}`;
      }

      this.updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate);
    }
  }

  handleOperatorClick(operator) {
    //  TODO
    //  1. Check if number has been input or if there is already a result
    //  2. Check if anything has been input yet
    //  3. Check if operator was the last thing to be input
    //  3b. Check what operator was the last thing to be input
    //  4. Check what operator was just clicked
    //  5. Update state
    const resultUpdate = '';
    let inputUpdate = `${this.state.input}${operator}`;
    let outputUpdate = `${this.state.output}${operator}`;

    if (!this.lastOperationWasCalculation() && !this.calculatorIsCleared()) {

      if (this.lastInputWasOperator()) {
        
      }


    }
  }

  handleDecimalClick() {
    const resultUpdate = '';
    let inputUpdate = `${this.state.input}.`;
    let outputUpdate = `${this.state.output}.`;

    if (!this.lastOperationWasCalculation() && !this.numberIsAlreadyDecimal()) {

      if(this.lastInputWasOperator()) {
        inputUpdate = `${this.state.input}0.`
        outputUpdate = `0.`;
      }
      this.updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate);
    }

  }

  lastOperationWasCalculation() {
    return this.state.result !== '';
  }

  lastInputWasOperator() {
    return /^x|-|\+|\/$/.test(this.state.output);
  }

  calculatorIsCleared() {
    return (this.state.output === '0' && this.state.input === '' && this.state.result === '');
  }

  numberStartsWithZero() {
    return this.state.output === '0';
  }

  numberIsAlreadyDecimal() {
    return this.state.output.includes('.');
  }

  updateStateInputOutputResult(inputUpdate, outputUpdate, resultUpdate) {
    this.setState({
      input: inputUpdate,
      output: outputUpdate,
      result: resultUpdate,
    });
  }

  handleButtonClick(buttonClicked) {
    const { input, output, result } = this.state;

    if (buttonClicked === 'clear' || output === 'Result out of range' || output === 'Cannot divide by 0') {
      this.setState({
        input: '',
        output: '0',
        result: '',
      });
    } else if (input.length >= 30) {
      this.setState({
        output: 'Digit limit met',
      });
    // eslint-disable-next-line no-restricted-globals
    } else if (!isNaN(buttonClicked) || buttonClicked === '.') {
      this.setState({
        input: result !== '' ? input
          : output.includes('.') && buttonClicked === '.' ? input
            : /[x|\-|+|/]?0$/.test(input) && buttonClicked === 0 && !output.includes('.') ? input
              : `${input}${buttonClicked}`,
        output: result !== '' ? output
          : output === '0' && buttonClicked !== '.' ? `${buttonClicked}`
            : /^x|-|\+|\/$/.test(output) ? `${buttonClicked}`
              : output.includes('.') && buttonClicked === '.' ? output
                : `${output}${buttonClicked}`,
      });
    } else if (buttonClicked === 'divide') {
      this.setState({
        input: result !== '' ? `${result}/`
          : /^$/.test(input) ? input
            : /^-$/.test(input) ? input
              : /x|-|\+|\//.test(output) && /[\d].$/.test(input) ? input.replace(/.$/, '/')
                : output === '-' && /[x+/]-$/.test(input) ? input.replace(/..$/, '/')
                  : /^x|-|\+|\/$/.test(output) ? '/'
                    : `${input}/`,
        output: /^$-/.test(output) ? input
          : '/',
        result: '',
      });
    } else if (buttonClicked === 'multiply') {
      this.setState({
        input: result !== '' ? `${result}x`
          : /^$/.test(input) ? input
            : /^-$/.test(input) ? input
              : /x|-|\+|\//.test(output) && /[\d].$/.test(input) ? input.replace(/.$/, 'x')
                : output === '-' && /[x+/]-$/.test(input) ? input.replace(/..$/, 'x')
                  : /^x|-|\+|\/$/.test(output) ? 'x'
                    : `${input}x`,
        output: 'x',
        result: '',
      });
    } else if (buttonClicked === 'subtract') {
      this.setState({
        input: result !== '' ? `${result}-`
          : /^-$/.test(input) ? input
            : /x|\+|\//.test(output) ? `${input}-`
              : /-/.test(output) ? input
                : `${input}-`,
        output: '-',
        result: '',
      });
    } else if (buttonClicked === 'add') {
      this.setState({
        input: result !== '' ? `${result}+`
          : /^$/.test(input) ? input
            : /^-$/.test(input) ? input
              : /x|-|\+|\//.test(output) && /[\d].$/.test(input) ? input.replace(/.$/, '+')
                : output === '-' && /[x+/]-$/.test(input) ? input.replace(/..$/, '+')
                  : /^x|-|\+|\/$/.test(output) ? '+'
                    : `${input}+`,
        output: '+',
        result: '',
      });
    } else if (buttonClicked === 'equals' && result === '') {
      const numStrArr = input.split(/x|-|\+|\//).filter(Number);
      const numArr = numStrArr.map(Number);
      const opArr = input.split(/[\d|.]/).filter(Boolean);

      debugger;
      if (!/x|-|\+|\//.test(input) || /x|-|\+|\//.test(input[input.length - 1])) {
        this.setState({
          input,
          output,
        });
      } else if (!/(\/0\D)|(\/0$)/.test(input)) {
        //  Check for division and multiplication and do that first
        for (let i = 0; i < opArr.length; i++) {
          if (opArr.length === numArr.length && i === 0) {
            numArr[0] *= -1;
            i = 1;
          }
          if (opArr[i].match(/x|\//)) {
            if (opArr[i].includes('-')) {
              numArr[i + 1] *= -1;
            }
            if (opArr[i].includes('x')) {
              numArr[i] *= numArr[i + 1];
            } else {
              numArr[i] /= numArr[i + 1];
            }
            // spliceArr.push(i);
            numArr.splice(i + 1, 1);
            opArr.splice(i, 1);
            i -= 1;
          }
        }

        //  Now check for addition and subtraction
        for (let i = 0; i < opArr.length; i++) {
          if (opArr.length === numArr.length && i === 0) {
            i = 1;
          }
          if (opArr[i].includes('+')) {
            if (opArr[i].includes('-')) {
              numArr[i + 1] *= -1;
            }
            numArr[i] += numArr[i + 1];
          } else {
            numArr[i] -= numArr[i + 1];
          }
          numArr.splice(i + 1, 1);
          opArr.splice(i, 1);
          i -= 1;
        }

        this.setState({
          input: !numArr[0].toFixed(4).includes('e') ? parseFloat(numArr[0].toFixed(4))
            : input,
          output: !numArr[0].toFixed(4).includes('e') ? parseFloat(numArr[0].toFixed(4))
            : 'Result out of range',
          result: parseFloat(numArr[0].toFixed(4)),
        });
      } else {
        this.setState({
          output: 'Cannot divide by 0',
        });
      }
    }
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
                    onClick={() => this.handleButtonClick('divide')}
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
                    onClick={() => this.handleButtonClick('multiply')}
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
                    onClick={() => this.handleButtonClick('subtract')}
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
                    onClick={() => this.handleButtonClick('add')}
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
                    onClick={() => this.handleButtonClick('equals')}
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

function sum(a, b) {
  return a + b;
}

export default Calculator;
export {
  Calculator,
  sum,
};
