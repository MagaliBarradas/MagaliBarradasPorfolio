(() => {
    const portraitQuery = window.matchMedia("(max-width: 900px) and (orientation: portrait)");
    const storageKey = "portfolio-orientation-notice-dismissed";
    let overlay = null;
    let previousOverflow = "";

    const styles = document.createElement("style");
    styles.textContent = `
        .orientation-notice {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: grid;
            place-items: center;
            padding: 24px;
            background: rgba(3, 10, 34, .96);
            color: #fff;
            font-family: "VT323", monospace;
            text-align: center;
        }

        .orientation-notice[hidden] {
            display: none;
        }

        .orientation-card {
            width: min(390px, 100%);
            padding: 28px 22px;
            border: 4px solid #4d6fd0;
            background: #09183f;
            box-shadow:
                inset 5px 5px 0 #173c82,
                inset -5px -5px 0 #030b25,
                8px 8px 0 #000718;
        }

        .orientation-card h2 {
            margin: 22px 0 15px;
            color: #ffd84a;
            font-family: "Press Start 2P", monospace;
            font-size: 15px;
            line-height: 1.55;
        }

        .orientation-card p {
            margin: 0 auto 22px;
            max-width: 310px;
            color: #dce7ff;
            font-size: 24px;
            line-height: 1.25;
        }

        .orientation-phone {
            position: relative;
            width: 58px;
            height: 94px;
            margin: 14px auto 28px;
            border: 5px solid #fff;
            background: #173c82;
            box-shadow: 6px 6px 0 #000718;
            animation: rotatePhone 1.8s steps(4, end) infinite;
        }

        .orientation-phone::before {
            content: "";
            position: absolute;
            top: 8px;
            right: 7px;
            bottom: 8px;
            left: 7px;
            background: #35b9dc;
        }

        .orientation-phone::after {
            content: "↻";
            position: absolute;
            top: 103px;
            left: 50%;
            color: #ffd84a;
            font-family: "Press Start 2P", monospace;
            font-size: 22px;
            transform: translateX(-50%);
        }

        @keyframes rotatePhone {
            0%, 35% { transform: rotate(0deg); }
            65%, 100% { transform: rotate(90deg); }
        }

        .orientation-continue {
            width: 100%;
            padding: 14px 12px;
            border: 3px solid #9b7200;
            border-radius: 0;
            background: #ffd84a;
            box-shadow: 5px 5px 0 #000718;
            color: #071331;
            font-family: "Press Start 2P", monospace;
            font-size: 8px;
            line-height: 1.5;
            cursor: pointer;
        }

        .orientation-continue:active {
            transform: translate(3px, 3px);
            box-shadow: 2px 2px 0 #000718;
        }

        @media (prefers-reduced-motion: reduce) {
            .orientation-phone {
                animation: none;
                transform: rotate(90deg);
            }
        }
    `;
    document.head.appendChild(styles);

    function createOverlay() {
        if (overlay) return overlay;

        overlay = document.createElement("div");
        overlay.className = "orientation-notice";
        overlay.hidden = true;
        overlay.innerHTML = `
            <section class="orientation-card" role="dialog" aria-modal="true" aria-labelledby="orientationTitle" aria-describedby="orientationDescription">
                <div class="orientation-phone" aria-hidden="true"></div>
                <h2 id="orientationTitle">RODA O TELEMÓVEL</h2>
                <p id="orientationDescription">Para explorar este mundo com uma experiência melhor, utiliza o telemóvel na horizontal.</p>
                <button class="orientation-continue" type="button">CONTINUAR NA VERTICAL</button>
            </section>
        `;

        overlay.querySelector(".orientation-continue").addEventListener("click", () => {
            sessionStorage.setItem(storageKey, "true");
            hideNotice();
        });

        document.body.appendChild(overlay);
        return overlay;
    }

    function showNotice() {
        if (sessionStorage.getItem(storageKey) === "true") return;
        const notice = createOverlay();
        if (!notice.hidden) return;
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        notice.hidden = false;
        notice.querySelector(".orientation-continue").focus();
    }

    function hideNotice() {
        if (!overlay || overlay.hidden) return;
        overlay.hidden = true;
        document.body.style.overflow = previousOverflow;
    }

    function updateOrientationNotice() {
        if (portraitQuery.matches) {
            showNotice();
        } else {
            if (overlay && !overlay.hidden) {
                sessionStorage.setItem(storageKey, "true");
            }
            hideNotice();
        }
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && overlay && !overlay.hidden) {
            sessionStorage.setItem(storageKey, "true");
            hideNotice();
        }
    });

    portraitQuery.addEventListener?.("change", updateOrientationNotice);
    window.addEventListener("orientationchange", updateOrientationNotice);
    window.addEventListener("resize", updateOrientationNotice);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", updateOrientationNotice, { once: true });
    } else {
        updateOrientationNotice();
    }
})();
