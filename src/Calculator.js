import React from 'react';
import PropTypes from 'prop-types'
import './Calculator.css';
import { Button } from "./components/button.jsx";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      output: 0,
    };
    // this.handleButtonClick = this.handleButtonClick.bind(this);
  };


  handleButtonClick(buttonClicked) {
    // document.getElementById("input").disabled = false;
    // document.getElementById("output").disabled = false;
    debugger;
    if(!isNaN(buttonClicked) || buttonClicked === ".") {
      this.setState({
        output: this.state.output + `${buttonClicked}`,
      })
    } else {
      
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
                    onClick={this.handleButtonClick}
                    >AC
                  </Button>
                  <Button 
                    id="divide"
                    type="button"
                    buttonStyle="btn--operator--solid"
                    buttonSize="btn--normal"
                    onClick=""
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
                    onClick=""
                    >x
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button 
                    id="subtract"
                    type="button"
                    buttonStyle="btn--operator--solid"
                    buttonSize="btn--normal"
                    onClick=""
                    >-
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button 
                    id="add"
                    type="button"
                    buttonStyle="btn--operator--solid"
                    buttonSize="btn--normal"
                    onClick=""
                    >+
                  </Button>
                </div>
                <div className="calculator-row">
                  <Button 
                    id="equals"
                    type="button"
                    buttonStyle="btn--equals--solid"
                    buttonSize="btn--long"
                    onClick={this.state.input = ""}
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
