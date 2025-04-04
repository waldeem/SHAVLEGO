// დავალებების სისტემა
const quests = {
    youtube: {
        completed: false,
        reward: 50,
        url: "https://youtube.com/yourchannel"
    },
    telegram: {
        completed: false,
        reward: 30,
        url: "https://t.me/yourchannel"
    },
    twitter: {
        completed: false,
        reward: 20,
        url: "https://twitter.com/yourpage"
    },
    daily: {
        completed: false,
        reward: 10,
        url: "javascript:void(0)"
    }
};

// ჩატვირთვისას
document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
    updatePointsDisplay();
    setupQuestButtons();
});

// თამაშის მდგომარეობის ჩატვირთვა
function loadGameState() {
    const savedGame = localStorage.getItem('telegramClicker');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        
        // დავალებების მდგომარეობის ჩატვირთვა
        const savedQuests = localStorage.getItem('questsStatus');
        if (savedQuests) {
            const questsStatus = JSON.parse(savedQuests);
            for (const quest in questsStatus) {
                if (quests[quest]) {
                    quests[quest].completed = questsStatus[quest];
                }
            }
        }
    }
}

// ქულების განახლება
function updatePointsDisplay() {
    const savedGame = localStorage.getItem('telegramClicker');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        document.getElementById('reward-points').textContent = gameData.points;
    }
}

// დავალებების ღილაკების დაყენება
function setupQuestButtons() {
    for (const quest in quests) {
        const button = document.querySelector(`#${quest}-quest .quest-button`);
        if (quests[quest].completed) {
            button.textContent = '✅ დასრულებული';
            button.classList.add('completed');
            button.disabled = true;
        }
    }
}

// დავალების შესრულება
function completeQuest(questType) {
    if (quests[questType] && !quests[questType].completed) {
        // გახსნა სოციალური ქსელის ბმული
        window.open(quests[questType].url, '_blank');
        
        // მონიშვნა როგორც შესრულებული
        quests[questType].completed = true;
        
        // ქულების დამატება
        addPoints(quests[questType].reward);
        
        // განახლება localStorage-ში
        saveQuestStatus();
        
        // ინტერფეისის განახლება
        const button = document.querySelector(`#${questType}-quest .quest-button`);
        button.textContent = '✅ დასრულებული';
        button.classList.add('completed');
        button.disabled = true;
        
        // ანიმაცია
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }
}

// ქულების დამატება
function addPoints(points) {
    const savedGame = localStorage.getItem('telegramClicker');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        gameData.points += points;
        localStorage.setItem('telegramClicker', JSON.stringify(gameData));
        updatePointsDisplay();
    }
}

// დავალებების მდგომარეობის შენახვა
function saveQuestStatus() {
    const questsStatus = {};
    for (const quest in quests) {
        questsStatus[quest] = quests[quest].completed;
    }
    localStorage.setItem('questsStatus', JSON.stringify(questsStatus));
}