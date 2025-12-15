const questionElement = document.getElementById('question');
const imagesElement = document.getElementById('images');
const selectionsElement = document.getElementById('selections');
const submitButton = document.getElementById('submitButton');
const outputElement = document.getElementById('output');
const roundElement = document.getElementById('round');
const totalRoundsElement = document.getElementById('totalRounds');
const nextBtn = document.getElementById('nextBtn');
if (nextBtn) {
    nextBtn.style.pointerEvents = 'none';
    nextBtn.style.opacity = '0.5';
}

let currentRound = 0;
let selectedImages = [];

// Image data represented as feature vectors (like an AI model sees)
const imageGroups = [
    {
        round: 1,
        images: [
            { id: 1, data: [0.85, 0.12, 0.03, 0.92, 0.15, 0.08], group: 'A' },
            { id: 2, data: [0.82, 0.11, 0.04, 0.89, 0.14, 0.09], group: 'A' },
            { id: 3, data: [0.15, 0.88, 0.25, 0.12, 0.91, 0.22], group: 'B' },
            { id: 4, data: [0.18, 0.85, 0.28, 0.15, 0.88, 0.25], group: 'B' },
            { id: 5, data: [0.85, 0.13, 0.05, 0.90, 0.16, 0.07], group: 'A' }
        ],
        correctGroup: ['A'],
        hint: 'Look for images with similar values in the first few positions'
    },
    {
        round: 2,
        images: [
            { id: 1, data: [0.05, 0.05, 0.95, 0.08, 0.10, 0.92], group: 'X' },
            { id: 2, data: [0.92, 0.88, 0.15, 0.95, 0.90, 0.12], group: 'Y' },
            { id: 3, data: [0.07, 0.08, 0.93, 0.09, 0.11, 0.91], group: 'X' },
            { id: 4, data: [0.88, 0.85, 0.18, 0.91, 0.87, 0.15], group: 'Y' },
            { id: 5, data: [0.06, 0.07, 0.94, 0.10, 0.12, 0.90], group: 'X' },
            { id: 6, data: [0.90, 0.86, 0.20, 0.93, 0.89, 0.17], group: 'Y' }
        ],
        correctGroup: ['X'],
        hint: 'Notice which images have high values in the third position'
    },
    {
        round: 3,
        images: [
            { id: 1, data: [0.45, 0.50, 0.48, 0.47, 0.49, 0.46], group: 'M' },
            { id: 2, data: [0.12, 0.85, 0.15, 0.10, 0.88, 0.13], group: 'N' },
            { id: 3, data: [0.48, 0.47, 0.49, 0.46, 0.50, 0.45], group: 'M' },
            { id: 4, data: [0.15, 0.82, 0.18, 0.13, 0.85, 0.16], group: 'N' },
            { id: 5, data: [0.46, 0.49, 0.47, 0.48, 0.51, 0.44], group: 'M' },
            { id: 6, data: [0.14, 0.87, 0.17, 0.11, 0.90, 0.14], group: 'N' }
        ],
        correctGroup: ['M'],
        hint: 'Look for images where all values are similar to each other (around 0.45-0.50)'
    }
];

function displayRound() {
    if (currentRound < imageGroups.length) {
        const round = imageGroups[currentRound];
        roundElement.textContent = currentRound + 1;
        totalRoundsElement.textContent = imageGroups.length;
        selectedImages = [];
        
        imagesElement.innerHTML = '';
        selectionsElement.innerHTML = '';
        outputElement.textContent = '';
        
        round.images.forEach((image, index) => {
            const imageDiv = document.createElement('div');
            imageDiv.id = `image-${image.id}`;
            imageDiv.style.border = '2px solid #ccc';
            imageDiv.style.padding = '10px';
            imageDiv.style.margin = '10px';
            imageDiv.style.display = 'inline-block';
            imageDiv.style.cursor = 'pointer';
            imageDiv.style.transition = 'all 0.3s ease';
            imageDiv.style.opacity = '0';
            imageDiv.style.transform = 'scale(0.8)';
            imageDiv.innerHTML = `
                <strong>Image ${image.id}</strong><br>
                Data: [${image.data.map(d => d.toFixed(2)).join(', ')}]
            `;
            
            imageDiv.addEventListener('click', () => selectImage(image.id, imageDiv));
            imagesElement.appendChild(imageDiv);
            
            // Stagger animation
            setTimeout(() => {
                imageDiv.style.opacity = '1';
                imageDiv.style.transform = 'scale(1)';
            }, index * 100);
        });
        
        submitButton.disabled = false;
    } else {
        questionElement.textContent = "Congratulations! You've completed all rounds!";
        imagesElement.innerHTML = "<p>You successfully clustered images by finding patterns in their data, just like an unsupervised AI model!</p>";
        selectionsElement.innerHTML = '';
        submitButton.style.display = 'none';
        nextBtn.style.pointerEvents = 'auto';
        nextBtn.style.opacity = '1';
    }
}

