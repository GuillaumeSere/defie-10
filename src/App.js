import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import "./App.css";

function App() {

    const [displayValue, setDisplayValue] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [theme, setTheme] = useState("theme-1");

    function handleThemeChange(event) {
        setTheme(event.target.value);
    }

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleNumberClick = (number) => {
        if (displayValue === '0') {
            setDisplayValue(number);
        } else {
            setDisplayValue((prevDisplayValue) => prevDisplayValue + number);
        }
    };

    const handleOperationClick = (operator) => {
        setPreviousValue(displayValue);
        setOperation(operator);
        setDisplayValue('0');
    };

    const handleResetClick = () => {
        setDisplayValue('0');
        setPreviousValue(null);
        setOperation(null);
    };

    const handleEqualClick = () => {
        let result;
        const currentValue = parseFloat(displayValue.replace(',', '.'));
        const previous = parseFloat(previousValue.replace(',', '.'));

        switch (operation) {
            case '+':
                result = previous + currentValue;
                break;
            case '-':
                result = previous - currentValue;
                break;
            case '*':
                result = previous * currentValue;
                break;
            case '/':
                result = previous / currentValue;
                break;
            default:
                result = currentValue;
        }

        setDisplayValue(result.toString().replace('.', ','));
        setPreviousValue(null);
        setOperation(null);
    };

    const handleDeleteClick = () => {
        if (displayValue.length > 1) {
            setDisplayValue((prevDisplayValue) =>
                prevDisplayValue.substring(0, prevDisplayValue.length - 1)
            );
        } else {
            setDisplayValue('0');
        }
    };


    return (
        <div className={`App ${theme}`}>
            <span className="number">1</span>
            <span className="number">2</span>
            <span className="number">3</span>
            <div className="slider-container">
                <h2 className="title">calc</h2>
                <small>THEME</small>
                <div className="radio">
                    <Radio
                        className="radio-btn"
                        checked={theme === "theme-1"}
                        onChange={handleThemeChange}
                        value="theme-1"
                        name="theme"
                        color="primary"
                        inputProps={{ 'aria-label': '1' }}
                    />
                    <Radio
                        className="radio-btn"
                        checked={theme === "theme-2"}
                        onChange={handleThemeChange}
                        value="theme-2"
                        name="theme"
                        inputProps={{ 'aria-label': '2' }}
                    />
                    <Radio
                        className="radio-btn"
                        checked={theme === "theme-3"}
                        onChange={handleThemeChange}
                        value="theme-3"
                        name="theme"
                        inputProps={{ 'aria-label': '3' }}
                    />
                </div>
            </div>
            <div className="result">
                <label for="inputValue"></label>
                <input type="text" id="inputValue" value={displayValue} disabled />
            </div>
            <div className="container">
                <div className="cell">
                    <button className="btn-small" onClick={() => handleNumberClick('7')}>7</button>
                    <button className="btn-small" onClick={() => handleNumberClick('8')}>8</button>
                    <button className="btn-small" onClick={() => handleNumberClick('9')}>9</button>
                    <button className="btn-small del" onClick={() => handleDeleteClick()}>DEL</button>
                </div>
                <div>
                    <button className="btn-small" onClick={() => handleNumberClick('4')}>4</button>
                    <button className="btn-small" onClick={() => handleNumberClick('5')}>5</button>
                    <button className="btn-small" onClick={() => handleNumberClick('6')}>6</button>
                    <button className="btn-small" onClick={() => handleOperationClick('+')}>+</button>
                </div>
                <div>
                    <button className="btn-small" onClick={() => handleNumberClick('1')}>1</button>
                    <button className="btn-small" onClick={() => handleNumberClick('2')}>2</button>
                    <button className="btn-small" onClick={() => handleNumberClick('3')}>3</button>
                    <button className="btn-small" onClick={() => handleOperationClick('-')}>-</button>
                </div>
                <div>
                    <button className="btn-small" onClick={() => handleNumberClick(',')}>.</button>
                    <button className="btn-small" onClick={() => handleNumberClick('0')}>0</button>
                    <button className="btn-small" onClick={() => handleOperationClick('/')}>/</button>
                    <button className="btn-small" onClick={() => handleOperationClick('*')}>x</button>
                </div>
                <div>
                    <button className="btn-large" onClick={() => handleResetClick()}>RESET</button>
                    <button className="btn-large" onClick={() => handleEqualClick()}>=</button>
                </div>
            </div>
        </div>
    );
}


export default App;
