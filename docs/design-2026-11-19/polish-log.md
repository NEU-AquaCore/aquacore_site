# Visual polish log

## Round 1 — desktop light and dark

Rendered the homepage at 1440 × 1000 and reviewed the hero and every full-size viewport slice in both schemes.

The three main issues were the old baked-in charcoal image backgrounds, the hero image growing outside its allocated row and covering its title, and theme-incompatible hardcoded surfaces in existing pages.

Prepared transparent versions of the original vehicle renders using only border-connected matte removal. Fixed the hero image sizing and separation from its caption. Replaced shared colors with paired light/dark tokens and added scoped theme mappings to existing content.

## Round 2 — interactions and existing pages

Checked device preference changes, manual choices, persistence after reload, cross-tab synchronization, and navigation focus.

The search dialog's native focus restoration raced with route focus; route focus now runs on the next animation frame, and search-result navigation suppresses custom opener restoration. Existing team photo errors attempted to load a nonexistent API placeholder; missing photos now show initials and an honest “Photo coming soon” label. Continued adapting nested contact-form panels, team tabs and vehicle detail pages to the active theme.

Screenshots and executable browser checks are stored in this chat's visualization workspace, in `round-1/`, `round-2/` and the final verification directory.

## Final production check

The production bundle passed theme, storage and navigation checks and 28 desktop/mobile viewport captures. The homepage was checked at 320, 375, 768, 1024, 1440 and 1920 pixels; the captured pages had no horizontal overflow or visible broken images. Both Clutch and Challenge retained a working WebGL canvas in light and dark mode. The immediate-navigation fallback also passed with `document.startViewTransition` disabled.

Final visual review caught low-contrast legacy vehicle specification text (`text-gray-200`) on the new light cards; it now uses the theme body token. The game page's surrounding content follows the theme while its embedded game keeps a dark media surface.

The build retains the existing 830 kB vehicle-model chunk warning. Browser verification uses desktop Chrome with emulated screen sizes and system preferences; physical iOS/Android devices were not used.

## User-supplied artwork

Added the two requested AquaCore illustrations to the homepage recruitment section. Desktop/tablet uses the horizontal version; widths at or below 680 px select the near-square composition using `<picture>`, preserving the complete artwork. Reviewed real screenshots at 320, 375, 768 and 1440 px and in both color schemes. WebP copies are approximately 123 KiB and 112 KiB before the existing build optimizer.

The user then requested “不要这么醒目吧”. The artwork now serves as a small, subdued footer accent: 220 px wide on desktop and 76 px on mobile, with reduced saturation and opacity. Recruitment text leads the section.

The game theme check exposed existing viewport-based iframe scaling that overflowed its padded container. Scaling now measures the actual game surface with `ResizeObserver`, so the transformed iframe fits its available space without constant polling.
