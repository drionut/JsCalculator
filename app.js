// Grab all the computer components
const operationArea = document.querySelector("[data-operation]");
const answer = document.querySelector("[data-answer]");
const deleteButton = document.querySelector("[data-delete]");
const clear = document.querySelector("[data-clear]");
const operatorButton = document.querySelectorAll("[data-operator]");
const numberButton = document.querySelectorAll("[data-number]");
const equalButton = document.querySelector("[data-equal]");
// declaring initial operands and operator values
let firstNumber = null,
    secondNumber = null,
    operator = undefined,
    pending = false,
    result = false,
    input = "";

// check what button was clicked
numberButton.forEach((button) => {
    button.addEventListener("click", () => {
        let digit = button.innerHTML;
        appendNumber(digit);
        updateDisplay();
    });
});
// check what operation button was clicked
operatorButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (operationArea != "") {
            firstNumber = input * 1;
            pending = true;
            input = "";
            if (pending === true && firstNumber != null) {
                operator = button.innerHTML;
                operationArea.innerHTML = firstNumber + " " + operator;
            }
        }
    });
});
// check if deleteButton was clicked
deleteButton.addEventListener("click", () => {
    input = input.toString().slice(0, -1);
    updateDisplay();
});
// check if AllClear was clicked
clear.addEventListener("click", () => {
    allClear();
});
// check if equal button was clicked
equalButton.addEventListener("click", () => {
    compute(operator);
    reset();
    result = true;
});

function appendNumber(digit) {
    // check if we have decimal already inside curentOperationText
    if (digit === "." && input.includes(".")) {
        console.log("cant add more dots");
        return;
    }
    // check if we clicked one zero and prevent adding more zeros to the input
    if (digit === "0" && input === "0") {
        return;
    }
    // transform values to  a string to be able to append and construct the currentOperationText
    input = input.toString() + digit.toString();
}
function compute(value) {
    // performing calculations based on operator value
    switch (value) {
        case "+":
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            if (Number.isInteger(result)) {
                answer.innerHTML = result;
            } else {
                answer.innerHTML = result.toFixed(2);
            }
            break;
        case "−":
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            if (Number.isInteger(result)) {
                answer.innerHTML = result;
            } else {
                answer.innerHTML = result.toFixed(2);
            }
            break;
        case "×":
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            if (Number.isInteger(result)) {
                answer.innerHTML = result;
            } else {
                answer.innerHTML = result.toFixed(2);
            }
            break;
        case "÷":
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            if (Number.isInteger(result)) {
                answer.innerHTML = result;
            } else {
                answer.innerHTML = result.toFixed(2);
            }
            break;

        default:
            console.log("error");
            return;
    }
}
function reset() {
    firstNumber = null;
    secondNumber = null;
    operator = undefined;
    pending = false;
    input = "";
    // console.clear();
}
function allClear() {
    operationArea.innerHTML = "";
    answer.innerHTML = "";
    reset();
}

function updateDisplay() {
    // numbers
    if (firstNumber === null) {
        operationArea.innerHTML = input;
        if (result === true) {
            operationArea.innerHTML = input;
            answer.innerHTML = "";
            result = false;
        }
    }
    if (firstNumber != null && pending === true) {
        secondNumber = input * 1;
        operationArea.innerHTML = firstNumber + " " + operator + " " + secondNumber;
    }
}
