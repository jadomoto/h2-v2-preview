/* H2 light preview: privacy slide switch (two radios, crossfade only). */
(function () {
  var ps = document.querySelector('.h2l-ps');
  if (!ps) return;
  var btns = [].slice.call(ps.querySelectorAll('[role="radio"]'));
  var imgs = ps.querySelectorAll('.h2l-ps__stage img');
  var txt = ps.querySelector('.h2l-ps__status span:last-child');
  function set(b, focus) {
    var priv = b.dataset.state === 'privacy';
    ps.dataset.state = b.dataset.state;
    btns.forEach(function (x) {
      var on = x === b;
      x.setAttribute('aria-checked', on ? 'true' : 'false');
      x.tabIndex = on ? 0 : -1;
    });
    imgs[0].setAttribute('aria-hidden', priv ? 'true' : 'false');
    imgs[1].setAttribute('aria-hidden', priv ? 'false' : 'true');
    txt.textContent = priv ? 'Cabin recording stopped.' : 'Cabin recording active.';
    if (focus) b.focus();
  }
  btns.forEach(function (b, i) {
    b.addEventListener('click', function () { set(b); });
    b.addEventListener('keydown', function (e) {
      var d = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}[e.key];
      if (!d) return;
      e.preventDefault();
      set(btns[(i + d + btns.length) % btns.length], true);
    });
  });
})();

/* H2 light preview: LTE plans section — keep it right before the closing CTA
   (the reach script reorders sections) and drive the "View All Features" toggle. */
(function () {
  var lte = document.getElementById('lte-plans');
  if (!lte) return;
  var cta = document.querySelector('.h2-buy-section');
  if (cta && lte.nextElementSibling !== cta) cta.parentNode.insertBefore(lte, cta);
  var btn = lte.querySelector('.h2l-compare__toggle');
  var more = document.getElementById('h2l-compare-more');
  if (!btn || !more) return;
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    more.hidden = open;
    btn.textContent = open ? 'View All Features' : 'Show Fewer Features';
  });
})();
