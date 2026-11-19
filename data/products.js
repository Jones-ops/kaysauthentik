/* =====================================================================
   KAY'S AUTHENTIK — PRODUCT CATALOGUE DATA
   ---------------------------------------------------------------------
   Every product on the website comes from this file.

   TO ADD A PRODUCT:   copy one whole { ... } block (from "{" to "},"),
                       paste it at the end of the PRODUCTS list, and edit it.
   TO REMOVE A PRODUCT: delete its whole { ... }, block.
   TO HIDE A PRICE:     set  price: null   → shows "Request a Quote".

   Rules:
   - "id" must be unique, lowercase, with dashes (it becomes the page link).
   - "category" must match one of the category "id"s in CATEGORIES below.
   - Put photos in  images/products/  and list them in "images".
   - Keep commas between blocks. Text goes inside "double quotes".
   ===================================================================== */

/* ---------- CATEGORIES ----------
   comingSoon: true  → category shows on the site with a "Coming soon" badge
   until you add products to it. */
window.CATEGORIES = [
  {
    id: "body-butters",
    name: "Whipped Body Butters",
    description: "Airy, hand-whipped shea body butters in Vanilla or Unscented.",
    image: "images/products/body-butter-330-vanilla-4.jpg",
    imageAlt: "Jar of Candy by Kay vanilla whipped body butter held up against a lakeside sky"
  },
  {
    id: "scented-candles",
    name: "Scented Candles",
    description: "Hand-poured candles in gift-ready jars and boxes.",
    image: "images/products/candle-noir-1.jpg",
    imageAlt: "Black matte Candles by Kay jar candle in front of a black gift box with satin ribbon"
  },
  {
    id: "sleep-self-care",
    name: "Sleep & Self-care",
    description: "Soft satin sleeping masks for deeper, darker rest.",
    image: "images/products/sleep-mask-pink-3.jpg",
    imageAlt: "Blush pink satin sleeping mask worn on a mannequin resting on a pillow"
  }
];

/* ---------- PRODUCTS ----------
   dateAdded: used for "Newest" sorting (format YYYY-MM-DD).
   variants:  options the customer can choose (sizes, scents, colours). */
