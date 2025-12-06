const userGuess = document.getElementById('userGuess');
const submitButton = document.getElementById('submitButton');
const questionElement = document.getElementById('question'); 
const outputElement = document.getElementById('output');

const questions = [
    { question: 'What is 5-2?', answer: 3 },
    { question: 'What is 5+7?', answer: 12 },
    { question: 'What is 3+1?', answer: 4 },
    { question: 'What is 10-5?', answer: 5 }
];

let currentQuestionIndex = 0;

function displayQuestion(){
    if (currentQuestionIndex < questions.length){
        questionElement.textContent = questions[currentQuestionIndex].question;
        userGuess.value = '';
        outputElement.textContent = '';
    }
    else {
        questionElement.textContent = "Congratulation! You completed all questions!";
        userGuess.style.display = 'none'
        submitButton.style.display = 'none'

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
            outputElement.textContent = `Incorrect, The answer is ${correctAnswer}`; 
        }
    }


submitButton.addEventListener('click', checkanswer);

displayQuestion();