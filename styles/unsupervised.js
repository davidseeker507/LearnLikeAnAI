const userGuess = document.getElementById('userGuess');
const submitButton = document.getElementById('submitButton');
const questionElement = document.getElementById('question');
const sequenceElement = document.getElementById('sequence');
const outputElement = document.getElementById('output');
const nextBtn = document.getElementById('nextBtn');
nextBtn.style.pointerEvents = 'none';
nextBtn.style.opacity = '0.5';

const patterns = [
    { sequence: [2, 4, 6, 8], answer: '10', hint: 'Even numbers' },
    { sequence: [1, 4, 9, 16], answer: '25', hint: 'Squares' },
    { sequence: [1, 1, 2, 3, 5], answer: '8', hint: 'Fibonacci' },
    { sequence: [5, 10, 15, 20], answer: '25', hint: 'Multiples of 5' }
];

let currentPatternIndex = 0;

function displayPattern() {
    if (currentPatternIndex < patterns.length) {
        const pattern = patterns[currentPatternIndex];
        sequenceElement.textContent = pattern.sequence.join(', ') + ', ?';
        userGuess.value = '';
        outputElement.textContent = '';
    } else {
        questionElement.textContent = "Congratulations! You found all the patterns!";
        sequenceElement.textContent = "You've completed the unsupervised learning game!";
        userGuess.style.display = 'none';
        submitButton.style.display = 'none';
        nextBtn.style.pointerEvents = 'auto';
        nextBtn.style.opacity = '1';
    }
}

function checkanswer() {
    const userAnswer = userGuess.value.trim();
    const correctAnswer = patterns[currentPatternIndex].answer;
    
    if (userAnswer === correctAnswer) {
        outputElement.textContent = "Correct! You found the pattern: " + patterns[currentPatternIndex].hint;
        setTimeout(() => {
            currentPatternIndex++;
            displayPattern();
        }, 2000);
    } else {
        outputElement.textContent = "Not quite. Look for the pattern. Hint: " + patterns[currentPatternIndex].hint;
    }
}

submitButton.addEventListener('click', checkanswer);

displayPattern();




