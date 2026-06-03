/* =========================================================
   EDIT THESE TWO THINGS:
   1) START_DATE  -> the exact day & time you two got together
   2) PHOTOS      -> the list of your picture file names
   ========================================================= */

// When you became "us". Format: YYYY, MM(0-11!), DD, HH, MM
// NOTE: months are 0-indexed in JS, so 6 = July.
// This is set so the counter reads ~10 months 25 days. Tweak to your exact moment.
const START_DATE = new Date(2025, 6, 9, 6, 15, 0); // July 9, 2025, 6:15 AM

// Add your photos to the images/ folder and list the file names here.
// Missing files automatically show a pretty placeholder, so it never looks broken.
const PHOTOS = [
  { src: "images/photo1.jpg", caption: "us ❤" },
  { src: "images/photo2.jpg", caption: "cold but cozy" },
  { src: "images/photo3.jpg", caption: "all of us" },
  { src: "images/photo4.jpg", caption: "late nights" },
  { src: "images/photo5.jpg", caption: "+ a goat 🐐" },
  { src: "images/photo6.jpg", caption: "more of you" },
  { src: "images/photo7.jpg", caption: "favorite day" },
  { src: "images/photo8.jpg", caption: "you & me" },
];

/* ===== Live "together for" counter ===== */
function diffParts(start, now) {
  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  // anchor = start advanced by `months` whole months
  let anchor = new Date(start);
  anchor.setMonth(start.getMonth() + months);
  if (anchor > now) {
    months -= 1;
    anchor = new Date(start);
    anchor.setMonth(start.getMonth() + months);
  }

  let ms = now - anchor;
  const dayMs = 86400000;
  const days = Math.floor(ms / dayMs);
  ms -= days * dayMs;
  const hours = Math.floor(ms / 3600000);
  ms -= hours * 3600000;
  const minutes = Math.floor(ms / 60000);
  ms -= minutes * 60000;
  const seconds = Math.floor(ms / 1000);

  return { months, days, hours, minutes, seconds };
}

function tick() {
  const p = diffParts(START_DATE, new Date());
  setNum("months", p.months);
  setNum("days", p.days);
  setNum("hours", p.hours);
  setNum("minutes", p.minutes);
  setNum("seconds", p.seconds);
}
function setNum(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
tick();
setInterval(tick, 1000);

/* ===== Gallery ===== */
(function buildGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;
  PHOTOS.forEach((photo) => {
    const fig = document.createElement("figure");
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption || "us";
    img.loading = "lazy";
    img.onerror = function () {
      const ph = document.createElement("div");
      ph.className = "placeholder";
      ph.innerHTML =
        '<span class="ph-flower">🌺</span>' +
        "<span>add <b>" +
        photo.src +
        "</b><br>to the images folder</span>";
      fig.replaceChild(ph, img);
    };
    fig.appendChild(img);
    gallery.appendChild(fig);
  });
})();

/* ===== Background music ===== */
(function music() {
  const audio = document.getElementById("bgMusic");
  const control = document.getElementById("musicControl");
  const icon = document.getElementById("musicIcon");
  const label = document.getElementById("musicLabel");
  if (!audio || !control) return;

  audio.volume = 0.45;
  let playing = false;

  function play() {
    audio.play().then(() => {
      playing = true;
      control.classList.add("playing");
      label.textContent = "Pause";
      icon.innerHTML = "&#9835;";
    }).catch(() => {
      label.textContent = "Add music/indigo.mp3";
    });
  }
  function pause() {
    audio.pause();
    playing = false;
    control.classList.remove("playing");
    label.textContent = "Play our song";
  }

  control.addEventListener("click", () => (playing ? pause() : play()));

  // Try to autoplay; most browsers block it until the first interaction,
  // so we also start on the first click/tap/scroll anywhere.
  function firstInteraction() {
    if (!playing) play();
    window.removeEventListener("pointerdown", firstInteraction);
    window.removeEventListener("keydown", firstInteraction);
  }
  window.addEventListener("pointerdown", firstInteraction);
  window.addEventListener("keydown", firstInteraction);
  // attempt immediate (works if browser allows)
  play();
})();

/* ===== Falling petals ===== */
(function petals() {
  const wrap = document.getElementById("petals");
  if (!wrap) return;
  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 7 + Math.random() * 9 + "s";
    p.style.animationDelay = Math.random() * 8 + "s";
    const s = 8 + Math.random() * 12;
    p.style.width = s + "px";
    p.style.height = s + "px";
    p.style.opacity = 0.4 + Math.random() * 0.5;
    wrap.appendChild(p);
  }
})();
