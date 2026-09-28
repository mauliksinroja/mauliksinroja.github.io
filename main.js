(function () {
  // Project filter
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('#projects .card');
  var count = document.getElementById('count');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      var shown = 0;
      cards.forEach(function (card) {
        var match = f === 'all' || card.getAttribute('data-group') === f;
        card.hidden = !match;
        if (match) shown++;
      });
      count.textContent = shown + (shown === 1 ? ' project' : ' projects');
    });
  });

  // Highlight the section in view
  var links = document.querySelectorAll('[data-section]');
  var ids = ['top', 'work', 'approach', 'experience', 'stack', 'contact'];
  var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  function setActive(id) {
    links.forEach(function (l) {
      var on = l.getAttribute('data-section') === id;
      if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
      if (l.classList.contains('tab')) l.classList.toggle('is-active', on);
    });
  }
  if ('IntersectionObserver' in window) {
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var current = ids.filter(function (id) { return visible[id]; })[0];
      if (current) setActive(current);
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }
  setActive('top');

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
