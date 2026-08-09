# nilfors.studio

The Nilfors Studio website. Static HTML, no build step, no dependencies.

```
index.html      studio index, tabs switch the panels
base.css        shell shared by every page
studio.css      the studio index only
studio.js       the tabs
theme.js        light/dark, shared

isle/           the Isle project
  index.html
  privacy.html  ← App Store Connect privacy URL
  support.html  ← App Store Connect support URL
  isle.css      Isle's own look; other projects get their own
```

## Adding a project

Copy the `<a class="project">` block in `index.html`, give it its own tile art,
name, one line, platform and status, then bump the count in the section head.
The grid reflows on its own.

A project that wants its own look gets a folder and its own stylesheet loaded
after `base.css` — nothing project-specific lives in the shared layer.

## Running it

```bash
python3 -m http.server 4173
```

## Deploying

Pushing to `main` publishes via GitHub Pages. There is no build, so what is in
the repo is what is served.
