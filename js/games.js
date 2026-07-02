/* =========================================================
   RollForge Games — Datos de los juegos
   -----------------------------------------------------------
   Para añadir un juego nuevo, copia un objeto del array y
   rellena sus datos. Si aún no tienes la imagen, deja
   "image: null" y se mostrará un placeholder automáticamente.
   ========================================================= */

const GAMES = [
  {
    id: "rollstories",
    name: "RollStories", // TODO: sustituir por el nombre real
    image: "assets/games/rollstories.png", // TODO: ruta a la imagen, ej: "assets/games/mi-juego.jpg"
    link: "https://jorgeortizbaz.github.io/rollstories/", // TODO: sustituir por el enlace real al juego
    summary: {
      es: "Cortas historias de rol donde podrás experimentar la experiencia en un simple sistema, donde la toma de decisones y el resultado de los dados determinarán el rumbo de la historia. ¡Explora, decide y diviértete!",
      en: "Short role-playing stories where you can experience the adventure in a simple system, where decision-making and dice rolls will determine the course of the story. Explore, decide, and have fun!",
      ru: "Короткие ролевые истории, где вы сможете испытать приключение в простой системе, где принятие решений и броски кубиков определяют ход истории. Исследуйте, принимайте решения и получайте удовольствие!"
    }
  }
  // Añade más objetos aquí para más juegos:
  // {
  //   id: "otro-juego",
  //   name: "Otro Juego",
  //   image: "assets/games/otro-juego.jpg",
  //   link: "https://...",
  //   summary: { es: "...", en: "...", ru: "..." }
  // },
];
