// LOADER
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        initAllFeatures();
    }, 2000);
});

function initAllFeatures() {
    initMusic();
    initMotivasiRotator();
    initVisitCounter();
    initCountdown();
    initThemeToggle();
    initHugButton();
}

// MUSIK
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');

function initMusic() {
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleMusic);
    }
}

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i> putar lagu';
    } else {
        bgMusic.play().catch(e => console.log("Autoplay blocked:", e));
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> jeda lagu';
    }
    isPlaying = !isPlaying;
}

// MOTIVASI BERGANTIAN
function initMotivasiRotator() {
    const motivasis = document.querySelectorAll('.motivasi');
    if (motivasis.length === 0) return;
    
    let index = 0;
    setInterval(() => {
        motivasis.forEach(m => m.classList.remove('active'));
        index = (index + 1) % motivasis.length;
        motivasis[index].classList.add('active');
    }, 4000);
}

// VISIT COUNTER
function initVisitCounter() {
    const visitCountEl = document.getElementById('visitCount');
    if (!visitCountEl) return;
    
    let visits = localStorage.getItem('helenaVisits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('helenaVisits', visits);
    visitCountEl.textContent = visits;
}

// COUNTDOWN (CONTOH: 30 HARI)
function initCountdown() {
    const countdownBox = document.getElementById('countdownBox');
    if (!countdownBox) return;
    
    // Set target date (contoh: 30 hari dari sekarang)
    const now = new Date();
    const targetDate = new Date();
    targetDate.setDate(now.getDate() + 30); // 30 hari lagi
    
    const updateCountdown = () => {
        const now = new Date();
        const diff = targetDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        document.getElementById('countdownDays').textContent = days;
        
        if (days < 0) {
            countdownBox.innerHTML = "<p>🎉 HARI INI HARI ISTIMEWA! 🎉</p>";
        }
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60); // update tiap menit
}

// THEME TOGGLE
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Cek preferensi user
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// PELUKAN VIRTUAL
function initHugButton() {
    const hugBtn = document.getElementById('hugBtn');
    if (!hugBtn) return;
    
    hugBtn.addEventListener('click', () => {
        // Confetti effect
        createConfetti();
        
        // Play hug sound if available
        const hugSound = new Audio('assets/hug.mp3');
        hugSound.play().catch(e => console.log("Sound not available"));
        
        // Show message
        alert("💖 HUGS FOR YOU, HELENA! 💖\n\nKaka kirim pelukan hangat dari jauh~\nSemoga harimu jadi lebih cerah!");
        
        // Auto play music if not playing
        if (!isPlaying) {
            bgMusic.play();
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> jeda lagu';
        }
    });
}

// CONFETTI FUNCTION (bisa dipakai di mana saja)
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
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

// CSS ANIMATIONS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);