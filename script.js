// ตั้งค่ารหัสผ่านวันครบรอบ และวันเริ่มคบ (01/06/2024)
const CORRECT_PASSWORD = "010624"; 
const START_DATE = new Date(2024, 5, 1, 0, 0, 0); 

let currentInput = "";

// ฟังก์ชันสลับหน้า
function goToPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

// แป้นพิมพ์รหัสผ่าน
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
      document.getElementById('pass-error').innerText = "รหัสผ่านไม่ถูกต้อง ลองใส่วันครบรอบนะ 💕";
    }
    clearKey();
  }
}

// ฟังก์ชันเปิด Modal แต่ละหน้า
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

// คำนวณเวลานับตั้งแต่วันที่คบกัน
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