const dataDisplay = document.getElementById('data-display');
const categoryABtn = document.getElementById('category-a-btn');
const categoryBBtn = document.getElementById('category-b-btn');
const feedback = document.getElementById('feedback');
const patternHint = document.getElementById('pattern-hint');
const scoreDisplay = document.getElementById('score');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
let correctCount = 0;
let totalCount = 0;

// Pattern: Category A = (first digit + last digit) % 3 === 0
//          Category B = (first digit + last digit) % 3 !== 0
const numbers = [
    { value: "24", label: "A" },      // 2+4=6, 6%3=0 → A
    { value: "37", label: "B" },      // 3+7=10, 10%3=1 → B
    { value: "15", label: "A" },      // 1+5=6, 6%3=0 → A
    { value: "28", label: "B" },      // 2+8=10, 10%3=1 → B
    { value: "46", label: "A" },      // 4+6=10, 10%3=1 → B (wait, let me recalc: 4+6=10, 10%3=1, so B)
    { value: "19", label: "B" },      // 1+9=10, 10%3=1 → B
    { value: "33", label: "A" },      // 3+3=6, 6%3=0 → A
    { value: "57", label: "B" },      // 5+7=12, 12%3=0 → A (wrong!)
    { value: "82", label: "B" },      // 8+2=10, 10%3=1 → B
    { value: "91", label: "B" },      // 9+1=10, 10%3=1 → B
    { value: "66", label: "A" },      // 6+6=12, 12%3=0 → A
    { value: "73", label: "A" }       // 7+3=10, 10%3=1 → B (wrong!)
];

// Let me fix the data to match the pattern correctly:
const correctNumbers = [
    { value: "24", label: "A" },      // 2+4=6, 6%3=0 → A ✓
    { value: "37", label: "B" },      // 3+7=10, 10%3=1 → B ✓
    { value: "15", label: "A" },      // 1+5=6, 6%3=0 → A ✓
    { value: "28", label: "B" },      // 2+8=10, 10%3=1 → B ✓
    { value: "46", label: "B" },      // 4+6=10, 10%3=1 → B ✓
    { value: "19", label: "B" },      // 1+9=10, 10%3=1 → B ✓
    { value: "33", label: "A" },      // 3+3=6, 6%3=0 → A ✓
    { value: "57", label: "A" },      // 5+7=12, 12%3=0 → A ✓
    { value: "82", label: "B" },      // 8+2=10, 10%3=1 → B ✓
    { value: "91", label: "B" },      // 9+1=10, 10%3=1 → B ✓
    { value: "66", label: "A" },      // 6+6=12, 12%3=0 → A ✓
    { value: "73", label: "B" }       // 7+3=10, 10%3=1 → B ✓
];
function displayNumber() {
    if (currentIndex < correctNumbers.length) {
        dataDisplay.textContent = correctNumbers[currentIndex].value;
        feedback.textcontent = '';
        patternHint.textcontent = '';
        categoryABtn.disabled = false;
        categoryBBtn.disabled = false;
        categoryABtn.style.opacity = '1';
        cataegoryBBtn.style.opacity = '1';

    }
    else {
        //completed all examples
        dataDisplay.textContent = "Training Complete";
        feedback.innerHTML = `<p><strong>You learned the pattern!</strong></p>
            <p><strong>The Pattern:</strong> Category A = numbers where (first digit + last digit) is divisible by 3</p>
            <p>Category B = numbers where (first digit + last digit) is NOT divisible by 3</p>
            <p>Example: "24" → 2+4=6, 6÷3=2 (divisible) → Category A</p>
            <p>Example: "37" → 3+7=10, 10÷3=3.33 (not divisible) → Category B</p>
            <p>Just like classification AI, you learned boundaries between categories by seeing labeled examples!</p>`;'<>'
        categoryABtn.style.display = 'none';
        categoryBBtn.style.display = 'none';
        if (nextBtn) {
            nextBtn.style.display = 'inline-block';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.style.opacity = '1';
            nextBtn.style.transition = 'all 0.5s ease'
            nextBtn.style.transform = 'scale(1.05)';
            setTimeout (() => {
                nextBtn.style.transform = 'scale(1)';
            }, 300);
        }
    }
}

function checkClassification(userChoice) {
    const correctLabel = correctNumbers[currentIndex].label;
    totalCount++;
    
    categoryABtn.disabled = true;
    categoryBBtn.disabled = true;
    
    // Animate button click
    const clickedBtn = userChoice === 'A' ? categoryABtn : categoryBBtn;
    clickedBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedBtn.style.transform = 'scale(1)';
    }, 150);
    
    if (userChoice === correctLabel) {
        correctCount++;
        feedback.style.color = '#27ae60';
        feedback.textContent = '✓ Correct';
        feedback.style.transition = 'all 0.3s ease';
        feedback.style.opacity = '1';
        feedback.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            feedback.style.transform = 'scale(1)';
        }, 200);
        
        // Gradually reveal pattern hints
        if (totalCount >= 3 && totalCount <= 5) {
            patternHint.textContent = 'Notice the patterns...';
        } else if (totalCount >= 6 && totalCount <= 8) {
            patternHint.textContent = 'What do Category A numbers have in common?';
        } else if (totalCount >= 9) {
            patternHint.textContent = 'Think about the digits...';
        }
    } else {
        feedback.style.color = '#e74c3c';
        feedback.textContent = `✗ Incorrect. This is Category ${correctLabel}`;
        feedback.style.transition = 'all 0.3s ease';
        feedback.style.opacity = '1';
        feedback.style.animation = 'shake 0.5s ease';
    }
    
    scoreDisplay.textContent = `Correct: ${correctCount} | Total: ${totalCount}`;
    
    setTimeout(() => {
        currentIndex++;
        displayNumber();
    }, 1500);
}



categoryABtn.addEventListener('click', () => checkClassification('A'));
categoryBBtn.addEventListener('click', () => checkClassification('B'));

// Add shake animation for incorrect answers
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    .classify-btn {
        padding: 15px 30px;
        font-size: 1.1em;
        margin: 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .classify-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    .classify-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);

displayNumber();