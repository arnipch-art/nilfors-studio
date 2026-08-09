// Theme toggle, shared by the studio page and every app section.
// The initial value is set by a tiny inline script in each page's
// <head> so the correct theme paints on the first frame — doing it here would
// flash the wrong one first.
(function () {
  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('nilfors-theme', theme); } catch (e) {}
    var button = document.querySelector('.toggle');
    if (button) {
      button.setAttribute('aria-label',
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-theme') || 'dark');

    var button = document.querySelector('.toggle');
    if (!button) return;

    button.addEventListener('click', function () {
      apply(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
  });

  // Follow the system only while the visitor hasn't chosen for themselves.
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
      var stored;
      try { stored = localStorage.getItem('nilfors-theme'); } catch (err) {}
      if (!stored) root.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    });
  }
})();
