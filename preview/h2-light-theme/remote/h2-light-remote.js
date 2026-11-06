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
    { key: 'share', icon: ico.share, title: 'Family Sharing', text: 'Share live view and playback with up to 10 family members, and keep up to 5 cloud dash cams on one account.' }
  ];
  var bars = '';
  for (var i = 0; i < 26; i++) bars += '<i style="animation-delay:' + (-((i * 37) % 100) / 100).toFixed(2) + 's"></i>';
  var phone =
    '<div class="h2l-act-phone" aria-hidden="true"><div class="h2l-act-screen">' +
    '<div class="h2l-act-status"><span>9:41</span><span class="h2l-act-sig">' + ico.cell + '<b>4G</b></span></div>' +
    // talk
    '<div class="h2l-act-view" data-v="talk">' +
    '<div class="h2l-act-bar"><span class="h2l-act-live"><i></i>LIVE</span><strong>H2 · Front</strong><span class="h2l-act-chip">4G</span></div>' +
    '<div class="h2l-act-video"><img src="' + base + '/h2l-act-night-20261104.webp" alt="" loading="lazy"><span class="h2l-act-ts">PARKED · 21:16:42</span></div>' +
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
    '<div class="h2l-act-quota">Shared users <b>2 / 10</b></div>' +
    '</div>' +
    '</div></div>';

  var act = el(
    '<section class="h2-redo-section h2l-act"><div class="h2-redo-wrap">' +
    '<div class="h2-redo-head center"><span class="h2-redo-eyebrow">Beyond live view</span>' +
    '<h3>Act From Anywhere.</h3>' +
    '<p>H2 does more than show you the car. Speak through it, send a moment to the cloud, and share access with the people who drive it.</p></div>' +
    '<div class="h2l-act-panel"><div class="h2l-act-copy" role="tablist" aria-label="Remote actions"><span class="h2l-act-group">Take action · 05–07</span>' +
    acts.map(function (a, i) {
      return '<button type="button" role="tab" class="h2l-act-item" data-k="' + a.key + '" data-n="0' + (i + 5) + '" aria-selected="' + (i ? 'false' : 'true') + '">' +
        '<span class="h2l-act-icon">' + a.icon + '</span><span class="h2l-act-text"><strong>' + a.title + '</strong><span>' + a.text + '</span></span>' +
        '<span class="h2l-act-progressbar"><i></i></span></button>';
    }).join('') +
    '<p class="h2l-act-note">Two-way talk and remote access need an active 4G plan. Cloud Shot uses cloud storage, included from the Standard plan. Shared-user limits vary by plan.</p>' +
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
  act.h2lGo = function (k) { auto = false; act.classList.remove('is-cycling'); setView(k); };

  /* ---------- 1b. Check in: the "Your car is still within sight" panel, rebuilt as the same phone ---------- */
  var band = page.querySelector('.h2-reach-band');
  if (band) {
    var sIco = {
      live: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="2.2"/></svg>',
      location: '<svg viewBox="0 0 24 24"><path d="M12 21s6.2-6.1 6.2-11.1A6.2 6.2 0 0 0 5.8 9.9C5.8 14.9 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.1"/></svg>',
      alerts: '<svg viewBox="0 0 24 24"><path d="M6.4 17.2h11.2l-1.1-1.8V10.6a4.5 4.5 0 0 0-9 0v4.8z"/><path d="M10.2 17.2a1.8 1.8 0 0 0 3.6 0"/></svg>',
      playback: '<svg viewBox="0 0 24 24"><rect x="4.5" y="6" width="15" height="12" rx="2.2"/><path d="M10.2 9.4 15.2 12l-5 2.6z"/></svg>'
    };
    var sees = [
      { key: 'live', title: 'Live View', text: 'Open the app over 4G and watch your car in real time, from anywhere.' },
      { key: 'location', title: 'Location Check', text: 'See exactly where the car is parked, with live GPS position on the map.' },
      { key: 'alerts', title: 'Remote Alerts', text: 'Get notified the moment H2 detects a person, a bump or a collision.' },
      { key: 'playback', title: 'Remote Playback', text: 'Review event clips from the cloud without going back to the car.' }
    ];
    var tool = function (d) { return '<span class="h2l-see-tool"><svg viewBox="0 0 24 24">' + d + '</svg></span>'; };
    var mapSvg = function (cls) {
      return '<svg class="' + cls + '" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
        '<rect width="300" height="300" fill="#eef1f5"/>' +
        '<path d="M-10 70 Q120 40 310 95" class="m-road m-road--big"/><path d="M60 -10 L95 310" class="m-road"/><path d="M200 -10 Q185 150 230 310" class="m-road m-road--big"/>' +
        '<path d="M-10 205 L310 175" class="m-road"/><path d="M-10 255 L120 310" class="m-road m-road--thin"/><path d="M130 -10 L150 120" class="m-road m-road--thin"/>' +
        '<rect x="108" y="110" width="70" height="52" rx="10" fill="#d8ecd9"/><ellipse cx="258" cy="240" rx="52" ry="34" fill="#cfe3f6"/>' +
        '<rect x="20" y="100" width="30" height="24" rx="4" class="m-blk"/><rect x="236" y="120" width="40" height="30" rx="4" class="m-blk"/><rect x="118" y="215" width="44" height="30" rx="4" class="m-blk"/>' +
        '<rect x="12" y="140" width="38" height="52" rx="5" class="m-blk"/><rect x="104" y="20" width="22" height="34" rx="4" class="m-blk"/><rect x="158" y="18" width="34" height="26" rx="4" class="m-blk"/><rect x="242" y="20" width="44" height="40" rx="5" class="m-blk"/>' +
        '<rect x="70" y="218" width="36" height="28" rx="4" class="m-blk"/><rect x="176" y="228" width="16" height="40" rx="4" class="m-blk"/><rect x="214" y="186" width="30" height="20" rx="4" class="m-blk"/>' +
        '<path d="M-10 150 L110 140" class="m-road m-road--thin"/><path d="M150 120 L310 140" class="m-road m-road--thin"/><path d="M95 190 L140 310" class="m-road m-road--thin"/>' +
        '<text x="14" y="64" class="m-txt" transform="rotate(-8 14 64)">OCEAN AVE</text><text x="210" y="168" class="m-txt" transform="rotate(84 210 168)">MAIN ST</text><text x="20" y="200" class="m-txt" transform="rotate(-5 20 200)">5TH ST</text><text x="118" y="140" class="m-txt m-txt--park">PARK</text></svg>';
    };
    var sPhone =
      '<div class="h2l-act-phone" aria-hidden="true"><div class="h2l-act-screen">' +
      '<div class="h2l-act-status"><span>9:41</span><span class="h2l-act-sig">' + ico.cell + '<b>4G</b></span></div>' +
      // live
      '<div class="h2l-act-view" data-v="live">' +
      '<div class="h2l-act-bar"><span class="h2l-act-live"><i></i>LIVE</span><strong>H2 · Front</strong><span class="h2l-act-chip">4G</span></div>' +
      '<div class="h2l-act-video h2l-see-video"><img src="' + base + '/h2l-act-garage-20261104.webp" alt="" loading="lazy">' +
      '<span class="h2l-see-rec"><i></i>REC</span><span class="h2l-see-rate"><b>2259</b> kb/s</span><span class="h2l-act-ts h2l-see-clock">2026-06-22 14:32:08</span></div>' +
      '<div class="h2l-see-tools">' + tool('<path d="M9 7v10M15 7v10"/>') + tool('<path d="M5 10v4h3l4 3V7L8 10Z"/><path d="M16 9l5 6M21 9l-5 6"/>') + tool('<rect x="4" y="7" width="16" height="12" rx="2.5"/><circle cx="12" cy="13" r="3.2"/><path d="M9 7l1.2-2h3.6L15 7"/>') + tool('<path d="M6 4h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2Z"/>') + tool('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>') + '</div>' +
      '<div class="h2l-see-quick"><span><i>' + ico.wifi + '</i>Direct Connect</span><span><i><svg viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="12" rx="2.5"/><circle cx="12" cy="13" r="3.2"/></svg></i>Screenshot</span><span><i><svg viewBox="0 0 24 24"><rect x="3.5" y="6.5" width="13" height="11" rx="2"/><path d="M16.5 10.5 21 8v8l-4.5-2.5"/></svg></i>Record</span><span><i>' + sIco.playback + '</i>Playback</span></div>' +
      '<div class="h2l-see-mini">' + mapSvg('h2l-see-map') + '<span class="h2l-see-car"><i></i></span><span class="h2l-see-speed"><b>0</b>MPH</span></div>' +
      '</div>' +
      // location
      '<div class="h2l-act-view h2l-see-locview" data-v="location">' + mapSvg('h2l-see-map h2l-see-map--full') +
      '<svg class="h2l-see-route" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice"><path d="M70 268 Q92 205 140 190 T150 136"/></svg>' +
      '<span class="h2l-see-me"></span><span class="h2l-see-pin"><i></i><i></i><b></b></span>' +
      '<div class="h2l-see-sheet"><div class="h2l-see-sheet-top"><span class="h2l-act-dot"></span><div><strong>H2 · Family SUV</strong><span>Parked · Updated just now</span></div></div>' +
      '<p class="h2l-see-gps">GPS 22.5431° N · 114.0579° E</p><div class="h2l-see-btns"><span>Navigate</span><span class="is-primary">Live view</span></div></div>' +
      '</div>' +
      // alerts (lock screen)
      '<div class="h2l-act-view h2l-see-lock" data-v="alerts">' +
      '<div class="h2l-see-lock-time"><b>21:16</b><span>Monday, June 22</span></div>' +
      '<div class="h2l-see-notes">' +
      '<div class="h2l-see-note h2l-see-note--hero"><div class="h2l-see-note-top"><span class="h2l-sen-app">H2</span><div><strong>AI Sentinel Alert</strong><span>Person detected near your car</span></div><time>now</time></div>' +
      '<img src="' + base + '/h2l-act-night-20261104.webp" alt="" loading="lazy"><div class="h2l-see-note-btns"><span>Live view</span><button type="button" class="h2l-see-talk">Talk now →</button></div></div>' +
      '<div class="h2l-see-note"><div class="h2l-see-note-top"><span class="h2l-sen-app">H2</span><div><strong>Vibration Alert</strong><span>Front camera · clip saved</span></div><time>2m</time></div></div>' +
      '<div class="h2l-see-note"><div class="h2l-see-note-top"><span class="h2l-sen-app">H2</span><div><strong>Collision Alert</strong><span>Clip locked on the card</span></div><time>5m</time></div></div>' +
      '</div></div>' +
      // playback
      '<div class="h2l-act-view" data-v="playback">' +
      '<div class="h2l-act-title h2l-see-title">Cloud Recording</div>' +
      '<div class="h2l-act-video h2l-see-play"><img src="' + base + '/h2l-act-night-20261104.webp" alt="" loading="lazy"><span class="h2l-see-playbtn"><svg viewBox="0 0 24 24"><path d="M9 7l8 5-8 5z"/></svg></span>' +
      '<span class="h2l-see-scrub"><i></i></span><span class="h2l-act-ts">Front · 21:16:42</span></div>' +
      '<div class="h2l-see-filter"><span class="is-on">All</span><span>AI Sentinel</span><span>Collision</span><em>2026/06/22</em></div>' +
      '<div class="h2l-see-events">' +
      '<div class="is-on"><i style="--c:#f5b400"></i><p><b>AI Sentinel Alert</b><span>Front</span></p><time>21:16:42</time></div>' +
      '<div><i style="--c:#ff8a3d"></i><p><b>Vibration Alert</b><span>Front</span></p><time>21:15:10</time></div>' +
      '<div><i style="--c:#e5484d"></i><p><b>Collision Alert</b><span>Front</span></p><time>20:58:31</time></div>' +
      '<div><i style="--c:#f5b400"></i><p><b>AI Sentinel Alert</b><span>Front</span></p><time>20:26:36</time></div>' +
      '</div></div>' +
      '</div></div>';
    var see = el(
      '<div class="h2l-see"><div class="h2l-act-panel h2l-see-panel"><div class="h2l-act-stage">' + sPhone + '</div>' +
      '<div class="h2l-act-copy" role="tablist" aria-label="Check on your car"><span class="h2l-act-group">Check in · 01–04</span>' +
      '<div class="h2l-see-head"><h4>Your car is still within sight.</h4><p>Open the JADO app over 4G to check a live view, confirm where the car is, and review key events from your phone.</p></div>' +
      sees.map(function (a, i) {
        return '<button type="button" role="tab" class="h2l-act-item" data-k="' + a.key + '" data-n="0' + (i + 1) + '" aria-selected="' + (i ? 'false' : 'true') + '">' +
          '<span class="h2l-act-icon">' + sIco[a.key] + '</span><span class="h2l-act-text"><strong>' + a.title + '</strong><span>' + a.text + '</span></span>' +
          '<span class="h2l-act-progressbar"><i></i></span></button>';
      }).join('') +
      '<p class="h2l-act-note">Remote features require an active 4G plan and network coverage.</p></div></div>' +
      '<div class="h2l-link" aria-hidden="true"><span class="h2l-link-line"><i></i></span><span class="h2l-link-label">Seen something? Act on it.</span></div></div>'
    );
    band.style.display = 'none';
    band.after(see);

    var sItems = Array.prototype.slice.call(see.querySelectorAll('.h2l-act-item'));
    var sClock = see.querySelector('.h2l-see-clock'), sRate = see.querySelector('.h2l-see-rate b');
    var sCur = 'live', sT0 = 0, sAuto = true, sIn = false, sLoop = 0, sLastRate = 0;
    function sSet(k) {
      sCur = k;
      see.setAttribute('data-view', k);
      sItems.forEach(function (b) {
        var on = b.getAttribute('data-k') === k;
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        b.classList.toggle('is-on', on);
      });
      sT0 = performance.now();
      see.classList.remove('is-cycling', 'is-fresh');
      void see.offsetWidth;
      see.classList.add('is-fresh');
      if (sAuto && sIn && !reduce) see.classList.add('is-cycling');
    }
    sItems.forEach(function (b) {
      b.addEventListener('click', function () { sAuto = false; see.classList.remove('is-cycling'); sSet(b.getAttribute('data-k')); });
    });
    see.querySelector('.h2l-see-talk').addEventListener('click', function () {
      act.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      setTimeout(function () { act.h2lGo('talk'); }, reduce ? 0 : 500);
    });
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    function sFrame(now) {
      var el2 = now - sT0;
      if (sCur === 'live') {
        var sec = 8 + Math.floor(el2 / 1000);
        sClock.textContent = '2026-06-22 14:32:' + pad(sec % 60);
        if (now - sLastRate > 700) { sLastRate = now; sRate.textContent = String(2180 + Math.floor(Math.random() * 140)); }
      }
      if (sAuto && sIn && !reduce && el2 > DWELL) {
        var i = (sees.map(function (a) { return a.key; }).indexOf(sCur) + 1) % sees.length;
        sSet(sees[i].key);
      }
      sLoop = sIn ? requestAnimationFrame(sFrame) : 0;
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (list) {
        sIn = list[0].isIntersecting;
        see.classList.toggle('is-visible', sIn);
        if (sIn && !sLoop) { sSet(sCur); sLoop = requestAnimationFrame(sFrame); }
      }, { threshold: 0.35 }).observe(see.querySelector('.h2l-see-panel'));
    } else { sIn = true; sLoop = requestAnimationFrame(sFrame); }
    sSet('live');
  }

  /* ---------- 2. Connected out of the box ---------- */
  var plans = document.querySelector('#lte-plans') || document.querySelector('.h2l-lte');
  var nodeIco = {
    cam: '<svg viewBox="0 0 32 32"><rect x="4" y="9" width="24" height="14" rx="4"/><circle cx="11" cy="16" r="3.6"/><path d="M18 14h6M18 18h4"/></svg>',
    tower: '<svg viewBox="0 0 32 32"><path d="M16 12v16M11 28l5-16 5 16M12.6 22h6.8"/><circle cx="16" cy="10" r="1.6"/><path d="M10.5 5.5a8 8 0 0 0 0 9M21.5 5.5a8 8 0 0 1 0 9M7.5 3a12 12 0 0 0 0 14M24.5 3a12 12 0 0 1 0 14"/></svg>',
    cloud: '<svg viewBox="0 0 32 32"><path d="M9.5 24h13a5.5 5.5 0 0 0 .8-10.94A8 8 0 0 0 8.2 12.4 5.8 5.8 0 0 0 9.5 24Z"/><rect x="13" y="16" width="6" height="5" rx="1"/><path d="M14.5 16v-1.6a1.5 1.5 0 0 1 3 0V16"/></svg>',
    phone: '<svg viewBox="0 0 32 32"><rect x="9" y="3" width="14" height="26" rx="3.5"/><path d="M14 25h4"/><path d="M12.5 13l2.5 2.5 4.5-5"/></svg>'
  };
  var nodes = [
    { i: nodeIco.cam, t: 'H2', d: 'Built-in eSIM' },
    { i: nodeIco.tower, t: '4G LTE network', d: 'Best carrier, picked automatically' },
    { i: nodeIco.cloud, t: 'Encrypted cloud', d: 'Event clips and GPS history' },
    { i: nodeIco.phone, t: 'Your phone', d: 'AIDOVID app, anywhere' }
  ];
  var packets = ['AI Sentinel alert', 'Live view', 'Event clip', 'GPS location', 'Two-way talk'];
  var stats = [
    { n: '24', u: 'LTE bands', d: '19 FDD + 5 TDD bands for wide carrier support' },
    { n: '10', u: 'Mbps peak', d: 'Downlink, with up to 5 Mbps uplink for live view and uploads' },
    { n: '~3', u: 'min setup', d: 'Pick and activate a plan in the app, no store visit' },
    { n: '0', u: 'SIM cards', d: 'The eSIM is built in and activates over the air' }
  ];
  var tiles = [
    { img: 'h2l-net-4g', k: '4G LTE', t: 'Online wherever it’s parked', d: 'A built-in 4G module keeps H2 reachable for live view, alerts and cloud backup.' },
    { img: 'h2l-net-esim', k: 'Built-in eSIM', t: 'Smart network selection', d: 'H2 chooses the strongest available network and switches to a local carrier when you travel.' },
    { img: 'h2l-net-wifi6', k: 'Wi-Fi 6', t: 'Fast local transfer', d: 'Dual-band 2.4 / 5 GHz hotspot for HD downloads next to the car, with no cellular data used.' },
    { img: 'h2l-net-gnss', k: 'Multi-GNSS', t: 'Five satellite systems', d: 'GPS, GLONASS, Galileo, BDS and QZSS with A-GPS: about 10 s hot start, 33 s cold start.' }
  ];
  var modes = [
    { icon: ico.cell, k: 'Away from the car', t: '4G', d: 'Live view, playback, alerts and two-way talk from anywhere with coverage.' },
    { icon: ico.wifi, k: 'Next to the car', t: 'Wi-Fi 6', d: 'Download full-quality clips over the device hotspot to save your 4G data.' },
    { icon: ico.key, k: 'Engine on', t: 'BLE quick connect', d: 'After first pairing, your phone reconnects to the H2 hotspot automatically.' },
    { icon: '<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4.5h-4.5"/><path d="M12 8v4l2.5 2"/></svg>', k: 'Anytime', t: 'OTA updates', d: 'New firmware arrives through the AIDOVID app. No cables, no computer.' }
  ];
  var net = el(
    '<section class="h2-redo-section h2l-net"><div class="h2-redo-wrap">' +
    '<div class="h2-redo-head center"><span class="h2-redo-eyebrow">4G connectivity, built in</span>' +
    '<h3>Connected Out of the Box.</h3>' +
    '<p>A global 4G module, built-in eSIM, Wi-Fi 6, BLE and five satellite systems work together, so H2 stays reachable, transfers fast, and always knows where it is.</p></div>' +
    '<div class="h2l-net-path"><div class="h2l-net-path-head"><span class="h2l-net-live"><i></i>Live over 4G</span><span class="h2l-net-packet" aria-live="off">' + packets[0] + '</span></div>' +
    '<div class="h2l-net-nodes">' + nodes.map(function (n, i) {
      return (i ? '<div class="h2l-net-link" aria-hidden="true"><i></i><i></i><i></i></div>' : '') +
        '<div class="h2l-net-node" style="--d:' + (i * 120) + 'ms"><span class="h2l-net-node-ico">' + n.i + '</span><strong>' + n.t + '</strong><span>' + n.d + '</span></div>';
    }).join('') + '</div></div>' +
    '<div class="h2l-net-stats">' + stats.map(function (x) {
      return '<div class="h2l-net-stat"><strong><b>' + x.n + '</b> ' + x.u + '</strong><span>' + x.d + '</span></div>';
    }).join('') + '</div>' +
    '<div class="h2l-net-grid">' + tiles.map(function (x, i) {
      return '<article class="h2l-net-tile" style="--d:' + (i * 90) + 'ms"><img src="' + base + '/' + x.img + '-20261104.webp" alt="" loading="lazy">' +
        '<div class="h2l-net-copy"><span>' + x.k + '</span><strong>' + x.t + '</strong><p>' + x.d + '</p></div></article>';
    }).join('') + '</div>' +
    '<div class="h2l-net-modes"><div class="h2l-net-modes-head"><strong>The right link, automatically</strong><span>H2 uses the connection that fits where you are.</span></div>' +
    '<div class="h2l-net-mode-row">' + modes.map(function (m) {
      return '<div class="h2l-net-mode"><span class="h2l-net-mode-ico">' + m.icon + '</span><span class="h2l-net-mode-k">' + m.k + '</span><strong>' + m.t + '</strong><p>' + m.d + '</p></div>';
    }).join('') + '</div></div>' +
    '<p class="h2l-net-note">Coverage, bands and speeds vary by region and network. Remote features require an active H2 4G plan.</p>' +
    '</div></section>'
  );
  if (plans) plans.before(net);
  var packetEl = net.querySelector('.h2l-net-packet'), pk = 0, pkTimer = 0;
  function nextPacket() {
    pk = (pk + 1) % packets.length;
    packetEl.classList.add('is-out');
    setTimeout(function () { packetEl.textContent = packets[pk]; packetEl.classList.remove('is-out'); }, 280);
  }

  /* ---------- 3. AI Sentinel: from motion to your phone ---------- */
  var steps = [
    { k: 'detect', t: 'Detect', d: 'AI spots a person near the car, or the G-sensor feels an impact.' },
    { k: 'record', t: 'Record', d: 'AOV low-frame recording switches to full frame rate.' },
    { k: 'lock', t: 'Lock', d: 'The event clip is locked on the card so loop recording can’t overwrite it.' },
    { k: 'alert', t: 'Alert', d: 'A real-time alert reaches your phone over 4G, wherever you are.' },
    { k: 'backup', t: 'Back up', d: 'The clip uploads to encrypted cloud storage, so a copy survives even if the card is lost.' },
    { k: 'act', t: 'Respond', d: 'Open live view, speak through H2, or share the clip with family.' }
  ];
  // Scroll-driven: the scene pins full screen and each stretch of scrolling moves to the next step.
  var sen = el(
    '<section class="h2-redo-section h2l-sen h2l-sen--scrolly" data-step="0"><div class="h2-redo-wrap">' +
    '<div class="h2-redo-head center"><span class="h2-redo-eyebrow">AI Sentinel · 4G alerts</span>' +
    '<h3>From Motion to Your Phone.</h3>' +
    '<p>When something happens around your parked car, H2 records it, protects it, and tells you about it within moments.</p></div></div>' +
    '<div class="h2l-sen-track" style="--n:' + steps.length + '"><div class="h2l-sen-pin">' +
    '<div class="h2l-sen-visual" aria-hidden="true"><div class="h2l-sen-frame">' +
    ['h2l-sen-person', 'h2l-sen-v2-2-record', 'h2l-sen-v2-3-lock', 'h2l-sen-v2-4-alert', 'h2l-sen-v2-5-backup', 'h2l-sen-v2-6-respond'].map(function (f, i) {
      return '<img class="h2l-sen-shot2" data-i="' + i + '" src="' + base + '/' + f + '-20261104.webp" alt="" decoding="async"' + (i > 1 ? ' loading="lazy"' : '') + '>';
    }).join('') +
    '<span class="h2l-sen-box"><i></i><em>Person</em></span></div>' +
    '<div class="h2l-sen-grain"></div>' +
    '<div class="h2l-sen-shade"></div>' +
    '<div class="h2l-sen-hud"><span class="h2l-sen-mode"><i></i><b class="h2l-sen-aov">AOV · 1 FPS</b><b class="h2l-sen-full">REC · <em class="h2l-sen-fps">30</em> FPS</b></span><span class="h2l-sen-time">PARKED · <em class="h2l-sen-clock">02:17:46</em></span></div>' +
    '<span class="h2l-sen-lock"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path class="h2l-sen-shackle" d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><span>Clip locked<small>Protected from loop overwrite</small></span></span>' +
    '<div class="h2l-sen-toast"><span class="h2l-sen-app">H2</span><div><strong>AI Sentinel Alert</strong><span>Person detected near your car</span></div><time>now</time></div>' +
    '<div class="h2l-sen-upload"><span class="h2l-sen-up-label">Uploading to cloud</span><span class="h2l-sen-pct">0%</span><i><b></b></i></div>' +
    '<div class="h2l-sen-actions"><span>Live view</span><span>Talk</span><span>Share</span></div>' +
    '</div>' +
    '<div class="h2l-sen-cap">' + steps.map(function (x, i) {
      return '<div class="h2l-sen-cap-item" data-i="' + i + '"><span class="h2l-sen-cap-no">0' + (i + 1) + ' <i>/ 0' + steps.length + '</i></span><h4><span>' + x.t + '</span></h4><p>' + x.d + '</p></div>';
    }).join('') + '</div>' +
    '<ol class="h2l-sen-rail" aria-label="AI Sentinel steps">' + steps.map(function (x, i) {
      return '<li><button type="button" data-i="' + i + '" aria-label="' + x.t + '"><span>' + x.t + '</span><i></i></button></li>';
    }).join('') + '</ol>' +
    '<div class="h2l-sen-hint" aria-hidden="true"><span></span>Scroll</div>' +
    '</div></div>' +
    '<p class="h2l-sen-note">Requires parking monitoring with the hardwire kit. Alerts need an active 4G plan; cloud backup is included from the Standard plan.</p>' +
    '</section>'
  );
  var aovSec = document.querySelector('.h2-redo-aov');
  if (aovSec) aovSec.after(sen);
  var track = sen.querySelector('.h2l-sen-track');
  var senBtns = Array.prototype.slice.call(sen.querySelectorAll('.h2l-sen-rail button'));
  var caps = Array.prototype.slice.call(sen.querySelectorAll('.h2l-sen-cap-item'));
  var senStep = -1;
  var shots = Array.prototype.slice.call(sen.querySelectorAll('.h2l-sen-shot2'));
  var fpsEl = sen.querySelector('.h2l-sen-fps'), clockEl = sen.querySelector('.h2l-sen-clock');
  var pctEl = sen.querySelector('.h2l-sen-pct'), upLabel = sen.querySelector('.h2l-sen-up-label');
  var tween = 0;
  function count(el, from, to, ms, fmt, done) {
    cancelAnimationFrame(tween);
    var t0 = performance.now();
    (function f(now) {
      var k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(Math.round(from + (to - from) * e));
      if (k < 1) tween = requestAnimationFrame(f); else if (done) done();
    })(t0);
  }
  function senGo(i, force) {
    if (i === senStep && !force) return;
    var prev = senStep;
    senStep = i;
    sen.setAttribute('data-step', String(i));
    sen.setAttribute('data-dir', prev > i ? 'up' : 'down');
    shots.forEach(function (im, j) {
      im.classList.remove('is-on', 'is-prev');
      if (j === prev && prev !== i) im.classList.add('is-prev');
    });
    void sen.offsetWidth;
    shots[i].classList.add('is-on');
    senBtns.forEach(function (b, j) { b.classList.toggle('is-on', j === i); b.classList.toggle('is-done', j < i); });
    caps.forEach(function (c, j) { c.classList.toggle('is-on', j === i); });
    if (reduce) return;
    if (i === 1) count(fpsEl, 1, 30, 900, String);
    if (i === 4) { upLabel.textContent = 'Uploading to cloud'; sen.classList.remove('is-saved'); count(pctEl, 0, 100, 1700, function (v) { return v + '%'; }, function () { upLabel.textContent = 'Saved to cloud'; sen.classList.add('is-saved'); }); }
  }
  var clockS = 17 * 60 + 46, clockT = setInterval(function () {
    if (!sen.classList.contains('is-visible')) return;
    clockS++;
    var m = Math.floor(clockS / 60) % 60, sec = clockS % 60;
    clockEl.textContent = '02:' + (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }, 1000);
  function senMetrics() {
    var r = track.getBoundingClientRect();
    return { r: r, total: Math.max(1, r.height - window.innerHeight) };
  }
  // One wheel / swipe / key gesture = one step. Native scrolling resumes past the first and last step.
  var senTick = 0, senAnim = 0, senLockUntil = 0, senLastWheel = 0, senConsumed = false;
  function stepY(i) {
    var m = senMetrics();
    return window.scrollY + m.r.top + ((i + 0.5) / steps.length) * m.total;
  }
  function senScroll() {
    senTick = 0;
    var m = senMetrics();
    var p = Math.min(1, Math.max(0, -m.r.top / m.total));
    sen.style.setProperty('--p', p.toFixed(4));
    if (!senAnim) senGo(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    var vis = m.r.top < window.innerHeight && m.r.bottom > 0;
    if (vis && !sen.classList.contains('is-visible')) { sen.classList.add('is-visible'); senGo(senStep < 0 ? 0 : senStep, true); }
    sen.classList.toggle('is-visible', vis);
    sen.classList.toggle('is-started', p > 0.01 || senStep > 0);
  }
  function senEngaged() {
    var r = track.getBoundingClientRect();
    return r.top <= 2 && r.bottom >= window.innerHeight - 2;
  }
  // the page sets html { scroll-behavior: smooth }; frame-by-frame scrolling must bypass it,
  // otherwise each frame starts its own smooth scroll and the position lags behind the animation
  function scrollNow(y) { window.scrollTo({ top: y, behavior: 'instant' }); }
  function senTo(y, ms, done) {
    cancelAnimationFrame(senAnim);
    var y0 = window.scrollY, dy = y - y0, t0 = performance.now();
    if (reduce || Math.abs(dy) < 2) { scrollNow(y); senAnim = 0; if (done) done(); return; }
    (function f(now) {
      var k = Math.min(1, (now - t0) / ms);
      var e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      scrollNow(y0 + dy * e);
      if (k < 1) senAnim = requestAnimationFrame(f);
      else { senAnim = 0; if (done) done(); }
    })(t0);
    senAnim = senAnim || 1;
  }
  function senStepTo(i) {
    senGo(i);
    sen.classList.add('is-started');
    senLockUntil = performance.now() + 850;
    var y = stepY(i);
    if (senEngaged()) { window.scrollTo({ top: y, behavior: 'instant' }); senLastY = window.scrollY; }
    else senTo(y, 500);
  }
  // returns true when the gesture was used to change step
  function senMove(dir) {
    var next = senStep + dir;
    if (next < 0 || next >= steps.length) return false;
    senStepTo(next);
    return true;
  }
  window.addEventListener('wheel', function (e) {
    var now = performance.now();
    var gap = now - senLastWheel;
    senLastWheel = now;
    if (!senEngaged()) {
      // catch the scene on the way in, so a fast flick stops on the first (or last) step
      var r = track.getBoundingClientRect(), vh = window.innerHeight;
      if (senAnim || now < senLockUntil) { if (r.top < vh && r.bottom > 0) e.preventDefault(); return; }
      if (e.deltaY > 0 && r.top > 2 && r.top < vh && r.top - e.deltaY <= 2) {
        e.preventDefault(); senGo(0); senConsumed = true; senLockUntil = now + 700; senTo(window.scrollY + r.top, 420);
      } else if (e.deltaY < 0 && r.bottom < vh - 2 && r.bottom > 0 && r.bottom - e.deltaY >= vh - 2) {
        e.preventDefault(); senGo(steps.length - 1); senConsumed = true; senLockUntil = now + 700; senTo(window.scrollY + r.bottom - vh, 420);
      }
      return;
    }
    if (senAnim || now < senLockUntil) { e.preventDefault(); return; }
    if (senConsumed && gap < 160) { e.preventDefault(); return; }   // still the same trackpad flick
    if (Math.abs(e.deltaY) < 3) return;
    var dir = e.deltaY > 0 ? 1 : -1;
    if (senMove(dir)) { e.preventDefault(); senConsumed = true; } else { senConsumed = false; }
  }, { passive: false });
  var touchY = null;
  window.addEventListener('touchstart', function (e) { touchY = senEngaged() ? e.touches[0].clientY : null; }, { passive: true });
  window.addEventListener('touchmove', function (e) { if (touchY !== null && senEngaged()) e.preventDefault(); }, { passive: false });
  window.addEventListener('touchend', function (e) {
    if (touchY === null) return;
    var dy = touchY - e.changedTouches[0].clientY; touchY = null;
    if (Math.abs(dy) < 36 || senAnim) return;
    var dir = dy > 0 ? 1 : -1;
    if (!senMove(dir)) {
      var m = senMetrics();
      senTo(dir > 0 ? window.scrollY + m.r.bottom - window.innerHeight + 4 : window.scrollY + m.r.top - 4, 600);
    }
  }, { passive: true });
  window.addEventListener('keydown', function (e) {
    if (!senEngaged() || senAnim) return;
    var k = e.key, dir = (k === 'ArrowDown' || k === 'PageDown' || (k === ' ' && !e.shiftKey)) ? 1 : (k === 'ArrowUp' || k === 'PageUp' || (k === ' ' && e.shiftKey)) ? -1 : 0;
    if (dir && senMove(dir)) e.preventDefault();
  });
  // any other way into the scene (fling, keyboard, scrollbar) is caught on the first or last step
  var senWas = senEngaged(), senLastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY, dir = y > senLastY ? 1 : -1, eng = senEngaged();
    senLastY = y;
    if (eng && !senWas && !senAnim && performance.now() >= senLockUntil && touchY === null) {
      var m = senMetrics();
      senGo(dir > 0 ? 0 : steps.length - 1);
      senLockUntil = performance.now() + 700;
      senTo(dir > 0 ? y + m.r.top : y + m.r.bottom - window.innerHeight, 260);
    }
    senWas = eng;
    if (!senTick) senTick = requestAnimationFrame(senScroll);
  }, { passive: true });
  window.addEventListener('resize', senScroll);
  senBtns.forEach(function (b, i) {
    b.addEventListener('click', function () { senStepTo(i); });
  });
  senGo(0);
  senScroll();

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (list) {
      var on = list[0].isIntersecting;
      net.classList.toggle('is-visible', on || net.classList.contains('is-visible'));
      clearInterval(pkTimer);
      if (on && !reduce) pkTimer = setInterval(nextPacket, 2400);
    }, { threshold: 0.2 }).observe(net);
  } else {
    net.classList.add('is-visible');
  }

  /* ---------- 4. Internal engineering: sharp exploded view on black ---------- */
  var craftStage = document.querySelector('.h2-craft-section .h2-craft-stage');
  if (craftStage) {
    var pts = [
      { side: 'left', x: 32.2, y: 32.8, n: '01', t: 'Dual cooling', d: 'Helps keep temperatures stable during long runs.' },
      { side: 'right', x: 87.9, y: 48.8, n: '02', t: 'Supercapacitor', d: 'Built for high cabin temperatures.' },
      { side: 'right', x: 88.6, y: 81.9, n: '03', t: 'Button cell', d: 'Maintains system time and basic state.' }
    ];
    craftStage.classList.add('h2l-craft');
    craftStage.innerHTML = '<div class="h2l-craft-figure"><img src="' + base + '/h2l-craft-exploded-20261104.webp" alt="JADO H2 exploded internal engineering view" loading="lazy" decoding="async">' +
      pts.map(function (p, i) {
        return '<div class="h2l-craft-pt h2l-craft-pt--' + p.side + '" style="--x:' + p.x + '%;--y:' + p.y + '%;--d:' + (300 + i * 180) + 'ms"><i></i><span class="h2l-craft-line"></span>' +
          '<div class="h2l-craft-label"><span>' + p.n + '</span><strong>' + p.t + '</strong><p>' + p.d + '</p></div></div>';
      }).join('') + '</div>' +
      '<ol class="h2l-craft-list">' + pts.map(function (p) { return '<li><span>' + p.n + '</span><strong>' + p.t + '</strong><p>' + p.d + '</p></li>'; }).join('') + '</ol>';
    var craftSec = craftStage.closest('section');
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (list, o) {
        if (!list[0].isIntersecting) return;
        craftSec.classList.add('h2l-craft-in'); o.disconnect();
      }, { threshold: 0.25 }).observe(craftStage);
    } else { craftSec.classList.add('h2l-craft-in'); }
  }

  /* ---------- 5. Facts from the H2 user manual (box, FAQ, privacy mode, shared users) ---------- */
  function sectionByHeading(re) {
    return Array.prototype.slice.call(document.querySelectorAll('.pdp-section')).filter(function (sct) {
      var h = sct.querySelector('h2, h3');
      return h && re.test(h.textContent);
    })[0];
  }
  var boxSec = sectionByHeading(/what.?s in the box/i);
  if (boxSec) {
    var list = boxSec.querySelector('ul, ol');
    var boxItems = [
      'H2 main unit (front + in-cabin cameras, sliding display) with adhesive mounting bracket',
      'Rear camera + rear extension cable',
      'Type-C hardwire kit (fuse tap: B+, ACC, GND)',
      'Spare 3M adhesive pad',
      'Electrostatic film',
      'Cleaning cloth',
      'User manual / quick start guide',
      'Memory card: none in H2 3-Ch Bundle · 64GB in Bundle + 64G · 128GB in Pro Kit'
    ];
    if (list) list.innerHTML = boxItems.map(function (t) { return '<li>' + t + '</li>'; }).join('');
  }
  var faqFix = [
    [/fit my car/i, 'H2 mounts on the windshield behind the rear-view mirror with the included 3M adhesive bracket, and works with most passenger vehicles with a 12–24V electrical system. The rear camera connects to the H2 with the included extension cable.'],
    [/hardwire/i, 'Yes. Every H2 bundle includes a Type-C hardwire kit (fuse tap: B+, ACC, GND). It powers the camera from the vehicle and is required for parking monitoring and low-voltage protection.'],
    [/sd card|memory card/i, 'Use a U3 / V30 or faster microSD card, up to 256GB. The H2 3-Ch Bundle has no card, Bundle + 64G includes a 64GB card, and the Pro Kit includes 128GB. Format the card on the device or in the AIDOVID app before first use.']
  ];
  Array.prototype.slice.call(document.querySelectorAll('.pdp-faq details, .pdp-faq [class*="faq-item"]')).forEach(function (it) {
    var q = it.querySelector('summary, button, h3, h4');
    if (!q) return;
    faqFix.forEach(function (f) {
      if (!f[0].test(q.textContent)) return;
      var a = Array.prototype.slice.call(it.querySelectorAll('p, div')).filter(function (n) { return !n.contains(q) && n.textContent.trim().length > 20; }).pop();
      if (a) a.textContent = f[1];
    });
  });
  // privacy mode wording in the long description: manual says the cabin camera is off while the vehicle is on
  Array.prototype.slice.call(document.querySelectorAll('.pdp-section p, .pdp-section li')).forEach(function (n) {
    if (n.children.length > 12 || !/switches off by itself while parked/.test(n.textContent)) return;
    var w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT), t;
    while ((t = w.nextNode())) {
      var v = t.nodeValue;
      if (/switches off by itself while parked/.test(v)) v = v.replace('(the cabin camera switches off by itself while parked)', '(the cabin camera turns off while the vehicle is on and back on after you park)');
      if (v.trim() === 'On') v = v.replace('On', 'Open');
      else if (v.trim() === 'Off') v = v.replace('Off', 'Close');
      else if (v.trim() === 'Auto-Privacy') v = v.replace('Auto-Privacy', 'Auto Privacy');
      v = v.replace('Choose On, Off, or Auto-Privacy', 'Choose Open, Close, or Auto Privacy');
      if (v !== t.nodeValue) t.nodeValue = v;
    }
  });
  // plans: Standard includes up to 10 shared users (manual 18.3 / 18.4)
  var lte = document.querySelector('.h2l-lte');
  if (lte) {
    Array.prototype.slice.call(lte.querySelectorAll('.h2l-plan--standard li')).forEach(function (li) {
      if (/Up to 5 shared users/.test(li.textContent)) li.textContent = li.textContent.replace('Up to 5 shared users', 'Up to 10 shared users');
    });
    var table = lte.querySelector('table');
    if (table) {
      var heads = Array.prototype.slice.call(table.querySelectorAll('thead th')).map(function (th) { return th.textContent.trim(); });
      var col = heads.indexOf('Standard');
      Array.prototype.slice.call(table.querySelectorAll('tbody tr')).forEach(function (tr) {
        var cells = tr.children;
        if (col > 0 && cells[0] && /shared users/i.test(cells[0].textContent) && cells[col] && cells[col].textContent.trim() === '5') cells[col].textContent = '10';
      });
    }
  }

  /* ---------- 6. One heading style: sentence case, always a full stop ---------- */
  var headFix = {
    'See Your Vehicle Anytime.': 'See your vehicle anytime.',
    'Act From Anywhere.': 'Act from anywhere.',
    'Protection does not stop when you park': 'Protection does not stop when you park.',
    'From engine-off to phone alert — one complete guard chain': 'From engine-off to phone alert, one complete guard chain.',
    'From Motion to Your Phone.': 'From motion to your phone.',
    'When Accidents Happen,Your Evidence Is Ready.': 'When accidents happen, your evidence is ready.',
    'When Accidents Happen, Your Evidence Is Ready.': 'When accidents happen, your evidence is ready.',
    'Three views: front, cabin, and rear': 'Three views: front, cabin, and rear.',
    'Privacy, On Your Terms.': 'Privacy, on your terms.',
    'Connected Out of the Box.': 'Connected out of the box.',
    'Stay Connected. Choose Your Plan.': 'Stay connected. Choose your plan.',
    'Stableperformancestarts inside.': 'Stable performance starts inside.'
  };
  Array.prototype.slice.call(document.querySelectorAll('.h2pdp > section h3')).forEach(function (h) {
    var key = h.textContent.replace(/\s+/g, ' ').trim(), key2 = h.textContent.trim();
    var v = headFix[key] || headFix[key2];
    if (v && !h.closest('.h2-redo-craft')) h.textContent = v;
  });

  /* ---------- 7. Hide the reviews block until there are reviews ---------- */
  var rev = document.querySelector('.pdp-reviews');
  if (rev && /appear here after they are approved/i.test(rev.textContent) && !rev.querySelector('[class*="review-item"], [class*="review-card"], article')) rev.style.display = 'none';

  /* ---------- 8. Section nav (top) + buy bar (bottom) ---------- */
  var navDefs = [
    ['Overview', '.h2-redo-overview'], ['Remote', '.h2-remote-connect-section'], ['Parking guard', '.h2-redo-aov'],
    ['Privacy', '.h2l-privacy, .h2-redo-privacy'], ['Plans', '#lte-plans, .h2l-lte'], ['Specs', '.pdp-section']
  ].map(function (d) { return { t: d[0], el: document.querySelector(d[1]) }; }).filter(function (d) { return d.el; });
  var priceEl = document.querySelector('.pdp-price');
  var buyBox = document.querySelector('.pdp-main') || document.querySelector('.pdp');
  var nav = el('<nav class="h2l-secnav" aria-label="H2 sections"><div class="h2l-secnav-in"><strong>JADO H2</strong><div class="h2l-secnav-links">' +
    navDefs.map(function (d, i) { return '<button type="button" data-i="' + i + '">' + d.t + '</button>'; }).join('') +
    '</div><button type="button" class="h2l-secnav-buy">Buy</button></div></nav>');
  var bar = el('<div class="h2l-buybar" role="region" aria-label="Buy JADO H2"><div class="h2l-buybar-in"><div class="h2l-buybar-copy"><strong>JADO H2</strong><span>4G connected 3-channel dash cam</span></div>' +
    '<span class="h2l-buybar-price">' + (priceEl ? priceEl.textContent.trim() : '') + '</span><button type="button" class="h2l-buybar-btn">Buy now</button></div></div>');
  document.body.appendChild(nav);
  document.body.appendChild(bar);
  var navBtns = Array.prototype.slice.call(nav.querySelectorAll('.h2l-secnav-links button'));
  navBtns.forEach(function (b, i) {
    b.addEventListener('click', function () { jumpTo(function () { return navDefs[i].el.getBoundingClientRect().top + window.scrollY - 52; }); });
  });
  // Section jumps (nav, Buy) run on the scene's own animator, so the AI Sentinel scene
  // never catches them on the way through; the target is re-measured on arrival.
  function jumpTo(target) {
    var maxY = function () { return document.documentElement.scrollHeight - window.innerHeight; };
    var y = Math.max(0, Math.min(target(), maxY()));
    senLockUntil = 0; senConsumed = false; touchY = null;
    senTo(y, Math.min(1100, 350 + Math.abs(y - window.scrollY) / 6), function () {
      var y2 = Math.max(0, Math.min(target(), maxY()));
      if (Math.abs(y2 - window.scrollY) > 4) scrollNow(y2);
      senWas = senEngaged(); senLastY = window.scrollY;
      senScroll();
    });
  }
  function goBuy(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (buyBox) jumpTo(function () { return buyBox.getBoundingClientRect().top + window.scrollY - 80; });
  }
  // in-page "#buy" links (e.g. hero Buy Now) would otherwise follow <base> to the live site
  Array.prototype.forEach.call(document.querySelectorAll('a[href="#buy"]'), function (a) { a.addEventListener('click', goBuy); });
  nav.querySelector('.h2l-secnav-buy').addEventListener('click', goBuy);
  bar.querySelector('.h2l-buybar-btn').addEventListener('click', goBuy);
  var chromeTick = 0;
  function chrome() {
    chromeTick = 0;
    var vh = window.innerHeight;
    var pastBuy = buyBox ? buyBox.getBoundingClientRect().bottom < 0 : window.scrollY > vh;
    var buySec = document.querySelector('.h2-buy-section'), foot = document.querySelector('.site-footer');
    var nearEnd = (buySec && buySec.getBoundingClientRect().top < vh) || (foot && foot.getBoundingClientRect().top < vh);
    var pinned = typeof senEngaged === 'function' && senEngaged();
    nav.classList.toggle('is-on', pastBuy && !pinned);
    bar.classList.toggle('is-on', pastBuy && !nearEnd && !pinned);
    var cur = -1;
    navDefs.forEach(function (d, i) { if (d.el.getBoundingClientRect().top < vh * 0.35) cur = i; });
    navBtns.forEach(function (b, i) { b.classList.toggle('is-on', i === cur); });
  }
  window.addEventListener('scroll', function () { if (!chromeTick) chromeTick = requestAnimationFrame(chrome); }, { passive: true });
  window.addEventListener('resize', chrome);
  chrome();

  /* ---------- 4. Reorder: Accident Evidence right after the Sentinel flow ---------- */
  var evidence = document.querySelector('.h2-prerecord-section');
  var anchor = document.querySelector('.h2l-sen') || document.querySelector('.h2-redo-aov');
  if (anchor && evidence && anchor.nextElementSibling !== evidence) anchor.after(evidence);
})();
