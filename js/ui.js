// Update UI elements
function updateUI() {
    updatePoints();
    updateLevel();
    updateProgressBar();
    updateLevelStyles();
}

function updatePoints() {
    document.getElementById('points').textContent = gameState.points;
}

function updateLevel() {
    document.getElementById('level').textContent = gameState.level;
}

function updateProgressBar() {
    const pointsNeeded = (gameState.level + 1) * gameState.pointsPerLevel;
    const pointsInLevel = gameState.points - (gameState.level * gameState.pointsPerLevel);
    const progress = (pointsInLevel / gameState.pointsPerLevel) * 100;
    
    document.getElementById('progress').style.width = `${progress}%`;
}

function updateLevelStyles() {
    const gameContainer = document.querySelector('.game-container');
    
    // Remove all level classes
    gameContainer.classList.remove('level-1', 'level-5', 'level-10');
    
    // Add appropriate level class
    if (gameState.level >= 10) {
        gameContainer.classList.add('level-10');
    } else if (gameState.level >= 5) {
        gameContainer.classList.add('level-5');
    } else if (gameState.level >= 1) {
        gameContainer.classList.add('level-1');
    }
    
    // Update clicker image style based on level
    const hue = (gameState.level * 30) % 360;
    document.getElementById('click-image').style.filter = 
        `hue-rotate(${hue}deg) brightness(${1 + gameState.level * 0.05})`;
}

function showAchievement() {
    const achievement = document.getElementById('achievement');
    achievement.textContent = `დონე ${gameState.level} გაზარდე!`;
    achievement.style.display = 'block';
    
    setTimeout(() => {
        achievement.style.display = 'none';
    }, 2000);
}

function createClickEffect(event) {
    const clicker = document.getElementById('clicker');
    const rect = clicker.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = `${x - 15}px`;
    effect.style.top = `${y - 15}px`;
    
    clicker.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 600);
}

// დაამატეთ ფუტერის ინიციალიზაცია
function initFooter() {
    const footerImages = document.querySelectorAll('.footer-image');
    
    footerImages.forEach(img => {
        img.addEventListener('click', function(e) {
            // თუ გვინდა ამ სურათზე დაჭერისას რამე სპეციალური მოხდეს
            console.log('ნავიგაცია გვერდზე:', this.parentElement.href);
            
            // თუ გვინდა ამ სურათზე დაჭერისას რამე ანიმაცია
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// განაახლეთ initGame ფუნქცია game.js-ში
function initGame() {
    loadGame();
    loadSoundPreference();
    setupEventListeners();
    setupSoundButton();
    initFooter(); // ახალი ხაზი
    updateUI();
}