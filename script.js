// 1. กำหนดรหัสผ่านวันครบรอบ (แก้ไขเลขตรงนี้ได้)
const CORRECT_PASSWORD = "041124"; 

// 2. กำหนดวันเริ่มคบกัน สำหรับตัวนับเวลา (ปี, เดือน-1, วัน, ชั่วโ่ฒง, นาที)
// หมายเหตุ: เดือนใน JavaScript เริ่มจาก 0 (มกราคม=0, ธันวาคม=11)
const START_DATE = new Date(2024, 10, 4, 0, 0, 0); // ตัวอย่าง: 4 พฤศจิกายน 2024

let currentInput = "";

// ฟังก์ชันสลับหน้า
function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
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
    clearKey();
    goToPage('page-menu');
  } else {
    document.getElementById('pass-error').innerText = "รหัสผ่านไม่ถูกต้อง ลองใหม่อีกครั้งนะ 💕";
    clearKey();
  }
}

// ฟังก์ชันเปิดดูหมวดหมู่เนื้อหา
function showSection(sectionId) {
  document.getElementById('content-modal').style.display = 'flex';
  document.querySelectorAll('.section-content').forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
}

function closeModal() {
  document.getElementById('content-modal').style.display = 'none';
}

// ฟังก์ชันเปิด/ปิด ซองจดหมาย
function toggleLetter() {
  const letter = document.getElementById('letter-body');
  letter.classList.toggle('hidden');
}

// ฟังก์ชันนับเวลาถอยหลัง/นับเวลาคบกัน
function updateTimer() {
  const now = new Date();
  const diff = now - START_DATE; // ผลลัพธ์เป็น มิลลิวินาที

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
  document.getElementById('seconds').innerText = seconds;
}

// อัปเดตเวลาทุกๆ 1 วินาที
setInterval(updateTimer, 1000);
updateTimer();