// ── Theme Toggle (əsas səhifə — data-theme + themeBtn) ──────────────────────
// HTML-də lazım olanlar:
//   <html data-theme="...">
//   <button id="themeBtn">...</button>
//   <span id="themeLabel">...</span>
(function () {
  const html  = document.documentElement;
  const btn   = document.getElementById('themeBtn');
  const label = document.getElementById('themeLabel');

  // Əvvəlki seçimi yüklə
  const saved = localStorage.getItem('asrTheme');
  if (saved === 'dark') apply('dark');

  btn.addEventListener('click', function () {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem('asrTheme', next);
  });

  function apply(theme) {
    html.setAttribute('data-theme', theme);
    label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
})();


// ── Theme Toggle (rehberlik səhifəsi — dark-mode class + theme-switch) ───────
// HTML-də lazım olanlar:
//   <html data-theme="...">
//   <body class="...">
//   <button id="theme-switch">...</button>
(function () {
  var body = document.body;
  var html = document.documentElement;
  var btn  = document.getElementById('theme-switch');

  // Əvvəlki seçimi yüklə
  var saved = localStorage.getItem('asrTheme');
  if (saved === 'dark') {
    body.classList.add('dark-mode');
    html.setAttribute('data-theme', 'dark');
  }

  btn.addEventListener('click', function () {
    var isDark = body.classList.contains('dark-mode');
    body.classList.toggle('dark-mode', !isDark);
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('asrTheme', isDark ? 'light' : 'dark');
  });
})();
