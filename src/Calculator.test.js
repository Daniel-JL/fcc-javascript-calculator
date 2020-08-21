import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Calculator, performCalculation } from './Calculator';

describe('performCalculation function', () => {
  it('should take a formula with numbers and operators as a string and return the result', () => {
    expect(performCalculation('2x5+5/-5-5')).toBe(4);
  });
});

describe('clear button', () => {
 it('should reset calculator', () => {
    const { getByRole } = render(
      <Calculator />,
    );

    const clearButton = getByRole('button', { name: 'AC' });
    const number5Button = getByRole('button', { name: '5' });

    fireEvent.click(number5Button);
    fireEvent.click(clearButton);
    expect(input.textContent).toBe('');
    expect(output.textContent).toBe('0');
 });
});

describe('display element', () => {
  it('should display numbers as they are input', () => {
  });
});

describe('numbers and mathematical results', () => {
  it('should allow numbers and mathematical functions to be chained in any order', () => {
    const { getByRole } = render(
      <Calculator />,
    );

    const divideButton = getByRole('button', { name: '/' });
    const multiplyButton = getByRole('button', { name: 'x' });
    const addButton = getByRole('button', { name: '+' });
    const subtractButton = getByRole('button', { name: '-' });
    const number5Button = getByRole('button', { name: '5' });
    const number9Button = getByRole('button', { name: '9' });
    const decimalButton = getByRole('button', { name: '.' });
    const equalsButton = getByRole('button', { name: '=' });

    fireEvent.click(number5Button);
    fireEvent.click(addButton);
    fireEvent.click(number9Button);
    fireEvent.click(decimalButton);
    fireEvent.click(number5Button);
    fireEvent.click(number9Button);
    fireEvent.click(divideButton);
    fireEvent.click(number5Button);
    fireEvent.click(multiplyButton);
    fireEvent.click(number9Button);
    fireEvent.click(subtractButton);
    fireEvent.click(number5Button);
    expect(input.textContent).toBe('5+9.59/5x9-5');
    expect(output.textContent).toBe('5');

    fireEvent.click(equalsButton);
    expect(input.textContent).toBe('17.262');
    expect(output.textContent).toBe('17.262');
  });

  it('should not allow numbers to begin with multiple 0s', () => {
    const { getByRole } = render(
      <Calculator />,
    );

    const addButton = getByRole('button', { name: '+' });
    const number5Button = getByRole('button', { name: '5' });
    const number0Button = getByRole('button', { name: '0' });

    fireEvent.click(number0Button);
    expect(input.textContent).toBe('0');
    expect(output.textContent).toBe('0');

    fireEvent.click(number0Button);
    expect(input.textContent).toBe('0');
    expect(output.textContent).toBe('0');

    fireEvent.click(addButton);
    expect(input.textContent).toBe('0+');
    expect(output.textContent).toBe('+');
    
    fireEvent.click(number0Button);
    expect(input.textContent).toBe('0+0');
    expect(output.textContent).toBe('0');

    fireEvent.click(number0Button);
    expect(input.textContent).toBe('0+0');
    expect(output.textContent).toBe('0');

  });

  it('should calculate integers and decimals', () => {
    const { getByRole } = render(
      <Calculator />,
    );

    const clearButton = getByRole('button', { name: 'AC' });
    const divideButton = getByRole('button', { name: '/' });
    const addButton = getByRole('button', { name: '+' });
    const number5Button = getByRole('button', { name: '5' });
    const number9Button = getByRole('button', { name: '9' });
    const decimalButton = getByRole('button', { name: '.' });
    const equalsButton = getByRole('button', { name: '=' });

    fireEvent.click(number5Button);
    fireEvent.click(addButton);
    fireEvent.click(number9Button);
    expect(input.textContent).toBe('5+9');
    expect(output.textContent).toBe('9');
    fireEvent.click(equalsButton);
    expect(input.textContent).toBe('14');
    expect(output.textContent).toBe('14');

    fireEvent.click(clearButton);
    fireEvent.click(number5Button);
    fireEvent.click(decimalButton);
    fireEvent.click(number5Button);
    fireEvent.click(divideButton);
    fireEvent.click(number9Button);
    expect(input.textContent).toBe('5.5/9');
    expect(output.textContent).toBe('9');
    fireEvent.click(equalsButton);
    expect(input.textContent).toBe('0.6111');
    expect(output.textContent).toBe('0.6111');

    fireEvent.click(clearButton);
    fireEvent.click(number5Button);
    fireEvent.click(decimalButton);
    fireEvent.click(number5Button);
    fireEvent.click(divideButton);
    fireEvent.click(number9Button);
    fireEvent.click(decimalButton);
    fireEvent.click(number9Button);
    expect(input.textContent).toBe('5.5/9.9');
    expect(output.textContent).toBe('9.9');
    fireEvent.click(equalsButton);
    expect(input.textContent).toBe('0.5556');
    expect(output.textContent).toBe('0.5556');
  });

  it('should work to 4 decimal places', () => {
    const { getByRole } = render(
      <Calculator />,
    );

    const multiplyButton = getByRole('button', { name: 'x' });
    const number5Button = getByRole('button', { name: '5' });
    const number9Button = getByRole('button', { name: '9' });
    const decimalButton = getByRole('button', { name: '.' });
    const equalsButton = getByRole('button', { name: '=' });

    fireEvent.click(number5Button);
    fireEvent.click(decimalButton);
    fireEvent.click(number9Button);
    fireEvent.click(number9Button);
    fireEvent.click(number9Button);
    fireEvent.click(multiplyButton);
    fireEvent.click(number9Button);
    fireEvent.click(decimalButton);
    fireEvent.click(number9Button);
    fireEvent.click(number9Button);
    fireEvent.click(number9Button);
    fireEvent.click(number9Button);

    expect(input.textContent).toBe('5.999x9.9999');
    expect(output.textContent).toBe('9.9999');

    fireEvent.click(equalsButton);
    expect(input.textContent).toBe('59.9894');
    expect(output.textContent).toBe('59.9894');
  });


});

