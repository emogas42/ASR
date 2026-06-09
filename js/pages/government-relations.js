// ── MODAL JS ─────────────────────────────────────────

let scrollY = 0;

function openModal() {
  scrollY = window.scrollY || window.pageYOffset;
  document.body.style.top = '-' + scrollY + 'px';
  document.body.classList.add('modal-open');
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.classList.remove('modal-open');
  document.body.style.top = '';
  window.scrollTo(0, scrollY);
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// RƏQABƏT MODALİ
function openReqabetModal() {
  scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  document.getElementById('reqabetModalOverlay').classList.add('active');
}
function closeReqabetModal() {
  document.getElementById('reqabetModalOverlay').classList.remove('active');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollY);
}
function closeReqabetModalOutside(event) {
  if (event.target === document.getElementById('reqabetModalOverlay')) {
    closeReqabetModal();
  }
}

// ESC düyməsi
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeSatinalmaModal();
    closeReqabetModal();
  }
});
// TEXNİKİ TƏNZİMLƏMƏ MODALİ
function openTexnikModal() {
  scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  document.getElementById('texnikModalOverlay').classList.add('active');
}
function closeTexnikModal() {
  document.getElementById('texnikModalOverlay').classList.remove('active');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollY);
}
function closeTexnikModalOutside(event) {
  if (event.target === document.getElementById('texnikModalOverlay')) {
    closeTexnikModal();
  }
}