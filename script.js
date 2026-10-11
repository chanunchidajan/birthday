const CORRECT_PASSWORD = "010624"; 
const START_DATE = new Date(2024, 5, 1, 0, 0, 0); 

let currentInput = "";
let isPlaying = false;

// ฟังก์ชันสลับการ์ดทีละใบ
function changeStep(className, direction) {
  const cards = document.querySelectorAll('.' + className);
  let currentIndex = -1;

  cards.forEach((card, idx) => {
    if (card.classList.contains('active')) {
      currentIndex = idx;
    }
  });

  if (currentIndex !== -1) {
    cards[currentIndex].classList.remove('active');
    let nextIndex = currentIndex + direction;

    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= cards.length) nextIndex = cards.length - 1;

    cards[nextIndex].classList.add('active');

    // อัปเดตตัวเลขบอกหน้า (เช่น 1 / 3)
    let indicatorId = "";
    if (className === 'timeline-step') indicatorId = 'timeline-step-indicator';
    if (className === 'reason-step') indicatorId = 'reason-step-indicator';
    if (className === 'place-step') indicatorId = 'place-step-indicator';

    if (indicatorId && document.getElementById(indicatorId)) {
      document.getElementById(indicatorId).innerText = `${nextIndex + 1} / ${cards.length}`;
    }
  }
}

function toggleAudio() {
  const audio = document.getElementById('bg-music');
  const label = document.getElementById('audio-label');
  const icon = document.getElementById('audio-icon');

  if (isPlaying) {
    audio.pause();
    label.innerText = "Play Music";
    icon.innerText = "🎵";
  } else {
    audio.play().catch(() => {});
    label.innerText = "Pause Music";
    icon.innerText = "🎶";
  }
  isPlaying = !isPlaying;
}

function goToPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

function pressKey(num) {
  if (currentInput.length < 6) {
    currentInput += num;
    document.getElementById('pass-display').value = currentInput;
  }
}

function clearKey() {
  currentInput = "";
  document.getElementById('pass-display').value = "";
  if (document.getElementById('pass-error')) {
    document.getElementById('pass-error').innerText = "";
  }
}

function checkPassword() {
  if (currentInput === CORRECT_PASSWORD) {
    goToPage('page-menu');
    startTimer();
  } else {
    if (document.getElementById('pass-error')) {
      document.getElementById('pass-error').innerText = "รหัสผ่านไม่ถูกต้อง ลองใหม่อีกครั้งนะ 💕";
    }
    clearKey();
  }
}

function showSection(secId) {
  const secs = document.querySelectorAll('.section-content');
  secs.forEach(s => s.style.display = 'none');
  
  const targetSec = document.getElementById(secId);
  if (targetSec) {
    targetSec.style.display = 'block';
  }
  document.getElementById('content-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('content-modal').style.display = 'none';
}

function toggleLetter() {
  const letter = document.getElementById('letter-body');
  if (letter) {
    letter.classList.toggle('hidden');
  }
}

function startTimer() {
  setInterval(() => {
    const now = new Date();
    const diff = now - START_DATE;

    if (diff < 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (document.getElementById('days')) document.getElementById('days').innerText = days;
    if (document.getElementById('hours')) document.getElementById('hours').innerText = hours;
    if (document.getElementById('minutes')) document.getElementById('minutes').innerText = minutes;
    if (document.getElementById('seconds')) document.getElementById('seconds').innerText = seconds;
  }, 1000);
}