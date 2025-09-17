// EASTER EGG: TEKAN H 3X
let hCount = 0;
let hTimeout;

document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'h') {
        hCount++;
        clearTimeout(hTimeout);
        hTimeout = setTimeout(() => {
            hCount = 0;
        }, 1000);

        if (hCount >= 3) {
            showSecretMessage();
            hCount = 0;
        }
    }
    
    // Easter egg: ketik "KAKA GANTENG"
    if (e.key === 'Enter') {
        const input = prompt("Mau ngomong apa ke kaka?");
        if (input && input.toLowerCase().includes("kaka ganteng")) {
            alert("IYA, TAPI KAMU LEBIH CANTIK DAN MANIS 😘💖");
            createConfetti();
        }
    }
});

function showSecretMessage() {
    const secretDiv = document.createElement('div');
    secretDiv.style.position = 'fixed';
    secretDiv.style.top = '50%';
    secretDiv.style.left = '50%';
    secretDiv.style.transform = 'translate(-50%, -50%)';
    secretDiv.style.background = 'rgba(0,0,0,0.9)';
    secretDiv.style.color = 'white';
    secretDiv.style.padding = '30px';
    secretDiv.style.borderRadius = '20px';
    secretDiv.style.textAlign = 'center';
    secretDiv.style.zIndex = '99999';
    secretDiv.style.boxShadow = '0 0 30px rgba(255,107,157,0.5)';
    secretDiv.innerHTML = `
        <h2>✨ RAHASIA TERUNGKAP ✨</h2>
        <p style="font-size: 1.3rem; margin: 20px 0;">Iya, tapi kamu lebih cantik 😘</p>
        <img src="assets/helena1.png" style="width: 200px; border-radius: 15px; border: 3px solid white; margin: 20px 0;">
        <p>Klik di mana saja untuk menutup</p>
    `;
    
    secretDiv.addEventListener('click', function() {
        this.remove();
    });
    
    document.body.appendChild(secretDiv);
    
    // Confetti effect
    createConfetti();
}

// EASTER EGG: SHAKE DEVICE (mobile)
if (window.DeviceMotionEvent) {
    let lastX = 0, lastY = 0, lastZ = 0;
    let isShaking = false;
    
    window.addEventListener('devicemotion', function(e) {
        const acceleration = e.accelerationIncludingGravity;
        const x = acceleration.x;
        const y = acceleration.y;
        const z = acceleration.z;
        
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);
        
        if (!isShaking && (deltaX > 10 || deltaY > 10 || deltaZ > 10)) {
            isShaking = true;
            handleShake();
            
            setTimeout(() => {
                isShaking = false;
            }, 1000);
        }
        
        lastX = x;
        lastY = y;
        lastZ = z;
    });
}

function handleShake() {
    alert("📱 WAAH KAMU SHAKE HPNYA!\n\nKaka tau kamu lagi butuh perhatian ya? 😘\nTenang, kaka selalu ada buat kamu 💖");
    createConfetti();
}

// EASTER EGG: DOUBLE CLICK PHOTO
document.addEventListener('DOMContentLoaded', () => {
    const helenaPhoto = document.getElementById('helenaPhoto');
    if (helenaPhoto) {
        let clickCount = 0;
        let clickTimeout;
        
        helenaPhoto.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 1) {
                clickTimeout = setTimeout(() => {
                    // Single click behavior
                    const messages = [
                        "aduh, jangan dicolek terus dong 😝",
                        "ih, kamu nakal ya? 😘",
                        "helena lagi sibuk, tapi tetep senyum buat kamu 💕",
                        "eep! geli ah~",
                        "kamu demen banget ya sama aku? 😊",
                        "jangan lupa kasih aku makan ya~ 🍓",
                        "aku juga sayang kamu lebih banyak! 💖"
                    ];
                    alert(messages[Math.floor(Math.random() * messages.length)]);
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(clickTimeout);
                // Double click behavior
                alert("💖 DOUBLE CLICK DETECTED! 💖\n\nKAMU DAPAT HADIAH ISTIMEWA!\nCek email kamu! (Just kidding, tapi aku sayang kamu bangeeet!)");
                createConfetti();
                clickCount = 0;
            }
        });
    }
});

// CONFETTI FUNCTION (reusable)
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

// Add animation style
if (!document.querySelector('#easter-egg-animations')) {
    const style = document.createElement('style');
    style.id = 'easter-egg-animations';
    style.textContent = `
        @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// BIRTHDAY CONFETTI (if today is birthday)
function checkBirthday() {
    const today = new Date();
    const month = today.getMonth() + 1; // Jan = 0
    const day = today.getDate();
    
    // GANTI INI DENGAN TANGGAL ULTAH HELENA
    const birthdayMonth = 5;  // Mei
    const birthdayDay = 15;   // 15 Mei
    
    if (month === birthdayMonth && day === birthdayDay) {
        setTimeout(() => {
            alert("🎉 SELAMAT ULANG TAHUN, HELENA SAYANG! 🎉\n\nSemoga panjang umur, sehat selalu, dan semua impianmu terwujud! Aku sayang kamu setiap hari, tapi hari ini spesial banget! 💖");
            createConfetti();
            createConfetti();
            createConfetti();
            
            // Auto play music
            const bgMusic = document.getElementById('bgMusic');
            bgMusic.play();
        }, 3000);
    }
}

// Run birthday check
document.addEventListener('DOMContentLoaded', checkBirthday);