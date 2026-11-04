/*
 * H2 light preview: two extra 4G modules and a small reorder.
 *  1. "Act from anywhere" (after 4G Remote Monitoring): two-way talk,
 *     one-touch Cloud Shot and device sharing, shown on an HTML phone.
 *  2. "Connected out of the box" (before LTE plans): 4G, eSIM, Wi-Fi 6,
 *     multi-GNSS and how H2 picks the link.
 *  Accident Evidence moves up to sit right after AOV Parking Guard.
 * Feature facts follow the H2 user manual (ch. 2, 12, 15-18).
 */
(function () {
  var page = document.querySelector('.h2-remote-connect-section');
  if (!page || document.querySelector('.h2l-act')) return;

  var base = window.H2L_REMOTE_BASE;
  if (!base) {
    var me = document.currentScript && document.currentScript.src;
    base = me ? me.replace(/\/[^\/]*$/, '') : '/assets';
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  var ico = {
    talk: '<svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    shot: '<svg viewBox="0 0 24 24"><path d="M7 17.5h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.2 9.1 4.2 4.2 0 0 0 7 17.5Z"/><path d="M12 15V10m-2.2 2.2L12 10l2.2 2.2"/></svg>',
    share: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5"/></svg>',
    wifi: '<svg viewBox="0 0 24 24"><path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.2a9.5 9.5 0 0 1 13 0M8.6 15.3a5 5 0 0 1 6.8 0"/><circle cx="12" cy="18.6" r="1.2"/></svg>',
    cell: '<svg viewBox="0 0 24 24"><path d="M4 19v-3M9 19v-6M14 19V9M19 19V5"/></svg>',
    key: '<svg viewBox="0 0 24 24"><circle cx="7.5" cy="14.5" r="3.5"/><path d="M10 12l9-9M15.5 6.5l2 2M13.5 8.5l1.5 1.5"/></svg>'
  };

  /* ---------- 1. Act from anywhere ---------- */
  var acts = [
    { key: 'talk', icon: ico.talk, title: 'Two-way Talk', text: 'Start a voice call from the live view. Ask someone to step away from the car, or check in with the driver.' },
    { key: 'shot', icon: ico.shot, title: 'One-touch Cloud Shot', text: 'Short-press the power button and H2 captures a highlight clip and uploads it straight to the cloud.' },
    { key: 'share', icon: ico.share, title: 'Family Sharing', text: 'Share device access with family from the app, and keep up to 5 cloud dash cams on one account.' }
  ];
  var bars = '';
  for (var i = 0; i < 26; i++) bars += '<i style="animation-delay:' + (-((i * 37) % 100) / 100).toFixed(2) + 's"></i>';
  var phone =
    '<div class="h2l-act-phone" aria-hidden="true"><div class="h2l-act-screen">' +
    '<div class="h2l-act-status"><span>9:41</span><span class="h2l-act-sig">' + ico.cell + '<b>4G</b></span></div>' +
    // talk
    '<div class="h2l-act-view" data-v="talk">' +
    '<div class="h2l-act-bar"><span class="h2l-act-live"><i></i>LIVE</span><strong>H2 · Front</strong><span class="h2l-act-chip">4G</span></div>' +
    '<div class="h2l-act-video"><img src="/assets/day-h2-scene05-night-wide.jpg" alt="" loading="lazy"><span class="h2l-act-ts">PARKED · 23:14:08</span></div>' +
    '<div class="h2l-act-call"><span class="h2l-act-call-label">Talking through H2</span><span class="h2l-act-timer">00:00</span>' +
    '<div class="h2l-act-wave">' + bars + '</div>' +
    '<div class="h2l-act-call-btns"><span class="h2l-act-round">' + ico.talk + '</span><span class="h2l-act-round h2l-act-round--end"><svg viewBox="0 0 24 24"><path d="M3 14.5c5-4.6 13-4.6 18 0l-2.4 2.4-3.3-1.5v-2.2a9 9 0 0 0-6.6 0v2.2l-3.3 1.5Z"/></svg></span></div></div>' +
    '</div>' +
    // cloud shot
    '<div class="h2l-act-view" data-v="shot">' +
    '<div class="h2l-act-bar"><span class="h2l-act-live"><i></i>LIVE</span><strong>H2 · Front</strong><span class="h2l-act-chip">4G</span></div>' +
    '<div class="h2l-act-video h2l-act-video--road"><img src="/assets/h2-road-test-film-v2-poster-20260729.jpg" alt="" loading="lazy"><span class="h2l-act-flash"></span></div>' +
    '<div class="h2l-act-upload"><div class="h2l-act-upload-top"><span class="h2l-act-cloud">' + ico.shot + '</span><div><strong>Cloud Shot</strong><span class="h2l-act-up-state">Uploading highlight clip…</span></div></div>' +
    '<div class="h2l-act-progress"><i></i></div></div>' +
    '<div class="h2l-act-list"><div><b>Cloud Shot</b><span>Just now</span></div><div><b>AI Sentinel Alert</b><span>14:42</span></div><div><b>Collision Alert</b><span>Yesterday</span></div></div>' +
    '</div>' +
    // sharing
    '<div class="h2l-act-view" data-v="share">' +
    '<div class="h2l-act-title">Device sharing</div>' +
    '<div class="h2l-act-device"><span class="h2l-act-dot"></span><div><strong>H2 · Family SUV</strong><span>Online · 4G</span></div></div>' +
    '<div class="h2l-act-members">' +
    '<div><span class="h2l-act-av" style="--c:#1769e0">Y</span><p><b>You</b><span>Owner</span></p></div>' +
    '<div><span class="h2l-act-av" style="--c:#0f9d8a">E</span><p><b>Emma</b><span>Live view · Playback</span></p></div>' +
    '<div><span class="h2l-act-av" style="--c:#e08a17">L</span><p><b>Leo</b><span>Live view · Playback</span></p></div>' +
    '</div>' +
    '<div class="h2l-act-invite">+ Invite family</div>' +
    '<div class="h2l-act-quota">Cloud dash cams on this account <b>2 / 5</b></div>' +
    '</div>' +
    '</div></div>';

  var act = el(
    '<section class="h2-redo-section h2l-act"><div class="h2-redo-wrap">' +
    '<div class="h2-redo-head center"><span class="h2-redo-eyebrow">Beyond live view</span>' +
    '<h3>Act From Anywhere.</h3>' +
    '<p>H2 does more than show you the car. Speak through it, send a moment to the cloud, and share access with the people who drive it.</p></div>' +
    '<div class="h2l-act-panel"><div class="h2l-act-copy" role="tablist" aria-label="Remote actions">' +
    acts.map(function (a, i) {
      return '<button type="button" role="tab" class="h2l-act-item" data-k="' + a.key + '" aria-selected="' + (i ? 'false' : 'true') + '">' +
        '<span class="h2l-act-icon">' + a.icon + '</span><span class="h2l-act-text"><strong>' + a.title + '</strong><span>' + a.text + '</span></span>' +
        '<span class="h2l-act-progressbar"><i></i></span></button>';
    }).join('') +
    '<p class="h2l-act-note">Two-way talk and remote access need an active 4G plan. Cloud Shot uses cloud storage, included from the Standard plan. Shared users depend on the plan.</p>' +
    '</div><div class="h2l-act-stage">' + phone + '</div></div></div></section>'
  );
  page.after(act);

  var items = Array.prototype.slice.call(act.querySelectorAll('.h2l-act-item'));
  var timer = act.querySelector('.h2l-act-timer');
  var upState = act.querySelector('.h2l-act-up-state');
  var current = 'talk', t0 = 0, auto = true, inView = false, cycle = 0, loopId = 0;
  var DWELL = 6500;
  function setView(k) {
    current = k;
    act.setAttribute('data-view', k);
    items.forEach(function (b) {
      var on = b.getAttribute('data-k') === k;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.classList.toggle('is-on', on);
    });
    t0 = performance.now();
    cycle++;
    act.classList.remove('is-cycling');
    void act.offsetWidth;
    if (auto && inView && !reduce) act.classList.add('is-cycling');
  }
  items.forEach(function (b) {
    b.addEventListener('click', function () {
      auto = false;
      act.classList.remove('is-cycling');
      setView(b.getAttribute('data-k'));
    });
  });
  function frame(now) {
    var s = Math.floor((now - t0) / 1000);
    if (current === 'talk') timer.textContent = '00:' + (s < 10 ? '0' : '') + (s % 60);
    if (current === 'shot') upState.textContent = (now - t0) > 2600 ? 'Saved to cloud' : 'Uploading highlight clip…';
    act.classList.toggle('is-saved', current === 'shot' && (now - t0) > 2600);
    if (auto && inView && !reduce && now - t0 > DWELL) {
      var i = (acts.map(function (a) { return a.key; }).indexOf(current) + 1) % acts.length;
      setView(acts[i].key);
    }
    loopId = inView ? requestAnimationFrame(frame) : 0;
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (list) {
      inView = list[0].isIntersecting;
      act.classList.toggle('is-visible', inView);
      if (inView && !loopId) { t0 = performance.now(); setView(current); loopId = requestAnimationFrame(frame); }
    }, { threshold: 0.35 }).observe(act.querySelector('.h2l-act-panel'));
  } else {
    inView = true; loopId = requestAnimationFrame(frame);
  }
  setView('talk');

  /* ---------- 2. Connected out of the box ---------- */
  var plans = document.querySelector('#lte-plans') || document.querySelector('.h2l-lte');
  var tiles = [
    { img: 'h2l-net-4g', k: '4G LTE', t: 'Online wherever it’s parked', d: 'A built-in 4G module keeps H2 reachable for live view, alerts and cloud backup.' },
    { img: 'h2l-net-esim', k: 'Built-in eSIM', t: 'No SIM card to buy or insert', d: 'H2 activates in the app and selects the carrier network automatically.' },
    { img: 'h2l-net-wifi6', k: 'Wi-Fi 6', t: 'Fast local transfer', d: 'Dual-band 2.4 / 5 GHz hotspot for HD downloads next to the car, with no cellular data used.' },
    { img: 'h2l-net-gnss', k: 'Multi-GNSS', t: 'Five satellite systems', d: 'GPS, GLONASS, Galileo, BDS and QZSS with A-GPS for steadier location and route history.' }
  ];
  var modes = [
    { icon: ico.cell, k: 'Away from the car', t: '4G', d: 'Live view, playback, alerts and two-way talk from anywhere with coverage.' },
    { icon: ico.wifi, k: 'Next to the car', t: 'Wi-Fi 6', d: 'Download full-quality clips over the device hotspot to save your 4G data.' },
    { icon: ico.key, k: 'Engine on', t: 'BLE quick connect', d: 'After first pairing, your phone reconnects to the H2 hotspot automatically.' }
  ];
  var net = el(
    '<section class="h2-redo-section h2l-net"><div class="h2-redo-wrap">' +
    '<div class="h2-redo-head center"><span class="h2-redo-eyebrow">Connectivity, built in</span>' +
    '<h3>Connected Out of the Box.</h3>' +
    '<p>4G, Wi-Fi 6, BLE and multi-system GNSS work together, so H2 stays reachable, transfers fast, and always knows where it is.</p></div>' +
    '<div class="h2l-net-grid">' + tiles.map(function (x, i) {
      return '<article class="h2l-net-tile" style="--d:' + (i * 90) + 'ms"><img src="' + base + '/' + x.img + '-20261104.webp" alt="" loading="lazy">' +
        '<div class="h2l-net-copy"><span>' + x.k + '</span><strong>' + x.t + '</strong><p>' + x.d + '</p></div></article>';
    }).join('') + '</div>' +
    '<div class="h2l-net-modes"><div class="h2l-net-modes-head"><strong>The right link, automatically</strong><span>H2 uses the connection that fits where you are.</span></div>' +
    '<div class="h2l-net-mode-row">' + modes.map(function (m) {
      return '<div class="h2l-net-mode"><span class="h2l-net-mode-ico">' + m.icon + '</span><span class="h2l-net-mode-k">' + m.k + '</span><strong>' + m.t + '</strong><p>' + m.d + '</p></div>';
    }).join('') + '</div></div>' +
    '<p class="h2l-net-note">4G coverage and bands vary by region. Remote features require an active H2 4G plan.</p>' +
    '</div></section>'
  );
  if (plans) plans.before(net);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (list, o) {
      if (!list[0].isIntersecting) return;
      net.classList.add('is-visible'); o.disconnect();
    }, { threshold: 0.2 }).observe(net);
  } else { net.classList.add('is-visible'); }

  /* ---------- 3. Reorder: Accident Evidence right after AOV ---------- */
  var aov = document.querySelector('.h2-redo-aov');
  var evidence = document.querySelector('.h2-prerecord-section');
  if (aov && evidence && aov.nextElementSibling !== evidence) aov.after(evidence);
})();
