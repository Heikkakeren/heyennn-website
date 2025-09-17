let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let isGameRunning = false;

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startGameBtn');
    const resetBtn = document.getElementById('resetGameBtn');
    
    if (startBtn) startBtn.addEventListener('click', startGame);
    if (resetBtn) resetBtn.addEventListener('click', resetGame);
});

function startGame() {
    if (isGameRunning) return;
    
    isGameRunning = true;
    score = 0;
    timeLeft = 30;
    updateScore();
    updateTimer();
    
    const container = document.getElementById('game-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Start spawning hearts
    gameInterval = setInterval(() => {
        createHeart(container);
    }, 800);
    
    // Start timer
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    // Change button text
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) startBtn.textContent = "⏸️ jeda game";
}

function resetGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    isGameRunning = false;
    
    const container = document.getElementById('game-container');
    if (container) container.innerHTML = '';
    
    score = 0;
    timeLeft = 30;
    updateScore();
    updateTimer();
    
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) startBtn.textContent = "▶️ mulai game";
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    isGameRunning = false;
    
    alert(`🎮 GAME OVER!\nSkor kamu: ${score}\n\n${getEncouragementMessage(score)}`);
    
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) startBtn.textContent = "▶️ main lagi";
}

function getEncouragementMessage(score) {
    if (score >= 20) return "WOW! KAMU JAGO BANGET! 💖";
    if (score >= 10) return "KEREN! SEMANGAT TERUS YA! 😘";
    if (score >= 5) return "HEBAT! COBA LAGI BIAR LEBIH TINGGI! 💪";
    return "JANGAN MENYERAH! KAMU BISA LEBIH BAIK LAGI! ✨";
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * (container.offsetWidth - 50) + 'px';
    heart.style.top = Math.random() * (container.offsetHeight - 50) + 'px';
    
    heart.addEventListener('click', function() {
        // Remove heart
        this.remove();
        
        // Add score
        score++;
        updateScore();
        
        // Show encouragement text
        showSemangatText(this.style.left, this.style.top);
        
        // Play click sound if available
        const clickSound = new Audio('assets/click.wav');
        clickSound.play().catch(e => console.log("Sound not available"));
        
        // Love bomb every 5 points
        if (score % 5 === 0 && score > 0) {
            loveBomb();
        }
    });
    
    container.appendChild(heart);
    
    // Auto remove after 4s if not clicked
    setTimeout(() => {
        if (heart.parentNode === container) {
            heart.remove();
        }
    }, 4000);
}

function showSemangatText(x, y) {
    const container = document.getElementById('game-container');
    if (!container) return;
    
    const texts = [
        "KAMU KEREN BANGET! 💖",
        "YES! SEMANGAT! 😘",
        "WOOHOO! MANTAP! 🎉",
        "GO GO GO! 💪",
        "YOU'RE AMAZING! ✨",
        "JANGAN BERHENTI! 🌈",
        "KEEP SHINING! 🌟",
        "HEBAT SEKALI! 🎯",
        "KAMU JUARA! 🏆",
        "I LOVE YOU! 💞"
    ];
    
    const text = document.createElement('div');
    text.classList.add('semangat-text');
    text.textContent = texts[Math.floor(Math.random() * texts.length)];
    text.style.left = x;
    text.style.top = y;
    container.appendChild(text);
    
    setTimeout(() => {
        text.remove();
    }, 1500);
}

function loveBomb() {
    createConfetti();
    
    // Special message
    const container = document.getElementById('game-container');
    const bombMsg = document.createElement('div');
    bombMsg.style.position = 'absolute';
    bombMsg.style.top = '50%';
    bombMsg.style.left = '50%';
    bombMsg.style.transform = 'translate(-50%, -50%)';
    bombMsg.style.fontSize = '2rem';
    bombMsg.style.fontWeight = 'bold';
    bombMsg.style.color = '#ff6b9d';
    bombMsg.style.textShadow = '0 0 10px white';
    bombMsg.style.zIndex = '100';
    bombMsg.style.animation = 'popUpText 2s forwards';
    bombMsg.innerHTML = '💖 LOVE BOMB! 💖<br>SELAMAT!';
    container.appendChild(bombMsg);
    
    setTimeout(() => {
        bombMsg.remove();
    }, 2000);
    
    // Play music if not playing
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic.paused) {
        bgMusic.play();
    }
}

function updateScore() {
    const scoreEl = document.getElementById('score');
    if (scoreEl) scoreEl.textContent = score;
}

function updateTimer() {
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.textContent = timeLeft;
}

// Confetti function (copy from main.js for independence)
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.borderRadius = '50%';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '0';
            confetti.style.animation = `fall ${Math.random() + 2}s linear forwards`;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 30);
    }
}

function getRandomColor() {
    const colors = ['#ff6b9d', '#a8edea', '#f4a261', '#a29bfe', '#ffafbd', '#ff9a8b'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add animation style if not exists
if (!document.querySelector('#game-animations')) {
    const style = document.createElement('style');
    style.id = 'game-animations';
    style.textContent = `
        @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes popUpText {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            50% { transform: translate(-50%, -60%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -80%) scale(0.8); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}