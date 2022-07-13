import './App.css';

// npm package
import { useEffect, useState } from 'react';

// bootstrap
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// components
import { ButtonComponent } from './components/index';

const calculateOperation = (operator, curr, prev) => {
  switch (operator) {
    case '+':
      return prev + curr;

    case '-':
      return prev - curr;

    case '*':
      return prev * curr;

    case '/':
      return prev / curr;

    default:
      break;
  }
};

const convertValue = (conversionType, toConvert) => {
  switch (conversionType) {
    case 'percent':
      return Number(toConvert) / 100;

    case 'sign':
      return Number(toConvert) * -1;

    default:
      break;
  }
};

function App() {
  const [currValue, setCurrValue] = useState(0);
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);

  useEffect(() => {
    onClearDisplay();
  }, []);

  const onDigitChange = value => {
    // exit if currentValue = 0 and value to concat is also 0
    if (String(value) === '0' && String(currValue) === '0') return;

    // exit if currentValue already has a decimal point
    if (String(value) === '.' && String(currValue).includes('.')) return;

    // if last operation invoked is equals reset state with new current value
    if (operator === '=') {
      const digit = value === '.' ? '0.' : value;
      setCurrValue(digit);
      setOperator(null);
      return;
    }

    // if operator [+, -, *, /] is selected set current value to previous value
    if (operator && !prevValue) {
      setPrevValue(currValue);
      setCurrValue(value);
      return;
    }

    const digit = currValue === 0 && value !== '.' ? value : currValue + value;
    setCurrValue(digit);
  };

  const onOperatorChange = newOperator => {
    // compute values.
    if (prevValue) {
      const result = calculateOperation(operator, Number(currValue), Number(prevValue));

      setCurrValue(result);
      setPrevValue(null);
      setOperator(newOperator);

      return;
    }

    setOperator(newOperator);
  };

  const onConvertCurrentValue = type => {
    const result = convertValue(type, currValue);
    setCurrValue(result);
  };

  const onClearDisplay = () => {
    // reset states to initial state
    setCurrValue(0);
    setPrevValue(null);
    setOperator(null);
  };

  return (
    <div className='App'>
      <Container className={'container align-items-center'}>
        <Row>
          <Col>
            <input className='display' type='text' readOnly={true} value={currValue} />
          </Col>
        </Row>

        <Row>
          <ButtonComponent label={'AC'} onClick={onClearDisplay} btnClass={'btn--converter'} />
          <ButtonComponent
            label='+/-'
            onClick={() => onConvertCurrentValue('sign')}
            btnClass={'btn--converter'}
          />
          <ButtonComponent
            label='%'
            onClick={() => onConvertCurrentValue('percent')}
            btnClass={'btn--converter'}
          />
          <ButtonComponent label='/' onClick={onOperatorChange} btnClass={'btn--operator'} />
        </Row>

        <Row>
          <ButtonComponent label='7' onClick={onDigitChange} />
          <ButtonComponent label='8' onClick={onDigitChange} />
          <ButtonComponent label='9' onClick={onDigitChange} />
          <ButtonComponent label='*' onClick={onOperatorChange} btnClass={'btn--operator'} />
        </Row>

        <Row>
          <ButtonComponent label='4' onClick={onDigitChange} />
          <ButtonComponent label='5' onClick={onDigitChange} />
          <ButtonComponent label='6' onClick={onDigitChange} />
          <ButtonComponent label='-' onClick={onOperatorChange} btnClass={'btn--operator'} />
        </Row>

        <Row>
          <ButtonComponent label='1' onClick={onDigitChange} />
          <ButtonComponent label='2' onClick={onDigitChange} />
          <ButtonComponent label='3' onClick={onDigitChange} />
          <ButtonComponent label='+' onClick={onOperatorChange} btnClass={'btn--operator'} />
        </Row>

        <Row>
          <ButtonComponent label='0' colSize={6} onClick={onDigitChange} />
          <ButtonComponent label='.' onClick={onDigitChange} />
          <ButtonComponent label='=' onClick={onOperatorChange} btnClass={'btn--operator'} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
