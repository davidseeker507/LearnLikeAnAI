const questionElement = document.getElementById('question');
const scenarioElement = document.getElementById('scenario');
const scoreElement = document.getElementById('score');
const action1Btn = document.getElementById('action1');
const action2Btn = document.getElementById('action2');
const action3Btn = document.getElementById('action3');
const feedbackElement = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
nextBtn.style.pointerEvents = 'none';
nextBtn.style.opacity = '0.5';

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
        scenarioElement.textContent = scenario.scenario;
        action1Btn.textContent = scenario.actions[0];
        action2Btn.textContent = scenario.actions[1];
        action3Btn.textContent = scenario.actions[2];
        feedbackElement.textContent = '';
        
        action1Btn.disabled = false;
        action2Btn.disabled = false;
        action3Btn.disabled = false;
    } else {
        questionElement.textContent = "Congratulations! You completed all scenarios!";
        scenarioElement.textContent = `Final Score: ${score} points!`;
        action1Btn.style.display = 'none';
        action2Btn.style.display = 'none';
        action3Btn.style.display = 'none';
        feedbackElement.textContent = "You've learned to maximize rewards through trial and error!";
        nextBtn.style.pointerEvents = 'auto';
        nextBtn.style.opacity = '1';
    }
}

function handleAction(actionIndex) {
    const scenario = scenarios[currentScenarioIndex];
    const reward = scenario.rewards[actionIndex];
    const feedback = scenario.feedback[actionIndex];
    
    score += reward;
    scoreElement.textContent = score;
    feedbackElement.textContent = feedback + ` (${reward > 0 ? '+' : ''}${reward} points)`;
    
    action1Btn.disabled = true;
    action2Btn.disabled = true;
    action3Btn.disabled = true;
    
    setTimeout(() => {
        currentScenarioIndex++;
        displayScenario();
    }, 2000);
}

action1Btn.addEventListener('click', () => handleAction(0));
action2Btn.addEventListener('click', () => handleAction(1));
action3Btn.addEventListener('click', () => handleAction(2));

displayScenario();

