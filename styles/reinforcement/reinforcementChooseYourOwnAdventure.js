const questionElement = document.getElementById('question');
const scenarioElement = document.getElementById('scenario');
const scoreElement = document.getElementById('score');
const action1Btn = document.getElementById('action1');
const action2Btn = document.getElementById('action2');
const action3Btn = document.getElementById('action3');
const feedbackElement = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
if (nextBtn) {
    nextBtn.style.pointerEvents = 'none';
    nextBtn.style.opacity = '0.5';
}

let score = 0;
let currentScenarioIndex = 0;

const scenarios = [
    {
        scenario: "You're at a crossroads. Which path do you take?",
        actions: ["Left path", "Right path", "Straight ahead"],
        rewards: [10, -5, 5],
        feedback: ["Great choice! You found treasure!", "Oops! You hit a dead end.", "Good path, but not the best."]
    },
    {
        scenario: "You need to solve a puzzle. What do you try?",
        actions: ["Try method A", "Try method B", "Try method C"],
        rewards: [-3, 15, 0],
        feedback: ["That didn't work well.", "Perfect! You solved it!", "That's okay, but not optimal."]
    },
    {
        scenario: "You're choosing a strategy. Pick one:",
        actions: ["Aggressive", "Balanced", "Defensive"],
        rewards: [-10, 20, 5],
        feedback: ["Too risky! You lost points.", "Excellent! Best strategy!", "Safe but not rewarding."]
    },
    {
        scenario: "Final challenge! Choose wisely:",
        actions: ["Option 1", "Option 2", "Option 3"],
        rewards: [5, 25, -5],
        feedback: ["Not bad!", "Perfect choice! Maximum reward!", "Wrong choice, penalty!"]
    }
];

function displayScenario() {
    if (currentScenarioIndex < scenarios.length) {
        const scenario = scenarios[currentScenarioIndex];
        
        // Fade in new scenario
        scenarioElement.style.opacity = '0';
        scenarioElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            scenarioElement.textContent = scenario.scenario;
            scenarioElement.style.transition = 'all 0.4s ease';
            scenarioElement.style.opacity = '1';
            scenarioElement.style.transform = 'translateY(0)';
        }, 200);
        
        // Animate buttons
        [action1Btn, action2Btn, action3Btn].forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(10px)';
            setTimeout(() => {
                btn.textContent = scenario.actions[index];
                btn.style.transition = 'all 0.4s ease';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
        
        feedbackElement.textContent = '';
        feedbackElement.style.opacity = '0';
        
        action1Btn.disabled = false;
        action2Btn.disabled = false;
        action3Btn.disabled = false;
    } else {
        questionElement.style.transition = 'all 0.5s ease';
        questionElement.textContent = "Congratulations! You completed all scenarios!";
        scenarioElement.style.transition = 'all 0.5s ease';
        scenarioElement.textContent = `Final Score: ${score} points!`;
        
        [action1Btn, action2Btn, action3Btn].forEach(btn => {
            btn.style.transition = 'opacity 0.3s ease';
            btn.style.display = 'none';
        });
        
        feedbackElement.style.transition = 'all 0.5s ease';
        feedbackElement.textContent = "You've learned to maximize rewards through trial and error!";
        feedbackElement.style.opacity = '1';
        
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

function handleAction(actionIndex) {
    const scenario = scenarios[currentScenarioIndex];
    const reward = scenario.rewards[actionIndex];
    const feedback = scenario.feedback[actionIndex];
    
    // Animate button click
    const clickedBtn = [action1Btn, action2Btn, action3Btn][actionIndex];
    clickedBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedBtn.style.transform = 'scale(1)';
    }, 150);
    
    score += reward;
    
    // Animate score update
    scoreElement.style.transition = 'all 0.3s ease';
    scoreElement.style.transform = 'scale(1.2)';
    scoreElement.style.color = reward > 0 ? '#27ae60' : '#e74c3c';
    scoreElement.textContent = score;
    
    setTimeout(() => {
        scoreElement.style.transform = 'scale(1)';
        scoreElement.style.color = '';
    }, 300);
    
    // Show feedback with animation
    feedbackElement.style.transition = 'all 0.4s ease';
    feedbackElement.style.opacity = '0';
    feedbackElement.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        feedbackElement.textContent = feedback + ` (${reward > 0 ? '+' : ''}${reward} points)`;
        feedbackElement.style.color = reward > 0 ? '#27ae60' : '#e74c3c';
        feedbackElement.style.opacity = '1';
        feedbackElement.style.transform = 'translateY(0)';
    }, 100);
    
    action1Btn.disabled = true;
    action2Btn.disabled = true;
    action3Btn.disabled = true;
    
    // Fade out buttons
    [action1Btn, action2Btn, action3Btn].forEach(btn => {
        btn.style.transition = 'opacity 0.3s ease';
        btn.style.opacity = '0.5';
    });
    
    setTimeout(() => {
        currentScenarioIndex++;
        displayScenario();
    }, 2000);
}

action1Btn.addEventListener('click', () => handleAction(0));
action2Btn.addEventListener('click', () => handleAction(1));
action3Btn.addEventListener('click', () => handleAction(2));

displayScenario();

