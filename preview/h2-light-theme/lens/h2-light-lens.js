/*
 * H2 light preview: three-camera coverage model rebuilt for a light page.
 * Replaces the dark coverage card with a transparent SVG scene (car cutout,
 * light cones, range rings) and turns the four tabs into a segmented control.
 * Camera state still comes from the existing tab handlers (data-camera on the
 * section); this file only listens to it.
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

  // Geometry in a 1600 x 800 viewBox. The car spans x 330-1270.
  var F = [696, 400], R = [1209, 400];
  function sector(o, r, dir, half) {
    var a1 = (dir - half) * Math.PI / 180, a2 = (dir + half) * Math.PI / 180;
    var p1 = [o[0] + r * Math.cos(a1), o[1] + r * Math.sin(a1)];
    var p2 = [o[0] + r * Math.cos(a2), o[1] + r * Math.sin(a2)];
    return 'M' + o[0] + ' ' + o[1] + ' L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) +
      ' A' + r + ' ' + r + ' 0 0 1 ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + ' Z';
  }
  function edges(o, r, dir, half) {
    return [dir - half, dir + half].map(function (d) {
      var a = d * Math.PI / 180;
      return 'M' + o[0] + ' ' + o[1] + ' L' + (o[0] + r * Math.cos(a)).toFixed(1) + ' ' + (o[1] + r * Math.sin(a)).toFixed(1);
    }).join(' ');
  }
  var zones = [
    { key: 'front', o: F, r: 640, dir: 180, half: 36, label: [250, 214], text: 'FRONT' },
    { key: 'cabin', o: [F[0] + 8, F[1]], r: 470, dir: 0, half: 40, label: [918, 146], text: 'CABIN' },
    { key: 'rear', o: R, r: 360, dir: 0, half: 32, label: [1424, 250], text: 'REAR' }
  ];

  var car = base + '/h2l-lens-car-20261104.webp';
  function zone(z) {
    var o = z.o, w = '';
    for (var i = 0; i < 3; i++) w += '<circle class="h2l-wave" style="animation-delay:' + (i * 0.9) + 's" cx="' + o[0] + '" cy="' + o[1] + '" r="' + z.r + '"/>';
    return '<g class="h2l-zone h2l-zone--' + z.key + '" style="transform-origin:' + o[0] + 'px ' + o[1] + 'px">' +
      '<path class="h2l-zone-fill" d="' + sector(o, z.r, z.dir, z.half) + '" fill="url(#h2lG-' + z.key + ')"/>' +
      '<g clip-path="url(#h2lC-' + z.key + ')">' + w +
      '<g class="h2l-sweep" style="transform-origin:' + o[0] + 'px ' + o[1] + 'px;--h2l-half:' + (z.half - 4) + 'deg"><path d="' + edges(o, z.r * 0.9, z.dir, 0).split(' M')[0] + '" stroke="url(#h2lE-' + z.key + ')"/></g></g>' +
      '<path class="h2l-zone-edge" d="' + edges(o, z.r * 0.92, z.dir, z.half) + '" stroke="url(#h2lE-' + z.key + ')"/></g>';
  }
  function label(z) {
    return '<text class="h2l-zone-label h2l-zone-label--' + z.key + '" x="' + z.label[0] + '" y="' + z.label[1] + '" text-anchor="middle">' + z.text + '</text>';
  }

  var svg = '<svg class="h2l-lens-svg" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><defs>' +
    '<pattern id="h2lDots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="11" cy="11" r="1.1" fill="#8fa0b6"/></pattern>' +
    '<radialGradient id="h2lFade" cx="800" cy="400" r="760" gradientUnits="userSpaceOnUse" gradientTransform="translate(800 400) scale(1 .62) translate(-800 -400)"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
    '<mask id="h2lFadeMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="800"><rect width="1600" height="800" fill="url(#h2lFade)"/></mask>' +
    '<radialGradient id="h2lShadow"><stop offset="0" stop-color="#0b1726" stop-opacity=".34"/><stop offset=".6" stop-color="#0b1726" stop-opacity=".12"/><stop offset="1" stop-color="#0b1726" stop-opacity="0"/></radialGradient>' +
    zones.map(function (z) {
      return '<radialGradient id="h2lG-' + z.key + '" cx="' + z.o[0] + '" cy="' + z.o[1] + '" r="' + z.r + '" gradientUnits="userSpaceOnUse">' +
        (z.key === 'cabin'
          ? '<stop offset="0" stop-color="#eaf5ff" stop-opacity=".62"/><stop offset=".4" stop-color="#8ccaff" stop-opacity=".34"/><stop offset=".85" stop-color="#4ea2ff" stop-opacity=".08"/><stop offset="1" stop-color="#4ea2ff" stop-opacity="0"/>'
          : '<stop offset="0" stop-color="#1769e0" stop-opacity=".42"/><stop offset=".35" stop-color="#2f8cff" stop-opacity=".22"/><stop offset=".8" stop-color="#5fb4ff" stop-opacity=".06"/><stop offset="1" stop-color="#5fb4ff" stop-opacity="0"/>') +
        '</radialGradient>' +
        '<linearGradient id="h2lE-' + z.key + '" x1="' + z.o[0] + '" y1="0" x2="' + (z.o[0] + (z.dir ? 1 : -1) * z.r) + '" y2="0" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="' + (z.key === 'cabin' ? '#cfe8ff' : '#1769e0') + '" stop-opacity=".95"/><stop offset="1" stop-color="' + (z.key === 'cabin' ? '#cfe8ff' : '#1769e0') + '" stop-opacity="0"/></linearGradient>' +
        '<clipPath id="h2lC-' + z.key + '"><path d="' + sector(z.o, z.r, z.dir, z.half) + '"/></clipPath>';
    }).join('') +
    '<mask id="h2lCarMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="800" style="mask-type:alpha"><image href="' + car + '" x="330" y="167" width="940" height="466"/></mask>' +
    '</defs>' +
    '<g class="h2l-lens-field" mask="url(#h2lFadeMask)"><rect width="1600" height="800" fill="url(#h2lDots)" opacity=".55"/>' +
    '<circle class="h2l-ring" cx="800" cy="400" r="300"/><circle class="h2l-ring" cx="800" cy="400" r="420"/>' +
    '<circle class="h2l-ring h2l-ring--ticks" cx="800" cy="400" r="362"/>' +
    '<circle class="h2l-ring h2l-ring--orbit" cx="800" cy="400" r="482"/>' +
    '<path class="h2l-axis" d="M40 400 H1560 M800 40 V760"/></g>' +
    '<ellipse cx="800" cy="414" rx="520" ry="250" fill="url(#h2lShadow)"/>' +
    zones.filter(function (z) { return z.key !== 'cabin'; }).map(zone).join('') +
    '<image class="h2l-lens-car" href="' + car + '" x="330" y="167" width="940" height="466"/>' +
    '<g mask="url(#h2lCarMask)">' + zone(zones[1]) + '</g>' +
    [['front', F], ['rear', R]].map(function (p) {
      return '<g class="h2l-pin h2l-pin--' + p[0] + '"><circle class="h2l-pin-pulse" cx="' + p[1][0] + '" cy="' + p[1][1] + '" r="9" style="transform-origin:' + p[1][0] + 'px ' + p[1][1] + 'px"/>' +
        '<circle class="h2l-pin-core" cx="' + p[1][0] + '" cy="' + p[1][1] + '" r="7"/></g>';
    }).join('') +
    zones.map(label).join('') +
    '</svg>';

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
  model.innerHTML = svg;
  model.insertAdjacentHTML('afterend', readout);

  // Segmented control with a sliding indicator.
  bar.classList.add('h2l-lens-bar');
  var thumb = document.createElement('span');
  thumb.className = 'h2l-lens-thumb';
  thumb.setAttribute('aria-hidden', 'true');
  bar.insertBefore(thumb, bar.firstChild);
  var tabs = Array.prototype.slice.call(bar.querySelectorAll('[role="tab"]'));
  function place() {
    var on = bar.querySelector('[aria-selected="true"]');
    bar.classList.toggle('has-active', !!on);
    if (!on) return;
    thumb.style.width = on.offsetWidth + 'px';
    thumb.style.transform = 'translateX(' + on.offsetLeft + 'px)';
  }
  new MutationObserver(place).observe(bar, { subtree: true, attributes: true, attributeFilter: ['aria-selected'] });
  window.addEventListener('resize', place);

  // One guided pass (front, cabin, rear, all) the first time the model scrolls in.
  var touched = false;
  bar.addEventListener('pointerdown', function () { touched = true; }, true);
  bar.addEventListener('keydown', function () { touched = true; }, true);
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tour() {
    if (reduce) { if (!touched && tabs[3]) tabs[3].click(); return; }
    tabs.forEach(function (tab, i) {
      setTimeout(function () { if (!touched) tab.click(); }, i * 1700);
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (list) {
      if (!list[0].isIntersecting) return;
      io.disconnect();
      if (!touched && (section.getAttribute('data-camera') || 'idle') === 'idle') tour();
    }, { threshold: 0.45 });
    io.observe(model);
  }
  place();
})();
