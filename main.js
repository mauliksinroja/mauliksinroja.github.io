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
        var match = f === 'all' || (f === 'live' ? card.getAttribute('data-live') === 'yes' : card.getAttribute('data-group') === f);
        card.hidden = !match;
        if (match) shown++;
      });
      count.textContent = shown + (shown === 1 ? ' project' : ' projects');
    });
  });

  // Highlight the section in view
  var links = document.querySelectorAll('[data-section]');
  var ids = ['top', 'work', 'approach', 'writing', 'experience', 'stack', 'contact'];
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

  // Articles: edit data/articles.json to add or remove one
  var list = document.getElementById('articles');
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
  if (list && window.fetch) {
    fetch('data/articles.json', { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (items) {
        items.forEach(function (a) {
          var li = el('li', 'article');
          var art = el('div', 'article-art');
          art.setAttribute('aria-hidden', 'true');
          if (/^#[0-9a-f]{3,8}$/i.test(a.color || '')) art.style.setProperty('--art', a.color);
          art.appendChild(el('span', 'overline', (a.source || 'Article') + ' · Article'));
          art.insertAdjacentHTML('beforeend', '<svg width="28" height="28"><use href="#i-pen"/></svg>');
          art.appendChild(el('strong', '', a.audience || ''));
          if (/^https:\/\//.test(a.image || '') || /^[\w\/.-]+\.(jpe?g|png|webp)$/i.test(a.image || '')) {
            var img = el('img', 'article-cover');
            img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
            img.referrerPolicy = 'no-referrer';
            img.width = 1280; img.height = 720;
            img.onload = function () { art.classList.add('has-cover'); };
            img.onerror = function () { img.remove(); };
            img.src = a.image;
            art.appendChild(img);
          }
          var body = el('div', 'article-body');
          body.appendChild(el('span', 'overline', a.audience || ''));
          body.appendChild(el('h3', '', a.title));
          body.appendChild(el('p', '', a.summary || ''));
          var link = el('a', 'store');
          if (/^https:\/\//.test(a.url || '')) link.href = a.url;
          link.target = '_blank'; link.rel = 'noopener';
          link.insertAdjacentHTML('beforeend', '<svg width="12" height="12" aria-hidden="true"><use href="#i-external"/></svg>');
          link.appendChild(document.createTextNode('Read on ' + (a.source || 'the web')));
          link.setAttribute('aria-label', 'Read "' + a.title + '" on ' + (a.source || 'the web'));
          body.appendChild(link);
          li.appendChild(art); li.appendChild(body);
          list.appendChild(li);
        });
      })
      .catch(function () {
        list.insertAdjacentHTML('afterend', '<p class="store-note">Read my articles on <a href="https://www.linkedin.com/in/mauliksinroja/recent-activity/articles/" rel="noopener" target="_blank">LinkedIn</a>.</p>');
      });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
