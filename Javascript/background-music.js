(() => {
  "use strict";

  const script = document.currentScript;
  const audioUrl = new URL("../audio/8-bit-game-music-short.wav", script.src);
  const enabledKey = "portfolio-music-enabled";
  const timeKey = "portfolio-music-time";
  const isEnabled = () => localStorage.getItem(enabledKey) !== "false";

  const audio = new Audio(audioUrl);
  audio.loop = true;
  audio.preload = "metadata";
  audio.volume = 0.22;

  const savedTime = Number(sessionStorage.getItem(timeKey));
  if (Number.isFinite(savedTime) && savedTime > 0) {
    audio.currentTime = savedTime;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "music-toggle";
  button.setAttribute("aria-label", "Desligar música");
  button.title = "Desligar música";

  const style = document.createElement("style");
  style.textContent = `
    .music-toggle {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 1000;
      display: grid;
      width: 52px;
      height: 52px;
      place-items: center;
      padding: 0;
      border: 3px solid #fff;
      border-radius: 10px;
      color: #fff;
      background: #21154d;
      box-shadow: 5px 5px 0 #130d38;
      font: 24px/1 sans-serif;
      cursor: pointer;
      transition: transform .18s ease, filter .18s ease;
    }
    .music-toggle:hover {
      filter: brightness(1.18);
      transform: translateY(-2px);
    }
    .music-toggle:focus-visible {
      outline: 4px solid #ffd23f;
      outline-offset: 3px;
    }
    @media (max-width: 650px) {
      .music-toggle {
        right: 12px;
        bottom: 12px;
        width: 46px;
        height: 46px;
        font-size: 21px;
      }
    }
  `;

  const updateButton = () => {
    const enabled = isEnabled();
    button.textContent = enabled ? "🔊" : "🔇";
    button.setAttribute("aria-pressed", String(enabled));
    button.setAttribute("aria-label", enabled ? "Desligar música" : "Ligar música");
    button.title = enabled ? "Desligar música" : "Ligar música";
  };

  const play = () => {
    if (!isEnabled()) return;
    audio.play().catch(() => {
      /* O navegador pode aguardar pela primeira interação do visitante. */
    });
  };

  const beginOnFirstInteraction = (event) => {
    if (event.target.closest?.(".music-toggle")) return;
    play();
  };

  document.addEventListener("pointerdown", beginOnFirstInteraction, { once: true });
  document.addEventListener("keydown", beginOnFirstInteraction, { once: true });

  button.addEventListener("click", () => {
    const nextEnabled = !isEnabled();
    localStorage.setItem(enabledKey, String(nextEnabled));
    if (nextEnabled) {
      play();
    } else {
      audio.pause();
    }
    updateButton();
  });

  let lastSavedSecond = -1;
  audio.addEventListener("timeupdate", () => {
    const second = Math.floor(audio.currentTime);
    if (second !== lastSavedSecond) {
      lastSavedSecond = second;
      sessionStorage.setItem(timeKey, String(audio.currentTime));
    }
  });

  window.addEventListener("pagehide", () => {
    sessionStorage.setItem(timeKey, String(audio.currentTime));
  });

  updateButton();
  document.head.appendChild(style);
  document.body.appendChild(button);
})();
