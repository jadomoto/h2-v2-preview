(function () {
  var packages = [
    {id: "45937767645363", name: "H2 Camera Only", price: "229.00", note: "Today ships with 64GB card"},
    {id: "45546997743795", name: "H2 + 64GB Card", price: "269.00", note: "Today ships with 128GB card", badge: "Current offer"},
    {id: "45937767678131", name: "H2 + 128GB Card", price: "309.00", note: "Includes 128GB card"}
  ];
  var selected = 1;
  var priceEl = document.querySelector("[data-price]");
  var noteEl = document.querySelector("[data-price-note]");
  var ctaEls = document.querySelectorAll("[data-cart]");
  var stickyName = document.querySelector("[data-sticky-name]");
  var stickyPrice = document.querySelector("[data-sticky-price]");
  var buttons = document.querySelectorAll("[data-pkg]");

  function money(n) { return "$" + n; }
  function apply() {
    var item = packages[selected];
    buttons.forEach(function (btn, i) {
      var on = i === selected;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-checked", on ? "true" : "false");
    });
    if (priceEl) priceEl.textContent = money(item.price);
    if (noteEl) noteEl.textContent = item.note;
    if (stickyName) stickyName.textContent = item.name;
    if (stickyPrice) stickyPrice.textContent = money(item.price);
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
      label: "Closed — physical cover over the cabin lens"
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
