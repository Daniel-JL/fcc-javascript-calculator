import React from 'react';
import PropTypes from 'prop-types'
import './Calculator.css';
import { Button } from "./components/button.jsx";

class Calculator extends React.Component {
  render() {
    return (
      <div className="Calculator">
        <div className="calculator-row">
          <Button 
            id="equals"
            type="button"
            buttonStyle=""
            buttonSize=""
            onClick=""
            >=
          </Button>
        </div>
      </div>

      // <div className ="Calculator">
      //   <Button onClick={() => console.log("you clicked on me")}
      //     type="button"
      //     buttonStyle="btn--primary--outline"
      //     buttonSize="btn--large"
      //     >Buy Now
      //   </Button>
      // </div>
    )
  }
}


export default Calculator;
