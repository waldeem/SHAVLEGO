// Mining state
const miningState = {
    active: false,
    timer: null,
    timeLeft: 60, // 60 წამი = 1 წუთი
    progressInterval: null
};

// Initialize mining page
function initMining() {
    loadGameState();
    updateMiningUI();
    setupMiningButton();
    
    // Telegram WebApp integration
    if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.MainButton.setText("უკან დაბრუნება");
        Telegram.WebApp.MainButton.show();
        Telegram.WebApp.MainButton.onClick(function() {
            window.location.href = "index.html";
        });
    }
}

// Load game state
function loadGameState() {
    const savedGame = localStorage.getItem('telegramClicker');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        document.getElementById('mining-points').textContent = gameData.points;
    }
}

// Update mining UI
function updateMiningUI() {
    const statusElement = document.getElementById('mining-status');
    const timerElement = document.getElementById('mining-timer');
    const startButton = document.getElementById('start-mining');
    
    if (miningState.active) {
        statusElement.textContent = "მაინინგი მიმდინარეობს...";
        startButton.disabled = true;
        
        // Update timer display
        const minutes = Math.floor(miningState.timeLeft / 60);
        const seconds = miningState.timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        statusElement.textContent = "მაინინგი გამორთულია";
        timerElement.textContent = "01:00";
        startButton.disabled = false;
    }
}

// Setup mining button
function setupMiningButton() {
    const startButton = document.getElementById('start-mining');
    startButton.addEventListener('click', startMining);
}

// Start mining
function startMining() {
    if (miningState.active) return;
    
    miningState.active = true;
    miningState.timeLeft = 60;
    
    // Update UI
    updateMiningUI();
    
    // Start progress bar animation
    const progressBar = document.getElementById('mining-progress');
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 60s linear';
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 10);
    
    // Start timer
    miningState.timer = setInterval(() => {
        miningState.timeLeft--;
        
        updateMiningUI();
        
        if (miningState.timeLeft <= 0) {
            finishMining();
        }
    }, 1000);
}

// Finish mining and add reward
function finishMining() {
    clearInterval(miningState.timer);
    miningState.active = false;
    
    // Add reward points
    if (window.addPoints) {
        window.addPoints(30);
        document.getElementById('mining-points').textContent = gameState.points;
        
        // Show success message
        const statusElement = document.getElementById('mining-status');
        statusElement.textContent = "მაინინგი დასრულდა! +30 ქულა";
        
        // Reset progress bar
        const progressBar = document.getElementById('mining-progress');
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        
        // Reset after 2 seconds
        setTimeout(() => {
            updateMiningUI();
        }, 2000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMining);