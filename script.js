// ============ Smooth Scrolling (Lenis) ============
function initLenis() {
  // Initialize Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothHandheld: true,
    smoothMobile: true
  });

  // Connect Lenis scroll to the browser's requestAnimationFrame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Hook into your existing anchor link scrolling logic to use Lenis's smooth scrolling instead
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          // Use Lenis scroll instance instead of native scrollIntoView
          lenis.scrollTo(target, { offset: 0, duration: 1.2 });
        }
      }
    });
  });
}

// ============ Reviews data ============
const REVIEWS = [
  { name: "Michael Smith", username: "@michaelsmith", rating: 5, review: "HavenProxy is a lifesaver. Managing and rotating our scraping IPs has never been easier. A must-have for anyone dealing with high request volume." },
  { name: "Emily Johnson", username: "@emilyjohnson", rating: 4, review: "Very useful platform. It has streamlined our whole pipeline. A few minor hiccups early on, but overall a great experience." },
  { name: "Daniel Williams", username: "@danielwilliams", rating: 5, review: "We've been on HavenProxy daily for months. The latency and success-rate insights are invaluable. Highly recommend it." },
  { name: "Sophia Brown", username: "@sophiabrown", rating: 4, review: "This platform is fantastic. It offers everything we need to route and rotate traffic efficiently." },
  { name: "James Taylor", username: "@jamestaylor", rating: 5, review: "Absolutely love this tool. It's intuitive and feature-rich, and it's significantly improved how we manage endpoints." },
  { name: "Olivia Martinez", username: "@oliviamartinez", rating: 4, review: "Great platform with a lot of potential. It has already saved us hours a week. Looking forward to future updates." },
  { name: "William Garcia", username: "@williamgarcia", rating: 5, review: "A game-changer for our infrastructure. Easy to use, extremely reliable, and highly recommended." },
  { name: "Mia Rodriguez", username: "@miarodriguez", rating: 4, review: "We've tried several proxy providers, but HavenProxy stands out. It's simple and effective." },
  { name: "Henry Lee", username: "@henrylee", rating: 5, review: "HavenProxy transformed our workflow. Managing and monitoring endpoints is now a breeze. Can't imagine working without it." },
];

function renderReviews() {
  const grid = document.getElementById("reviews-grid");
  if (!grid) return;
  grid.innerHTML = REVIEWS.map((r, i) => `
    <div class="review-card" data-animate data-delay="${(i % 3) * 120}">
      <div class="review-head">
        <img class="review-avatar" src="https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=${encodeURIComponent(r.name)}" alt="" width="36" height="36" loading="lazy" />
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-username">${r.username}</div>
        </div>
      </div>
      <p class="review-text">${r.review}</p>
      <div class="review-stars">${'<i data-lucide="star"></i>'.repeat(r.rating)}</div>
    </div>
  `).join("");
}

// ============ Navbar scroll state ============
function initNavbarScroll() {
  const nav = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}


// ============ Mobile menu ============
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const opening = !menu.classList.contains("open");
    menu.classList.toggle("open");
    btn.innerHTML = opening
      ? '<i data-lucide="x" class="w-6 h-6"></i>'
      : '<i data-lucide="menu" class="w-6 h-6"></i>';
    if (window.lucide) lucide.createIcons();
  });
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      if (window.lucide) lucide.createIcons();
    });
  });
}

// ============ Pricing monthly / yearly toggle ============
function initPricingToggle() {
  const tabs = document.querySelectorAll(".pricing-tab");
  const amounts = document.querySelectorAll(".pricing-card-price .amount");
  const periods = document.querySelectorAll(".pricing-card-price .period");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const mode = tab.dataset.tab;

      amounts.forEach((el) => {
        const val = mode === "yearly" ? el.dataset.yearly : el.dataset.monthly;
        el.textContent = "$" + val;
      });
      periods.forEach((el) => {
        el.textContent = mode === "yearly" ? "/year" : "/month";
      });
    });
  });
}

// ============ Reveal on scroll ============
function initRevealAnimations() {
  const els = document.querySelectorAll("[data-animate]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(() => el.classList.add("in-view"), delay);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}

// ============ Smooth anchor scrolling ============
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLenis();
  renderReviews();
  initNavbarScroll();
  initMobileMenu();
  initPricingToggle();
  initRevealAnimations();
  if (window.lucide) lucide.createIcons();
});
