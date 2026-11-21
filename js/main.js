/* =====================================================================
   KAY'S AUTHENTIK — SITE SCRIPT
   ---------------------------------------------------------------------
   You normally do NOT need to edit this file.
   - Business details  → js/config.js
   - Products          → data/products.js
   - Reviews           → data/testimonials.js
   - Colours / fonts   → css/styles.css (top of file)

   Sections in this file:
     1. Helpers & icons
     2. Shared header, footer, WhatsApp button
     3. Search
     4. Enquiry List (saved in the visitor's browser)
     5. Product cards
     6. Page: Home
     7. Page: Catalogue
     8. Page: Product detail
     9. Page: Categories
    10. Page: About
    11. Page: Contact / Quote form
    12. Start-up
   ===================================================================== */
(function () {
  "use strict";

  const SITE = window.SITE || {};
  const PRODUCTS = window.PRODUCTS || [];
  const CATEGORIES = window.CATEGORIES || [];
  const TESTIMONIALS = window.TESTIMONIALS || [];
  const PAGE = document.body.dataset.page || "";

  /* =================================================================
     1. HELPERS & ICONS
     ================================================================= */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Escape text before putting it into HTML */
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const formatPrice = (p) =>
    p == null || p === "" ? "Request a Quote" : `${SITE.currency || "KSh"} ${Number(p).toLocaleString("en-KE")}`;

  const waUrl = (text) =>
    `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

  const DEFAULT_WA_MSG = `Hello ${SITE.name}! I found you on your website and I'd like to ask about your products.`;

  const catById = (id) => CATEGORIES.find((c) => c.id === id);
  const productById = (id) => PRODUCTS.find((p) => p.id === id);
  const productUrl = (p) => `product.html?id=${encodeURIComponent(p.id)}`;
  const productsIn = (catId) => PRODUCTS.filter((p) => p.category === catId);

  /** The 2 most recently added products get a "New" badge */
  const NEW_IDS = PRODUCTS.slice()
    .sort((a, b) => String(b.dateAdded).localeCompare(String(a.dateAdded)))
    .slice(0, 2)
    .map((p) => p.id);

  const svg = (paths, opts = "") =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${opts}>${paths}</svg>`;

  const ICONS = {
    search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    list: svg('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>'),
    menu: svg('<path d="M3 6h18M3 12h18M3 18h18"/>'),
    close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
    mail: svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'),
    pin: svg('<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),
    clock: svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    truck: svg('<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'),
    leaf: svg('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.1-6"/>'),
    hand: svg('<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>'),
    gift: svg('<path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>'),
    check: svg('<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>'),
    alert: svg('<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    minus: svg('<path d="M5 12h14"/>'),
    trash: svg('<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'),
    download: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>'),
    sparkle: svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>'),
    instagram: svg('<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'),
    facebook: svg('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'),
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/></svg>'
  };
  const icon = (name) => ICONS[name] || "";

  /** Keep keyboard focus inside an open panel (accessibility) */
  function trapFocus(container, e) {
    if (e.key !== "Tab") return;
    const f = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])', container)
      .filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }

  /** Small pop-up message at the bottom of the screen */
  let toastTimer;
  function toast(message, actionLabel, action) {
    const t = $("#toast");
    if (!t) return;
    t.innerHTML = `<span>${esc(message)}</span>${actionLabel ? `<button type="button">${esc(actionLabel)}</button>` : ""}`;
    if (actionLabel) $("button", t).addEventListener("click", () => { action(); t.classList.remove("is-visible"); });
    t.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-visible"), 4500);
  }

  /** Update <title>, description and social-share tags (used on product pages) */
  function setMeta({ title, description, image }) {
    if (title) document.title = title;
    const set = (sel, attr, val) => { const el = $(sel); if (el && val) el.setAttribute(attr, val); };
    set('meta[name="description"]', "content", description);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    if (image) set('meta[property="og:image"]', "content", new URL(image, SITE.siteUrl + "/").href);
    const pageUrl = SITE.siteUrl + "/product.html" + location.search;
    set('meta[property="og:url"]', "content", pageUrl);
    // Tell Google the one official address of this product page
    let canon = $('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = pageUrl;
  }

  /* =================================================================
     2. SHARED HEADER, FOOTER & WHATSAPP BUTTON
     ================================================================= */
  const NAV = [
    { href: "index.html", label: "Home", page: "home" },
    { href: "catalogue.html", label: "Catalogue", page: "catalogue" },
    { href: "categories.html", label: "Categories", page: "categories" },
    { href: "about.html", label: "About Us", page: "about" },
    { href: "contact.html", label: "Contact / Quote", page: "contact" }
  ];

  function brandHTML() {
    return `
      <a class="brand" href="index.html" aria-label="${esc(SITE.name)} — home">
        <img src="images/logo-mark.png" alt="" width="46" height="46">
        <span class="brand-text">
          <span class="brand-name">${esc(SITE.name)}</span>
          <span class="brand-sub">${esc(SITE.tagline)}</span>
        </span>
      </a>`;
  }

  function renderHeader() {
    const slot = $("#site-header");
    if (!slot) return;
    const current = PAGE === "product" ? "catalogue" : PAGE;
    slot.outerHTML = `
      <div class="announce no-print">
        ${esc(SITE.serviceArea)} · Order on WhatsApp:
        <a href="${waUrl(DEFAULT_WA_MSG)}" target="_blank" rel="noopener">${esc(SITE.phoneDisplay)}</a>
      </div>
      <header class="site-header">
        <div class="container header-inner">
          ${brandHTML()}
          <nav class="main-nav" id="main-nav" aria-label="Main">
            <ul>
              ${NAV.map((n) => `<li><a href="${n.href}"${n.page === current ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("")}
            </ul>
          </nav>
          <div class="header-actions">
            <button class="icon-btn" type="button" id="search-open" aria-label="Search products" aria-controls="search-panel" aria-expanded="false">${icon("search")}</button>
            <button class="icon-btn" type="button" id="enquiry-open" aria-label="Open enquiry list" aria-controls="enquiry-drawer" aria-expanded="false">
              ${icon("list")}<span class="count-badge" data-count="0" aria-hidden="true">0</span>
            </button>
            <button class="icon-btn menu-toggle" type="button" id="menu-toggle" aria-label="Open menu" aria-controls="main-nav" aria-expanded="false">${icon("menu")}</button>
          </div>
        </div>
      </header>`;
  }

  function renderFooter() {
    const slot = $("#site-footer");
    if (!slot) return;
    const year = new Date().getFullYear();
    const socials = Object.entries(SITE.social || {}).filter(([, url]) => url);
    const activeCats = CATEGORIES.filter((c) => !c.comingSoon);

    slot.outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              ${brandHTML()}
              <p>Handmade whipped body butters, scented candles and satin sleep essentials, made with love in Kenya.</p>
              <div class="socials">
                <a href="${waUrl(DEFAULT_WA_MSG)}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${icon("whatsapp")}</a>
                ${socials.map(([name, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${esc(SITE.name)} on ${name}">${icon(name)}</a>`).join("")}
              </div>
            </div>
            <div>
              <h2>Quick links</h2>
              <ul>${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h2>Categories</h2>
              <ul>${activeCats.map((c) => `<li><a href="catalogue.html?category=${c.id}">${esc(c.name)}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h2>Contact</h2>
              <ul>
                <li><a href="tel:${esc(SITE.phoneLink)}">${esc(SITE.phoneDisplay)}</a></li>
                <li><a href="${waUrl(DEFAULT_WA_MSG)}" target="_blank" rel="noopener">WhatsApp us</a></li>
                ${SITE.email ? `<li><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li>` : ""}
                <li>${esc(SITE.location)}</li>
                <li>${esc(SITE.hours)}</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${year} ${esc(SITE.name)}. All rights reserved.</span>
            <span>Prices in Kenya Shillings (${esc(SITE.currency)}). Delivery across Kenya.</span>
          </div>
        </div>
      </footer>`;
  }

  /** Panels that live at the end of every page */
  function renderGlobalUI() {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="overlay" id="overlay" hidden></div>

      <div class="search-panel" id="search-panel" role="dialog" aria-modal="true" aria-label="Search products">
        <div class="container">
          <form class="search-form" action="catalogue.html" role="search">
            <label for="global-search" class="visually-hidden">Search by product name or SKU</label>
            <input id="global-search" name="q" type="search" placeholder="Search body butter, candles, KA-BB-330…" autocomplete="off">
            <button class="btn btn--dark" type="submit">Search</button>
            <button class="icon-btn" type="button" id="search-close" aria-label="Close search">${icon("close")}</button>
          </form>
          <ul class="search-results" id="search-results" aria-live="polite"></ul>
        </div>
      </div>

      <aside class="drawer" id="enquiry-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div class="drawer-head">
          <h2 id="drawer-title">Enquiry List</h2>
          <button class="icon-btn" type="button" id="enquiry-close" aria-label="Close enquiry list">${icon("close")}</button>
        </div>
        <div class="drawer-body" id="enquiry-body"></div>
        <div class="drawer-foot" id="enquiry-foot"></div>
      </aside>

      <div class="toast" id="toast" role="status" aria-live="polite"></div>

      <a class="wa-float no-print" href="${waUrl(DEFAULT_WA_MSG)}" target="_blank" rel="noopener" aria-label="Chat with ${esc(SITE.name)} on WhatsApp">
        ${icon("whatsapp")}<span>Chat with us</span>
      </a>`);
    $("#overlay").hidden = false;
  }

  /** Fill any element marked with data-site / data-wa / data-tel from config.js */
  function bindSiteData() {
    $$("[data-site]").forEach((el) => { el.textContent = SITE[el.dataset.site] ?? ""; });
    $$("[data-wa]").forEach((el) => {
      el.href = waUrl(el.dataset.wa || DEFAULT_WA_MSG);
      el.target = "_blank"; el.rel = "noopener";
    });
    $$("[data-tel]").forEach((el) => { el.href = `tel:${SITE.phoneLink}`; });
    $$("[data-email]").forEach((el) => {
      if (!SITE.email) { (el.closest("[data-email-wrap]") || el).remove(); return; }
      el.href = `mailto:${SITE.email}`; el.textContent = SITE.email;
    });
    $$("[data-years]").forEach((el) => {
      const y = Math.max(1, new Date().getFullYear() - Number(SITE.foundedYear || new Date().getFullYear()));
      el.textContent = y + "+";
    });
    $$("[data-product-count]").forEach((el) => { el.textContent = PRODUCTS.length; });
  }

  /* ---- open / close panels ---- */
  let lastFocus = null;
  function openPanel(panel, trigger) {
    lastFocus = trigger || document.activeElement;
    closeAllPanels(false);
    panel.classList.add("is-open");
    $("#overlay").classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    const focusTarget = $("input, button", panel);
    setTimeout(() => focusTarget && focusTarget.focus(), 50);
  }
  function closeAllPanels(restoreFocus = true) {
    $$(".search-panel, .drawer").forEach((p) => p.classList.remove("is-open"));
    $("#overlay").classList.remove("is-open");
    document.body.style.overflow = "";
    $$("#search-open, #enquiry-open").forEach((b) => b.setAttribute("aria-expanded", "false"));
    if (restoreFocus && lastFocus) lastFocus.focus();
  }

  function initHeader() {
    const toggle = $("#menu-toggle"), nav = $("#main-nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.innerHTML = icon(open ? "close" : "menu");
    });
    $("#search-open").addEventListener("click", (e) => openPanel($("#search-panel"), e.currentTarget));
    $("#search-close").addEventListener("click", () => closeAllPanels());
    $("#enquiry-open").addEventListener("click", (e) => openPanel($("#enquiry-drawer"), e.currentTarget));
    $("#enquiry-close").addEventListener("click", () => closeAllPanels());
    $("#overlay").addEventListener("click", () => closeAllPanels());
    document.addEventListener("keydown", (e) => {
      const open = $(".search-panel.is-open, .drawer.is-open");
      if (e.key === "Escape") {
        if (open) closeAllPanels();
        if (nav.classList.contains("is-open")) toggle.click();
      }
      if (open) trapFocus(open, e);
    });
  }

  /* =================================================================
     3. SEARCH
     ================================================================= */
  /** Does a product match the search words? (name, SKU, tags, category) */
  function matches(p, query) {
    if (!query) return true;
    const cat = catById(p.category);
    const hay = [p.name, p.sku, p.shortDescription, (p.tags || []).join(" "), cat && cat.name].join(" ").toLowerCase();
    return query.toLowerCase().split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
  }

  function initSearch() {
    const input = $("#global-search"), list = $("#search-results");
    input.addEventListener("input", () => {
      const q = input.value.trim();
      if (!q) { list.innerHTML = ""; return; }
      const hits = PRODUCTS.filter((p) => matches(p, q)).slice(0, 6);
      list.innerHTML = hits.length
        ? hits.map((p) => `
            <li><a href="${productUrl(p)}">
              <img src="${esc(p.images[0].src)}" alt="" loading="lazy">
              <span><strong>${esc(p.name)}</strong><small>${esc(p.sku)} · ${formatPrice(p.price)}</small></span>
            </a></li>`).join("")
        : `<li><p style="padding:8px;color:var(--concrete)">No products match “${esc(q)}”. Try “butter”, “candle” or “mask”.</p></li>`;
    });
  }

  /* =================================================================
     4. ENQUIRY LIST
     Customers collect products here, then send ONE WhatsApp message
     or quote request. Saved in their browser (localStorage).
     ================================================================= */
  const Enquiry = {
    KEY: "kayauthentik-enquiry-v1",
    items: [],
    load() {
      try { this.items = JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { this.items = []; }
      // drop items whose product was removed from products.js
      this.items = this.items.filter((i) => productById(i.id));
    },
    save() {
      try { localStorage.setItem(this.KEY, JSON.stringify(this.items)); } catch (e) { /* private mode — list still works for this visit */ }
      renderEnquiry();
    },
    add(id, variant = "", qty = 1) {
      const existing = this.items.find((i) => i.id === id && i.variant === variant);
      if (existing) existing.qty = Math.min(99, existing.qty + qty);
      else this.items.push({ id, variant, qty });
      this.save();
    },
    setQty(index, qty) {
      if (qty < 1) return this.remove(index);
      this.items[index].qty = Math.min(99, qty);
      this.save();
    },
    remove(index) { this.items.splice(index, 1); this.save(); },
    clear() { this.items = []; this.save(); },
    count() { return this.items.reduce((n, i) => n + i.qty, 0); },
    total() {
      return this.items.reduce((sum, i) => {
        const p = productById(i.id);
        return p && p.price != null ? sum + p.price * i.qty : sum;
      }, 0);
    },
    /** Text used in WhatsApp messages and the quote form */
    asText() {
      return this.items.map((i, n) => {
        const p = productById(i.id);
        return `${n + 1}. ${p.name} (${p.sku})${i.variant ? `\n   ${i.variant}` : ""}\n   Qty: ${i.qty}${p.price != null ? ` × ${formatPrice(p.price)}` : " (price on request)"}`;
      }).join("\n");
    },
    whatsappMessage() {
      const hasQuoteItems = this.items.some((i) => productById(i.id).price == null);
      return `Hello ${SITE.name}! I'd like to enquire about these products:\n\n${this.asText()}\n\n` +
        `Estimated total: ${formatPrice(this.total())}${hasQuoteItems ? " + items on request" : ""}\n\n` +
        `Please confirm availability and delivery details. Thank you!`;
    }
  };

  function renderEnquiry() {
    const count = Enquiry.count();
    $$(".count-badge").forEach((b) => { b.textContent = count; b.dataset.count = count; });
    const btn = $("#enquiry-open");
    if (btn) btn.setAttribute("aria-label", `Open enquiry list (${count} item${count === 1 ? "" : "s"})`);

    const body = $("#enquiry-body"), foot = $("#enquiry-foot");
    if (!body) return;

    if (!Enquiry.items.length) {
      body.innerHTML = `
        <div class="drawer-empty">
          ${icon("list")}
          <p><strong>Your enquiry list is empty.</strong></p>
          <p>Add the products you like, then send us one message for prices, delivery and availability.</p>
        </div>`;
      foot.innerHTML = `<a class="btn btn--dark btn--block" href="catalogue.html">Browse catalogue</a>`;
      return;
    }

    body.innerHTML = Enquiry.items.map((i, idx) => {
      const p = productById(i.id);
      return `
        <div class="enq-item">
          <img src="${esc(p.images[0].src)}" alt="" loading="lazy">
          <div>
            <h3><a href="${productUrl(p)}">${esc(p.name)}</a></h3>
            <small>${esc(p.sku)}${i.variant ? ` · ${esc(i.variant)}` : ""}</small>
            <div class="enq-controls">
              <div class="qty qty--sm" role="group" aria-label="Quantity for ${esc(p.name)}">
                <button type="button" data-enq-qty="${idx}" data-delta="-1" aria-label="Decrease quantity">${icon("minus")}</button>
                <input type="number" value="${i.qty}" min="1" max="99" data-enq-input="${idx}" aria-label="Quantity">
                <button type="button" data-enq-qty="${idx}" data-delta="1" aria-label="Increase quantity">${icon("plus")}</button>
              </div>
              <span class="price" style="font-size:.95rem">${formatPrice(p.price != null ? p.price * i.qty : null)}</span>
            </div>
          </div>
          <button class="enq-remove" type="button" data-enq-remove="${idx}" aria-label="Remove ${esc(p.name)}">${icon("trash")}</button>
        </div>`;
    }).join("");

    foot.innerHTML = `
      <div class="drawer-total"><span>Estimated total</span><strong>${formatPrice(Enquiry.total())}</strong></div>
      <p class="drawer-note">Final price confirmed by us, including delivery to your location.</p>
      <a class="btn btn--wa btn--block" href="${waUrl(Enquiry.whatsappMessage())}" target="_blank" rel="noopener">${icon("whatsapp")} Send enquiry on WhatsApp</a>
      <a class="btn btn--outline btn--block" href="contact.html?from=list">Request a quote by form</a>
      <button class="btn btn--sm" type="button" id="enquiry-clear" style="background:none;color:var(--concrete);text-transform:none;letter-spacing:0">Clear list</button>`;
  }

  function initEnquiry() {
    Enquiry.load();
    renderEnquiry();

    // One listener handles every button inside the drawer
    $("#enquiry-drawer").addEventListener("click", (e) => {
      const q = e.target.closest("[data-enq-qty]");
      const r = e.target.closest("[data-enq-remove]");
      if (q) {
        const idx = Number(q.dataset.enqQty);
        Enquiry.setQty(idx, Enquiry.items[idx].qty + Number(q.dataset.delta));
        const again = $(`[data-enq-qty="${idx}"][data-delta="${q.dataset.delta}"]`);
        if (again) again.focus();
      }
      if (r) { Enquiry.remove(Number(r.dataset.enqRemove)); $("#enquiry-close").focus(); }
      if (e.target.closest("#enquiry-clear")) Enquiry.clear();
    });
    $("#enquiry-drawer").addEventListener("change", (e) => {
      if (e.target.matches("[data-enq-input]")) {
        Enquiry.setQty(Number(e.target.dataset.enqInput), parseInt(e.target.value, 10) || 1);
      }
    });

    // "Add to Enquiry" buttons anywhere on the page
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      e.preventDefault();
      const p = productById(btn.dataset.add);
      if (!p) return;
      Enquiry.add(p.id, defaultVariantText(p), 1);
      toast(`Added “${p.name}” to your enquiry list`, "View list", () => openPanel($("#enquiry-drawer"), $("#enquiry-open")));
    });
  }

  /** Product has a real choice to make (e.g. Vanilla vs Unscented)? */
  const needsChoice = (p) => Object.values(p.variants || {}).some((opts) => opts.length > 1);
  const defaultVariantText = (p) =>
    Object.entries(p.variants || {}).map(([k, opts]) => `${k}: ${opts[0]}`).join(" · ");

  /* =================================================================
     5. PRODUCT CARDS
     ================================================================= */
  function productCard(p, headingLevel = 3) {
    const cat = catById(p.category);
    const img = p.images[0] || { src: "", alt: p.name };
    const flags = [];
    if (!p.inStock) flags.push('<span class="tag tag--muted">Out of stock</span>');
    if ((p.tags || []).includes("bestseller")) flags.push('<span class="tag tag--rose">Bestseller</span>');
    else if (NEW_IDS.includes(p.id)) flags.push('<span class="tag tag--ink">New</span>');
    const h = `h${headingLevel}`;

    const action = needsChoice(p)
      ? `<a class="btn btn--outline btn--sm btn--block" href="${productUrl(p)}">Choose options</a>`
      : `<button class="btn btn--dark btn--sm btn--block" type="button" data-add="${esc(p.id)}" ${p.inStock ? "" : "disabled"}>Add to Enquiry List</button>`;

    return `
      <article class="product-card">
        <a class="product-media" href="${productUrl(p)}" tabindex="-1" aria-hidden="true">
          <img src="${esc(img.src)}" alt="${esc(img.alt)}" loading="lazy" decoding="async">
          <span class="product-flags">${flags.join("")}</span>
        </a>
        <div class="product-body">
          <span class="product-cat">${esc(cat ? cat.name : "")}</span>
          <${h} class="product-title"><a href="${productUrl(p)}">${esc(p.name)}</a></${h}>
          <p class="product-desc">${esc(p.shortDescription)}</p>
          <div class="product-meta">
            <span class="sku">SKU ${esc(p.sku)}</span>
            <span class="price${p.price == null ? " price--quote" : ""}">${formatPrice(p.price)}</span>
          </div>
          ${action}
        </div>
      </article>`;
  }

  function categoryCard(c, headingLevel = 3) {
    const count = productsIn(c.id).length;
    const h = `h${headingLevel}`;
    if (c.comingSoon || !count) {
      return `
        <a class="cat-card cat-card--soon" href="${waUrl(`Hello ${SITE.name}! Please let me know when your ${c.name} are available.`)}" target="_blank" rel="noopener">
          <span class="cat-soon-icon">${icon("sparkle")}</span>
          <span class="cat-card-body">
            <span class="tag tag--ink" style="margin-bottom:12px">Coming soon</span>
            <${h}>${esc(c.name)}</${h}>
            <p>${esc(c.description)}</p>
            <span class="cat-link">Notify me on WhatsApp ${icon("arrow")}</span>
          </span>
        </a>`;
    }
    return `
      <a class="cat-card" href="catalogue.html?category=${encodeURIComponent(c.id)}">
        <img src="${esc(c.image)}" alt="${esc(c.imageAlt)}" loading="lazy" decoding="async">
        <span class="cat-count tag">${count} product${count === 1 ? "" : "s"}</span>
        <span class="cat-card-body">
          <${h}>${esc(c.name)}</${h}>
          <p>${esc(c.description)}</p>
          <span class="cat-link">Shop now ${icon("arrow")}</span>
        </span>
      </a>`;
  }

  /* =================================================================
     6. PAGE: HOME
     ================================================================= */
  function initHome() {
    const cats = $("#home-categories");
    if (cats) cats.innerHTML = CATEGORIES.filter((c) => !c.comingSoon).map((c) => categoryCard(c)).join("");

    const feat = $("#home-featured");
    if (feat) feat.innerHTML = PRODUCTS.filter((p) => p.featured).slice(0, 4).map((p) => productCard(p)).join("");

    const tWrap = $("#home-testimonials");
    if (tWrap) {
      tWrap.innerHTML = TESTIMONIALS.length
        ? `<div class="testimonials">${TESTIMONIALS.map((t) => `
            <figure class="quote-card">
              <blockquote><p>${esc(t.quote)}</p></blockquote>
              <figcaption><strong>${esc(t.name)}</strong><span>${esc(t.detail || "")}</span></figcaption>
            </figure>`).join("")}</div>`
        : `<div class="review-cta">
            <div>
              <h3>Tried ${esc(SITE.name)}? Tell us!</h3>
              <p>We'd love to hear how your body butter, candle or sleep mask is treating you. Send us a voice note, a photo or a quick review on WhatsApp.</p>
            </div>
            <a class="btn btn--dark" href="${waUrl(`Hello ${SITE.name}! I'd like to share a review:`)}" target="_blank" rel="noopener">${icon("whatsapp")} Share your experience</a>
          </div>`;
    }
  }

  /* =================================================================
     7. PAGE: CATALOGUE (filter, search, sort, load more, PDF)
     ================================================================= */
  const PAGE_SIZE = 8;

  function initCatalogue() {
    const params = new URLSearchParams(location.search);
    const state = {
      category: params.get("category") || "all",
      q: params.get("q") || "",
      sort: params.get("sort") || "featured",
      shown: PAGE_SIZE
    };

    const grid = $("#product-grid"), chips = $("#category-chips");
    const searchInput = $("#catalogue-search"), sortSelect = $("#catalogue-sort");
    const resultsText = $("#results-count"), loadWrap = $("#load-more-wrap");

    searchInput.value = state.q;
    sortSelect.value = state.sort;

    // Category filter chips (only categories that have products)
    const usable = CATEGORIES.filter((c) => productsIn(c.id).length);
    chips.innerHTML =
      `<button type="button" class="chip" data-cat="all">All<span class="chip-count">${PRODUCTS.length}</span></button>` +
      usable.map((c) => `<button type="button" class="chip" data-cat="${c.id}">${esc(c.name)}<span class="chip-count">${productsIn(c.id).length}</span></button>`).join("");

    const sorters = {
      featured: (a, b) => (b.featured - a.featured) || a.name.localeCompare(b.name),
      "name-asc": (a, b) => a.name.localeCompare(b.name),
      "name-desc": (a, b) => b.name.localeCompare(a.name),
      "price-asc": (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
      "price-desc": (a, b) => (b.price ?? -1) - (a.price ?? -1),
      newest: (a, b) => String(b.dateAdded).localeCompare(String(a.dateAdded))
    };

    function updateURL() {
      const p = new URLSearchParams();
      if (state.category !== "all") p.set("category", state.category);
      if (state.q) p.set("q", state.q);
      if (state.sort !== "featured") p.set("sort", state.sort);
      history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : ""));
    }

    function render() {
      $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.cat === state.category)));

      const list = PRODUCTS
        .filter((p) => state.category === "all" || p.category === state.category)
        .filter((p) => matches(p, state.q))
        .sort(sorters[state.sort] || sorters.featured);

      const visible = list.slice(0, state.shown);
      const cat = catById(state.category);
      resultsText.textContent =
        `Showing ${visible.length} of ${list.length} product${list.length === 1 ? "" : "s"}` +
        (cat ? ` in ${cat.name}` : "") + (state.q ? ` for “${state.q}”` : "");

      grid.innerHTML = visible.length
        ? visible.map((p) => productCard(p, 2)).join("")
        : `<div class="empty-state" style="grid-column:1/-1">
             <h2 style="font-size:1.3rem">No products found</h2>
             <p>Try a different word, or clear the filters. Can't find something? Ask us on WhatsApp.</p>
             <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
               <button class="btn btn--outline" type="button" id="clear-filters">Clear filters</button>
               <a class="btn btn--wa" href="${waUrl(`Hello ${SITE.name}! I'm looking for: ${state.q}`)}" target="_blank" rel="noopener">${icon("whatsapp")} Ask on WhatsApp</a>
             </div>
           </div>`;

      const remaining = list.length - visible.length;
      loadWrap.innerHTML = remaining > 0
        ? `<button class="btn btn--outline" type="button" id="load-more">Load more (${remaining})</button>`
        : list.length > PAGE_SIZE ? `<span>You've seen all ${list.length} products.</span>` : "";
      updateURL();
    }

    chips.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      state.category = chip.dataset.cat; state.shown = PAGE_SIZE; render();
    });
    let t;
    searchInput.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => { state.q = searchInput.value.trim(); state.shown = PAGE_SIZE; render(); }, 150);
    });
    $("#catalogue-search-form").addEventListener("submit", (e) => e.preventDefault());
    sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; render(); });
    document.addEventListener("click", (e) => {
      if (e.target.closest("#load-more")) {
        const firstNew = state.shown;
        state.shown += PAGE_SIZE; render();
        const cards = $$(".product-title a", grid);
        if (cards[firstNew]) cards[firstNew].focus();
      }
      if (e.target.closest("#clear-filters")) {
        state.category = "all"; state.q = ""; searchInput.value = ""; state.shown = PAGE_SIZE; render();
      }
    });

    $("#download-catalogue").addEventListener("click", printCatalogue);
    render();
  }

  /** Builds a print-friendly version of ALL products, then opens the print / Save-as-PDF dialog */
  function printCatalogue() {
    let box = $("#print-catalogue");
    if (!box) {
      box = document.createElement("section");
      box.id = "print-catalogue";
      $("main").appendChild(box);
    }
    const today = new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" });
    box.innerHTML = printHead() + `
      <h1 style="font-size:20pt;margin:0 0 4pt">Product Catalogue</h1>
      <p style="margin:0 0 6pt;color:#444">Prices as of ${today}. Prices in ${esc(SITE.currency)}; delivery charged separately.</p>
      ${CATEGORIES.filter((c) => productsIn(c.id).length).map((c) => `
        <div class="pc-cat">
          <h2>${esc(c.name)}</h2>
          <div class="pc-grid">
            ${productsIn(c.id).map((p) => `
              <div class="pc-item">
                <img src="${esc(p.images[0].src)}" alt="${esc(p.images[0].alt)}">
                <div>
                  <h3>${esc(p.name)}</h3>
                  <p>${esc(p.shortDescription)}</p>
                  ${Object.keys(p.variants || {}).length ? `<p><em>${Object.entries(p.variants).map(([k, v]) => `${esc(k)}: ${v.map(esc).join(" / ")}`).join(" · ")}</em></p>` : ""}
                  <div class="pc-meta"><span>${esc(p.sku)}</span><span>${formatPrice(p.price)}</span></div>
                </div>
              </div>`).join("")}
          </div>
        </div>`).join("")}
      <div class="pc-foot">Order or enquire on WhatsApp: ${esc(SITE.phoneDisplay)} · ${esc(SITE.siteUrl.replace(/^https?:\/\//, ""))}</div>`;

    document.body.classList.add("printing-catalogue");
    // Wait for the images to load so they appear in the PDF
    const imgs = $$("img", box).map((img) => img.complete ? Promise.resolve() : new Promise((r) => { img.onload = img.onerror = r; }));
    Promise.all(imgs).then(() => setTimeout(() => window.print(), 100));
  }
  window.addEventListener("afterprint", () => document.body.classList.remove("printing-catalogue"));

  function printHead() {
    return `
      <div class="print-head print-only">
        <span class="ph-brand"><img src="images/logo-mark.png" alt="">${esc(SITE.name)}</span>
        <span class="ph-contact">
          WhatsApp / Call: ${esc(SITE.phoneDisplay)}<br>
          ${SITE.email ? esc(SITE.email) + "<br>" : ""}${esc(SITE.location)} · ${esc(SITE.serviceArea)}
        </span>
      </div>`;
  }

  /* =================================================================
     8. PAGE: PRODUCT DETAIL  (product.html?id=...)
     ================================================================= */
  function initProduct() {
    const id = new URLSearchParams(location.search).get("id");
    const p = productById(id);
    const root = $("#product-root");

    if (!p) {
      root.innerHTML = `
        <div class="empty-state">
          <h1 style="font-size:1.8rem">Product not found</h1>
          <p>This product may have been renamed or removed.</p>
          <a class="btn btn--dark" href="catalogue.html">Back to catalogue</a>
        </div>`;
      document.title = `Product not found | ${SITE.name}`;
      return;
    }

    const cat = catById(p.category);
    setMeta({
      title: `${p.name} | ${SITE.name}`,
      description: `${p.shortDescription} ${formatPrice(p.price)}. Order on WhatsApp — delivery across Kenya.`,
      image: p.images[0].src
    });

    const variantHTML = Object.entries(p.variants || {}).map(([group, opts], gi) => `
      <fieldset class="variant-group">
        <legend>${esc(group)}${opts.length > 1 ? ' <span class="req" aria-hidden="true">*</span>' : ""}</legend>
        <div class="variant-options">
          ${opts.map((o, oi) => `
            <input type="radio" id="v-${gi}-${oi}" name="variant-${gi}" value="${esc(o)}" data-group="${esc(group)}" ${oi === 0 ? "checked" : ""}>
            <label for="v-${gi}-${oi}">${esc(o)}</label>`).join("")}
        </div>
      </fieldset>`).join("");

    const specRows = Object.entries(p.specs || {}).map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join("");

    root.innerHTML = `
      ${printHead()}
      <nav class="breadcrumb breadcrumb--dark" aria-label="Breadcrumb">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li><a href="catalogue.html">Catalogue</a></li>
          ${cat ? `<li><a href="catalogue.html?category=${cat.id}">${esc(cat.name)}</a></li>` : ""}
          <li aria-current="page">${esc(p.name)}</li>
        </ol>
      </nav>

      <div class="pd-grid" style="margin-top:20px">
        <div class="gallery">
          <div class="gallery-main"><img id="gallery-main" src="${esc(p.images[0].src)}" alt="${esc(p.images[0].alt)}"></div>
          ${p.images.length > 1 ? `
            <div class="gallery-thumbs" role="group" aria-label="Product photos">
              ${p.images.map((im, i) => `
                <button type="button" data-img="${i}" aria-label="Show photo ${i + 1} of ${p.images.length}" aria-current="${i === 0}">
                  <img src="${esc(im.src)}" alt="" loading="lazy">
                </button>`).join("")}
            </div>` : ""}
        </div>

        <div class="pd-info">
          <div class="pd-top">
            <span class="product-cat" style="margin:0">${esc(cat ? cat.name : "")}</span>
            <span class="sku">SKU ${esc(p.sku)}</span>
            <span class="stock${p.inStock ? "" : " stock--out"}">${p.inStock ? "In stock" : "Out of stock"}</span>
          </div>
          <h1>${esc(p.name)}</h1>
          <p class="pd-short">${esc(p.shortDescription)}</p>
          <div class="pd-price">${formatPrice(p.price)}</div>

          <form id="pd-form" novalidate>
            ${variantHTML}
            <div class="pd-actions">
              <div class="qty" role="group" aria-label="Quantity">
                <button type="button" data-qty="-1" aria-label="Decrease quantity">${icon("minus")}</button>
                <input type="number" id="pd-qty" value="1" min="1" max="99" aria-label="Quantity">
                <button type="button" data-qty="1" aria-label="Increase quantity">${icon("plus")}</button>
              </div>
              <button class="btn btn--primary" type="submit" ${p.inStock ? "" : "disabled"}>${icon("list")} Add to Enquiry List</button>
            </div>
          </form>
          <div class="pd-actions-2">
            <a class="btn btn--wa" id="pd-wa" href="#" target="_blank" rel="noopener">${icon("whatsapp")} Enquire about this product</a>
            <button class="btn btn--outline" type="button" id="pd-spec">${icon("download")} Spec sheet (PDF)</button>
          </div>
          <a class="btn btn--sm no-print" style="margin-top:8px;padding-left:0;color:var(--rose);background:none" href="contact.html?product=${encodeURIComponent(p.id)}">Prefer a form? Request a formal quote →</a>

          <div class="pd-note">${icon("truck")}<span><strong>Delivery across Kenya.</strong> Send us your location on WhatsApp for the delivery cost and time. Gift wrapping is available on request.</span></div>
        </div>
      </div>

      <div class="split split--top" style="margin-top:24px">
        <section class="pd-section pd-desc" aria-labelledby="desc-h">
          <h2 id="desc-h">Description</h2>
          ${p.fullDescription.split(/\n\n+/).map((para) => `<p>${esc(para)}</p>`).join("")}
        </section>
        <section class="pd-section" aria-labelledby="spec-h">
          <h2 id="spec-h">Specifications</h2>
          <div class="spec-wrap"><table class="spec-table">
            <tbody>
              <tr><th scope="row">SKU</th><td>${esc(p.sku)}</td></tr>
              <tr><th scope="row">Price</th><td>${formatPrice(p.price)}</td></tr>
              ${specRows}
            </tbody>
          </table></div>
        </section>
      </div>`;

    // Gallery thumbnails
    $$(".gallery-thumbs button", root).forEach((b) => b.addEventListener("click", () => {
      const im = p.images[Number(b.dataset.img)];
      const main = $("#gallery-main");
      main.src = im.src; main.alt = im.alt;
      $$(".gallery-thumbs button", root).forEach((x) => x.setAttribute("aria-current", String(x === b)));
    }));

    // Quantity buttons
    const qtyInput = $("#pd-qty");
    const getQty = () => Math.min(99, Math.max(1, parseInt(qtyInput.value, 10) || 1));
    $$("[data-qty]", root).forEach((b) => b.addEventListener("click", () => {
      qtyInput.value = Math.min(99, Math.max(1, getQty() + Number(b.dataset.qty)));
      updateWa();
    }));

    const selectedVariant = () =>
      $$(".variant-options input:checked", root).map((r) => `${r.dataset.group}: ${r.value}`).join(" · ");

    // WhatsApp link always reflects the chosen options and quantity
    const waBtn = $("#pd-wa");
    function updateWa() {
      const v = selectedVariant();
      waBtn.href = waUrl(
        `Hello ${SITE.name}! I'm interested in:\n\n${p.name} (${p.sku})${v ? `\n${v}` : ""}\nQty: ${getQty()}` +
        `${p.price != null ? `\nPrice: ${formatPrice(p.price)} each` : ""}\n\nIs it available? Thank you!`);
    }
    root.addEventListener("change", updateWa);
    qtyInput.addEventListener("input", updateWa);
    updateWa();

    $("#pd-form").addEventListener("submit", (e) => {
      e.preventDefault();
      Enquiry.add(p.id, selectedVariant(), getQty());
      toast(`Added ${getQty()} × “${p.name}” to your enquiry list`, "View list", () => openPanel($("#enquiry-drawer"), $("#enquiry-open")));
    });

    $("#pd-spec").addEventListener("click", () => window.print());

    // Related products: same category first, then others
    const related = PRODUCTS.filter((x) => x.id !== p.id)
      .sort((a, b) => (b.category === p.category) - (a.category === p.category) || b.featured - a.featured)
      .slice(0, 4);
    $("#related-grid").innerHTML = related.map((x) => productCard(x)).join("");

    // Structured data for Google (rich results)
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Product",
      name: p.name, sku: p.sku, description: p.shortDescription,
      image: p.images.map((i) => new URL(i.src, SITE.siteUrl + "/").href),
      brand: { "@type": "Brand", name: SITE.name },
      ...(p.price != null && {
        offers: {
          "@type": "Offer", priceCurrency: "KES", price: p.price,
          availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      })
    });
    document.head.appendChild(ld);
  }

  /* =================================================================
     9. PAGE: CATEGORIES
     ================================================================= */
  function initCategories() {
    const grid = $("#all-categories");
    if (grid) grid.innerHTML = CATEGORIES.map((c) => categoryCard(c, 2)).join("");
  }

  /* =================================================================
     10. PAGE: ABOUT — nothing dynamic beyond data-years (see bindSiteData)
     ================================================================= */

  /* =================================================================
     11. PAGE: CONTACT / REQUEST A QUOTE
     ================================================================= */
  function initContact() {
    const form = $("#quote-form");
    if (!form) return;
    const params = new URLSearchParams(location.search);
    const select = $("#q-product");
    $("#q-submit").innerHTML = `${icon("whatsapp")} Send quote request`;

    // Product of interest dropdown
    const listOption = Enquiry.items.length
      ? `<option value="__list">My Enquiry List (${Enquiry.count()} item${Enquiry.count() === 1 ? "" : "s"})</option>` : "";
    select.innerHTML =
      `<option value="">General enquiry</option>${listOption}` +
      CATEGORIES.filter((c) => productsIn(c.id).length).map((c) => `
        <optgroup label="${esc(c.name)}">
          ${productsIn(c.id).map((p) => `<option value="${esc(p.id)}">${esc(p.name)} — ${formatPrice(p.price)}</option>`).join("")}
        </optgroup>`).join("");

    if (params.get("product") && productById(params.get("product"))) select.value = params.get("product");
    else if (params.get("from") === "list" && Enquiry.items.length) select.value = "__list";

    const summary = $("#enquiry-summary");
    function showSummary() {
      if (select.value === "__list" && Enquiry.items.length) {
        summary.hidden = false;
        summary.innerHTML = `<strong>Products in your enquiry list:</strong><ul>${Enquiry.items.map((i) => {
          const p = productById(i.id);
          return `<li>${i.qty} × ${esc(p.name)}${i.variant ? ` (${esc(i.variant)})` : ""}</li>`;
        }).join("")}</ul>`;
      } else summary.hidden = true;
    }
    select.addEventListener("change", showSummary);
    showSummary();

    // --- Validation rules ---
    const rules = {
      "q-name": (v) => v.trim().length >= 2 || "Please enter your name.",
      "q-phone": (v) => {
        const digits = v.replace(/\D/g, "");
        if (!v.trim()) return "Please enter your phone number so we can reach you.";
        return (digits.length >= 9 && digits.length <= 15 && /^[+\d\s()-]+$/.test(v)) || "Please enter a valid phone number, e.g. 0712 345 678.";
      },
      "q-email": (v) => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address, or leave it empty.",
      "q-message": (v) => v.trim().length >= 5 || "Please tell us a little about what you need."
    };

    function validateField(id) {
      const input = $("#" + id);
      const result = rules[id](input.value);
      const field = input.closest(".field");
      const err = $(".field-error", field);
      if (result === true) {
        field.classList.remove("has-error"); input.removeAttribute("aria-invalid"); err.textContent = "";
        return true;
      }
      field.classList.add("has-error"); input.setAttribute("aria-invalid", "true"); err.textContent = result;
      return false;
    }
    Object.keys(rules).forEach((id) => {
      $("#" + id).addEventListener("blur", () => { if ($("#" + id).value) validateField(id); });
      $("#" + id).addEventListener("input", () => { if ($("#" + id).closest(".has-error")) validateField(id); });
    });

    const alertBox = $("#form-alert");
    function showAlert(type, html) {
      alertBox.className = `form-alert form-alert--${type} is-visible`;
      alertBox.innerHTML = `${icon(type === "success" ? "check" : "alert")}<div>${html}</div>`;
      alertBox.focus();
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const bad = Object.keys(rules).filter((id) => !validateField(id));
      if (bad.length) {
        showAlert("error", `Please fix ${bad.length} field${bad.length > 1 ? "s" : ""} highlighted below.`);
        $("#" + bad[0]).focus();
        return;
      }

      const v = (id) => $("#" + id).value.trim();
      let productText = "General enquiry";
      if (select.value === "__list") productText = "\n" + Enquiry.asText() + `\nEstimated total: ${formatPrice(Enquiry.total())}`;
      else if (select.value) { const p = productById(select.value); productText = `${p.name} (${p.sku}) — ${formatPrice(p.price)}`; }

      const message =
        `Hello ${SITE.name}! I'd like to request a quote.\n\n` +
        `Name: ${v("q-name")}\n` +
        (v("q-company") ? `Company: ${v("q-company")}\n` : "") +
        `Phone: ${v("q-phone")}\n` +
        (v("q-email") ? `Email: ${v("q-email")}\n` : "") +
        `Product of interest: ${productText}\n\n` +
        `Message: ${v("q-message")}`;
      const link = waUrl(message);

      const submitBtn = $('button[type="submit"]', form);

      // Option A: also send to an email form service (if set in config.js)
      if (SITE.formEndpoint) {
        submitBtn.disabled = true; submitBtn.textContent = "Sending…";
        try {
          const res = await fetch(SITE.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              name: v("q-name"), company: v("q-company"), phone: v("q-phone"), email: v("q-email"),
              product: productText, message: v("q-message"), _subject: `New quote request — ${v("q-name")}`
            })
          });
          if (!res.ok) throw new Error(res.status);
          showAlert("success", `<strong>Thank you, ${esc(v("q-name"))}!</strong> Your request has been sent. We'll get back to you shortly. Need a faster reply? <a href="${link}" target="_blank" rel="noopener">Continue on WhatsApp</a>.`);
          form.reset(); showSummary();
        } catch (err) {
          showAlert("error", `Sorry, the form could not be sent right now. Please <a href="${link}" target="_blank" rel="noopener">send your request on WhatsApp</a> instead, or call ${esc(SITE.phoneDisplay)}.`);
        } finally {
          submitBtn.disabled = false; submitBtn.innerHTML = `${icon("whatsapp")} Send quote request`;
        }
        return;
      }

      // Option B (default): open WhatsApp with the request already typed in
      window.open(link, "_blank", "noopener");
      showAlert("success", `<strong>Almost done, ${esc(v("q-name"))}!</strong> Your quote request is ready in WhatsApp. Just press <strong>Send</strong>. If WhatsApp didn't open, <a href="${link}" target="_blank" rel="noopener">tap here</a>.`);
    });
  }

  /* =================================================================
     12. START-UP
     ================================================================= */
  renderHeader();
  renderFooter();
  renderGlobalUI();
  bindSiteData();
  initHeader();
  initSearch();
  initEnquiry();

  ({
    home: initHome,
    catalogue: initCatalogue,
    product: initProduct,
    categories: initCategories,
    contact: initContact
  }[PAGE] || (() => {}))();
})();
