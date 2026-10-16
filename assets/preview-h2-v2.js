(function () {
  var packages = [
    {id: "45937767645363", name: "H2 + 32GB Card", price: "199.00", note: "Includes a 32GB card"},
    {id: "45546997743795", name: "H2 + 64GB Card", price: "239.00", note: "Includes a 64GB card"},
    {id: "45937767678131", name: "H2 + 128GB Card", price: "279.00", note: "Includes a 128GB card"}
  ];
  var selected = 1;
  var priceEl = document.querySelector("[data-price]");
  var noteEl = document.querySelector("[data-price-note]");
  var ctaEls = document.querySelectorAll("[data-cart]");
  var stickyName = document.querySelector("[data-sticky-name]");
  var stickyPrice = document.querySelector("[data-sticky-price]");
  var buttons = document.querySelectorAll("[data-pkg]");

  function apply() {
    var item = packages[selected];
    buttons.forEach(function (btn, i) {
      var on = i === selected;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-checked", on ? "true" : "false");
    });
    if (priceEl) priceEl.textContent = "$" + item.price;
    if (noteEl) noteEl.textContent = item.note;
    if (stickyName) stickyName.textContent = item.name;
    if (stickyPrice) stickyPrice.textContent = "$" + item.price;
    var href = "https://jadocam.myshopify.com/cart/" + item.id + ":1";
    ctaEls.forEach(function (el) { el.setAttribute("href", href); });
  }
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      selected = Number(btn.getAttribute("data-pkg"));
      apply();
    });
  });
  apply();

  var shots = {
    open: {
      src: "../../assets/h2-privacy-slide-open.jpg",
      label: "Open — cabin lens uncovered"
    },
    closed: {
      src: "../../assets/h2-privacy-slide-closed.jpg",
      label: "Closed — cover over the cabin lens"
    }
  };
  var macro = document.querySelector("[data-macro]");
  var macroCap = document.querySelector("[data-macro-cap]");
  document.querySelectorAll("[data-privacy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-privacy");
      document.querySelectorAll("[data-privacy]").forEach(function (b) {
        b.classList.toggle("is-on", b === btn);
      });
      if (macro && shots[key]) {
        macro.src = shots[key].src;
        macro.closest(".macro").classList.toggle("is-closed", key === "closed");
        if (macroCap) macroCap.textContent = shots[key].label;
      }
    });
  });

  document.querySelectorAll("[data-view]").forEach(function (btn) {
    if (!btn.getAttribute("data-view") || btn.classList.contains("reach")) return;
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-view");
      var root = btn.closest(".reach");
      if (!root) return;
      root.querySelectorAll("[data-view]").forEach(function (b) {
        if (b === root) return;
        var on = b.getAttribute("data-view") === key;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      root.querySelectorAll("[data-shot]").forEach(function (shot) {
        shot.classList.toggle("is-on", shot.getAttribute("data-shot") === key);
      });
    });
  });

  var film = document.querySelector("[data-lock-film]");
  var marks = {before: 0.12, during: 0.48, after: 0.8};
  if (film) {
    film.addEventListener("loadedmetadata", function () {
      film.currentTime = (film.duration || 0) * marks.during;
      film.pause();
    });
  }
  document.querySelectorAll("[data-when]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-when");
      document.querySelectorAll("[data-when]").forEach(function (b) {
        b.classList.toggle("is-on", b === btn);
      });
      if (!film) return;
      var go = function () {
        var ratio = marks[key] || 0.5;
        film.currentTime = (film.duration || 0) * ratio;
        film.pause();
      };
      if (film.readyState >= 1) go();
      else film.addEventListener("loadedmetadata", go, {once: true});
    });
  });

  var channel = document.querySelector(".channel");
  document.querySelectorAll("[data-cam]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-cam");
      if (channel) channel.setAttribute("data-channel", key);
      document.querySelectorAll("[data-cam]").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      document.querySelectorAll("[data-cam-media]").forEach(function (media) {
        if (media.tagName !== "VIDEO") return;
        if (media.getAttribute("data-cam-media") === key) media.play().catch(function () {});
        else media.pause();
      });
    });
  });

  var sticky = document.querySelector(".sticky");
  var buy = document.querySelector("#buy");
  if (sticky && buy && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        sticky.style.visibility = entry.isIntersecting ? "hidden" : "visible";
      });
    }, {threshold: 0, rootMargin: "0px 0px -72px 0px"});
    io.observe(buy);
  }
})();
