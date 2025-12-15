const userGuess = document.getElementById('userGuess');
const submitButton = document.getElementById('submitButton');
const questionElement = document.getElementById('question'); 
const outputElement = document.getElementById('output');
const nextBtn = document.getElementById('nextBtn');
if (nextBtn) {
    nextBtn.style.pointerEvents = 'none';  // Disable clicking
    nextBtn.style.opacity = '0.5';
}   

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
        // Fade out, then fade in with new content
        questionElement.style.opacity = '0';
        questionElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            questionElement.textContent = questions[currentQuestionIndex].question;
            questionElement.style.transition = 'all 0.4s ease';
            questionElement.style.opacity = '1';
            questionElement.style.transform = 'translateY(0)';
        }, 200);
        
        userGuess.value = '';
        outputElement.textContent = '';
        outputElement.style.opacity = '0';
    }
    else {
        questionElement.style.transition = 'all 0.5s ease';
        questionElement.textContent = "Congratulations! You completed all questions!";
        outputElement.innerHTML = "<p><strong>The Pattern:</strong> The answer was always the sum of all digits in the question, not the mathematical result!</p><p>Example: 'What is 12 + 34?' → Answer is 1+2+3+4 = 10 (not 46)</p><p>You learned this pattern by comparing your answers to the correct ones, just like supervised AI learns from labeled examples!</p>";
        outputElement.style.opacity = '1';
        outputElement.style.transform = 'translateY(0)';
        
        userGuess.style.transition = 'opacity 0.3s ease';
        userGuess.style.display = 'none';
        submitButton.style.transition = 'opacity 0.3s ease';
        submitButton.style.display = 'none';
        
        if (nextBtn) {
            nextBtn.style.transition = 'all 0.5s ease';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.style.opacity = '1';
            nextBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                nextBtn.style.transform = 'scale(1)';
            }, 300);
        }
    }
}
    
function checkanswer() {
    const value = userGuess.value;  // Get the actual value (string)
    const numValue = parseInt(value);  // Convert to number if needed
    const correctAnswer = questions[currentQuestionIndex].answer;
    
    // Animate button click
    submitButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        submitButton.style.transform = 'scale(1)';
    }, 150);
    
    if (numValue === correctAnswer) {
        outputElement.style.transition = 'all 0.3s ease';
        outputElement.style.color = '#27ae60';
        outputElement.textContent = "✓ Correct!";
        outputElement.style.opacity = '1';
        outputElement.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            outputElement.style.transform = 'scale(1)';
        }, 200);
        
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion()
        }, 1000);
    } else {
        outputElement.style.transition = 'all 0.3s ease';
        outputElement.style.color = '#e74c3c';
        outputElement.textContent = `Incorrect, The answer is ${correctAnswer}, don't think that it's that easy`;
        outputElement.style.opacity = '1';
        outputElement.style.animation = 'shake 0.5s ease';
    }
}


submitButton.addEventListener('click', checkanswer);

// Add shake animation for incorrect answers
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

displayQuestion();
