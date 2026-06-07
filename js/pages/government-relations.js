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