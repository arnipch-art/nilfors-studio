// Studio page only: the header tabs switch between panels.
//
// Panels rather than scroll-anchors on purpose. With one project the page is
// barely taller than the window, so a tab that scrolls to a section would
// appear to do nothing, and a scroll-linked selected state could never reach
// the last section at all. Switching panels works at any content length.
//
// Without this script every panel simply stays visible and the tabs behave as
// ordinary in-page links, so the page is still complete with JS disabled.
// The sticky header only draws its glass and its bottom rule once content has
// actually gone under it — at the top of the page there is nothing to separate
// from, and a bar there would just be a line under the logo.
(function () {
  var header = document.querySelector('header');
  if (!header) return;

  var stuck = false;

  function sync() {
    var next = window.scrollY > 4;
    // Only touch the DOM on a crossing. Reading scrollY is cheap; a class
    // write on every scroll event is not.
    if (next !== stuck) {
      stuck = next;
      header.classList.toggle('is-stuck', stuck);
    }
  }

  sync();
  window.addEventListener('scroll', sync, { passive: true });
})();

(function () {
  var tabs = [].slice.call(document.querySelectorAll('.tab'));
  if (!tabs.length) return;

  var panels = tabs
    .map(function (tab) { return document.querySelector(tab.getAttribute('href')); })
    .filter(Boolean);
  if (panels.length !== tabs.length) return;

  function show(id, focus) {
    tabs.forEach(function (tab) {
      var on = tab.getAttribute('href') === '#' + id;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.tabIndex = on ? 0 : -1;
      if (on && focus) tab.focus();
    });
    panels.forEach(function (panel) { panel.hidden = panel.id !== id; });
  }

  // Deep links keep working: /#contact opens on that panel.
  var start = location.hash.replace('#', '');
  show(panels.some(function (p) { return p.id === start; }) ? start : panels[0].id);

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function (event) {
      event.preventDefault();
      var id = tab.getAttribute('href').slice(1);
      show(id);
      // replaceState, not a new entry: flipping a tab is not a page you'd
      // expect the back button to walk through one at a time.
      if (history.replaceState) history.replaceState(null, '', '#' + id);
      else location.hash = id;
    });

    tab.addEventListener('keydown', function (event) {
      var step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      event.preventDefault();
      var next = tabs[(i + step + tabs.length) % tabs.length];
      show(next.getAttribute('href').slice(1), true);
    });
  });

  window.addEventListener('hashchange', function () {
    var id = location.hash.replace('#', '');
    if (panels.some(function (p) { return p.id === id; })) show(id);
  });
})();
