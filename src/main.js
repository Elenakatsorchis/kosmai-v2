import { renderSite, renderTrackList } from "./components/siteSections.js?v=20260606-v2-ready";

document.documentElement.classList.add("js-enabled");

const root = document.querySelector("#site");
root.innerHTML = renderSite();

function initNavigation() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  });

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) {
      item.classList.add("is-visible");
      return;
    }

    observer.observe(item);
  });
}

function initEcosystem() {
  const panel = document.querySelector("[data-ecosystem]");
  if (!panel) return;

  const tabs = panel.querySelectorAll("[data-audience-index]");
  const content = panel.querySelector("#audience-panel");
  const title = panel.querySelector("[data-audience-title]");
  const summary = panel.querySelector("[data-audience-summary]");
  const tracksList = panel.querySelector("[data-tracks-list]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const index = Number(tab.dataset.audienceIndex);
      const next = renderTrackList(index);

      tabs.forEach((item) => item.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      content.setAttribute("aria-labelledby", tab.id);
      title.textContent = next.title;
      summary.textContent = next.summary;
      tracksList.innerHTML = next.html;
    });
  });
}

function restoreHashScroll() {
  if (!window.location.hash) return;

  const scrollToHashTarget = () => {
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ block: "start" });
  };

  window.requestAnimationFrame(scrollToHashTarget);
  window.setTimeout(scrollToHashTarget, 120);
  window.addEventListener("load", () => window.setTimeout(scrollToHashTarget, 80), { once: true });
}

initNavigation();
initReveal();
initEcosystem();
restoreHashScroll();
