# Dalhia Anniversary Website — Handoff / Project Context

This file is a complete summary of the project so a new Claude Code session
(running locally on Ben's computer, with file access) can finish it.

---

## What this project is
A romantic anniversary website Ben is making for his girlfriend **Dalhia**
(note spelling: her name is "Dalhia"; the flower is "dahlia"). It's a static
site (HTML/CSS/JS) that gets deployed by drag-and-dropping the folder onto
Netlify (the old version was live at dalhia.netlify.app).

The site folder on Ben's computer is at:
    Desktop\Dalhia-site
(It currently lives inside OneDrive — see "Known gotchas" below.)

GitHub repo: benducey111/Random-stuff
Working branch: claude/dahlia-anniversary-site-UPJoa
(All work has been committed and pushed there. The local folder may be slightly
behind/ahead — treat the GitHub branch as the source of truth for code.)

---

## Files
- index.html       — page structure
- styles.css       — styling; dahlia flowers, petals, collage, dropzone
- script.js        — ALL logic; has an editable config block at the very top
- START_HERE.txt   — non-technical drag-and-drop instructions for Ben
- SUPABASE_SETUP.txt — step-by-step Supabase setup for the shared album
- images/          — put photo files here (currently only README.txt)
- music/           — put indigo.mp3 here (currently only README.txt)

---

## Features already built (all working in code)
1. **Dahlia flowers** — realistic layered-petal SVG flowers (deep magenta ->
   pale pink, golden center), generated in script.js (the `dahlias()` IIFE).
   The big one at the top slowly spins. Replaced an earlier flat CSS version.
2. **Falling petals** animation.
3. **Live "together for" counter** — months/days/hours/minutes/seconds, updates
   every second. Anchored to START_DATE = 2025-07-09T07:01:53Z (~10 months 25
   days), which Ben confirmed is correct.
4. **Photo collage gallery** — 18 base photos listed in the PHOTOS array in
   script.js, each with a sweet caption. Missing image files show a 🌺
   placeholder so it never looks broken.
5. **Background music** — "Indigo" by Sam Barber. Plays from music/indigo.mp3.
   Player is event-driven (uses the audio 'playing'/'pause'/'error' events).
   Starts on first tap/click anywhere (browsers block autoplay). An earlier bug
   where the button started then instantly paused the song is FIXED.
6. **Shared photo collage (Supabase)** — the "add a photo to the collage" button
   above the gallery lets anyone upload; photos go into the SAME main collage.
   - If Supabase keys are configured: uploads go to a public Storage bucket and
     EVERYONE sees them (polls every 10s + refreshes on tab focus). Photos are
     downscaled to ~1400px JPEG before upload.
   - If keys are NOT configured: falls back to on-device localStorage so it
     still works, but only on that person's device.
   - Code lives in the `sharedCollage()` IIFE in script.js.
   - supabase-js v2 is loaded via CDN in index.html.

Ben's personal message (in the hero) and the closing line ("and so many more to
come / i love you, dalhia") are kept from his original site — do not rewrite
these without asking.

---

## WHAT'S LEFT TO DO (the new local Claude should help with these)

### 1. Add the song file
Put an mp3 of "Indigo" by Sam Barber into  music/  named exactly:  indigo.mp3
(Ben has this file; it kept getting lost because of OneDrive — see gotchas.)

### 2. Add the photos
Copy the 18 IMG_#### photos from Ben's OLD site's images folder into  images/.
The expected filenames (CASE-SENSITIVE) are listed in images/README.txt and in
the PHOTOS array in script.js:
  IMG_9375.JPG, IMG_9376.jpg, IMG_9377.jpg, IMG_9378.JPG, IMG_9379.JPG,
  IMG_9380.JPG, IMG_9383.JPG, IMG_9467.jpg, IMG_9468.jpg, IMG_9474.jpg,
  IMG_9507.JPG, IMG_9548.JPG, IMG_9577.JPG, IMG_9583.JPG, IMG_9614.JPG,
  IMG_9615.JPG, IMG_9616.JPG, IMG_9617.JPG
(Note the mix of .JPG and .jpg — must match exactly or that photo won't load.)

### 3. Finish the Supabase shared album
Ben has Supabase open. Steps (full detail in SUPABASE_SETUP.txt):
  a. Storage -> New bucket named exactly `photos`, with "Public bucket" ON.
  b. SQL Editor -> run these 3 policies:

      create policy "anyone can view photos"
        on storage.objects for select
        using ( bucket_id = 'photos' );

      create policy "anyone can add photos"
        on storage.objects for insert
        with check ( bucket_id = 'photos' );

      create policy "anyone can remove photos"
        on storage.objects for delete
        using ( bucket_id = 'photos' );

  c. Project Settings -> API: copy the **Project URL** and the **anon public**
     key.
  d. Paste them into the top of script.js:

      const SUPABASE_URL = "https://YOURPROJECT.supabase.co";   // <- Project URL
      const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";                // <- anon public key
      const SUPABASE_BUCKET = "photos";

  (The anon public key is safe to put in client code / commit — that's its
  intended use. Do NOT use the service_role key here.)

### 4. Deploy
Drag the whole `Dalhia-site` folder onto https://app.netlify.com/drop
(or redeploy on the existing Netlify site). Make sure music/ and images/ go up
with it (and that files are real, not OneDrive placeholders).

---

## Known gotchas
- **OneDrive online-only files:** The folder is in OneDrive. Files showing a
  cloud icon are "online-only" placeholders and will NOT load / won't be
  included when zipping or deploying. Fix: right-click -> "Always keep on this
  device", OR move the whole Dalhia-site folder OUT of OneDrive (e.g.
  C:\Dalhia-site). This is why indigo.mp3 kept "disappearing".
- **Don't re-unzip over the folder:** Fresh zips don't contain Ben's mp3/photos,
  so unzipping a fresh copy wipes them. Edit files in place instead.
- **Music needs a first tap** to start (normal browser autoplay policy).
- **Filename case matters** on the web (Netlify/Linux) for the photos.
- **Shared album is open:** with the policies above, anyone with the site link
  can add/remove photos. Fine for a private link; ask before locking down.

---

## Config block location (top of script.js)
START_DATE, PHOTOS (filenames + captions), and the SUPABASE_* keys are all at
the very top of script.js, clearly commented as the things to edit.

## Current status of the two user-supplied pieces
- indigo.mp3  : NOT yet present in the committed repo (Ben adds locally).
- IMG_#### photos : NOT yet present in the committed repo (Ben adds locally).
- Supabase keys : NOT yet filled in (still placeholders in script.js).
Everything else (all code/features) is done and pushed.
