(() => {
  "use strict";

  const script = document.currentScript;
  const audioUrl = new URL("../audio/8-bit-game-music-short.mp3", script.src);
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

  const style = document.createElement("style");
  style.textContent = `
    .music-toggle {
      position: fixed;
      right: max(18px, env(safe-area-inset-right));
      bottom: max(18px, env(safe-area-inset-bottom));
      z-index: 1000;
      display: grid;
      grid-template-columns: 34px auto;
      grid-template-rows: auto auto;
      min-width: 104px;
      min-height: 58px;
      align-items: center;
      column-gap: 8px;
      padding: 8px 12px 8px 9px;
      border: 3px solid #fff;
      border-radius: 16px 16px 6px 16px;
      color: #fff;
      background: linear-gradient(145deg, #ff4f9a, #7b35d3);
      box-shadow: 5px 5px 0 #130d38;
      font-family: "Press Start 2P", "VT323", monospace;
      cursor: pointer;
      transition: transform .18s ease, filter .18s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .music-toggle:hover {
      filter: brightness(1.18);
      transform: translateY(-3px) rotate(-1deg);
    }
    .music-toggle:focus-visible {
      outline: 4px solid #ffd23f;
      outline-offset: 3px;
    }
    .music-toggle__icon {
      grid-row: 1 / 3;
      display: grid;
      width: 34px;
      height: 34px;
      place-items: center;
      border: 2px solid #fff;
      border-radius: 50%;
      background: #21154d;
      box-shadow: 2px 2px 0 rgba(19, 13, 56, .7);
      font: 22px/1 sans-serif;
    }
    .music-toggle__label {
      align-self: end;
      font-size: 8px;
      line-height: 1.2;
      letter-spacing: .08em;
      text-align: left;
    }
    .music-toggle__state {
      align-self: start;
      color: #fff5a8;
      font-size: 7px;
      line-height: 1.2;
      text-align: left;
    }
    .music-toggle[data-playing="true"] .music-toggle__icon {
      animation: music-bop .7s steps(2, end) infinite;
    }
    .music-toggle[data-enabled="false"] {
      color: #ddd8ee;
      background: linear-gradient(145deg, #554d70, #29223f);
    }
    .music-toggle[data-enabled="false"] .music-toggle__state {
      color: #c9c3d8;
    }
    @keyframes music-bop {
      50% { transform: translateY(-3px) rotate(7deg); }
    }
    @media (max-width: 650px) {
      .music-toggle {
        right: max(10px, env(safe-area-inset-right));
        bottom: max(10px, env(safe-area-inset-bottom));
        grid-template-columns: 30px auto;
        min-width: 86px;
        min-height: 50px;
        column-gap: 6px;
        padding: 6px 9px 6px 7px;
        border-width: 2px;
        border-radius: 14px 14px 5px 14px;
        box-shadow: 4px 4px 0 #130d38;
      }
      .music-toggle__icon { width: 30px; height: 30px; font-size: 19px; }
      .music-toggle__label { font-size: 7px; }
      .music-toggle__state { font-size: 6px; }
    }
    @media (max-width: 380px) {
      .music-toggle { min-width: 50px; grid-template-columns: 1fr; padding: 7px; }
      .music-toggle__icon { grid-row: auto; margin: auto; }
      .music-toggle__label,
      .music-toggle__state { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .music-toggle,
      .music-toggle__icon {
        animation: none !important;
        transition: none;
      }
    }
  `;

  const updateButton = () => {
    const enabled = isEnabled();
    const translate = (key, fallback) => window.i18n?.t(key) ?? fallback;
    button.dataset.enabled = String(enabled);
    button.innerHTML = enabled
      ? `<span class="music-toggle__icon" aria-hidden="true">♫</span><span class="music-toggle__label">${translate("music.title", "MÚSICA")}</span><span class="music-toggle__state">${translate("music.on", "ON · DANÇA!")}</span>`
      : `<span class="music-toggle__icon" aria-hidden="true">×</span><span class="music-toggle__label">${translate("music.title", "MÚSICA")}</span><span class="music-toggle__state">${translate("music.off", "OFF · ZZZ")}</span>`;
    button.setAttribute("aria-pressed", String(enabled));
    button.setAttribute("aria-label", enabled ? translate("music.offLabel", "Desligar música") : translate("music.onLabel", "Ligar música"));
    button.title = enabled ? translate("music.offLabel", "Desligar música") : translate("music.onLabel", "Ligar música");
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

  audio.addEventListener("play", () => {
    button.dataset.playing = "true";
  });

  audio.addEventListener("pause", () => {
    button.dataset.playing = "false";
  });

  window.addEventListener("pagehide", () => {
    sessionStorage.setItem(timeKey, String(audio.currentTime));
  });

  document.addEventListener("languagechange", updateButton);

  updateButton();
  document.head.appendChild(style);
  document.body.appendChild(button);
})();
