document.documentElement.classList.add("js-enabled");

const yearNodes = document.querySelectorAll("[data-year]");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const faqButtons = document.querySelectorAll(".faq-button");
const carousel = document.querySelector("[data-carousel]");
const contactForms = document.querySelectorAll("[data-contact-form]");

yearNodes.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));

    if (panel) {
      panel.hidden = isExpanded;
    }
  });
});

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const dots = Array.from(carousel.querySelectorAll("[data-slide-to]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));

  if (activeIndex < 0) {
    activeIndex = 0;
  }

  const showSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === index;
      slide.classList.toggle("is-active", isActive);
      slide.hidden = !isActive;
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });

    activeIndex = index;
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetIndex = Number(dot.getAttribute("data-slide-to"));
      showSlide(targetIndex);
    });
  });

  if (!reduceMotion && slides.length > 1) {
    window.setInterval(() => {
      showSlide((activeIndex + 1) % slides.length);
    }, 5000);
  }
}

contactForms.forEach((form) => {
  const nextInput = form.querySelector('input[name="_next"]');
  const urlInput = form.querySelector('input[name="_url"]');

  if (nextInput && window.location.protocol.startsWith("http")) {
    nextInput.value = new URL("contact-success.html", window.location.href).toString();
  }

  if (urlInput) {
    urlInput.value = window.location.href;
  }
});
