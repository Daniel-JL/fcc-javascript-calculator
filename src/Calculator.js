import React from 'react';
import PropTypes from 'prop-types'
import './Calculator.css';
import { Button } from "./components/button.jsx";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      output: "0",
      result: "",
    };
    // this.handleButtonClick = this.handleButtonClick.bind(this);
  };


  handleButtonClick(buttonClicked) {

    if(buttonClicked === "clear" || this.state.output === "Result out of range" || this.state.output === "Cannot divide by 0") {
      this.setState({
        input: "",
        output: "0",
        result: "",
      })
    } else if(this.state.input.length >= 30){
      this.setState({
        output: "Digit limit met",
      })
    } else {
      if(!isNaN(buttonClicked) || buttonClicked === ".") {
        this.setState({
          input: this.state.result !== "" ? this.state.input :
          this.state.output.includes(".") && buttonClicked === "." ? this.state.input :
          /[x|\-|\+|\/]?0$/.test(this.state.input) && buttonClicked === 0 && !this.state.output.includes(".")? this.state.input :
          this.state.input + `${buttonClicked}`,
          output: this.state.result !== "" ? this.state.output :
          this.state.output === "0" && buttonClicked !== "." ? `${buttonClicked}` : 
          /^x|\-|\+|\/$/.test(this.state.output) ? `${buttonClicked}` :
          this.state.output.includes(".") && buttonClicked === "." ? this.state.output : 
          this.state.output + `${buttonClicked}`,
        })
      } else if(buttonClicked === "divide") {
        this.setState({
          input: this.state.result !== "" ? this.state.result + "/" :
          /^$/.test(this.state.input) ? this.state.input :
          /^\-$/.test(this.state.input) ? this.state.input : 
          /x|\-|\+|\//.test(this.state.output) && /[\d].$/.test(this.state.input) ? this.state.input.replace(/.$/, "/") :
          this.state.output === "-" && /[x\+\/]\-$/.test(this.state.input) ? this.state.input.replace(/..$/, "/") :
          /^x|\-|\+|\/$/.test(this.state.output) ? "/" :
          this.state.input + "/",
          output: /^$\-/.test(this.state.output) ? this.state.input : 
          "/",
          result: "",
        })
      } else if(buttonClicked === "multiply") {
        this.setState({
          input: this.state.result !== "" ? this.state.result + "x" :
          /^$/.test(this.state.input) ? this.state.input :
          /^\-$/.test(this.state.input) ? this.state.input : 
          /x|\-|\+|\//.test(this.state.output) && /[\d].$/.test(this.state.input) ? this.state.input.replace(/.$/, "x") :
          this.state.output === "-" && /[x\+\/]\-$/.test(this.state.input) ? this.state.input.replace(/..$/, "x") :
          /^x|\-|\+|\/$/.test(this.state.output) ? "x" : 
          this.state.input + "x",
          output: "x",
          result: "",
        })
      } else if(buttonClicked === "subtract") {
        this.setState({
          input: this.state.result !== "" ? this.state.result + "-" :
          /^\-$/.test(this.state.input) ? this.state.input : 
          /x|\+|\//.test(this.state.output) ? this.state.input + "-" :
          /\-/.test(this.state.output) ? this.state.input :
          this.state.input + "-",
          output: "-",
          result: "",
        })
      } else if(buttonClicked === "add") {
        this.setState({
          input: this.state.result !== "" ? this.state.result + "+" :
          /^$/.test(this.state.input) ? this.state.input :
          /^\-$/.test(this.state.input) ? this.state.input : 
          /x|\-|\+|\//.test(this.state.output) && /[\d].$/.test(this.state.input) ? this.state.input.replace(/.$/, "+") :
          this.state.output === "-" && /[x\+\/]\-$/.test(this.state.input) ? this.state.input.replace(/..$/, "+") :
          /^x|\-|\+|\/$/.test(this.state.output) ? "+" :
          this.state.input + "+",
          output: "+",
          result: "",
        })
      } else if(buttonClicked === "equals" && this.state.result === "" ) {
        let numStrArr = this.state.input.split(/x|\-|\+|\//).filter(Number);
        let numArr = numStrArr.map(Number);
        let opArr = this.state.input.split(/[\d|\.]/).filter(Boolean);
        let opArrLen = opArr.length;
        let spliceArr = [];
        // debugger;
        if(!/(\/0\D)|(\/0$)/.test(this.state.input )){

        
          //Check for division and multiplication and do that first
          for(let i = 0; i < opArr.length; i++) {
            if(opArr.length === numArr.length && i === 0) {
              numArr[0] *= -1;
              i = 1;
            }
              if(opArr[i].match(/x|\//)){
                if(opArr[i].includes("-")) {
                  numArr[i+1] *= -1;
                }
                if(opArr[i].includes("x")) {
                  numArr[i] = numArr[i] * numArr[i+1];
                } else {
                  numArr[i] = numArr[i] / numArr[i+1];
                }
                // spliceArr.push(i);
                numArr.splice(i + 1, 1);
                opArr.splice(i, 1);
                i =- 1;
              }
          }

          //Now check for addition and subtraction
          for(let i = 0; i < opArr.length; i++) {
            if(opArr.length === numArr.length && i === 0) {
              i = 1;
            }
              if(opArr[i].includes("+")){
                if(opArr[i].includes("-")) {
                  numArr[i+1] *= -1;
                }
                numArr[i] = numArr[i] + numArr[i+1];
              } else {
                numArr[i] = numArr[i] - numArr[i+1];
              }
              numArr.splice(i + 1, 1);
              opArr.splice(i, 1);
              i =- 1;
          }

          this.setState({
            input: !numArr[0].toFixed(4).includes("e") ? parseFloat(numArr[0].toFixed(4)) :
            this.state.input,
            output: !numArr[0].toFixed(4).includes("e") ? parseFloat(numArr[0].toFixed(4)) :
            "Result out of range",
            result: parseFloat(numArr[0].toFixed(4)),
          })

        } else {
          this.setState({
            output: "Cannot divide by 0",
          })
        }
    }
    }
  };

  componentDidUpdate() {
    // document.getElementById("input").disabled = true;
    // document.getElementById("output").disabled = true;
  }
  

  render() {
    return (
      <div className="calculator-container">
        <div className="Calculator">
          <div id="display" className="display">
            <textarea readOnly className="display-section" id="input" value={this.state.input} />
            <textarea readOnly className="display-section" id="output" value={this.state.output} />
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
                    onClick={() => this.handleButtonClick("clear")}
                    >AC
                  </Button>
                  <Button 
                    id="divide"
                    type="button"
                    buttonStyle="btn--operator--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick("divide")}
                    >/
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button 
                    id="seven"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick(7)}
                    >7
                  </Button>
                  <Button 
                    id="eight"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick(8)}
                    >8
                  </Button>
                  <Button 
                    id="nine"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick(9)}
                    >9
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button 
                    id="four"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick(4)}
                    >4
                  </Button>
                  <Button 
                    id="five"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick(5)}
                    >5
                  </Button>
                  <Button 
                    id="six"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick(6)}
                    >6
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button 
                    id="one"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick(1)}
                    >1
                  </Button>
                  <Button 
                    id="two"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick(2)}
                    >2
                  </Button>
                  <Button 
                    id="three"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick(3)}
                    >3
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button 
                    id="zero"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--wide"
                    onClick={() => this.handleButtonClick(0)}
                    >0
                  </Button>
                  <Button 
                    id="decimal"
                    type="button"
                    buttonStyle="btn--number--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick(".")}
                    >.
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
                    onClick={() => this.handleButtonClick("multiply")}
                    >x
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button 
                    id="subtract"
                    type="button"
                    buttonStyle="btn--operator--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick("subtract")}
                    >-
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button 
                    id="add"
                    type="button"
                    buttonStyle="btn--operator--solid"
                    buttonSize="btn--normal"
                    onClick={() => this.handleButtonClick("add")}
                    >+
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button 
                    id="equals"
                    type="button"
                    buttonStyle="btn--equals--solid"
                    buttonSize="btn--long"
                    onClick={() => this.handleButtonClick("equals")}
                    >=
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}


export default Calculator;