window.PRODUCTS = [

  /* ===================== WHIPPED BODY BUTTERS ===================== */
  {
    id: "whipped-body-butter-330ml",
    name: "Whipped Body Butter — 330ml",
    category: "body-butters",
    sku: "KA-BB-330",
    price: 1000,
    shortDescription: "Our signature cloud-light shea butter. Melts in fast, keeps skin soft all day.",
    fullDescription:
      "Our bestseller, whipped by hand until it is soft as a cloud. Rich shea butter is blended with " +
      "Kenyan Croton (Megalo) seed oil, Cape Chestnut seed oil, coconut oil and vitamin E, then whipped " +
      "until it turns light and fluffy. It goes on smoothly and sinks in quickly with no greasy film, so " +
      "your skin stays soft and moisturised from morning to night.\n\n" +
      "The large 330ml jar is our best value and lasts for weeks of daily use. Choose Vanilla for a warm, " +
      "sweet scent, or Unscented for sensitive skin and fragrance-free routines. It is gift-ready too: " +
      "we can tie it with ribbon and pack it in a satin pouch.",
    specs: {
      "Size": "330ml glass jar",
      "Texture": "Light, whipped, fast-absorbing",
      "Moisture level": "Light & moisturising — ideal for daily use",
      "Scent options": "Vanilla · Unscented",
      "Key ingredients": "Shea butter, Croton (Megalo) seed oil, coconut oil, Cape Chestnut seed oil, vitamin E",
      "Skin type": "All skin types",
      "How to use": "Apply a small amount to clean, slightly damp skin. Massage in gently.",
      "Storage": "Keep the lid closed and away from direct sun. It may soften in heat; this does not affect quality."
    },
    variants: {
      "Scent": ["Vanilla", "Unscented"],
      "Size": ["330ml"]
    },
    images: [
      { src: "images/products/body-butter-330-vanilla-4.jpg", alt: "330ml jar of Candy by Kay vanilla whipped body butter held in an open palm by the lake" },
      { src: "images/products/body-butter-330-vanilla-5.jpg", alt: "330ml whipped body butter jar tied with pink ribbon beside a satin gift pouch" },
      { src: "images/products/body-butter-330-vanilla-3.jpg", alt: "Whipped body butter jar resting on lakeside rocks with sunlight on the water" },
      { src: "images/products/body-butter-330-vanilla-2.jpg", alt: "Hand holding the 330ml body butter jar against a cloudy sky" },
      { src: "images/products/body-butter-gift-pouch.jpg", alt: "Navy satin gift pouch tied with pink ribbon and a floral gift tag" }
    ],
    tags: ["bestseller", "shea butter", "vanilla", "unscented", "gift"],
    inStock: true,
    featured: true,
    dateAdded: "2025-01-10"
  },
  {
    id: "whipped-body-butter-200ml",
    name: "Whipped Body Butter — 200ml",
    category: "body-butters",
    sku: "KA-BB-200",
    price: 600,
    shortDescription: "Deep-moisture whipped butter for dry skin, in a handy 200ml jar.",
    fullDescription:
      "The same hand-whipped shea blend in a smaller jar, made richer for skin that needs more care. " +
      "Shea butter, Croton (Megalo) seed oil, coconut oil, Cape Chestnut seed oil and vitamin E restore " +
      "moisture to dry elbows, knees, heels and hands, while the whipped texture stays light on the skin.\n\n" +
      "The 200ml jar fits in a handbag or gym bag, and it is a good first jar if you are trying Kay " +
      "Authentik for the first time. Available in Vanilla or Unscented.",
    specs: {
      "Size": "200ml glass jar",
      "Texture": "Light, whipped",
      "Moisture level": "Light & deep moisturising — great for dry skin",
      "Scent options": "Vanilla · Unscented",
      "Key ingredients": "Shea butter, Croton (Megalo) seed oil, coconut oil, Cape Chestnut seed oil, vitamin E",
      "Skin type": "All skin types, especially dry skin",
      "How to use": "Warm a little between your palms and press into dry areas. Use daily or as needed.",
      "Storage": "Keep the lid closed and away from direct sun."
    },
    variants: {
      "Scent": ["Vanilla", "Unscented"],
      "Size": ["200ml"]
    },
    images: [
      { src: "images/products/body-butter-200-2.jpg", alt: "200ml Candy by Kay vanilla body butter jar held up against a blue sky with clouds" },
      { src: "images/products/body-butter-200-1.jpg", alt: "200ml whipped body butter jar on a balcony rail overlooking the city" },
      { src: "images/products/body-butter-200-3.jpg", alt: "200ml body butter jar standing on a dark polished counter" }
    ],
    tags: ["deep moisture", "dry skin", "shea butter", "vanilla", "unscented", "travel size"],
    inStock: true,
    featured: true,
    dateAdded: "2025-03-02"
  },

  /* ========================= SCENTED CANDLES ========================= */
  {
    id: "noir-gift-box-candle",
    name: "Noir Gift Box Candle",
    category: "scented-candles",
    sku: "KA-SC-NOIR",
    price: 1900,
    shortDescription: "Matte black jar candle in a black gift box with satin ribbon.",
    fullDescription:
      "Matte black glass, creamy white wax and our \"Spread Love\" label, packed in a black gift box " +
      "tied with satin ribbon. It is our most popular gift for birthdays, anniversaries and corporate " +
      "thank-yous, and it arrives ready to hand over, with nothing extra to wrap.\n\n" +
      "Each candle is hand-poured in small batches and fills the room with a warm, even scent. Ask us " +
      "which fragrances are available this month.",
    specs: {
      "Vessel": "Matte black glass jar",
      "Packaging": "Black gift box with satin ribbon",
      "Fragrance": "Ask about this month's scents",
      "Made": "Hand-poured in small batches",
      "Care": "Trim the wick to 5mm before each burn. Never leave a burning candle unattended."
    },
    variants: {
      "Packaging": ["With gift box"]
    },
    images: [
      { src: "images/products/candle-noir-1.jpg", alt: "Black matte Candles by Kay jar candle in front of a black gift box with satin ribbon" },
      { src: "images/products/candle-noir-2.jpg", alt: "Noir candle with white wax and silver label beside its ribboned gift box" },
      { src: "images/products/candle-noir-3.jpg", alt: "Top view of the Noir candle, gift box and floral Candles by Kay gift tag" }
    ],
    tags: ["gift", "luxury", "corporate gift", "black"],
    inStock: true,
    featured: true,
    dateAdded: "2025-06-15"
  },
  {
    id: "papaya-sunrise-candle",
    name: "Papaya Sunrise Candle",
    category: "scented-candles",
    sku: "KA-SC-PAPAYA",
    price: 1600,
    shortDescription: "Layered tropical candle in sunny yellow and coral, topped with a citrus slice.",
    fullDescription:
      "Sunny yellow and coral wax are poured in layers and finished with a citrus-slice wax topper and " +
      "clear wax crystals. It looks good enough to eat, and it brightens a kitchen, living room or desk " +
      "even before you light it.\n\n" +
      "Hand-poured in a clear glass tumbler so you can see every layer. It makes a cheerful gift for " +
      "anyone who loves fruity, tropical scents.",
    specs: {
      "Vessel": "Clear glass tumbler",
      "Design": "Layered yellow & coral wax, citrus slice and wax crystal toppers",
      "Fragrance": "Fruity, tropical-inspired (ask for current scent)",
      "Made": "Hand-poured in small batches",
      "Care": "Trim the wick to 5mm before each burn. Never leave a burning candle unattended."
    },
    variants: {},
    images: [
      { src: "images/products/candle-papaya.jpg", alt: "Layered yellow and coral candle with a citrus slice topper beside a halved papaya" }
    ],
    tags: ["fruity", "tropical", "colourful", "decor"],
    inStock: true,
    featured: true,
    dateAdded: "2025-09-01"
  },
  {
    id: "strawberry-cream-candle",
    name: "Strawberry & Cream Candle",
    category: "scented-candles",
    sku: "KA-SC-STRAW",
    price: 1600,
    shortDescription: "Soft cream and strawberry-red layers in a clear glass with our Spread Love label.",
    fullDescription:
      "Creamy white wax with bands of strawberry red, poured by hand into a clear glass tumbler. The " +
      "Candles by Kay \"Spread Love\" label finishes it off. It is a sweet, cosy candle for your " +
      "bedside, a date night, or a Valentine's surprise.",
    specs: {
      "Vessel": "Clear glass tumbler",
      "Design": "Layered cream & strawberry-red wax",
      "Fragrance": "Ask about this month's scents",
      "Made": "Hand-poured in small batches",
      "Care": "Trim the wick to 5mm before each burn. Never leave a burning candle unattended."
    },
    variants: {},
    images: [
      { src: "images/products/candle-strawberry-cream.jpg", alt: "Clear glass candle with cream and strawberry-red wax layers and a Spread Love label" }
    ],
    tags: ["romantic", "valentine", "gift"],
    inStock: true,
    featured: false,
    dateAdded: "2025-08-12"
  },
  {
    id: "rhinestone-glam-candle",
    name: "Rhinestone Glam Candle",
    category: "scented-candles",
    sku: "KA-SC-GLAM",
    price: 1600,
    shortDescription: "A statement candle wrapped in sparkling gold rhinestones.",
    fullDescription:
      "Our most glamorous piece. The glass is wrapped in rows of gold rhinestones that catch the " +
      "flame and sparkle across the room. It suits a dressing table, a bridal gift or event décor. " +
      "When the wax runs out, keep the jar as a keepsake for brushes, jewellery or flowers.",
    specs: {
      "Vessel": "Glass jar with gold rhinestone wrap",
      "Design": "Statement / décor piece",
      "Fragrance": "Ask about this month's scents",
      "Made": "Hand-poured in small batches",
      "Care": "Trim the wick to 5mm before each burn. Never leave a burning candle unattended."
    },
    variants: {},
    images: [
      { src: "images/products/candle-rhinestone.jpg", alt: "Gold rhinestone-wrapped Candles by Kay jar candle beside an orange ribbed pillar candle and a wooden-lid candle" }
    ],
    tags: ["glam", "bridal", "decor", "gift", "luxury"],
    inStock: true,
    featured: true,
    dateAdded: "2025-10-05"
  },
  {
    id: "coral-crystal-candle",
    name: "Coral Crystal Candle",
    category: "scented-candles",
    sku: "KA-SC-CORAL",
    price: 1600,
    shortDescription: "Bright coral wax topped with clear wax crystals, gifted in a satin pouch.",
    fullDescription:
      "Vibrant coral wax in a chunky glass, topped with clear wax crystals that glow when the candle is " +
      "lit. It comes in a navy satin drawstring pouch tied with pink ribbon and a Candles by Kay floral " +
      "tag, so it is already gift-wrapped.",
    specs: {
      "Vessel": "Chunky clear glass",
      "Design": "Coral wax with wax crystal toppers",
      "Packaging": "Navy satin pouch with ribbon and gift tag",
      "Fragrance": "Ask about this month's scents",
      "Made": "Hand-poured in small batches",
      "Care": "Trim the wick to 5mm before each burn. Never leave a burning candle unattended."
    },
    variants: {},
    images: [
      { src: "images/products/candle-coral-crystal.jpg", alt: "Coral candle with clear wax crystals beside a pink-striped candle and navy satin gift pouches" }
    ],
    tags: ["gift", "colourful", "satin pouch"],
    inStock: true,
    featured: false,
    dateAdded: "2025-07-20"
  },
  {
    id: "pink-candy-stripe-candle",
    name: "Pink Candy Stripe Candle",
    category: "scented-candles",
    sku: "KA-SC-STRIPE",
    price: 1600,
    shortDescription: "Playful pink and cream striped layers in a clear glass.",
    fullDescription:
      "Bold pink and soft cream stripes, poured layer by layer. This candle is fun and photogenic, and " +
      "it matches our Candy by Kay look. It is a good pick for a girly bedroom, a baby shower, or a " +
      "birthday gift for someone who loves pink.",
    specs: {
      "Vessel": "Clear glass",
      "Design": "Layered pink & cream stripes",
      "Fragrance": "Ask about this month's scents",
      "Made": "Hand-poured in small batches",
      "Care": "Trim the wick to 5mm before each burn. Never leave a burning candle unattended."
    },
    variants: {},
    images: [
      { src: "images/products/candle-pink-stripe.jpg", alt: "Clear glass candle with pink and cream striped wax layers on a black gift box" }
    ],
    tags: ["pink", "baby shower", "birthday", "gift"],
    inStock: true,
    featured: false,
    dateAdded: "2025-05-18"
  },

  /* ======================== SLEEP & SELF-CARE ======================== */
  {
    id: "satin-sleeping-mask-blush",
    name: "Satin Sleeping Mask — Blush Pink",
    category: "sleep-self-care",
    sku: "KA-SM-PINK",
    price: 500,
    shortDescription: "Smooth blush-pink satin mask that blocks light for deeper sleep.",
    fullDescription:
      "Sleep in, nap anywhere, and wake up without creases. Our blush-pink satin mask feels cool and " +
      "smooth on the skin, blocks out light, and is kind to your lashes and the delicate skin around " +
      "your eyes. The soft band holds it in place all night without pressing.\n\n" +
      "Pair it with a body butter or candle for a ready-made self-care gift.",
    specs: {
      "Material": "Satin",
      "Colour": "Blush pink",
      "Fit": "Soft band, one size fits most",
      "Benefits": "Blocks light · gentle on skin & lashes · reduces creasing",
      "Care": "Hand wash in cool water and air dry."
    },
    variants: {
      "Colour": ["Blush Pink"]
    },
    images: [
      { src: "images/products/sleep-mask-pink-3.jpg", alt: "Blush pink satin sleeping mask worn on a mannequin resting on a pillow" },
      { src: "images/products/sleep-mask-pink-1.jpg", alt: "Side view of the pink satin sleeping mask covering the eyes" },
      { src: "images/products/sleep-mask-pink-2.jpg", alt: "Close-up of the smooth pink satin sleeping mask" }
    ],
    tags: ["satin", "sleep", "self-care", "pink", "gift"],
    inStock: true,
    featured: true,
    dateAdded: "2025-11-01"
  },
  {
    id: "satin-sleeping-mask-black",
    name: "Satin Sleeping Mask — Midnight Black",
    category: "sleep-self-care",
    sku: "KA-SM-BLACK",
    price: 500,
    shortDescription: "Sleek black satin mask with a ruched band for total darkness.",
    fullDescription:
      "A classic black satin sleeping mask with a ruched elastic band for a snug, comfortable fit. It " +
      "blocks out light completely, so it suits shift workers, travellers and light sleepers. The smooth " +
      "satin glides over skin and lashes without tugging.",
    specs: {
      "Material": "Satin",
      "Colour": "Midnight black",
      "Fit": "Ruched elastic band, one size fits most",
      "Benefits": "Total blackout · gentle on skin & lashes · travel-friendly",
      "Care": "Hand wash in cool water and air dry."
    },
    variants: {
      "Colour": ["Midnight Black"]
    },
    images: [
      { src: "images/products/sleep-mask-black.jpg", alt: "Black satin sleeping mask with ruched elastic band worn on a mannequin" }
    ],
    tags: ["satin", "sleep", "travel", "black"],
    inStock: true,
    featured: false,
    dateAdded: "2025-11-01"
  }
];
