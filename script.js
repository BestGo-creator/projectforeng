const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "×" : "☰";
  if (menuToggle.animate && !reduceMotion) {
    menuToggle.animate(
      [{ transform: "rotate(-90deg) scale(.6)" }, { transform: "none" }],
      { duration: 280, easing: "cubic-bezier(.22,.8,.24,1)" }
    );
  }
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

/* =====================================================================
   ANIMATIONS
   ===================================================================== */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasObserver = "IntersectionObserver" in window;

const header = document.querySelector(".site-header");
const heroPhoto = document.querySelector(".hero-photo");

/* ---- Scroll progress bar, header shadow, hero photo drift ---- */
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
progressBar.setAttribute("aria-hidden", "true");
header.appendChild(progressBar);

let ticking = false;
function updateOnScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle("scrolled", y > 20);
  if (!reduceMotion) {
    progressBar.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    if (heroPhoto && y < 900) {
      heroPhoto.style.setProperty("--py", Math.min(y, 700) * 0.1 + "px");
    }
  }
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateOnScroll);
  }
}, { passive: true });
updateOnScroll();

/* ---- Highlight the nav link for the section being read ---- */
if (hasObserver) {
  const links = [...mainNav.querySelectorAll("a")];
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.remove("active"));
      const match = byId.get(entry.target.id);
      if (match) match.classList.add("active");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
}

/* ---- Everything below is skipped for people who prefer reduced motion ---- */
if (!reduceMotion && hasObserver) {

  /* Scroll reveals: siblings appear one after another */
  const revealGroups = [
    ".stats-strip > div",
    ".section-kicker",
    ".about-grid h2",
    ".about-text > *",
    ".value-card",
    ".campus-heading > *",
    ".campus-card",
    ".life-layout h2",
    ".life-copy > *",
    ".life-tags span",
    ".quote-card",
    ".admission-grid h2",
    ".admission-intro",
    ".exam-item",
    ".admission-foot"
  ];

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

  revealGroups.forEach((selector) => {
    const counts = new Map();
    document.querySelectorAll(selector).forEach((el) => {
      const n = counts.get(el.parentElement) || 0;
      counts.set(el.parentElement, n + 1);
      const step = selector === ".life-tags span" ? 70 : 100;
      el.style.setProperty("--d", n * step + "ms");
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  });

  /* Count-up numbers in the stats strip (600+, 60–70, 5–11) */
  const counters = [...document.querySelectorAll(".stats-strip strong")].map((el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const items = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (/\d/.test(node.nodeValue)) items.push({ node, template: node.nodeValue });
    }
    const render = (t) => items.forEach(({ node, template }) => {
      node.nodeValue = template.replace(/\d+/g, (m) => Math.round(parseInt(m, 10) * t));
    });
    render(0);
    return { el, render };
  });

  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      const counter = counters.find((c) => c.el === entry.target);
      const start = performance.now();
      const duration = 1700;
      const delay = 150 * counters.indexOf(counter);
      (function frame(now) {
        const t = Math.min(Math.max((now - start - delay) / duration, 0), 1);
        counter.render(1 - Math.pow(1 - t, 3));
        if (t < 1) requestAnimationFrame(frame);
      })(start);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => countObserver.observe(c.el));
}
