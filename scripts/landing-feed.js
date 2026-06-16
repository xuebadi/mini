// -------- landing hero "Live worlds" feed --------
// Reads the public /api/worlds list (the only feed that works for anonymous
// marketing visitors — community is auth-gated) and renders a compact panel
// overlaid on the right of the hero. No bundler, no deps — matches house style.
(function () {
  'use strict';

  var panel = document.getElementById('hero-feed');
  var list = document.getElementById('hero-feed-list');
  if (!panel || !list) return;

  // Tiny top-down swatch palette for the preview minimap.
  var TERRAIN_COLORS = {
    grass: '#6cc24a',
    water: '#3aa6e0',
    sand: '#e6d59a',
    stone: '#9aa0a8',
    dirt: '#a9794f',
    snow: '#eef3f7',
    path: '#cdb68a',
    crops: '#d8b13a',
    lava: '#e2562b',
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Build a small canvas minimap from the sparse [x, z, terrain] preview tuples.
  function miniMap(preview) {
    var grid = (preview && Number(preview.gridSize)) || 20;
    var cells = (preview && Array.isArray(preview.cells)) ? preview.cells : [];
    var px = 4; // pixels per cell
    var size = grid * px;
    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    canvas.className = 'hero-feed-map';
    var ctx = canvas.getContext('2d');
    if (!ctx) return canvas;
    // base ground
    ctx.fillStyle = '#bfe39a';
    ctx.fillRect(0, 0, size, size);
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      var x = c[0], z = c[1];
      var terrain = c[2] || 'grass';
      if (x == null || z == null) continue;
      ctx.fillStyle = TERRAIN_COLORS[terrain] || '#6cc24a';
      ctx.fillRect(x * px, z * px, px, px);
    }
    return canvas;
  }

  function worldRow(w) {
    var li = document.createElement('li');
    li.className = 'hero-feed-item';

    var link = document.createElement('a');
    link.className = 'hero-feed-link';
    link.href = '/worlds?world=' + encodeURIComponent(w.slug || '');

    link.appendChild(miniMap(w.preview));

    var body = document.createElement('div');
    body.className = 'hero-feed-body';

    var players = Number(w.activePlayers) || 0;
    var tiles = Number(w.tileCount) || 0;
    var meta = w.kind === 'starter' ? 'Starter world' : (w.ownerName ? 'by ' + esc(w.ownerName) : 'Published');

    body.innerHTML =
      '<span class="hero-feed-name">' + esc(w.name || w.slug || 'Untitled') + '</span>' +
      '<span class="hero-feed-meta">' + meta + '</span>' +
      '<span class="hero-feed-stats">' +
        '<span class="hero-feed-stat' + (players > 0 ? ' is-live' : '') + '">' +
          '<span class="hero-feed-pip"></span>' + players + ' online' +
        '</span>' +
        '<span class="hero-feed-stat">' + tiles.toLocaleString() + ' tiles</span>' +
      '</span>';

    link.appendChild(body);
    li.appendChild(link);
    return li;
  }

  function render(worlds) {
    list.textContent = '';
    // Most active first, then starter worlds, cap to keep the panel tidy.
    var sorted = worlds.slice().sort(function (a, b) {
      return (Number(b.activePlayers) || 0) - (Number(a.activePlayers) || 0);
    }).slice(0, 5);
    if (!sorted.length) return false;
    for (var i = 0; i < sorted.length; i++) list.appendChild(worldRow(sorted[i]));
    return true;
  }

  function load() {
    fetch('/api/worlds', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        var worlds = data && Array.isArray(data.worlds) ? data.worlds : [];
        if (render(worlds)) panel.hidden = false;
      })
      .catch(function () { /* stay hidden on failure — never break the hero */ });
  }

  load();
  // Light refresh so player counts feel live without hammering the API.
  setInterval(load, 30000);
})();
