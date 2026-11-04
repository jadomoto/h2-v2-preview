/*
 * H2 light preview: three-camera coverage model rebuilt for a light page.
 * Replaces the dark coverage card with a transparent scene: field-of-view fans
 * drawn at the real lens angles, the car as a sharp cutout <img>, and the four
 * tabs as a segmented control. Camera state still comes from the existing tab
 * handlers (data-camera on the section); this file only listens to it.
 */
(function () {
  var section = document.querySelector('.h2-lens-section');
  var model = section && section.querySelector('.h2-lens-coverage-model');
  var bar = section && section.querySelector('.h2-lens-modebar');
  if (!model || !bar || model.classList.contains('h2l-lens')) return;

  var base = window.H2L_LENS_BASE;
  if (!base) {
    var me = document.currentScript && document.currentScript.src;
    base = me ? me.replace(/\/[^\/]*$/, '') : '/assets';
  }
  var car = base + '/h2l-lens-car-20261104b.webp';
  var NS = 'http://www.w3.org/2000/svg';

  // 1600 x 800 viewBox. Car box: x 420-1180, y 211.5-588.5.
  var CAR = { x: 420, y: 211.5, w: 760, h: 377 };
  var zones = [
    { key: 'front', o: [716, 400], r: 620, dir: 180, half: 68, label: [250, 400], text: 'FRONT 136°' },
    { key: 'cabin', o: [724, 400], r: 480, dir: 0, half: 69, label: [930, 178], text: 'CABIN 138°' },
    { key: 'rear', o: [1131, 400], r: 430, dir: 0, half: 66, label: [1450, 400], text: 'REAR 132°' }
  ];

  function pt(o, r, deg) {
    var a = deg * Math.PI / 180;
    return [o[0] + r * Math.cos(a), o[1] + r * Math.sin(a)];
  }
  function sector(z, half) {
    var p1 = pt(z.o, z.r, z.dir - half), p2 = pt(z.o, z.r, z.dir + half);
    return 'M' + z.o[0] + ' ' + z.o[1] + 'L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) +
      'A' + z.r + ' ' + z.r + ' 0 0 1 ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + 'Z';
  }
  function edges(z, half) {
    var p1 = pt(z.o, z.r * 0.94, z.dir - half), p2 = pt(z.o, z.r * 0.94, z.dir + half);
    return 'M' + z.o[0] + ' ' + z.o[1] + 'L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) +
      'M' + z.o[0] + ' ' + z.o[1] + 'L' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
  }
  function arc(z, k, half) {
    var r = z.r * k, p1 = pt(z.o, r, z.dir - half), p2 = pt(z.o, r, z.dir + half);
    return 'M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + 'A' + r + ' ' + r + ' 0 0 1 ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
  }

  function grad(z) {
    var light = z.key === 'cabin';
    var stops = light
      ? [[0, '#f2f8ff', 0.7], [0.35, '#a9d6ff', 0.38], [0.8, '#5eaaff', 0.08], [1, '#5eaaff', 0]]
      : [[0, '#1769e0', 0.36], [0.3, '#2f86f5', 0.2], [0.75, '#6ab4ff', 0.06], [1, '#6ab4ff', 0]];
    var edge = light ? '#d8ecff' : '#1769e0';
    return '<radialGradient id="h2lG-' + z.key + '" cx="' + z.o[0] + '" cy="' + z.o[1] + '" r="' + z.r + '" gradientUnits="userSpaceOnUse">' +
      stops.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '" stop-opacity="' + s[2] + '"/>'; }).join('') +
      '</radialGradient>' +
      '<radialGradient id="h2lE-' + z.key + '" cx="' + z.o[0] + '" cy="' + z.o[1] + '" r="' + z.r + '" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="' + edge + '" stop-opacity=".9"/><stop offset=".7" stop-color="' + edge + '" stop-opacity=".35"/><stop offset="1" stop-color="' + edge + '" stop-opacity="0"/></radialGradient>' +
      '<clipPath id="h2lC-' + z.key + '"><path class="h2l-clip" data-z="' + z.key + '"/></clipPath>';
  }
  function zone(z) {
    return '<g class="h2l-zone h2l-zone--' + z.key + '" data-z="' + z.key + '">' +
      '<path class="h2l-zone-fill" fill="url(#h2lG-' + z.key + ')"/>' +
      '<g clip-path="url(#h2lC-' + z.key + ')">' +
      '<path class="h2l-zone-arc" d="' + arc(z, 0.42, z.half) + '"/><path class="h2l-zone-arc" d="' + arc(z, 0.72, z.half) + '"/>' +
      '<circle class="h2l-wave" cx="' + z.o[0] + '" cy="' + z.o[1] + '" r="' + z.r + '" style="transform-origin:' + z.o[0] + 'px ' + z.o[1] + 'px"/></g>' +
      '<path class="h2l-zone-edge" stroke="url(#h2lE-' + z.key + ')"/></g>';
  }
  var defs = '<defs>' + zones.map(grad).join('') +
    '<pattern id="h2lDots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1.1" fill="#94a3b8"/></pattern>' +
    '<radialGradient id="h2lFade" cx="800" cy="400" r="800" gradientUnits="userSpaceOnUse" gradientTransform="translate(800 400) scale(1 .56) translate(-800 -400)"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
    '<mask id="h2lFadeMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="800"><rect width="1600" height="800" fill="url(#h2lFade)"/></mask>' +
    '<linearGradient id="h2lVFade" x1="0" y1="0" x2="0" y2="800" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".14" stop-color="#fff"/><stop offset=".86" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
    '<mask id="h2lEdgeMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="800"><rect width="1600" height="800" fill="url(#h2lVFade)"/></mask>' +
    '<radialGradient id="h2lShadow"><stop offset="0" stop-color="#0b1726" stop-opacity=".30"/><stop offset=".55" stop-color="#0b1726" stop-opacity=".12"/><stop offset="1" stop-color="#0b1726" stop-opacity="0"/></radialGradient>' +
    '<mask id="h2lCarMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="800" style="mask-type:alpha"><image href="' + car + '" x="' + CAR.x + '" y="' + CAR.y + '" width="' + CAR.w + '" height="' + CAR.h + '"/></mask>' +
    '</defs>';

  var under = '<svg class="h2l-lens-layer" viewBox="0 0 1600 800" aria-hidden="true" focusable="false">' + defs +
    '<g mask="url(#h2lFadeMask)"><rect width="1600" height="800" fill="url(#h2lDots)" opacity=".5"/>' +
    '<circle class="h2l-ring" cx="800" cy="400" r="330"/><circle class="h2l-ring h2l-ring--ticks" cx="800" cy="400" r="410"/><circle class="h2l-ring" cx="800" cy="400" r="500"/></g>' +
    '<ellipse cx="800" cy="410" rx="440" ry="215" fill="url(#h2lShadow)"/>' +
    '<g mask="url(#h2lEdgeMask)">' + zone(zones[0]) + zone(zones[2]) + '</g></svg>';
  var over = '<svg class="h2l-lens-layer h2l-lens-layer--over" viewBox="0 0 1600 800" aria-hidden="true" focusable="false">' +
    '<g mask="url(#h2lCarMask)">' + zone(zones[1]) + '</g>' +
    [zones[0], zones[2]].map(function (z) {
      return '<g class="h2l-pin h2l-pin--' + z.key + '"><circle class="h2l-pin-glow" cx="' + z.o[0] + '" cy="' + z.o[1] + '" r="16" style="transform-origin:' + z.o[0] + 'px ' + z.o[1] + 'px"/>' +
        '<circle class="h2l-pin-core" cx="' + z.o[0] + '" cy="' + z.o[1] + '" r="6.5"/></g>';
    }).join('') +
    zones.map(function (z) {
      return '<text class="h2l-zone-label h2l-zone-label--' + z.key + '" x="' + z.label[0] + '" y="' + z.label[1] + '" text-anchor="middle" dominant-baseline="middle">' + z.text + '</text>';
    }).join('') + '</svg>';
  var img = '<img class="h2l-lens-car" src="' + car + '" alt="" aria-hidden="true" decoding="async" style="left:' + (CAR.x / 16) + '%;top:' + (CAR.y / 8) + '%;width:' + (CAR.w / 16) + '%"/>';

  var specs = [
    ['front', '01', 'Front', '2.5K · F1.55 · 136°'],
    ['cabin', '02', 'Cabin', '1080P · F2.0 · 138°'],
    ['rear', '03', 'Rear', '1080P · F2.0 · 132°']
  ];
  var readout = '<div class="h2l-lens-readout">' + specs.map(function (s) {
    return '<div class="h2l-lens-spec" data-cam="' + s[0] + '"><span class="h2l-lens-spec-no">' + s[1] + '</span>' +
      '<strong>' + s[2] + '</strong><span class="h2l-lens-spec-val">' + s[3].replace(' · ', '<b> · </b><i>') + '</i></span></div>';
  }).join('') + '</div>';

  model.classList.add('h2l-lens');
  model.innerHTML = under + img + over;
  model.insertAdjacentHTML('afterend', readout);
  var readoutEl = model.nextElementSibling;

  // Fan geometry is driven per frame so each fan opens from its centre line.
  var parts = {};
  zones.forEach(function (z) {
    parts[z.key] = {
      z: z,
      g: model.querySelector('.h2l-zone[data-z="' + z.key + '"]'),
      fill: model.querySelector('.h2l-zone[data-z="' + z.key + '"] .h2l-zone-fill'),
      edge: model.querySelector('.h2l-zone[data-z="' + z.key + '"] .h2l-zone-edge'),
      clip: model.querySelector('.h2l-clip[data-z="' + z.key + '"]'),
      t: 0, target: 0, from: 0, start: 0
    };
  });
  function draw(p) {
    var e = 1 - Math.pow(1 - p.t, 3);
    var half = Math.max(0.5, p.z.half * (0.08 + 0.92 * e));
    var d = sector(p.z, half);
    p.fill.setAttribute('d', d);
    p.clip.setAttribute('d', d);
    p.edge.setAttribute('d', edges(p.z, half));
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = 0;
  function tick(now) {
    var busy = false;
    Object.keys(parts).forEach(function (k) {
      var p = parts[k];
      if (p.t === p.target) return;
      var dur = p.target ? 1200 : 450;
      var k2 = Math.min(1, (now - p.start - (p.delay || 0)) / dur);
      if (k2 < 0) { busy = true; return; }
      p.t = p.from + (p.target - p.from) * k2;
      if (k2 >= 1) p.t = p.target;
      else busy = true;
      draw(p);
    });
    raf = busy ? requestAnimationFrame(tick) : 0;
  }
  var order = { front: ['front'], cabin: ['cabin'], rear: ['rear'], all: ['front', 'cabin', 'rear'] };
  function show(view) {
    model.setAttribute('data-view', view);
    if (readoutEl) readoutEl.setAttribute('data-view', view);
    var on = order[view] || [];
    var now = performance.now();
    Object.keys(parts).forEach(function (k) {
      var p = parts[k], want = on.indexOf(k) >= 0 ? 1 : 0;
      p.g.classList.toggle('is-on', !!want);
      if (p.target === want) return;
      p.from = p.t; p.target = want; p.start = now;
      p.delay = want && view === 'all' ? on.indexOf(k) * 140 : 0;
      if (reduce) { p.t = want; draw(p); }
    });
    if (!reduce && !raf) raf = requestAnimationFrame(tick);
  }
  Object.keys(parts).forEach(function (k) { draw(parts[k]); });

  // The original tab script flips data-camera to "idle" for one frame on every
  // click; only real camera values are forwarded so fans never blink.
  new MutationObserver(function () {
    var cam = section.getAttribute('data-camera');
    if (order[cam]) show(cam);
  }).observe(section, { attributes: true, attributeFilter: ['data-camera'] });

  // Segmented control with a sliding indicator.
  bar.classList.add('h2l-lens-bar');
  var thumb = document.createElement('span');
  thumb.className = 'h2l-lens-thumb';
  thumb.setAttribute('aria-hidden', 'true');
  bar.insertBefore(thumb, bar.firstChild);
  var tabs = Array.prototype.slice.call(bar.querySelectorAll('[role="tab"]'));
  function place() {
    var onTab = bar.querySelector('[aria-selected="true"]');
    bar.classList.toggle('has-active', !!onTab);
    if (!onTab) return;
    thumb.style.width = onTab.offsetWidth + 'px';
    thumb.style.transform = 'translateX(' + onTab.offsetLeft + 'px)';
  }
  new MutationObserver(place).observe(bar, { subtree: true, attributes: true, attributeFilter: ['aria-selected'] });
  window.addEventListener('resize', place);

  // First time the scene scrolls in, open all three fans (unless the visitor already chose one).
  function intro() {
    if (order[section.getAttribute('data-camera')]) return;
    if (tabs[3]) tabs[3].click(); else show('all');
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (list) {
      if (!list[0].isIntersecting) return;
      io.disconnect();
      intro();
    }, { threshold: 0.4 });
    io.observe(model);
  } else {
    intro();
  }
  place();
})();
