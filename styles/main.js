const userGuess = document.getElementById('userGuess');
const submitButton = document.getElementById('submitButton');
const questionElement = document.getElementById('question'); 
const outputElement = document.getElementById('output');
const nextBtn = document.getElementById('nextBtn');
nextBtn.style.pointerEvents = 'none';  // Disable clicking
nextBtn.style.opacity = '0.5';   

let currentQuestionIndex = 0;

// Harder questions with a pattern: the answer is always the sum of digits in the question
const questions = [
    { question: 'What is 12 + 34?', answer: 10, hint: 'Think about the digits, not the math' },
    { question: 'What is 56 - 23?', answer: 16, hint: 'Add all the digits together' },
    { question: 'What is 78 + 45?', answer: 24, hint: 'Sum of all digits in the question' },
    { question: 'What is 91 - 27?', answer: 19, hint: '1+9+2+7 = ?' },
    { question: 'What is 123 + 456?', answer: 21, hint: '1+2+3+4+5+6 = ?' },
    { question: 'What is 789 - 234?', answer: 33, hint: 'Add all digits: 7+8+9+2+3+4' },
    { question: 'What is 567 + 123?', answer: 24, hint: 'Sum of all individual digits' },
    { question: 'What is 890 - 456?', answer: 32, hint: '8+9+0+4+5+6 = ?' }
];

function displayQuestion(){
    if (currentQuestionIndex < questions.length){
        questionElement.textContent = questions[currentQuestionIndex].question;
        userGuess.value = '';
        outputElement.textContent = '';
    }
    else {
        questionElement.textContent = "Congratulations! You completed all questions!";
        outputElement.innerHTML = "<p><strong>The Pattern:</strong> The answer was always the sum of all digits in the question, not the mathematical result!</p><p>Example: 'What is 12 + 34?' → Answer is 1+2+3+4 = 10 (not 46)</p><p>You learned this pattern by comparing your answers to the correct ones, just like supervised AI learns from labeled examples!</p>";
        userGuess.style.display = 'none'
        submitButton.style.display = 'none'
        nextBtn.style.pointerEvents = 'auto';  // enable clicking
        nextBtn.style.opacity = '1';   

    }
}
    
function checkanswer() {
    const value = userGuess.value;  // Get the actual value (string)
    const numValue = parseInt(value);  // Convert to number if needed
    const correctAnswer = questions[currentQuestionIndex].answer;
    
    if (numValue === correctAnswer) {
        outputElement.textContent = "correct"
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion()
        }, 1000);
    }else {
            outputElement.textContent = `Incorrect, The answer is ${correctAnswer}, don't think that it's that easy`; 
        }
    }


submitButton.addEventListener('click', checkanswer);

displayQuestion();
