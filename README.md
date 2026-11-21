# Kay's Authentik: Catalogue Website

A fast, mobile-friendly catalogue website for Kay's Authentik's whipped body butters, scented candles and satin sleeping masks. Customers can browse products, build an **Enquiry List**, and send their order to you on **WhatsApp** in one message.

It is plain HTML, CSS and JavaScript, so there is nothing to install. **To preview it, double-click `index.html`.**

---

## Folder map

```
index.html          Home page
catalogue.html      All products (search, filter, sort, PDF download)
product.html        Product detail page (one page serves every product)
categories.html     Category overview
about.html          About Us
contact.html        Contact + Request a Quote form

js/config.js        ← YOUR BUSINESS DETAILS (phone, WhatsApp, hours…)
data/products.js    ← YOUR PRODUCTS AND CATEGORIES
data/testimonials.js← CUSTOMER REVIEWS
css/styles.css      Colours, fonts and layout
js/main.js          Site behaviour (you normally don't need to touch this)
images/             Logo, favicon and product photos
```

> The original photos in the main folder are **not used** by the website. The site uses the resized copies in `images/products/`. You can move the originals somewhere else for safe keeping.

---

## 1. Edit contact details (phone, WhatsApp, hours)

Open **`js/config.js`** in Notepad (or VS Code) and change the text inside the quotes:

```js
phoneDisplay: "+254 791 564 400",   // how the number is shown
phoneLink:    "+254791564400",      // for "tap to call" (no spaces)
whatsapp:     "254791564400",       // WhatsApp: digits only, no + or spaces
email:        "",                   // leave "" to hide email everywhere
location:     "Nairobi, Kenya",
hours:        "Mon – Sat, 8:00am – 7:00pm",
foundedYear:  2022,                 // used for "Years in business"
social: { instagram: "https://instagram.com/yourpage", facebook: "", tiktok: "" }
```

Save, then refresh the browser. Every page updates automatically, including the floating WhatsApp button.

---

## 2. Add, edit or remove a product

1. Put the photo(s) in `images/products/`. Use JPG photos about 1200px on the longest side, ideally under 200 KB each. A free tool like [squoosh.app](https://squoosh.app) can shrink them.
2. Open **`data/products.js`**.
3. **To add a product:** copy one whole product block, from `{` to `},`, and paste it before the final `];`. Then change:

| Field | What it is |
|---|---|
| `id` | Unique web name, lowercase with dashes, e.g. `"lavender-candle"` |
| `name` | Product name shown on the site |
| `category` | Must match a category `id`, e.g. `"scented-candles"` |
| `sku` | Your product code, e.g. `"KA-SC-LAV"` |
| `price` | Number without commas, e.g. `1600`. Use `null` to show **"Request a Quote"** |
| `shortDescription` | One line for the product card |
| `fullDescription` | Longer text. `\n\n` starts a new paragraph |
| `specs` | Table rows, `"Label": "Value"` |
| `variants` | Options the customer picks, e.g. `"Scent": ["Vanilla", "Unscented"]` |
| `images` | List of `{ src: "images/products/file.jpg", alt: "describe the photo" }`. The first one is the main photo |
| `tags` | Search words. Add `"bestseller"` to show a Bestseller badge |
| `inStock` | `true` or `false` |
| `featured` | `true` shows it on the Home page (the first 4 featured products appear) |
| `dateAdded` | `"2026-01-31"`, used for "Newest" sorting and the New badge |

4. **To remove a product:** delete its whole `{ ... },` block.
5. **Watch the commas.** Each block ends with `},`. If the site goes blank, a missing comma or quote is the usual cause.

### Categories
Categories are at the top of `data/products.js`. To add a new range, copy one category block and give it a new `id`, `name`, `description` and `image`, then use that `id` as the `category` of its products. A category with no products yet can be shown as "Coming soon" by adding `comingSoon: true`.

### Reviews
Paste real customer reviews into **`data/testimonials.js`**, following the example in that file. Until you add some, the home page shows a "Share your experience" button.

---

## 3. Change colours, logo or fonts

- **Colours:** at the top of `css/styles.css`, change the values under `:root`, e.g. `--rose: #a3324f;` (buttons) or `--blush: #f7dde5;` (soft pink).
- **Logo:** replace `images/logo-mark.png` (square, about 256×256) and `images/favicon.png` (64×64) with files of the same names.
- **Fonts:** headings use *Archivo* and body text uses *Inter* (Google Fonts). Change the `<link href="https://fonts.googleapis.com/...">` line in each page and the `--font-display` / `--font-body` values in the CSS.

## 4. Edit page text

The About story, home page headline and "Why choose us" points are ordinary text in `about.html` and `index.html`. Open the file, find the sentence and edit it. To show your shop on the map, follow the note above the map in `contact.html`.

---

## 5. How orders and enquiries work

- **Floating WhatsApp button** (every page): opens a chat with your number.
- **Enquire about this product** (product page): opens WhatsApp with the product, chosen scent or colour, and quantity already typed.
- **Enquiry List** (bag icon, top right): customers collect several products and press *Send enquiry on WhatsApp*. You receive one tidy message with an estimated total.
- **Quote form** (Contact page): checks the details, then opens WhatsApp with the request ready to send.
  *Optional:* to also receive form requests by **email**, create a free form at [formspree.io](https://formspree.io) and paste its link into `formEndpoint` in `js/config.js`.
- **Catalogue PDF** (Catalogue page) and **Spec sheet (PDF)** (product page): open the print window. Choose **"Save as PDF"** as the printer.

---

## Google search

- `sitemap.xml` lists every page for Google. **When you add or remove a product, add or remove its line in `sitemap.xml` too.**
- The site is registered in Google Search Console (search.google.com/search-console). After big changes, open it → *Sitemaps* → resubmit `sitemap.xml`.

---

## 6. Put the website online (free)

**Easiest: Netlify Drop**
1. Go to <https://app.netlify.com/drop> and sign up (free).
2. Drag the whole **kays authentik** folder onto the page. You get a link like `https://something.netlify.app` within seconds.
3. In *Site settings → Change site name*, choose e.g. `kayauthentik`.
4. Update `siteUrl` in `js/config.js` to your real address, and replace `https://kaysauthentik.netlify.app` in the `<head>` of each `.html` file. This makes link previews on WhatsApp and Facebook show the right page.
5. To update the site later, drag the folder again (Deploys → drag & drop).

**GitHub Pages:** upload the folder to a GitHub repository, then go to *Settings → Pages → Deploy from branch → main*.
**Vercel:** `vercel.com` → *Add New Project* → import the folder or repository. No build settings are needed.

**Custom domain (e.g. kayauthentik.co.ke):** buy it from a Kenyan registrar and connect it in Netlify under *Domain settings*.
