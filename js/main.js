/* =========================================================
   RollForge Games — Lógica principal
   ========================================================= */

/* ---------- Render de cards de juegos ---------- */
function renderGameCards(lang) {
  const grid = document.getElementById("gamesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  GAMES.forEach((game) => {
    const summary = (game.summary && (game.summary[lang] || game.summary.es)) || "";

    const card = document.createElement("div");
    card.className = "game-card";
    card.dataset.gameId = game.id;

    const imageContent = game.image
      ? `<img src="${game.image}" alt="${game.name}">`
      : `<div class="game-card__placeholder">
           <span class="dice">🎲</span>
           <span>${lang === "en" ? "Image coming soon" : lang === "ru" ? "Изображение скоро появится" : "Imagen próximamente"}</span>
         </div>`;

    card.innerHTML = `
      <div class="game-card__inner">
        <div class="game-card__front">
          <div class="game-card__image-wrap">
            ${imageContent}
          </div>
          <div class="game-card__title-bar">
            <div class="game-card__title">${game.name}</div>
            <div class="game-card__hint" data-i18n="games.front_hint">${TRANSLATIONS[lang]?.["games.front_hint"] || ""}</div>
          </div>
        </div>
        <div class="game-card__back">
          <div>
            <div class="game-card__back-title">${game.name}</div>
            <p class="game-card__summary">${summary}</p>
          </div>
          <button class="game-card__play-btn" data-link="${game.link}">
            <span data-i18n="games.play_button">${TRANSLATIONS[lang]?.["games.play_button"] || "Play"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  attachCardListeners();
}

function attachCardListeners() {
  document.querySelectorAll(".game-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Si se hace clic en el botón de jugar, ir directo al enlace
      const playBtn = e.target.closest(".game-card__play-btn");
      if (playBtn) {
        e.stopPropagation();
        const link = playBtn.getAttribute("data-link");
        if (link && link !== "#") {
          window.open(link, "_blank", "noopener,noreferrer");
        }
        return;
      }
      // En cualquier otro punto de la card, voltear
      card.classList.toggle("flipped");
    });
  });
}

/* ---------- Dropdown "Jugar ahora" ---------- */
function renderPlayDropdown(lang) {
  const menu = document.getElementById("playDropdownMenu");
  if (!menu) return;

  menu.innerHTML = "";

  GAMES.forEach((game) => {
    const item = document.createElement("button");
    item.className = "dropdown__item";
    item.textContent = game.name;
    item.addEventListener("click", () => {
      if (game.link && game.link !== "#") {
        window.open(game.link, "_blank", "noopener,noreferrer");
      } else {
        // Si aún no hay enlace, llevar a la sección de juegos
        document.getElementById("games")?.scrollIntoView({ behavior: "smooth" });
      }
      closeAllDropdowns();
    });
    menu.appendChild(item);
  });
}

/* ---------- Dropdowns genéricos (idioma / jugar) ---------- */
function closeAllDropdowns(except = null) {
  document.querySelectorAll(".dropdown").forEach((dd) => {
    if (dd !== except) {
      dd.classList.remove("open");
      const trigger = dd.querySelector(".dropdown__trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    }
  });
}

function setupDropdown(dropdownId, triggerId) {
  const dropdown = document.getElementById(dropdownId);
  const trigger = document.getElementById(triggerId);
  if (!dropdown || !trigger) return;

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains("open");
    closeAllDropdowns();
    if (!isOpen) {
      dropdown.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
}

/* ---------- Selector de idioma ---------- */
function setupLangSelector() {
  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const lang = btn.getAttribute("data-lang");
      setCurrentLang(lang);
      translatePage(lang);
      closeAllDropdowns();
    });
  });
}

/* ---------- Logo -> scroll al top ---------- */
function setupLogoScrollTop() {
  const logoLink = document.getElementById("logo-link");
  if (!logoLink) return;

  logoLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Menú móvil (hamburguesa) ---------- */
function setupMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const navRight = document.getElementById("navbarRight");
  if (!toggle || !navRight) return;

  toggle.addEventListener("click", () => {
    const isOpen = navRight.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ---------- Cerrar dropdowns al hacer clic fuera ---------- */
document.addEventListener("click", () => {
  closeAllDropdowns();
});

/* ---------- Año dinámico en el footer ---------- */
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------- Inicialización ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const lang = getCurrentLang();

  translatePage(lang); // Esto ya llama a renderGameCards y renderPlayDropdown

  setupDropdown("playDropdown", "playDropdownTrigger");
  setupDropdown("langDropdown", "langDropdownTrigger");
  setupLangSelector();
  setupLogoScrollTop();
  setupMobileMenu();
  setFooterYear();
});
