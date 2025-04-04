// Game state
const gameState = {
    points: 0,
    level: 0,
    pointsPerLevel: 50,
    soundEnabled: true
};

// Initialize game
function initGame() {
    loadGame();
    setupEventListeners();
    updateUI();
}

// Load saved game
function loadGame() {
    const savedGame = localStorage.getItem('telegramClicker');
    if (savedGame) {
        const { points, level } = JSON.parse(savedGame);
        gameState.points = points;
        gameState.level = level;
    }
}

// Save game
function saveGame() {
    localStorage.setItem('telegramClicker', JSON.stringify({
        points: gameState.points,
        level: gameState.level
    }));
}

// Handle click
function handleClick() {
    gameState.points++;
    checkLevelUp();
    updateUI();
    saveGame();
    playClickSound();
    createClickEffect(event);
}

// Check for level up
function checkLevelUp() {
    const pointsNeeded = (gameState.level + 1) * gameState.pointsPerLevel;
    if (gameState.points >= pointsNeeded) {
        gameState.level++;
        showAchievement();
        playLevelUpSound();
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('clicker').addEventListener('click', handleClick);
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);

// დაამატეთ sound toggle ფუნქცია
function setupSoundButton() {
    const soundButton = document.getElementById('sound-button');
    soundButton.addEventListener('click', toggleSound);
    updateSoundButton();
}

// განაახლეთ ღილაკის მდგომარეობა
function updateSoundButton() {
    const soundButton = document.getElementById('sound-button');
    soundButton.textContent = gameState.soundEnabled ? '🔊' : '🔇';
}

// ხმის ჩართვა/გამორთვა
function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    updateSoundButton();
    localStorage.setItem('telegramClickerSound', gameState.soundEnabled);
}

// დააკავშირეთ game.js-ში initGame ფუნქციას:
function initGame() {
    loadGame();
    setupEventListeners();
    setupSoundButton(); // <-- ეს დაემატა
    updateUI();
}

// game.js-ში დაამატეთ ეს ხაზი initGame() ფუნქციაში:
function initGame() {
    loadGame();
    setupEventListeners();
    updateUI();
    
    // დაამატეთ ეს ხაზი:
    window.addPoints = addPoints;
}