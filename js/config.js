/* =====================================================================
   KAY'S AUTHENTIK — SITE SETTINGS
   ---------------------------------------------------------------------
   This is the ONE place to change your business details.
   Edit the text between the quotes, save, and refresh the website.
   ===================================================================== */

window.SITE = {
  name: "Kay's Authentik",
  tagline: "Handmade body care & scented candles",

  // Phone shown on the website (any format you like)
  phoneDisplay: "+254 791 564 400",

  // Phone used for the "Call" links — digits only, with country code, no spaces
  phoneLink: "+254791564400",

  // WhatsApp number — digits only, country code first, NO "+" and NO spaces
  // Example: 254791564400
  whatsapp: "254791564400",

  // Leave email empty ("") to hide it everywhere
  email: "",

  location: "Nairobi, Kenya",
  serviceArea: "Delivery countrywide across Kenya",
  hours: "Mon – Sat, 8:00am – 7:00pm",

  // Year the business started (used for "years in business" on the About page)
  foundedYear: 2022, // ← PLACEHOLDER: change to the year you actually started

  // Social media links — leave a link empty ("") to hide that icon
  social: {
    instagram: "",
    facebook: "",
    tiktok: ""
  },

  // Currency label shown before prices
  currency: "KSh",

  // OPTIONAL: receive the quote form by email too.
  // Create a free form at https://formspree.io, then paste its address here,
  // e.g. "https://formspree.io/f/abcdwxyz". Leave "" to send quotes via WhatsApp only.
  formEndpoint: "",

  // Website address once it is live (used for sharing previews). Leave as is until you deploy.
  siteUrl: "https://kaysauthentik.netlify.app"
};
