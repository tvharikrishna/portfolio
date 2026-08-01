'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}
// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

if (
  testimonialsItem.length &&
  modalContainer &&
  modalCloseBtn &&
  overlay &&
  modalImg &&
  modalTitle &&
  modalText
) {
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}















function resetPortfolioFilter(article) {
  if (!article) return;

  const filterButtons = article.querySelectorAll("[data-filter-btn]");
  const projectItems = article.querySelectorAll("[data-filter-item], [data-hk-filter-item]");
  const selectValue = article.querySelector("[data-select-value]");

  filterButtons.forEach((btn) => btn.classList.remove("active"));

  const allButton = Array.from(filterButtons).find(
    (btn) =>
      btn.dataset.filterValue === "all" ||
      btn.textContent.trim().toLowerCase() === "all"
  );

  if (allButton) allButton.classList.add("active");
  if (selectValue) selectValue.textContent = "All";

  projectItems.forEach((item) => {
    item.classList.add("active");
    item.style.animation = "none";
    item.offsetHeight;
    item.style.animation = "";
  });
}

function filterPortfolio(article, selectedValue) {
  if (!article) return;

  const filterItems = article.querySelectorAll("[data-filter-item], [data-hk-filter-item]");

  filterItems.forEach((item) => {
    if (selectedValue === "all" || item.dataset.category === selectedValue) {
      item.classList.add("active");
      item.style.display = "";
      item.style.animation = "none";
      item.offsetHeight;
      item.style.animation = "";
    } else {
      item.classList.remove("active");
      item.style.display = "none";
    }
  });

  // HK Robot Labs divider
  if (article.id === "hk-robot-labs") {
    const divider = article.querySelector("[data-hk-project-divider]");
    if (divider) {
      divider.style.display = selectedValue === "all" ? "block" : "none";
    }
  }
}

const portfolioArticles = document.querySelectorAll("article.portfolio");

portfolioArticles.forEach((article) => {
  const select = article.querySelector("[data-select]");
  const selectItems = article.querySelectorAll("[data-select-item]");
  const selectValue = article.querySelector("[data-select-value]");
  const filterButtons = article.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () {
      elementToggleFunc(this);
    });
  }

  selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedValue =
        this.dataset.filterValue || this.textContent.trim().toLowerCase();

      if (selectValue) selectValue.textContent = this.textContent.trim();
      if (select) elementToggleFunc(select);

      filterPortfolio(article, selectedValue);

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      const activeBtn = Array.from(filterButtons).find(
        (btn) =>
          (btn.dataset.filterValue || btn.textContent.trim().toLowerCase()) === selectedValue
      );
      if (activeBtn) activeBtn.classList.add("active");
    });
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedValue =
        this.dataset.filterValue || this.textContent.trim().toLowerCase();

      if (selectValue) selectValue.textContent = this.textContent.trim();
      filterPortfolio(article, selectedValue);

      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");

      if (
          pages[j].dataset.page === "hk robot labs" ||
          pages[j].dataset.page === "hk motion works"
        ) {
          resetPortfolioFilter(pages[j]);
        }

        document.body.classList.toggle(
          "contact-no-scroll",
          pages[j].dataset.page === "contact"
        );

        document.body.classList.toggle(
          "hide-sidebar",
          pages[j].dataset.page === "hk robot labs" ||
          pages[j].dataset.page === "hk motion works"
        );

        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}

// create toast once
const toast = document.createElement("div");
toast.classList.add("copy-toast");
document.body.appendChild(toast);

function copyText(text, el) {
  navigator.clipboard.writeText(text);

  // icon turns green briefly
  const icon = el.querySelector(".copy-icon");
  icon.name = "checkmark-outline";
  icon.classList.add("copied");

  setTimeout(() => {
    icon.name = "copy-outline";
    icon.classList.remove("copied");
  }, 2000);

  // show toast beside email
  const rect = el.getBoundingClientRect();

  toast.textContent = "Copied!";
  toast.style.top = rect.top + rect.height / 1 + "px";
  toast.style.left = rect.right + 120 + "px";

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// Experience Dropdowns
function toggleDropdown(btn) {
  const content = btn.nextElementSibling;

  btn.classList.toggle("open");
  content.classList.toggle("open");

  if (content.classList.contains("open")) {
    showCollapseButton(btn, content);
  } else {
    removeCollapseButton();
  }
}

function showCollapseButton(btn, content) {
  removeCollapseButton();

  const collapseBtn = document.createElement("button");
  collapseBtn.className = "floating-collapse-btn";
  collapseBtn.textContent = "Collapse";

  collapseBtn.onclick = () => {
    document.querySelectorAll(".experience-dropdown-content").forEach(el => {
      el.classList.remove("open");
    });

    document.querySelectorAll(".experience-dropdown-btn").forEach(el => {
      el.classList.remove("open");
    });

    collapseBtn.remove();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  document.body.appendChild(collapseBtn);
}

function removeCollapseButton() {
  const existing = document.querySelector(".floating-collapse-btn");
  if (existing) existing.remove();
}

window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('sidebarFill').style.height = scrollPercent + '%';
});















const canvas = document.getElementById('starfield');
if (canvas) {
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const STAR_COUNT = 200;
  const METEOR_COUNT = 0;
  const METEOR_BRIGHTNESS = 0.0;
  const STAR_BRIGHTNESS = 0.5;

  const stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.0 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    });
  }

  const meteors = [];
  function createMeteor() {
    return {
      x: Math.random() * canvas.width * 1.5,
      y: -50,
length: Math.random() * 60 + 30,
speed: Math.random() * 1.5 + 0.5,
tail: Math.random() * 30 + 20,
      angle: Math.PI / 4,
      opacity: METEOR_BRIGHTNESS,
      active: true
    };
  }

  for (let i = 0; i < METEOR_COUNT; i++) {
    const m = createMeteor();
    m.x = Math.random() * canvas.width;
    m.y = Math.random() * canvas.height * 0.5;
    meteors.push(m);
  }

  let frame = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    stars.forEach(star => {
      const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset);
      const opacity = STAR_BRIGHTNESS * (0.4 + 0.6 * ((twinkle + 1) / 2));
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.fill();
    });

    meteors.forEach((m, index) => {
      const dx = Math.cos(m.angle) * m.speed;
      const dy = Math.sin(m.angle) * m.speed;
      m.x += dx;
      m.y += dy;
      m.opacity -= 0.004;

      if (m.x > canvas.width + 200 || m.y > canvas.height + 200 || m.opacity <= 0) {
        meteors[index] = createMeteor();
        return;
      }

      const gradient = ctx.createLinearGradient(
        m.x - Math.cos(m.angle) * m.tail,
        m.y - Math.sin(m.angle) * m.tail,
        m.x, m.y
      );
      gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
      gradient.addColorStop(0.7, `rgba(0, 0, 0, ${m.opacity * 0.4})`);
      gradient.addColorStop(1, `rgba(0, 0, 0, ${m.opacity})`);

      ctx.beginPath();
      ctx.moveTo(m.x - Math.cos(m.angle) * m.tail, m.y - Math.sin(m.angle) * m.tail);
      ctx.lineTo(m.x, m.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${m.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}