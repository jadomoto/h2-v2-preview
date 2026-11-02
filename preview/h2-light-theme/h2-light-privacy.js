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
