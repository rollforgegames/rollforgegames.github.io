/* =========================================================
   RollForge Games — Traducciones (ES / EN / RU)
   ========================================================= */

const TRANSLATIONS = {
  es: {
    "nav.games": "Juegos",
    "nav.play_now": "Jugar ahora",
    "hero.description":
      "RollForge Games ha sido creada con una idea clara: proporcionar experiencias de juego web y entretenimiento. Con varias ideas y varios juegos distintos, RollForge Games es un portal que ofrece diferentes juegos basados en juegos de rol, juegos de mesa, experiencias, etc. Completamente gratis, sin micropagos ni suscripciones, solo selecciona el juego que quieras, ¡y diviértete!",
    "games.section_title": "Nuestros Juegos",
    "games.section_subtitle": "Haz clic en una carta para descubrir más",
    "games.play_button": "Jugar",
    "games.back_hint": "Haz clic para volver",
    "games.front_hint": "Haz clic para ver más",
    "footer.contact_title": "Contacto",
    "footer.email_label": "Email:",
    "footer.follow_us": "Síguenos",
    "footer.rights": "Todos los derechos reservados.",
    "footer.placeholder": "(placeholder)"
  },
  en: {
    "nav.games": "Games",
    "nav.play_now": "Play now",
    "hero.description":
      "RollForge Games was created with a clear idea: to provide web gaming and entertainment experiences. With several ideas and different games, RollForge Games is a portal that offers a variety of games based on role-playing games, board games, experiences, and more. Completely free, with no micropayments or subscriptions — just pick the game you want and have fun!",
    "games.section_title": "Our Games",
    "games.section_subtitle": "Click on a card to learn more",
    "games.play_button": "Play",
    "games.back_hint": "Click to flip back",
    "games.front_hint": "Click to learn more",
    "footer.contact_title": "Contact",
    "footer.email_label": "Email:",
    "footer.follow_us": "Follow us",
    "footer.rights": "All rights reserved.",
    "footer.placeholder": "(placeholder)"
  },
  ru: {
    "nav.games": "Игры",
    "nav.play_now": "Играть сейчас",
    "hero.description":
      "RollForge Games была создана с четкой идеей: предоставить веб-игры и развлекательный опыт. С множеством идей и различных игр, RollForge Games — это портал, предлагающий разнообразные игры, основанные на ролевых играх, настольных играх, различных игровых experiences и многом другом. Полностью бесплатно, без микроплатежей и подписок — просто выбери игру, которая тебе нравится, и получай удовольствие!",
    "games.section_title": "Наши Игры",
    "games.section_subtitle": "Нажмите на карточку, чтобы узнать больше",
    "games.play_button": "Играть",
    "games.back_hint": "Нажмите, чтобы вернуться",
    "games.front_hint": "Нажмите, чтобы узнать больше",
    "footer.contact_title": "Контакты",
    "footer.email_label": "Email:",
    "footer.follow_us": "Подписывайтесь на нас",
    "footer.rights": "Все права защищены.",
    "footer.placeholder": "(placeholder)"
  }
};

const LANG_STORAGE_KEY = "rollforge_lang";
const DEFAULT_LANG = "es";

function getCurrentLang() {
  return localStorage.getItem(LANG_STORAGE_KEY) || DEFAULT_LANG;
}

function setCurrentLang(lang) {
  localStorage.setItem(LANG_STORAGE_KEY, lang);
}

function translatePage(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.documentElement.lang = lang;

  const currentLangLabel = document.getElementById("currentLangLabel");
  if (currentLangLabel) {
    const flagImgMap = {
      es: '<img src="https://flagcdn.com/16x12/es.png" alt="ES" style="display:inline-block; vertical-align:middle; margin-right:4px; width:16px; height:12px;"> ES',
      en: '<img src="https://flagcdn.com/16x12/gb.png" alt="EN" style="display:inline-block; vertical-align:middle; margin-right:4px; width:16px; height:12px;"> EN',
      ru: '<img src="https://flagcdn.com/16x12/ru.png" alt="RU" style="display:inline-block; vertical-align:middle; margin-right:4px; width:16px; height:12px;"> RU'
    };
    currentLangLabel.innerHTML = flagImgMap[lang] || flagImgMap.es;
  }

  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  // Volver a renderizar las cards de juegos con el idioma actualizado
  if (typeof renderGameCards === "function") {
    renderGameCards(lang);
  }

  if (typeof renderPlayDropdown === "function") {
    renderPlayDropdown(lang);
  }
}
