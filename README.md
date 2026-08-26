# nilfors.studio

The Nilfors Studio website. Static HTML, no build step, no dependencies.

```
index.html      studio index, tabs switch the panels
base.css        shell shared by every page
studio.css      the studio index only
studio.js       the tabs, and the sticky header's scrolled state
theme.js        light/dark, shared

isle/           the Isle project
  index.html
  privacy.html  ← App Store Connect privacy URL
  support.html  ← App Store Connect support URL
  isle.css      Isle's own look; other projects get their own

tumble/         same shape as isle/
normerat/       same shape again, but written in Swedish (lang="sv") — the app
                is about högskoleprovet, so its readers are Swedish. Its tile
                and mark are the app's own icon as PNG rather than inline SVG:
                the mark is a serif N and this site loads no web fonts.
```

A project that is only a link off-site needs no folder at all — Filenova is a
card on the index and nothing more.

## Adding a project

Copy the `<a class="project">` block in `index.html` and give it:

- its own tile art (a 64×64 `viewBox` SVG, drawn edge to edge)
- `style="--tint: …"` — the project's own colour, used for the bloom the card
  shows on hover. Keep it around 15–20% alpha; it is a wash, not a fill.
- a name, one line of description, and a platform
- a status pill carrying exactly one of `.is-soon`, `.is-dev` or `.is-live`.
  That class colours the dot; the label itself always stays muted.

Then bump the count in the section head. The grid reflows on its own.

Colour on this page belongs to projects, never to the studio: the shell is
monochrome, and each card only borrows its `--tint` while pointed at.

A project that wants its own look gets a folder and its own stylesheet loaded
after `base.css` — nothing project-specific lives in the shared layer.

## Running it

```bash
python3 -m http.server 4173
```

## Deploying

Pushing to `main` publishes via GitHub Pages. There is no build, so what is in
the repo is what is served.

**Bump `?v=` on every stylesheet and script link whenever you change CSS, JS or
the markup that depends on them.** Pages serves HTML and assets with the same
`max-age=600` and they expire independently, so without this a returning
visitor can get the new HTML against a ten-minute-old stylesheet. That is not a
slow refresh — it is a broken page, because the markup and the CSS are written
against each other. One find-and-replace across the five HTML files:

```bash
sed -i '' 's/?v=2/?v=3/g' index.html isle/*.html tumble/*.html
```
