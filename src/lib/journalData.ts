export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  category: string;
  coverImage: string;
  content: string[];
  relatedCollection: {
    label: string;
    href: string;
  };
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "how-to-choose-the-right-dress-size-for-baby-girl",
    title: "How to Choose the Right Dress Size for Your Baby Girl",
    excerpt: "Buying baby girl clothing online can be unpredictable. Here are 5 practical mother-tested tips on chest measurements, growth spurts, and picking the right fit.",
    readTime: "4 min read",
    publishDate: "January 2026",
    category: "Sizing & Fit",
    coverImage: "https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/sweatt.png",
    relatedCollection: {
      label: "Explore Baby Girls' Sizing (0–2 Years)",
      href: "/age/1-2-years"
    },
    content: [
      "Every mother knows the feeling: you order a beautiful dress for an upcoming family gathering, only to find the armholes too tight or the hem dragging on the floor. Toddler sizing varies significantly between brands, making online shopping a guessing game.",
      "At Dualat, we design our girls' silhouettes with ease of movement in mind. Here is our practical guide to choosing the right size every single time.",
      "1. Measure Chest, Not Just Age: Age labels like '1Y' or '2Y' are only general benchmarks. Babies grow at vastly different rates. Measuring your child's chest across the widest part with a soft measuring tape is far more accurate than relying on age alone.",
      "2. Account for Rapid Growth Spurts: If your baby girl is near the upper limit of a size bracket (for example, 11 months old looking at a 6–12M dress), always size up to 1–2Y. Our relaxed silhouette still drapes gracefully, and you will get months of additional wear.",
      "3. Look for Breathable, Elasticated Features: Smocked bodices, gentle elasticated waists, and button collars allow dresses to flex as your child sits, crawls, and runs without digging into her skin.",
      "4. Check Fabric Softness: Stiff fabrics can cause chafing around sensitive necklines. Dualat uses soft textured cotton and breathable weaves that maintain their softness after dozens of washes."
    ]
  },
  {
    slug: "cotton-dresses-for-little-girls-in-indian-weather",
    title: "Cotton Dresses for Little Girls in Indian Weather",
    excerpt: "Why breathable cotton, natural weaves, and relaxed silhouettes are essential for keeping active little girls cool, rash-free, and happy in warm climates.",
    readTime: "5 min read",
    publishDate: "February 2026",
    category: "Fabrics & Care",
    coverImage: "https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/ind.png",
    relatedCollection: {
      label: "Shop Breathable Cotton Dresses",
      href: "/girls/dresses"
    },
    content: [
      "Tropical climates across India demand thoughtful children's clothing choices. Between high humidity and active play, synthetic garments like nylon, polyester, and heavily lined party dresses can quickly trap sweat, causing heat rash and irritation.",
      "Natural cotton fibers remain the gold standard in children's fashion for very clear physiological reasons.",
      "Breathability & Air Circulation: Cotton allows air to circulate directly through the fabric weave, wicking away moisture naturally and cooling your little girl's skin as she plays.",
      "Soft Textures & Gentle Details: In place of scratchy glitter and heavy tulle, Dualat uses textured cotton slub, soft cotton eyelet lace, and delicate contrast collars that look festive yet feel like pajamas.",
      "Skin Comfort: Children's skin is about 30% thinner than adult skin. Pure cotton minimizes frictional irritation, keeping your child comfortable from morning to night."
    ]
  },
  {
    slug: "baby-girl-birthday-dress-ideas",
    title: "Baby Girl Birthday Dress Ideas: Simple, Elegant & Comfortable",
    excerpt: "Celebrate your daughter's milestone birthday in outfits that look stunning in photos without compromising her comfort and freedom to play.",
    readTime: "4 min read",
    publishDate: "February 2026",
    category: "Occasion Styling",
    coverImage: "https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/green%20lace.png",
    relatedCollection: {
      label: "Discover Occasion & Festive Wear",
      href: "/girls/festive-wear"
    },
    content: [
      "A first or second birthday is a momentous occasion for any family. Many parents buy elaborate, scratchy costumes with heavy stiff petticoats, only for their little girl to end up in tears 20 minutes into the party.",
      "At Dualat, we believe birthday dresses should be as comfortable as they are photogenic.",
      "Graceful Lace & Delicate Trims: Delicate white floral lace detailing over textured pastel cotton creates an unforgettable, heirloom look that photographs beautifully under natural light.",
      "Subtle Colors: Soft sage, pastel pink, and vintage cream tones lend a timeless, understated elegance that lets your baby girl's smile remain the hero of every photograph.",
      "Easy Diaper & Restroom Access: Birthday celebrations involve cakes, juice, and diaper changes. Our relaxed fits and gentle waistbands make changes quick and stress-free."
    ]
  },
  {
    slug: "how-to-care-for-kids-cotton-clothes",
    title: "How to Care for Kids' Cotton Clothes so They Last Longer",
    excerpt: "Simple washing, drying, and ironing habits to keep your daughter's favorite cotton outfits soft, vibrant, and ready to be handed down.",
    readTime: "3 min read",
    publishDate: "January 2026",
    category: "Garment Care",
    coverImage: "https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/red%20lace.png",
    relatedCollection: {
      label: "Shop Dualat Everyday Wear",
      href: "/girls/everyday-wear"
    },
    content: [
      "High-quality cotton kidswear is an investment in your child's comfort. With proper care, these beautiful pieces will hold their shape, colors, and hand-feel through countless adventures and can even be preserved for younger siblings.",
      "1. Cold Water Wash: Always wash in cold or room-temperature water. Hot water breaks down natural cotton fibers and can cause shrinking.",
      "2. Mild Baby-Safe Detergents: Harsh chemical bleaches and enzyme-heavy powders strip the natural dyes and soften fabric fibers too aggressively. Opt for gentle liquid detergents.",
      "3. Dry in the Shade: Harsh direct sunlight can fade pastel shades and checks over time. Turn dresses inside-out and dry on a flat surface or hanger in a well-ventilated, shaded space.",
      "4. Low Heat Ironing: Iron cottons while slightly damp or on low-to-medium steam setting for a crisp, fresh finish."
    ]
  },
  {
    slug: "everyday-clothing-essentials-for-toddler-girls",
    title: "Everyday Clothing Essentials for Toddler Girls",
    excerpt: "A mother's checklist of versatile, easy-to-pair two-piece sets, relaxed frocks, and comfortable staples for toddlers learning and exploring.",
    readTime: "4 min read",
    publishDate: "March 2026",
    category: "Wardrobe Essentials",
    coverImage: "https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/freee.png",
    relatedCollection: {
      label: "View Two-Piece Sets & Co-ords",
      href: "/girls/two-piece-sets"
    },
    content: [
      "Toddlerhood is a whirlwind of discovery: playground sandbox adventures, mealtime spills, and sudden nap times. Dressing a toddler girl requires a wardrobe that is resilient, effortless, and sweet.",
      "The Power of Co-ord Sets: Matching two-piece sets (such as a soft plaid collar top paired with elasticated shorts) take the stress out of morning dressing while allowing individual pieces to be mixed and matched with basic leggings or tees.",
      "Tiered Flare Dresses: Flowy silhouettes give little legs full freedom to climb steps, dance, and run without restriction.",
      "Easy Everyday Neutral Tones: Warm creams, muted pastels, and soft blues are easy to style with sneakers, sandals, and stockings."
    ]
  }
];
