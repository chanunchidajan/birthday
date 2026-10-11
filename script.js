// 1. ตั้งรหัสผ่าน (วันเกิด เช่น 010624 หรือตามที่คุณตั้ง)
const CORRECT_PASSWORD = "010624"; 

// 2. ตั้งวัน/เดือน/ปีเกิด เพื่อใช้นับเวลา (ปี ค.ศ., เดือน-1, วัน, ชั่วโมง, นาที, วินาที)
// ตัวอย่าง: เกิดวันที่ 1 มิถุนายน 2024 -> new Date(2024, 5, 1, 0, 0, 0)
const BIRTH_DATE = new Date(2024, 5, 1, 0, 0, 0); 

let currentInput = "";

// ฟังก์ชันสลับหน้าหลัก
function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

// ฟังก์ชันปุ่มกดรหัสผ่าน
function pressKey(num) {
  if (currentInput.length < 6) {
    currentInput += num;
    document.getElementById('pass-display').value = currentInput;
  }
}

function clearKey() {
  currentInput = "";
  document.getElementById('pass-display').value = "";
  document.getElementById('pass-error').innerText = "";
}

function checkPassword() {
  if (currentInput === CORRECT_PASSWORD) {
    goToPage('page-menu');
    startTimer();
  } else {
    document.getElementById('pass-error').innerText = "รหัสผ่านไม่ถูกต้อง ลองใหม่อีกครั้งครับ";
    clearKey();
  }
}

// ฟังก์ชันเปิด Modal แสดงเนื้อหาแต่ละเมนู
function showSection(secId) {
  document.querySelectorAll('.section-content').forEach(sec => sec.style.display = 'none');
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

// ฟังก์ชันคำนวณเวลานับถอยหลัง / เวลาที่ผ่านไป
function startTimer() {
  setInterval(() => {
    const now = new Date();
    const diff = now - BIRTH_DATE;

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