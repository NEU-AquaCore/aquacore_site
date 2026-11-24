# AquaCore visual context

Source: the current React codebase and existing local brand assets.

- Brand: NEU AquaCore / 海洋之心, Northeastern University, Shenyang.
- Logo: `src/assets/logos/aquacoreWheelLogo.webp`, reused without redrawing.
- Robot renders: `public/images/logos/clutch-home.png` and `challenge-home.png`.
- Theme-compatible cutouts: `clutch-cutout.webp` and `challenge-cutout.webp`; only the original border-connected flat background is made transparent, using `scripts/prepare-vehicle-cutouts.py`.
- Lab and pool photography: `public/images/team-2026/`; descriptions from `src/data/teamPhotos.js`.
- Supporter logos: existing NEU, Faculty of Robot Science and Engineering, and Aerial and Maritime Swarm Intelligence Laboratory assets.
- Dark background `#181818`; blue emphasis from the current palette (`#60a5fa`). Light counterpart uses white/gray surfaces and readable deep blue.
- System sans-serif type; flat surfaces, fine rules, small corner radii.
- The user supplied two AquaCore illustrations during this iteration. The horizontal artwork is used in the homepage recruitment section on desktop, and the near-square version is selected on mobile using `<picture>`. Copies are compressed as `public/images/brand/aquacore-art-wide.webp` and `aquacore-art-square.webp` without changing their compositions.
- Existing content supplies the 2020 founding date and vehicle names; no new performance claims or fabricated results.
