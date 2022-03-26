let operator = null;
let operand1 = ``;
let operand2 = ``;

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return b === 0 ? "Cannot divide by 0" : a / b;
}

const getRemainder = (a, b) => {
    return a % b;
}

const getExponent = (a, n) => {
    return a ** n;
}

const getFactorial = (n) => {
    if (n === 0 || n === 1) return 1;
    return n * getFactorial(n - 1);
}

const clearDisplay = () => {
    const displayValue = document.querySelector("#display-value");
    displayValue.innerText = "";
}

const clearCalc = () => {
    clearDisplay();
    operand1 = operand2 = "";
    operator = null;
}

const updateOperands = (res = "") => {
    clearDisplay();
    updateDisplay(res);
    operand1 = res ? res : "";
    operand2 = "";
    operator = null;
}

const updateDisplay = (val) => {
    const displayValue = document.querySelector("#display-value");
    if (displayValue.innerText === "0" && operator !== "!") {
        displayValue.innerText = val;
        return;
    }
    if (displayValue.innerText === "Cannot divide by 0") {
        clearCalc();
    }
    displayValue.innerText += val;
}

const displayErrorMessage = (res) => {
    clearDisplay();
    updateDisplay(res);
}

const checkOperator = () => {
    let res;
    const a = Number(operand1);
    const b = Number(operand2);
    // const b = +operand2;     
    switch (operator) {
        case "+": {
            res = add(a, b);
            break;
        }
        case "-": {
            res = subtract(a, b);
            break;
        }
        case "*": case "×": {
            res = multiply(a, b);
            break;
        }
        case "/": case "÷": {
            res = divide(a, b);
            break;
        }
        case "%": {
            res = getRemainder(a, b);
            break;
        }
        case "^": {
            res = getExponent(a, b);
            break;
        }
        case "!": {
            res = getFactorial(a);
            break;
        }
    }
    Number.isFinite(res) ? updateOperands(res) : displayErrorMessage(res);
}

const disableEnterKeyClick = (keyInput) => {
    if (keyInput === "Enter") {
        keyInput.preventDefault();
    }
}

const setOperator = (e, keyInput = null) => {
    disableEnterKeyClick(keyInput);
    if (operand1 && operand2) {
        checkOperator();
    }
    if (operator === "!") {
        checkOperator();
    }
    operator = keyInput ? keyInput : e.target.innerText;
    updateDisplay(operator);
}

const setOperands = (e, keyInput = null) => {
    disableEnterKeyClick(keyInput);
    const operandValue = keyInput ? keyInput : e.target.innerText;
    updateDisplay(operandValue);
    if (operator && operand1 !== "") {
        operand2 += operandValue;
    }
    else {
        operand1 += operandValue;
    }
}

const addDecimalPoint = () => {
    const displayValue = document.querySelector("#display-value");
    if (displayValue.textContent === ".") return;
    if ((operand1.includes(".") && !operand2) || operand2.includes(".")) return;
    operand2 ? operand2 += "." : operand1 += ".";
    updateDisplay(".");
}

const getAnswer = () => {
    if (operator === "!") {
        checkOperator();
    }
    if (operand2) {
        checkOperator();
    }
}

const getKeyboardInput = (e) => {
    const keyInput = e.key;
    if (keyInput === ".") {
        addDecimalPoint();
    }
    else if (keyInput === "c" || keyInput === "C") {
        clearCalc();
    }
    else if (keyInput === "!" || keyInput === "+" || keyInput === "*" || keyInput === "/" || keyInput === "-" || keyInput === "%" || keyInput === "^") {
        setOperator(e, keyInput);
    }
    else if (keyInput >= "0" && keyInput <= "9") {
        setOperands(e, keyInput);
    }
    else if (keyInput === "=" || keyInput === "Enter") {
        getAnswer();
    }
}

const numberBtns = [...document.querySelectorAll("[data-number]")];
const operatorBtns = [...document.querySelectorAll("[data-operator]")];
const decimalPointBtn = document.querySelector("#decimal-point-btn");
const clearBtn = document.querySelector("#clear-btn");
const equalsBtn = document.querySelector("#equals-btn");

numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener("click", setOperands);
});

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", setOperator);
});

decimalPointBtn.addEventListener("click", addDecimalPoint);

equalsBtn.addEventListener("click", getAnswer);

clearBtn.addEventListener("click", clearCalc);

window.addEventListener("keypress", getKeyboardInput);
