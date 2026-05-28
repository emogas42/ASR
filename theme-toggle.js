// ── Unified Theme Toggle ──────────────────────────────────────────────────────
// Works on every page regardless of which button ID is used.
// Reads/writes a single key: localStorage.asrTheme ('dark' | 'light')
// Sets both html[data-theme] and body.dark-mode so all CSS rules match.
(function () {
  var html  = document.documentElement;
  var body  = document.body;

  // Support both button IDs present across different page templates
  var btn   = document.getElementById('theme-switch') || document.getElementById('themeBtn');
  var label = document.getElementById('themeLabel');

  function apply(dark) {
    if (dark) {
      html.classList.add('dark-mode');
      body.classList.add('dark-mode');
      html.setAttribute('data-theme', 'dark');
      if (label) label.textContent = 'Light mode';
    } else {
      html.classList.remove('dark-mode');
      body.classList.remove('dark-mode');
      html.setAttribute('data-theme', 'light');
      if (label) label.textContent = 'Dark mode';
    }
  }

  // Restore saved preference immediately (before first paint)
  apply(localStorage.getItem('asrTheme') === 'dark');

  if (btn) {
    btn.addEventListener('click', function () {
      var isDark = html.classList.contains('dark-mode');
      apply(!isDark);
      localStorage.setItem('asrTheme', isDark ? 'light' : 'dark');
    });
  }
})();
