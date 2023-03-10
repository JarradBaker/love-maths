// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame("addition");
});

/**
 * The main game loop. called when the script is first loaded
 * and after the user's answer has been processed.
 */
function runGame(gameType) {
    // Clears the answer box
    document.getElementById('answer-box').value = "";
    // Sets the focus so the answer box is already selected
    document.getElementById('answer-box').focus();

    // Creates 2 random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    // Creates the first operand for division questions
    let divNum1 = num1 * num2;

    if(gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") { 
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(divNum1, num2);
    } else {
        alert(`Unkown game type: ${gameType}`);
        throw(`Unkown game type: ${gameType}. Aborting.`);
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array.
 */
function checkAnswer() {
    // Get the users input answer, calculate the correct answer
    // and compare them.
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    // If the user was correct, they win, if not they are told the answer
    if(isCorrect) {
        alert("Well done, you got it right! :D");
        incrementScore();
    } else {
        alert(`Aww, you guessed: ${userAnswer}, the correct answer was: ${calculatedAnswer[0]}`);
        incrementWrongScore();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (numbers) and the operator (plus, minus, etc).
 * directly from the DOM, and returns the correct answer. 
 */
function calculateCorrectAnswer() {
    // Get the values from the DOM, and parseing as an int for the operands
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator: ${operator}`);
        throw `Unimplemented operator: ${operator}. Aborting`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    // Get the current score from the DOM
    let oldScore = parseInt(document.getElementById('score').innerText);
    // Increment the score on the DOM
    document.getElementById('score').innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongScore() {
    // Get the current incorrect tally from the DOM
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    // Increment the tally on the DOM
    document.getElementById('incorrect').innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "/";
}