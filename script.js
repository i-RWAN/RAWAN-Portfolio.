/**
 * Rawan Portfolio Custom Script
 */

// --- 1. إعدادات الكتابة التلقائية اللانهائية (Typewriter Effect) ---
const nameText = "Rawan Ali Maashi";
const typeElement = document.querySelector("#name-type span");

let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function typewriterEffect() {
    // تحديد النص الحالي بناءً على العملية (كتابة أو حذف)
    if (isDeleting) {
        // حذف حرف
        typeElement.textContent = nameText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100; // سرعة الحذف أسرع قليلاً
    } else {
        // إضافة حرف
        typeElement.textContent = nameText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 180; // سرعة الكتابة
    }

    // منطق التبديل بين الكتابة والحذف
    if (!isDeleting && charIndex === nameText.length) {
        // إذا اكتملت الكتابة، انتظر قليلاً ثم ابدأ الحذف
        isDeleting = true;
        typeSpeed = 2500; // وقت الانتظار والاسم مكتوب بالكامل (ثانيتين ونصف)
    } else if (isDeleting && charIndex === 0) {
        // إذا اكتمل الحذف، ابدأ الكتابة من جديد
        isDeleting = false;
        typeSpeed = 500; // وقت الانتظار والخانة فارغة
    }

    setTimeout(typewriterEffect, typeSpeed);
}

// --- 2. تبديل كروت الإنجازات (Achievements Stack) ---
function rotateStack() {
    const cards = document.querySelectorAll('#stack1 .card');
    
    cards.forEach((card) => {
        if (card.classList.contains('c1')) {
            card.classList.replace('c1', 'c3');
        } else if (card.classList.contains('c2')) {
            card.classList.replace('c2', 'c1');
        } else if (card.classList.contains('c3')) {
            card.classList.replace('c3', 'c2');
        }
    });
}

// --- 3. تشغيل خلفية الجزيئات (Particles.js) ---
// ملاحظة: تأكدي من وجود مكتبة Particles.js في ملف الـ HTML كما أضفناها سابقاً
function initParticles() {
    if (document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#a855f7" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#a855f7", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }
            },
            "retina_detect": true
        });
    }
}

// --- 4. بدء التشغيل عند تحميل الصفحة ---
document.addEventListener("DOMContentLoaded", () => {
    // تشغيل تأثير الكتابة
    typewriterEffect();
    
    // تشغيل الجزيئات
    initParticles();
});
// دالة لإنشاء الشعارات العشوائية في الخلفية
function createBackgroundIcons() {
    const background = document.querySelector('.skills-background');
    if (!background) return;

    // قائمة بروابط الشعارات التي تود ظهورها في الخلفية
    const iconUrls = [
        "https://img.icons8.com/color/96/html-5--v1.png",
        "https://img.icons8.com/color/96/css3.png",
        "https://img.icons8.com/color/96/javascript--v1.png",
        "https://img.icons8.com/color/96/java-coffee-cup-logo--v1.png",
        "https://img.icons8.com/color/96/python--v1.png",
        "https://img.icons8.com/color/96/swift.png",
        "https://img.icons8.com/color/96/brain--v1.png",
        "https://img.icons8.com/color/96/sql.png"
    ];

    const iconCount = 15; // عدد الشعارات التي تظهر في الخلفية

    for (let i = 0; i < iconCount; i++) {
        const icon = document.createElement('img');
        
        // اختيار شعار عشوائي من القائمة
        icon.src = iconUrls[Math.floor(Math.random() * iconUrls.length)];
        icon.classList.add('background-icon');

        // تحديد موقع عشوائي أفقي
        icon.style.left = Math.random() * 100 + '%';
        
        // تحديد موقع عشوائي عمودي (على طول القسم)
        icon.style.top = Math.random() * 100 + '%';

        // تحديد تأخير عشوائي لبدء الحركة (ليتحرك كل شعار في وقت مختلف)
        icon.style.animationDelay = (Math.random() * 8) + 's';

        // إضافة الشعار للحاوية
        background.appendChild(icon);
    }
}

// تشغيل الدالة بمجرد تحميل الصفحة
document.addEventListener('DOMContentLoaded', createBackgroundIcons);
// دالة إطلاق الاحتفال
function launchConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // إطلاق من اليمين ومن اليسار كأنه انفجار حقيقي
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// مراقبة السكرول للوصول للقسم
let hasCelebrated = false;
window.addEventListener('scroll', () => {
    const achievementSection = document.querySelector('.achievement-section');
    const sectionPosition = achievementSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;

    if (sectionPosition < screenPosition && !hasCelebrated) {
        launchConfetti();
        hasCelebrated = true; // عشان ما يتكرر الانفجار كل ما طلعتي ونزلتي
    }
});