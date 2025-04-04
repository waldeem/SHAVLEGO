// Sound effects
const soundEffects = {
    click: new Audio('assets/sounds/click.mp3'),
    levelUp: new Audio('assets/sounds/level-up.mp3')
};

// Play click sound
function playClickSound() {
    if (!gameState.soundEnabled) return;
    
    soundEffects.click.currentTime = 0;
    soundEffects.click.play().catch(e => console.log("Sound play failed:", e));
}

// Play level up sound
function playLevelUpSound() {
    if (!gameState.soundEnabled) return;
    
    soundEffects.levelUp.currentTime = 0;
    soundEffects.levelUp.play().catch(e => console.log("Sound play failed:", e));
}

// Toggle sound
function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    updateSoundButton();
}

// Update sound button UI
function updateSoundButton() {
    const soundButton = document.getElementById('sound-button');
    if (soundButton) {
        soundButton.textContent = gameState.soundEnabled ? '🔊' : '🔇';
    }
}