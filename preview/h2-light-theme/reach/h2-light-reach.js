/* H2 light preview: copy of preview-h2-reach.js with the remote-check scene images swapped. */
(function () {
  document.documentElement.classList.add('preview-h2-reach');

  document.querySelectorAll('[hidden][id^="S:"]').forEach((el) => {
    if (el.querySelector('.site-footer')) {
      el.hidden = false;
      el.removeAttribute('hidden');
    }
  });

  var icons = {
    live: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="7.5"></circle><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"></circle></svg>',
    location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s6.2-6.1 6.2-11.1A6.2 6.2 0 0 0 5.8 9.9C5.8 14.9 12 21 12 21z"></path><circle cx="12" cy="9.8" r="2.1"></circle></svg>',
    alerts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.4 17.2h11.2l-1.1-1.8V10.6a4.5 4.5 0 0 0-9 0v4.8z"></path><path d="M10.2 17.2a1.8 1.8 0 0 0 3.6 0"></path></svg>',
    playback: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4.5" y="6" width="15" height="12" rx="2.2"></rect><path d="M10.2 9.4 15.2 12l-5 2.6z" fill="currentColor" stroke="none"></path></svg>'
  };

  var features = {
    live: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-live-bg-20261103.webp',
    liveBg: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-live-bg-20261103.webp',
    liveApp: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-live-app-20261103.webp',
    location: '/assets/h2-reach-location-20260821v4.jpg',
    locationBg: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-location-bg-20261103.webp',
    locationApp: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-location-app-20261103.webp',
    alerts: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-alerts-bg-20261103.webp',
    alertsBg: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-alerts-bg-20261103.webp',
    alertsApp: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-alerts-app-20261103.webp',
    playback: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-playback-bg-20261103.webp',
    playbackBg: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-playback-bg-20261103.webp',
    playbackApp: 'https://jadomoto.github.io/h2-v2-preview/preview/h2-light-theme/reach/h2l-reach-playback-app-20261103.webp'
  };

  if (!document.querySelector('.h2-reach-band')) {
    var live = document.querySelector('.h2-remote-live');
    if (!live) return;
    var wrap = live.closest('.h2-remote-connect-wrap') || live.parentElement;
    wrap.querySelector('.h2-remote-note')?.remove();

    var band = document.createElement('div');
    band.className = 'h2-reach-band';
    band.id = 'h2-reach';
    band.innerHTML =
      '<div class="h2-reach-copy">' +
        '<span class="h2-redo-eyebrow">ALWAYS WITHIN REACH</span>' +
        '<h3>Your car is still within sight.</h3>' +
        '<p>Open the JADO app over 4G to check a live view, confirm where the car is, and review key events from your phone.</p>' +
        '<ul class="h2-reach-points">' +
          '<li><button type="button" class="h2-reach-point is-active" data-view="live" aria-pressed="true"><span class="h2-reach-ico">' + icons.live + '</span><strong>Live View</strong><span>Open the JADO app to check your vehicle in real time.</span></button></li>' +
          '<li><button type="button" class="h2-reach-point" data-view="location" aria-pressed="false"><span class="h2-reach-ico">' + icons.location + '</span><strong>Location Check</strong><span>See where your car is parked and confirm its surroundings.</span></button></li>' +
          '<li><button type="button" class="h2-reach-point" data-view="alerts" aria-pressed="false"><span class="h2-reach-ico">' + icons.alerts + '</span><strong>Remote Alerts</strong><span>Get notified when an event needs your attention.</span></button></li>' +
          '<li><button type="button" class="h2-reach-point" data-view="playback" aria-pressed="false"><span class="h2-reach-ico">' + icons.playback + '</span><strong>Remote Playback</strong><span>Review key clips from your phone without returning to the car.</span></button></li>' +
        '</ul>' +
        '<p class="h2-reach-note">Remote features require an eligible service plan and network coverage.</p>' +
      '</div>' +
      '<div class="h2-reach-visual" data-view="live">' +
        '<div class="h2-reach-stage" aria-label="Remote monitoring states">' +
          '<div class="h2-reach-hero h2-reach-live-scene is-on" data-feed="live">' +
            '<img class="h2-reach-live-bg" src="' + features.liveBg + '" alt="" loading="eager">' +
            '<figure class="h2-reach-phone">' +
              '<img src="' + features.liveApp + '" width="1398" height="2826" alt="JADO SMART H2 live view" decoding="async">' +
            '</figure>' +
          '</div>' +
          '<div class="h2-reach-hero h2-reach-location-scene" data-feed="location">' +
            '<img class="h2-reach-location-bg" src="' + features.locationBg + '" alt="" loading="lazy">' +
            '<figure class="h2-reach-phone">' +
              '<img src="' + features.locationApp + '" width="1383" height="2688" alt="JADO SMART 4G Dashcam app" decoding="async">' +
            '</figure>' +
          '</div>' +
          '<div class="h2-reach-hero h2-reach-alerts-scene" data-feed="alerts">' +
            '<img class="h2-reach-alerts-bg" src="' + features.alertsBg + '" alt="" loading="lazy">' +
            '<figure class="h2-reach-phone">' +
              '<img src="' + features.alertsApp + '" width="1449" height="2973" alt="JADO SMART 4G Dashcam alerts" decoding="async">' +
            '</figure>' +
          '</div>' +
          '<div class="h2-reach-hero h2-reach-playback-scene" data-feed="playback">' +
            '<img class="h2-reach-playback-bg" src="' + features.playbackBg + '" alt="" loading="lazy">' +
            '<figure class="h2-reach-phone">' +
              '<img src="' + features.playbackApp + '" width="1392" height="2904" alt="JADO Cloud Recording app" decoding="async">' +
            '</figure>' +
          '</div>' +
        '</div>' +
      '</div>';
    live.after(band);
  }

  var remote = document.querySelector('.h2-remote-connect-section');
  var aov = document.querySelector('.h2-redo-aov');
  var overview = document.querySelector('.h2-redo-overview');
  var evidence = document.querySelector('.h2-prerecord-section');
  var lens = document.querySelector('.h2-lens-section');
  var road = document.querySelector('.h2-clarity-film-section');
  var privacy = document.querySelector('.h2-redo-privacy');
  var usage = document.querySelector('.h2-privacy-usage');
  var night = document.querySelector('.h2-night-vision-section');
  var craft = document.querySelector('.h2-redo-craft');
  var cta = document.querySelector('.h2-buy-section');

  if (overview && remote) overview.after(remote);
  if (remote && aov) remote.after(aov);

  if (road && night && !road.querySelector('.h2-quality-night')) {
    road.classList.add('h2-quality-evidence-section');
    var qualityWrap = road.querySelector('.h2-clarity-wrap');
    if (qualityWrap) qualityWrap.classList.add('h2-quality-wrap');
    var qualityHead = road.querySelector('.h2-clarity-head');
    if (qualityHead) {
      qualityHead.classList.add('h2-quality-head');
      var qualityEye = qualityHead.querySelector('.h2-redo-eyebrow');
      var qualityTitle = qualityHead.querySelector('h3');
      var qualityCopy = qualityHead.querySelector('p');
      if (qualityEye) qualityEye.textContent = 'IMAGE QUALITY';
      if (qualityTitle) qualityTitle.textContent = 'Clear footage before it becomes evidence.';
      if (qualityCopy) {
        qualityCopy.textContent =
          'From bright roads to low-light conditions, H2 helps preserve the details that matter.';
      }
    }
    var nightBlock = document.createElement('div');
    nightBlock.className = 'h2-quality-night';
    nightBlock.innerHTML = '<p class="h2-quality-night-kicker">Night Vision Comparison</p>';
    var nightGrid = night.querySelector('.h2-night-video-grid') || night.querySelector('.h2-night-video-pair');
    var nightNoteEl = night.querySelector('.h2-night-video-note');
    if (nightGrid) nightBlock.appendChild(nightGrid);
    if (nightNoteEl) nightBlock.appendChild(nightNoteEl);
    if (qualityWrap) qualityWrap.appendChild(nightBlock);
    night.remove();
    night = null;
  }

  if (aov && road) aov.after(road);
  if (road && evidence) road.after(evidence);
  if (evidence && lens) evidence.after(lens);
  if (lens && privacy) lens.after(privacy);
  if (privacy && usage) privacy.after(usage);
  if ((usage || privacy) && craft) (usage || privacy).after(craft);
  if (craft && cta) craft.after(cta);

  var explainer = document.querySelector('.h2-privacy-explainer');
  if (explainer) {
    var eyebrow = explainer.querySelector('.h2-redo-eyebrow');
    var heading = explainer.querySelector('h3');
    var paragraphs = explainer.querySelectorAll('p');
    var facts = explainer.querySelector('.h2-privacy-facts');
    if (eyebrow) eyebrow.textContent = 'PHYSICAL PRIVACY CONTROL';
    if (heading) heading.textContent = 'Privacy you can see, not just trust.';
    if (paragraphs[0]) {
      paragraphs[0].textContent = 'Slide the cover to physically block the cabin lens. H2 detects the position instantly, so privacy mode is clear and reliable.';
    }
    Array.prototype.slice.call(paragraphs, 1).forEach(function (el) { el.remove(); });
    if (facts) {
      facts.innerHTML =
        '<li><strong>Physical Cover</strong><span>Blocks the cabin lens when privacy matters.</span></li>' +
        '<li><strong>Hall Detection</strong><span>Detects the slide position without mechanical contact.</span></li>' +
        '<li><strong>Status Sync</strong><span>Updates the camera status as the cover moves.</span></li>';
    }
  }

  var usageHead = document.querySelector('.h2-privacy-usage-head h3');
  if (usageHead) usageHead.textContent = 'Privacy control in real use.';
  var usageDemo = document.querySelector('.h2-privacy-demo');
  if (usageDemo && !usageDemo.querySelector('.h2-privacy-usage-captions')) {
    var captions = document.createElement('div');
    captions.className = 'h2-privacy-usage-captions';
    captions.setAttribute('aria-hidden', 'true');
    captions.innerHTML =
      '<span>Physical slide</span><span>Cabin lens covered</span><span>Status updates instantly</span>';
    usageDemo.appendChild(captions);
  }

  var nightHead = document.querySelector('.h2-night-vision-head');
  if (nightHead) {
    var nightEye = nightHead.querySelector('.h2-redo-eyebrow');
    var nightTitle = nightHead.querySelector('h3');
    var nightCopy = nightHead.querySelector('p');
    if (nightEye) nightEye.textContent = 'NIGHT VISION COMPARISON';
    if (nightTitle) nightTitle.textContent = 'When nights get dark, critical details stay clear.';
    if (nightCopy) {
      nightCopy.textContent =
        'Low-light processing helps preserve road detail, vehicle outlines, and surrounding context when visibility drops.';
    }
  }
  var stdCopy = document.querySelector('.h2-night-video-card--standard .h2-night-video-copy');
  if (stdCopy) {
    var stdStrong = stdCopy.querySelector('strong');
    var stdSpan = stdCopy.querySelector('span');
    if (stdStrong) stdStrong.textContent = 'Standard night view';
    if (stdSpan) stdSpan.textContent = 'Keeps the original low-light scene as a reference.';
  }
  var enhCopy = document.querySelector('.h2-night-video-card--enhanced .h2-night-video-copy');
  if (enhCopy) {
    var enhStrong = enhCopy.querySelector('strong');
    var enhSpan = enhCopy.querySelector('span');
    if (enhStrong) enhStrong.textContent = 'Enhanced night vision';
    if (enhSpan) enhSpan.textContent = 'Brings out more road and vehicle detail in low light.';
  }
  var stdBadge = document.querySelector('.h2-night-video-card--standard .h2-night-video-badge');
  if (stdBadge) stdBadge.textContent = 'Standard night view';
  var enhBadge = document.querySelector('.h2-night-video-card--enhanced .h2-night-video-badge');
  if (enhBadge) enhBadge.textContent = 'Enhanced night vision';
  var nightNote = document.querySelector('.h2-night-video-note');
  if (nightNote) nightNote.textContent = 'Same scene comparison. More visible road detail in low light.';

  var visual = document.querySelector('.h2-reach-visual');
  function setView(view) {
    if (!visual || !features[view]) return;
    visual.setAttribute('data-view', view);
    document.querySelectorAll('.h2-reach-hero').forEach(function (img) {
      img.classList.toggle('is-on', img.getAttribute('data-feed') === view);
    });
    document.querySelectorAll('.h2-reach-point').forEach(function (btn) {
      var on = btn.getAttribute('data-view') === view;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.h2-reach-point').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setView(btn.getAttribute('data-view'));
    });
  });
})();
