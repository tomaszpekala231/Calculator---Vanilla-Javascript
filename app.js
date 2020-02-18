class Calculator {
    constructor(currentOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // Clear data
    clear() {
        this.currentOperand = '';
        this.operation = undefined;
    }

    // Add number to expression
    appendNumber(number) {
        if (number === '.' && this.currentOperand.charAt(this.currentOperand.length - 1).includes('.')) return false;

        this.currentOperand = this.currentOperand.toString() + number.toString();

    }
    // Choose an operation
    chooseOperation(operation) {

        // Check if last character is "+", if yes prevent adding another operator
        if (this.currentOperand.charAt(this.currentOperand.length - 1).includes('+')) return false;
        // Check if last character is "-", if yes prevent adding another operator
        else if (this.currentOperand.charAt(this.currentOperand.length - 1).includes('-')) return false;
        // Check if last character is "*", if yes prevent adding another operator
        else if (this.currentOperand.charAt(this.currentOperand.length - 1).includes('*')) return false;
        // Check if last character is "/", if yes prevent adding another operator
        else if (this.currentOperand.charAt(this.currentOperand.length - 1).includes('/')) return false;
        // Check if last character is ".", if yes prevent adding another operator
        else if (this.currentOperand.charAt(this.currentOperand.length - 1).includes('.')) return false;

        this.currentOperand = this.currentOperand + operation;
    }


    //Add Brackets to expression
    addBrackets(bracket) {
        // Prevent starting from ")"
        if (this.currentOperand === '' && bracket === ')') return false;


        this.currentOperand = this.currentOperand + bracket;


    }

    // Count everything
    compute() {
        // Count if expression is correct
        try {
            let expression = eval(this.currentOperand);
            this.currentOperand = expression.toString();
            // If expression is not valid, show alert
        } catch (error) {
            alert('The mathematical expression is not correct!');

        }

    }

    // Update output
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
    }

    // Remove last character
    deleteLastCharacter() {
        if (this.currentOperand !== '') {
            this.currentOperand = this.currentOperand.substring(0, this.currentOperand.length - 1);
        }
    }
}

// Variables
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const bracketButtons = document.querySelectorAll('[data-bracket]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// INIT 
const calculator = new Calculator(currentOperandTextElement);


// Add event listener for numberButtons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
})

// Add event listener for operationButtons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
})

// Add event listener for bracketButtons
bracketButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addBrackets(button.innerText);
        calculator.updateDisplay();
    });
})

// Add event listener for equalsButton
equalsButton.addEventListener('click', () => {
    calculator.compute();

    calculator.updateDisplay();
});

// Add event listener for allClearButton
allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

// Add event listener for deleteButton
deleteButton.addEventListener('click', () => {
    calculator.deleteLastCharacter();
    calculator.updateDisplay();
});