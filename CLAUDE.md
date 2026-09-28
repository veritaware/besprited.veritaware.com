# besprited.veritaware.com

Static site (plain HTML/CSS/JS, no build step) for Besprited. Pages: `index.html`, `download.html`, `roadmap.html`, `verify.html`.

## Conventions

- Header and footer are inlined in every page (no JS injection, so they work without JS and are crawlable). A change to the nav or footer must be made in all four HTML files.
- Local asset references are absolute (`/img/...`, `/css/...`) and carry a `?v=<hash>` cache-buster. Never write the hash by hand: run `node stamp.js` after any edit and before every deploy.
- Every decorative `<img>` needs `alt=""`; meaningful images need real alt text.
- Each page's `<head>` has its own `og:*` / `twitter:card` tags. Keep `og:image` absolute (`https://besprited.veritaware.com/img/og-banner.png`) and set `og:url` to the page's own URL.

## Manual updates when releasing a new version

- `js/download.js`: update `RELEASE_TAG` and `VERSION` (and the package filenames if the naming scheme changed).
- `index.html`: update the hardcoded "Version x.y.z · ..." line under the hero buttons.
- `verify.html`: update the example filenames (`besprited-vX.Y.Z-linux-x86_64.tar.gz` and its `.sig`) in the instructions and the `gpg --verify` command.
- `roadmap.html`: update milestone headings/dates, and the milestone list in the GitHub issues query link near the bottom.
- Run `node stamp.js`.
- **Remind the user** to update the Arch Linux PKGBUILD gist linked from the download page (https://gist.github.com/Nidrax/592aa62c8f200a93ffad2f45023b20e2): bump `pkgver`, reset `pkgrel`, and refresh the checksums. The gist lives outside this repo, so it is easy to forget. Whenever you help with a release update, mention this at the end.

## Manual updates on other occasions

- New year: the footer copyright year (`Copyright (c) 2026`) is hardcoded in all four HTML files.
- Feature list changes: edit the cards in `index.html`, and keep the `<meta name="description">` / `og:description` wording in sync.
- Screenshot changes: replace `img/screenshot.png` (hero, 1600 px wide; update its `width`/`height` attributes if the aspect ratio changes) and regenerate `img/og-banner.png` (must be exactly 1200×630), then run `node stamp.js`.
- New page: copy the header/footer and `<head>` meta block from an existing page, and add it to the `pages` you care about in the nav.
