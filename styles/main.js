const userGuess = document.getElementById('userGuess');

function checkanswer() {
    const value = userGuess.value;  // Get the actual value (string)
    const numValue = parseInt(value);  // Convert to number if needed
    
    if (numValue === 3) {
        alert('Hello World');
    }
    else{
        
    }
}

document.getElementById('submitButton').addEventListener('click', checkanswer)