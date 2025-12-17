// Training simulator
let epoch = 0;
let loss = 1.0;
let accuracy = 0;
let trainingInterval;

function simulateTraining() {
    if (trainingInterval) return;
    
    trainingInterval = setInterval(() => {
        epoch += 10;
        loss = Math.max(0.01, loss * 0.95);
        accuracy = Math.min(99, accuracy + 2);
        
        document.getElementById('epochCount').textContent = epoch;
        document.getElementById('lossValue').textContent = loss.toFixed(2);
        document.getElementById('accuracyValue').textContent = accuracy + '%';
        
        const progress = Math.min(100, (epoch / 1000) * 100);
        const progressBar = document.getElementById('trainingProgress');
        progressBar.style.width = progress + '%';
        progressBar.textContent = Math.round(progress) + '%';
        
        if (epoch >= 1000) {
            clearInterval(trainingInterval);
            trainingInterval = null;
        }
    }, 100);
}

function resetTraining() {
    if (trainingInterval) {
        clearInterval(trainingInterval);
        trainingInterval = null;
    }
    epoch = 0;
    loss = 1.0;
    accuracy = 0;
    document.getElementById('epochCount').textContent = '0';
    document.getElementById('lossValue').textContent = '1.00';
    document.getElementById('accuracyValue').textContent = '0%';
    document.getElementById('trainingProgress').style.width = '0%';
    document.getElementById('trainingProgress').textContent = '0%';
}

// Token attention hover effect
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.token').forEach(token => {
        token.addEventListener('mouseenter', function() {
            const tokenText = this.getAttribute('data-token');
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.background = '#2980b9';
        });
        
        token.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = '#3498db';
        });
    });

    // Neuron click effect
    document.querySelectorAll('.neuron').forEach(neuron => {
        neuron.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 2s ease-in-out infinite';
            }, 10);
        });    
    });
});

// Navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');
    
    menuIcon?.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            menuIcon && !menuIcon.contains(event.target)) {
            nav.classList.remove('active');
        }
    });
});