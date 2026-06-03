/* =========================================================
   EDIT THESE TWO THINGS:
   1) START_DATE  -> the exact day & time you two got together
   2) PHOTOS      -> the list of your picture file names
   ========================================================= */

// The exact moment you two became "us" (from your old site).
// July 9, 2025, 07:01:53 UTC -> reads about 10 months 25 days right now.
const START_DATE = new Date("2025-07-09T07:01:53Z");

// Photos + captions (the captions spell out a message in order).
// Upload these same files into the images/ folder. Filenames are
// case-sensitive on the web, so keep .JPG vs .jpg exactly as below.
// Missing files automatically show a pretty placeholder, so it never looks broken.
const PHOTOS = [
  { src: "images/IMG_9375.JPG", caption: "you're beautiful" },
  { src: "images/IMG_9376.jpg", caption: "i love you" },
  { src: "images/IMG_9377.jpg", caption: "my favorite person" },
  { src: "images/IMG_9378.JPG", caption: "my whole heart" },
  { src: "images/IMG_9379.JPG", caption: "you light up my world" },
  { src: "images/IMG_9380.JPG", caption: "prettiest girl alive" },
  { src: "images/IMG_9383.JPG", caption: "my best friend" },
  { src: "images/IMG_9467.jpg", caption: "you make me smile" },
  { src: "images/IMG_9468.jpg", caption: "my happy place" },
  { src: "images/IMG_9474.jpg", caption: "mine forever 💕" },
  { src: "images/IMG_9507.JPG", caption: "my everything" },
  { src: "images/IMG_9548.JPG", caption: "always & forever" },
  { src: "images/IMG_9577.JPG", caption: "my sweetheart" },
  { src: "images/IMG_9583.JPG", caption: "i adore you" },
  { src: "images/IMG_9614.JPG", caption: "you & me" },
  { src: "images/IMG_9615.JPG", caption: "cutest girl ever" },
  { src: "images/IMG_9616.JPG", caption: "my world" },
  { src: "images/IMG_9617.JPG", caption: "i loveee youu dalhia" },
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
        photo.src.replace("images/", "") +
        "</b><br>to the images folder</span>";
      fig.replaceChild(ph, img);
    };
    fig.appendChild(img);
    if (photo.caption) {
      const cap = document.createElement("figcaption");
      cap.textContent = photo.caption;
      fig.appendChild(cap);
    }
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
  let fileMissing = false;

  // If the mp3 isn't there, say so clearly instead of failing silently.
  audio.addEventListener("error", () => {
    fileMissing = true;
    control.classList.remove("playing");
    label.textContent = "Add music/indigo.mp3";
  });

  function play() {
    if (fileMissing) {
      label.textContent = "Add music/indigo.mp3";
      return;
    }
    audio.play().then(() => {
      playing = true;
      control.classList.add("playing");
      label.textContent = "Pause";
      icon.innerHTML = "&#9835;";
    }).catch(() => {
      // Either autoplay was blocked (will retry on tap) or the file is missing.
      if (fileMissing || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        label.textContent = "Add music/indigo.mp3";
      }
    });
  }
  function pause() {
    audio.pause();
    playing = false;
    control.classList.remove("playing");
    label.textContent = "Play our song";
  }

  control.addEventListener("click", () => (playing ? pause() : play()));

  // Browsers block auto-play until the user interacts, so start the song on
  // the very first tap/click/keypress anywhere on the page.
  function firstInteraction() {
    if (!playing) play();
    window.removeEventListener("pointerdown", firstInteraction);
    window.removeEventListener("keydown", firstInteraction);
  }
  window.addEventListener("pointerdown", firstInteraction);
  window.addEventListener("keydown", firstInteraction);
  // optimistic immediate attempt (works if the browser allows auto-play)
  play();
})();

/* ===== Realistic dahlia flowers (layered SVG petals) ===== */
(function dahlias() {
  // One curved, pointed petal, base at center (0,0), tip pointing up.
  const PETAL = "M0 0 C -15 -30 -12 -70 0 -100 C 12 -70 15 -30 0 0 Z";

  function ring(count, scale, fill, offset) {
    let g = '<g transform="scale(' + scale + ')">';
    for (let i = 0; i < count; i++) {
      const a = offset + (i * 360) / count;
      g += '<path d="' + PETAL + '" transform="rotate(' + a + ')" fill="' + fill + '"/>';
    }
    return g + "</g>";
  }

  // outer (deep) -> inner (pale), each ring offset so petals interleave
  const RINGS = [
    [16, 1.0, "#8f1044", 11],
    [15, 0.84, "#b01556", 0],
    [14, 0.68, "#cf2470", 13],
    [12, 0.54, "#e84e8e", 0],
    [10, 0.41, "#f47aa6", 12],
    [9, 0.30, "#ffa3c2", 0],
    [7, 0.20, "#ffc9da", 10],
  ];

  function svg() {
    let body = "";
    RINGS.forEach((r) => (body += ring(r[0], r[1], r[2], r[3])));
    return (
      '<svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">' +
      '<g stroke="#6e0a33" stroke-width="0.5" stroke-opacity="0.22">' +
      body +
      "</g>" +
      '<circle r="7" fill="#ffe39c" stroke="#e0a94a" stroke-width="1.2"/>' +
      '<circle r="7" fill="none" stroke="#caa24a" stroke-width="0.6" stroke-dasharray="1.5 1.5"/>' +
      "</svg>"
    );
  }

  const markup = svg();
  document.querySelectorAll(".dahlia").forEach((el) => (el.innerHTML = markup));
})();

/* ===== Let Dalhia upload her own photos (saved in her browser) ===== */
(function uploads() {
  const KEY = "dalhia_photos_v1";
  const input = document.getElementById("fileInput");
  const zone = document.getElementById("dropzone");
  const grid = document.getElementById("userGallery");
  const hint = document.getElementById("uploadHint");
  if (!input || !grid) return;

  let photos = [];
  try { photos = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { photos = []; }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(photos));
      return true;
    } catch (e) {
      hint.textContent = "Your phone's storage for this page is full — remove a photo to add more.";
      return false;
    }
  }

  function render() {
    grid.innerHTML = "";
    photos.forEach((src, i) => {
      const fig = document.createElement("figure");
      fig.className = "user-photo";
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      const btn = document.createElement("button");
      btn.className = "del-btn";
      btn.innerHTML = "&times;";
      btn.title = "remove";
      btn.addEventListener("click", () => { photos.splice(i, 1); save(); render(); });
      fig.appendChild(img);
      fig.appendChild(btn);
      grid.appendChild(fig);
    });
  }

  // Shrink big photos before saving so they fit in browser storage.
  function shrink(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 1100;
          let w = img.width, h = img.height;
          if (w > h && w > max) { h = (h * max) / w; w = max; }
          else if (h > max) { w = (w * max) / h; h = max; }
          const c = document.createElement("canvas");
          c.width = w; c.height = h;
          c.getContext("2d").drawImage(img, 0, 0, w, h);
          resolve(c.toDataURL("image/jpeg", 0.82));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function add(files) {
    for (const f of files) {
      if (!f.type || !f.type.startsWith("image/")) continue;
      try {
        const data = await shrink(f);
        photos.push(data);
        if (!save()) break;
      } catch (e) { /* skip unreadable files */ }
    }
    render();
  }

  input.addEventListener("change", (e) => { add(e.target.files); input.value = ""; });
  zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("drag"); });
  zone.addEventListener("dragleave", () => zone.classList.remove("drag"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("drag");
    if (e.dataTransfer && e.dataTransfer.files) add(e.dataTransfer.files);
  });

  render();
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
