/* ============================================================
   Horizon Realty Group — interactions
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     BOOK A CALL → Calendly popup
     ------------------------------------------------------------
     1. Create a free account at https://calendly.com
     2. Copy your scheduling link (looks like the URL below)
     3. Paste it as CALENDLY_URL and you're done — every "Book a Call"
        button across the site opens it in a popup.
     ============================================================ */
  var CALENDLY_URL = "https://calendly.com/carcross0609/30min";

  (function setupBooking() {
    // Match any "Book a Call" link/button (ignores a trailing arrow like "→").
    function isBooking(el) {
      var t = (el.textContent || "").replace(/[→\s]+/g, " ").trim();
      return t === "Book a Call";
    }
    var triggers = [].filter.call(document.querySelectorAll("a, button"), isBooking);
    triggers.forEach(function (el) {
      el.style.cursor = "pointer";
      el.addEventListener("click", function (e) {
        // If Calendly has loaded, open the popup; otherwise let the link fall
        // back to the #contact section so the button is never dead.
        if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
          e.preventDefault();
          window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        }
      });
    });
  })();

  /* ---------- Sticky nav background on scroll ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle (smooth-scroll to contact) ---------- */
  var toggle = document.getElementById("navToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------- Accordions (Client Support + FAQ) ---------- */
  function initAccordion(id, allowMultiple) {
    var root = document.getElementById(id);
    if (!root) return;
    root.querySelectorAll(".acc-head").forEach(function (head) {
      head.addEventListener("click", function () {
        var item = head.closest(".acc-item");
        var isOpen = item.classList.contains("is-open");
        if (!allowMultiple) {
          root.querySelectorAll(".acc-item").forEach(function (i) {
            i.classList.remove("is-open");
          });
        }
        item.classList.toggle("is-open", !isOpen);
      });
    });
  }
  initAccordion("supportAccordion", false);
  initAccordion("faqAccordion", false);

  /* ---------- Process tabs (visual toggle) ---------- */
  document.querySelectorAll(".tabs .tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".tabs .tab").forEach(function (t) {
        t.classList.remove("is-active");
      });
      tab.classList.add("is-active");
    });
  });

  /* ---------- Featured Listings (real properties) ---------- */
  var listings = [
    {
      name: "123 Oceanview Lane", loc: "Santa Monica, CA", price: "$2,250,000",
      beds: 4, baths: 3, sqft: "2,500", img: "assets/123oceanviewlane.png"
    },
    {
      name: "789 Pinecrest Drive", loc: "Austin, TX", price: "$675,000",
      beds: 3, baths: 2, sqft: "1,800", img: "assets/789pinecrestdrive.png"
    },
    {
      name: "456 Maple Avenue", loc: "Chicago, IL", price: "$1,150,000",
      beds: 5, baths: 4, sqft: "3,200", img: "assets/456mapleave.png"
    }
  ];

  function buildCard(l) {
    var card = document.createElement("article");
    card.className = "card";
    var media = '<div class="ph card__img" data-label="' + l.name + '">' +
      (l.img ? '<img src="' + l.img + '" alt="' + l.name + '" class="ph__img" loading="lazy" onerror="this.remove()" />' : "") +
      "</div>";
    card.innerHTML =
      '<div class="card__media">' +
        media +
        '<span class="card__tag">For Sale</span>' +
      "</div>" +
      '<div class="card__body">' +
        '<div class="card__row">' +
          '<span class="card__name">' + l.name + "</span>" +
          '<span class="card__price">' + l.price + "</span>" +
        "</div>" +
        '<p class="card__loc">' + l.loc + "</p>" +
        '<div class="card__specs">' +
          "<span><i></i>" + l.beds + " Beds</span>" +
          "<span><i></i>" + l.baths + " Baths</span>" +
          "<span><i></i>" + l.sqft + " sqft</span>" +
        "</div>" +
      "</div>";
    return card;
  }

  // Featured grid (homepage) — the three highlighted properties.
  var grid = document.getElementById("listingsGrid");
  if (grid) {
    listings.forEach(function (l) { grid.appendChild(buildCard(l)); });
  }

  // Full grid (listings.html) — the three featured plus the wider portfolio.
  var allGrid = document.getElementById("allListingsGrid");
  if (allGrid) {
    var allListings = listings.concat([
      { name: "107 Timberwilde Ln", loc: "Houston, TX 77024", price: "$49,900,000", beds: 8, baths: "11.5", sqft: "22,000", img: "assets/107.png" },
      { name: "102 Saxon Ave", loc: "Staten Island, NY 10314", price: "$1,199,999", beds: 5, baths: "3.5", sqft: "3,132", img: "assets/102.png" },
      { name: "1789 Skalkaho Hwy", loc: "Hamilton, MT 59840", price: "$22,500,000", beds: 14, baths: 9, sqft: "12,824", img: "assets/1789.png" },
      { name: "1024 Birchwood Court", loc: "Denver, CO", price: "$845,000", beds: 4, baths: 3, sqft: "2,400", img: "assets/1024.png" },
      { name: "55 Harborview Terrace", loc: "Seattle, WA", price: "$40,000,000", beds: 12, baths: 15, sqft: "20,000", img: "assets/55.png" },
      { name: "210 Magnolia Street", loc: "Charleston, SC", price: "$925,000", beds: 3, baths: 3, sqft: "2,100", img: "assets/210.png" },
      { name: "8 Summit Ridge Road", loc: "Boulder, CO", price: "$1,375,000", beds: 5, baths: 4, sqft: "3,600", img: "assets/8.png" },
      { name: "470 Sunset Boulevard", loc: "San Diego, CA", price: "$1,980,000", beds: 4, baths: 3, sqft: "2,750", img: "assets/470.png" },
      { name: "33 Willow Creek Lane", loc: "Portland, OR", price: "$615,000", beds: 3, baths: 2, sqft: "1,650", img: "assets/33.png" }
    ]);
    allListings.forEach(function (l) { allGrid.appendChild(buildCard(l)); });
  }

  /* ---------- Testimonials slider (real reviews) ---------- */
  var reviews = [
    {
      text: "Horizon Realty Group made buying our first home so easy! Jordan was super responsive, and we felt taken care of every step of the way.",
      name: "Emily R.", role: "Home Buyer · Austin, TX", img: "assets/happyclient.jpeg"
    },
    {
      text: "Sarah and Kevin were amazing! They knew the market inside out, and we got the perfect beachfront home within weeks.",
      name: "Marcus T.", role: "Home Buyer · Santa Monica, CA", img: "assets/happyclient1.png"
    },
    {
      text: "Mia's marketing strategies got our house sold in just 10 days! Couldn't have asked for a better team.",
      name: "Lisa K.", role: "Home Seller · Chicago, IL", img: "assets/happyclient2.jpg"
    }
  ];

  var tText = document.getElementById("tText");
  var tName = document.getElementById("tName");
  var tRole = document.getElementById("tRole");
  var tImg = document.getElementById("tImg");
  var tDots = document.getElementById("tDots");
  if (tText && tDots) {
    var current = 0;
    var dots = tDots.querySelectorAll("span");
    var timer;

    function showReview(i) {
      current = (i + reviews.length) % reviews.length;
      var r = reviews[current];
      tText.textContent = r.text;
      tName.textContent = r.name;
      tRole.textContent = r.role;
      if (tImg && r.img) { tImg.src = r.img; tImg.style.display = ""; }
      dots.forEach(function (d, di) { d.classList.toggle("is-active", di === current); });
    }
    function next() { showReview(current + 1); }
    function startAuto() {
      if (prefersReduced) return;
      timer = window.setInterval(next, 6000);
    }
    function resetAuto() { window.clearInterval(timer); startAuto(); }

    dots.forEach(function (d, di) {
      d.style.cursor = "pointer";
      d.addEventListener("click", function () { showReview(di); resetAuto(); });
    });
    showReview(0);
    startAuto();
  }

  /* ---------- Scroll reveal (failsafe) ----------
     Elements get the .reveal class only via JS, so if scripting is unavailable
     nothing is ever hidden. The hero reuses the same mechanism and reveals on
     load; everything else reveals as it scrolls into view. */
  function setupReveal() {
    // Reduced motion or no observer support: leave everything visible, no anim.
    if (prefersReduced || !("IntersectionObserver" in window)) return;

    // Hero content cascades in immediately on load.
    var heroItems = Array.prototype.slice.call(document.querySelectorAll(".hero__inner > *"));
    heroItems.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = 0.12 + i * 0.12 + "s";
    });
    // Force a reflow so the initial hidden state is committed before revealing.
    void document.body.offsetHeight;
    requestAnimationFrame(function () {
      heroItems.forEach(function (el) { el.classList.add("reveal--in"); });
    });

    // Everything else reveals on scroll.
    var selector = [
      ".process__head", ".tabs", ".tile",
      ".listings__head", ".card",
      ".stat",
      ".support__head", ".support__body .acc-item", ".support__img",
      ".team__head", ".team-card",
      ".testimonials__head", ".quote-card",
      ".cta-band__inner",
      ".faq__aside", ".accordion--faq .acc-item",
      ".footer__cta", ".footer__cols"
    ].join(",");
    var items = Array.prototype.slice.call(document.querySelectorAll(selector));
    items.forEach(function (el) { el.classList.add("reveal"); });

    // Stagger items that share a row so they cascade in.
    [".process__grid", ".listings__grid", ".stats__grid",
     ".team__grid", "#supportAccordion", "#faqAccordion"].forEach(function (groupSel) {
      var group = document.querySelector(groupSel);
      if (!group) return;
      Array.prototype.forEach.call(group.children, function (child, i) {
        if (child.classList.contains("reveal")) {
          child.style.transitionDelay = (i % 4) * 0.09 + "s";
        }
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -5% 0px" });

    items.forEach(function (el) { io.observe(el); });

    /* Scroll-position safety net. The observer handles gradual scrolling, but an
       instant jump (anchor link, End key, fast flick) can skip a section. On each
       scroll we reveal anything whose top has reached 92% of the viewport — which
       includes sections scrolled past — while leaving genuinely-below-fold content
       hidden, so the scroll-triggered motion is preserved. */
    var pending = items.slice();
    function revealInView() {
      var vh = window.innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        if (pending[i].getBoundingClientRect().top < vh * 0.92) {
          pending[i].classList.add("reveal--in");
          io.unobserve(pending[i]);
          pending.splice(i, 1);
        }
      }
      if (!pending.length) window.removeEventListener("scroll", revealInView);
    }
    window.addEventListener("scroll", revealInView, { passive: true });
    window.addEventListener("resize", revealInView, { passive: true });
    // Reveal whatever is already in view on load (and again once images settle
    // layout), so nothing in the initial viewport can wait on a scroll event.
    revealInView();
    window.addEventListener("load", revealInView);
  }
  setupReveal();
})();
