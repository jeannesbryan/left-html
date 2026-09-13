# Left — HTML template

The **Left** interface as plain HTML. Three pages, no PHP, no build step.

The theme itself lives in [jeannesbryan/left](https://github.com/jeannesbryan/left),
where it is written as templates for the [HTMLy](https://github.com/danpros/htmly)
CMS. That makes it awkward to reuse anywhere else: the markup is interleaved with
PHP, so lifting the design into a static site means transliterating it by hand
first.

This repository is that transliteration. Same interface, same classes, same
stylesheets — ordinary HTML files you can open in a browser and clone.

## What is here

```
index.html    the post index: hero, post cards, pagination, widgets
post.html     a single article: breadcrumb, article header, body, related, prev/next
page.html     a static page: eyebrow, lead, body
assets/
  marx.min.css      Marx, the classless CSS reset by Matthew Blode (MIT)
  left.css          Left's stylesheet — the theme's css/style.css, verbatim
  left.js           Left's script — the theme's js/theme.js, verbatim (menu toggle)
  placeholder.svg   stand-in for the featured-image slot
```

Forty-odd lines of HTML are repeated across the three files — the header and the
footer. That is deliberate. A template that needs a build step before it renders
is not a template, and the alternative (a fourth file plus an include) cannot be
opened by double-clicking it. If you adopt this for a real site you will probably
factor that out; if you are here to lift the UI, three self-contained pages are
easier to read.

## Using it

Open `index.html` in a browser. That is the whole setup — nothing is fetched from
the network, so it renders the same offline, on a plane, or in a sandbox.

To adapt it:

1. Copy the three HTML files and `assets/` into your project.
2. Replace the demo strings. The site name, the monogram and the navigation are
   in the header of each file; post content is marked in `index.html`.
3. Change the colours, if you want to, in one place:

```css
/* assets/left.css, at the very top */
:root {
  --left-red:   #b91c1c;
  --left-gold:  #facc15;
  --left-paper: #fff9e8;
}
```

Nothing downstream hard-codes a colour, so those three values drive the whole
interface.

## The two layers

| | What it does |
|---|---|
| **Marx** | Classless reset. Styles elements by tag — headings, lists, tables, quotes, form controls. Unopinionated about colour. |
| **Left** | The red-and-gold editorial skin on top: gold banner, paper background, cards with a red left edge and an offset shadow, serif display type, footer. |

Because the bottom layer is classless, plain markup already looks considered.
Left's classes exist for things that are genuinely structural rather than for
every paragraph:

`.left-width` the page container · `.left-hero` page heading block ·
`.left-post` one card in a listing · `.left-article-header` header of a single
post or page · `.left-panel` shared card for related posts, navigation and
comments · `.left-eyebrow` small uppercase label · `.left-meta` the
date · read time · category line.

## Keeping the assets in sync

`assets/left.css` and `assets/left.js` are copies, byte-for-byte, of
`css/style.css` and `js/theme.js` from the theme repository. A copy is a copy:
when the theme changes, this one has to be brought forward by hand.

```
# from a checkout of jeannesbryan/left
cp -p css/style.css  ../left-html/assets/left.css
cp -p js/theme.js    ../left-html/assets/left.js
md5sum ../left-html/assets/left.css ../left-html/assets/left.js
```

Vendored at **Left 1.1.3** — Marx is `marx-css` 5.3.2,
md5 `89a526bd6dc7e0d31f4f6f0592a2674c`.

The asset links carry no cache-buster. If you add one, derive it from the file
rather than typing a version number: the theme learned that the hard way in
1.1.2, when a stylesheet URL kept naming Marx 5.3.0 after the bundled file had
moved to 5.3.2, so cached visitors went on being served the old one and nothing
noticed for a release.

## Credits

- **Marx** — [Matthew Blode](https://github.com/mblode/marx), MIT. See
  `THIRD-PARTY-LICENSE.md`.
- **Left** — [Jeannes Bryan](https://github.com/jeannesbryan).