function selectImage(imageId, imageDiv) {
    const round = imageGroups[currentRound];
    const image = round.images.find(img => img.id === imageId);
    
    if (selectedImages.includes(imageId)) {
        selectedImages = selectedImages.filter(id => id !== imageId);
        imageDiv.style.transition = 'all 0.3s ease';
        imageDiv.style.backgroundColor = '';
        imageDiv.style.borderColor = '#ccc';
        imageDiv.style.transform = 'scale(1)';
    } else {
        selectedImages.push(imageId);
        imageDiv.style.transition = 'all 0.3s ease';
        imageDiv.style.backgroundColor = '#e3f2fd';
        imageDiv.style.borderColor = '#2196f3';
        imageDiv.style.transform = 'scale(1.05)';
    }
    
    updateSelections();
}

function updateSelections() {
    if (selectedImages.length > 0) {
        selectionsElement.innerHTML = `<p>Selected: ${selectedImages.join(', ')}</p>`;
    } else {
        selectionsElement.innerHTML = '';
    }
}

function checkAnswer() {
    if (selectedImages.length === 0) {
        outputElement.textContent = 'Please select at least one image.';
        return;
    }
    
    const round = imageGroups[currentRound];
    const selectedGroups = selectedImages.map(id => {
        const image = round.images.find(img => img.id === id);
        return image.group;
    });
    
    // Check if all selected images are from the same group
    const allSameGroup = selectedGroups.every(group => group === selectedGroups[0]);
    
    // Check if the selected group matches the correct answer
    const correctGroup = round.correctGroup[0];
    const isCorrect = allSameGroup && selectedGroups[0] === correctGroup;
    
    if (isCorrect) {
        outputElement.style.transition = 'all 0.4s ease';
        outputElement.textContent = `✓ Correct! You found the pattern. Images ${selectedImages.join(', ')} belong to the same group.`;
        outputElement.style.color = '#27ae60';
        outputElement.style.opacity = '1';
        outputElement.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            outputElement.style.transform = 'scale(1)';
        }, 200);
        
        // Highlight the correct group with animation
        round.images.forEach((image, index) => {
            if (image.group === correctGroup) {
                setTimeout(() => {
                    const imgDiv = document.getElementById(`image-${image.id}`);
                    imgDiv.style.transition = 'all 0.5s ease';
                    imgDiv.style.backgroundColor = '#c8e6c9';
                    imgDiv.style.borderColor = '#4caf50';
                    imgDiv.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        imgDiv.style.transform = 'scale(1)';
                    }, 300);
                }, index * 100);
            }
        });
        
        submitButton.disabled = true;
        submitButton.style.transition = 'opacity 0.3s ease';
        submitButton.style.opacity = '0.5';
        
        setTimeout(() => {
            currentRound++;
            displayRound();
        }, 3000);
    } else {
        outputElement.style.transition = 'all 0.4s ease';
        if (!allSameGroup) {
            outputElement.textContent = `Not quite. The selected images don't all belong to the same group. Hint: ${round.hint}`;
        } else {
            outputElement.textContent = `Close, but not the right group. Hint: ${round.hint}`;
        }
        outputElement.style.color = '#e74c3c';
        outputElement.style.opacity = '1';
        outputElement.style.animation = 'shake 0.5s ease';
    }
}

submitButton.addEventListener('click', checkAnswer);

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

displayRound();





