describe('mathematical operators', () => {
  it('should apply last mathematical operator that is pressed, except if it is a minus', () => {
    const { getByRole } = render(
      <Calculator />,
    );

    const divideButton = getByRole('button', { name: '/' });
    const multiplyButton = getByRole('button', { name: 'x' });
    const addButton = getByRole('button', { name: '+' });
    const subtractButton = getByRole('button', { name: '-' });
    const number5Button = getByRole('button', { name: '5' });

    fireEvent.click(number5Button);
    fireEvent.click(subtractButton);
    expect(input.textContent).toBe('5-');
    expect(output.textContent).toBe('-');

    fireEvent.click(divideButton);
    expect(input.textContent).toBe('5/');
    expect(output.textContent).toBe('/');

    fireEvent.click(subtractButton);
    expect(input.textContent).toBe('5/-');
    expect(output.textContent).toBe('-');

    fireEvent.click(multiplyButton);
    expect(input.textContent).toBe('5x');
    expect(output.textContent).toBe('x');

    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);
    expect(input.textContent).toBe('5x-');
    expect(output.textContent).toBe('-');

    fireEvent.click(addButton);
    expect(input.textContent).toBe('5+');
    expect(output.textContent).toBe('+');

    fireEvent.click(subtractButton);
    expect(input.textContent).toBe('5+-');
    expect(output.textContent).toBe('-');
  });

  it('should apply operator to result if operator button is pressed after calculation', () => {
    const { getByRole } = render(
      <Calculator />,
    );

    const subtractButton = getByRole('button', { name: '-' });
    const multiplyButton = getByRole('button', { name: 'x' });
    const number2Button = getByRole('button', { name: '2' });
    const number5Button = getByRole('button', { name: '5' });
    const equalsButton = getByRole('button', { name: '=' });

    fireEvent.click(number5Button);
    fireEvent.click(subtractButton);
    fireEvent.click(number2Button);
    fireEvent.click(equalsButton);
    expect(input.textContent).toBe('3');
    expect(output.textContent).toBe('3');

    fireEvent.click(multiplyButton);
    fireEvent.click(number2Button);
    fireEvent.click(equalsButton);
    expect(input.textContent).toBe('6');
    expect(output.textContent).toBe('6');
  });
  
});

describe('decimal point', () => {
  it('should show decimal point on display when button is pressed', () => {

  });

  it('should not allow more than one decimal point in a row', () => {
    const { getByRole } = render(
      <Calculator />,
    );

    const addButton = getByRole('button', { name: '+' });
    const number5Button = getByRole('button', { name: '5' });
    const decimalButton = getByRole('button', { name: '.' });

    fireEvent.click(number5Button);
    fireEvent.click(decimalButton);
    expect(input.textContent).toBe('5.');
    expect(output.textContent).toBe('5.');

    fireEvent.click(decimalButton);
    expect(input.textContent).toBe('5.');
    expect(output.textContent).toBe('5.');

    fireEvent.click(addButton);
    fireEvent.click(number5Button);
    fireEvent.click(decimalButton);
    expect(input.textContent).toBe('5.+5.');
    expect(output.textContent).toBe('5.');

    fireEvent.click(decimalButton);
    expect(input.textContent).toBe('5.+5.');
    expect(output.textContent).toBe('5.');
  });
});
