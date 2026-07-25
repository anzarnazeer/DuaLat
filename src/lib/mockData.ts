export interface Review {
  id: string;
  reviewerName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  sizePurchased: string;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export interface SizeStock {
  size: string; // e.g. 'Newborn', '0-3M', '3-6M', '6-12M', '1Y', '2Y', '3Y', '4Y', '5Y'
  stockCount: number;
  weightRange: string; // e.g. "5-8 lbs"
  heightRange: string; // e.g. "17-21 in"
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  salePrice?: number;
  category: 'boys' | 'girls' | 'unisex';
  collection: 'loungewear' | 'playground' | 'basics';
  images: string[];
  fabricTags: string[]; // e.g. ["100% Organic Cotton", "Tagless/Itch-Free", "Hypoallergenic"]
  fabricDetails: string; // Longer details
  careInstructions: string;
  rating: number; // overall rating
  reviews: Review[];
  sizes: SizeStock[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface UserAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentDetails {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

// Age categories for the main filters & Quick circular grid
export const AGE_GROUPS = [
  { label: 'Newborn', value: 'Newborn' },
  { label: '0-3M', value: '0-3M' },
  { label: '3-6M', value: '3-6M' },
  { label: '6-12M', value: '6-12M' },
  { label: '1Y', value: '1Y' },
  { label: '2Y', value: '2Y' },
  { label: '3Y', value: '3Y' },
  { label: '4Y', value: '4Y' },
  { label: '5Y', value: '5Y' }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Cloud-Soft Organic Romper',
    description: 'Our signature romper is made from buttery-soft organic cotton. Features double-zipper technology for super-fast diaper changes without exposing baby to chilly air. Completely tagless to protect delicate newborn skin.',
    basePrice: 32.00,
    salePrice: 26.00,
    category: 'unisex',
    collection: 'loungewear',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&q=80&w=600'
    ],
    fabricTags: ['100% Organic Cotton', 'Tagless/Itch-Free', 'Hypoallergenic', 'GOTS Certified'],
    fabricDetails: '95% Certified Organic Ribbed Cotton, 5% Elastane for cozy stretch. Colored with non-toxic, water-based, hypoallergenic dyes.',
    careInstructions: 'Machine wash cold inside out with like colors. Tumble dry low or lay flat to dry.',
    rating: 4.8,
    sizes: [
      { size: 'Newborn', stockCount: 5, weightRange: '5-8 lbs', heightRange: '17-21 in' },
      { size: '0-3M', stockCount: 12, weightRange: '8-12 lbs', heightRange: '21-24 in' },
      { size: '3-6M', stockCount: 15, weightRange: '12-16 lbs', heightRange: '24-26 in' },
      { size: '6-12M', stockCount: 8, weightRange: '16-20 lbs', heightRange: '26-28 in' },
      { size: '1Y', stockCount: 4, weightRange: '20-24 lbs', heightRange: '28-30 in' },
      { size: '2Y', stockCount: 0, weightRange: '24-28 lbs', heightRange: '30-32 in' }
    ],
    reviews: [
      {
        id: 'rev-1-1',
        reviewerName: 'Sarah M.',
        rating: 5,
        comment: 'Absolutely love this! The two-way zip makes midnight changes so much less stressful. And the fabric is indeed like a cloud.',
        date: '2026-06-12',
        sizePurchased: '0-3M',
        fitFeedback: 'True to Size'
      },
      {
        id: 'rev-1-2',
        reviewerName: 'Jessica H.',
        rating: 4,
        comment: 'So soft and stretchy. My baby is slightly tall for her age, and it fitted her beautifully. Definitely buying more in other colors.',
        date: '2026-07-01',
        sizePurchased: '3-6M',
        fitFeedback: 'Runs Large'
      },
      {
        id: 'rev-1-3',
        reviewerName: 'Emma R.',
        rating: 5,
        comment: 'Hypoallergenic dyes were a must for my baby\'s mild eczema. This has not caused a single flare-up. 10/10.',
        date: '2026-07-10',
        sizePurchased: 'Newborn',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Playground Proof Jogger Set',
    description: 'Designed for active toddlers exploring the world. Features reinforced double-layered knees, breathable cotton weave, and a flexible comfort waistband that stays up. Durable stitching handles tumble after tumble.',
    basePrice: 42.00,
    category: 'boys',
    collection: 'playground',
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519457497969-58b76ec1ec8b?auto=format&fit=crop&q=80&w=600'
    ],
    fabricTags: ['Tagless/Itch-Free', 'Reinforced Knees', '100% Cotton Weave'],
    fabricDetails: '100% Breathable Cotton Fleece body, 97% Cotton 3% Spandex ribbing at cuffs and waist. Tagless collar.',
    careInstructions: 'Wash before wear. Machine wash warm with like colors. Only non-chlorine bleach when needed. Tumble dry medium.',
    rating: 4.6,
    sizes: [
      { size: '6-12M', stockCount: 10, weightRange: '16-20 lbs', heightRange: '26-28 in' },
      { size: '1Y', stockCount: 18, weightRange: '20-24 lbs', heightRange: '28-30 in' },
      { size: '2Y', stockCount: 14, weightRange: '24-28 lbs', heightRange: '30-32 in' },
      { size: '3Y', stockCount: 8, weightRange: '28-32 lbs', heightRange: '32-35 in' },
      { size: '4Y', stockCount: 5, weightRange: '32-37 lbs', heightRange: '35-39 in' },
      { size: '5Y', stockCount: 3, weightRange: '37-44 lbs', heightRange: '39-43 in' }
    ],
    reviews: [
      {
        id: 'rev-2-1',
        reviewerName: 'Daniel K.',
        rating: 5,
        comment: 'Finally a pair of pants that doesn\'t tear at the knees after two trips to the sandbox! Buying these in every color option.',
        date: '2026-05-18',
        sizePurchased: '2Y',
        fitFeedback: 'True to Size'
      },
      {
        id: 'rev-2-2',
        reviewerName: 'Rachel T.',
        rating: 4,
        comment: 'Very sturdy material. It runs just a little small on the waistband, so maybe size up if your kiddo is in between sizes.',
        date: '2026-06-25',
        sizePurchased: '3Y',
        fitFeedback: 'Runs Small'
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Garden Blossom Flutter Dress',
    description: 'Crafted from airy, breathable certified organic cotton muslin. Decorated with soft-ruffled sleeve flutters and matching bloomer shorts. Front wooden buttons are fully secure, making getting dressed a breeze.',
    basePrice: 38.00,
    category: 'girls',
    collection: 'basics',
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600'
    ],
    fabricTags: ['100% Organic Muslin', 'Breathable Weave', 'Hypoallergenic'],
    fabricDetails: '100% Double-Weaved Organic Cotton Muslin. Light, airy, pre-washed for extra softness. Fastened with securely-sewn coconut shell buttons.',
    careInstructions: 'Machine wash cold on gentle cycle. Lay flat or hang to dry for natural crinkled texture. Low iron if desired.',
    rating: 4.7,
    sizes: [
      { size: '0-3M', stockCount: 3, weightRange: '8-12 lbs', heightRange: '21-24 in' },
      { size: '3-6M', stockCount: 8, weightRange: '12-16 lbs', heightRange: '24-26 in' },
      { size: '6-12M', stockCount: 14, weightRange: '16-20 lbs', heightRange: '26-28 in' },
      { size: '1Y', stockCount: 10, weightRange: '20-24 lbs', heightRange: '28-30 in' },
      { size: '2Y', stockCount: 6, weightRange: '24-28 lbs', heightRange: '30-32 in' },
      { size: '3Y', stockCount: 2, weightRange: '28-32 lbs', heightRange: '32-35 in' }
    ],
    reviews: [
      {
        id: 'rev-3-1',
        reviewerName: 'Melissa G.',
        rating: 5,
        comment: 'Cutest little dress! It washed so well and got even softer. The matching bloomers fit easily over diaper bulges without digging into her thighs.',
        date: '2026-07-04',
        sizePurchased: '6-12M',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'Cozy Ribbed Knit Set',
    description: 'A cozy cardigan and leggings set made with ultra-fine, hypoallergenic cotton knit. The stretch-knit waist provides maximum flexibility while the mock-wood buttons add a timeless classic charm. Itch-free interior joints.',
    basePrice: 48.00,
    category: 'unisex',
    collection: 'loungewear',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600'
    ],
    fabricTags: ['Tagless/Itch-Free', 'Hypoallergenic', 'Super Stretch Knit'],
    fabricDetails: '100% Premium Combed Cotton Knit. Flatlock seams inside prevent any scratchy rub points.',
    careInstructions: 'Machine wash cold, gentle cycle. Reshape and dry flat to prevent stretching out. Do not tumble dry.',
    rating: 4.9,
    sizes: [
      { size: '3-6M', stockCount: 4, weightRange: '12-16 lbs', heightRange: '24-26 in' },
      { size: '6-12M', stockCount: 9, weightRange: '16-20 lbs', heightRange: '26-28 in' },
      { size: '1Y', stockCount: 12, weightRange: '20-24 lbs', heightRange: '28-30 in' },
      { size: '2Y', stockCount: 8, weightRange: '24-28 lbs', heightRange: '30-32 in' },
      { size: '3Y', stockCount: 5, weightRange: '28-32 lbs', heightRange: '32-35 in' }
    ],
    reviews: [
      {
        id: 'rev-4-1',
        reviewerName: 'Laura B.',
        rating: 5,
        comment: 'So luxury! It looks like a high-end designer knit set, but it\'s completely washable and so baby-friendly. True to size.',
        date: '2026-06-20',
        sizePurchased: '1Y',
        fitFeedback: 'True to Size'
      },
      {
        id: 'rev-4-2',
        reviewerName: 'Olivia P.',
        rating: 5,
        comment: 'Highly stretchable and soft. My boy is chunky and knitwear usually leaves red marks on his skin. This one fits gently.',
        date: '2026-07-12',
        sizePurchased: '6-12M',
        fitFeedback: 'Runs Large'
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'Everyday Organic Tee & Short Set',
    description: 'The ultimate daily essential set. Built with soft, midweight organic cotton jersey that handles daily washes. Feature a tagless neck and a stretchy waist tie for a secure yet non-restrictive toddler fit.',
    basePrice: 28.00,
    category: 'boys',
    collection: 'basics',
    images: [
      'https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600'
    ],
    fabricTags: ['100% Organic Cotton', 'Tagless/Itch-Free', 'OEKO-TEX Certified'],
    fabricDetails: '100% GOTS Certified Organic Cotton Jersey. Ring-spun for durability and buttery hand feel.',
    careInstructions: 'Machine wash cold with like colors. Tumble dry low. Low iron if needed.',
    rating: 4.5,
    sizes: [
      { size: '6-12M', stockCount: 8, weightRange: '16-20 lbs', heightRange: '26-28 in' },
      { size: '1Y', stockCount: 15, weightRange: '20-24 lbs', heightRange: '28-30 in' },
      { size: '2Y', stockCount: 10, weightRange: '24-28 lbs', heightRange: '30-32 in' },
      { size: '3Y', stockCount: 12, weightRange: '28-32 lbs', heightRange: '32-35 in' },
      { size: '4Y', stockCount: 6, weightRange: '32-37 lbs', heightRange: '35-39 in' },
      { size: '5Y', stockCount: 4, weightRange: '37-44 lbs', heightRange: '39-43 in' }
    ],
    reviews: [
      {
        id: 'rev-5-1',
        reviewerName: 'Thomas C.',
        rating: 4,
        comment: 'Great basic set. Holds up perfectly in the wash. Fits well, but the shorts are a tad long.',
        date: '2026-07-02',
        sizePurchased: '2Y',
        fitFeedback: 'Runs Large'
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'Snuggle Fleece Hooded Jumpsuit',
    description: 'Perfect for breezy playground days or cozy car rides. Features an adorable animal-eared hood lined with organic cotton jersey. Built with extra-long leg cuffs that can be folded to grow as baby grows.',
    basePrice: 45.00,
    salePrice: 38.00,
    category: 'unisex',
    collection: 'loungewear',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600'
    ],
    fabricTags: ['Grow-With-Me Cuffs', 'Organic Lining', 'Hypoallergenic'],
    fabricDetails: 'Outer: 80% Cotton 20% Polyester high-pile soft fleece. Inner Lining: 100% Organic Cotton. Non-scratch zipper guard.',
    careInstructions: 'Machine wash cold, gentle cycle. Tumble dry low. Do not iron or dry clean.',
    rating: 4.7,
    sizes: [
      { size: 'Newborn', stockCount: 0, weightRange: '5-8 lbs', heightRange: '17-21 in' },
      { size: '0-3M', stockCount: 5, weightRange: '8-12 lbs', heightRange: '21-24 in' },
      { size: '3-6M', stockCount: 8, weightRange: '12-16 lbs', heightRange: '24-26 in' },
      { size: '6-12M', stockCount: 12, weightRange: '16-20 lbs', heightRange: '26-28 in' },
      { size: '1Y', stockCount: 10, weightRange: '20-24 lbs', heightRange: '28-30 in' },
      { size: '2Y', stockCount: 6, weightRange: '24-28 lbs', heightRange: '30-32 in' }
    ],
    reviews: [
      {
        id: 'rev-6-1',
        reviewerName: 'Natalie S.',
        rating: 5,
        comment: 'So cute! The little ears on the hood are adorable. The fold-up cuffs mean it fits even though my baby had a sudden growth spurt.',
        date: '2026-06-30',
        sizePurchased: '6-12M',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-7',
    name: 'Petal Hem Organic Playdress',
    description: 'Features a sweet, non-restrictive empire waist and beautiful overlap petal hem design. Made from our highly-durable, premium organic interlock cotton. Designed specifically to slip over toddler heads without tugging.',
    basePrice: 35.00,
    category: 'girls',
    collection: 'playground',
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=600'
    ],
    fabricTags: ['100% Organic Cotton', 'Tagless/Itch-Free', 'Super Soft Interlock'],
    fabricDetails: '100% GOTS Certified Organic Cotton Interlock. Stretchy neck envelope style for effortless pulls.',
    careInstructions: 'Machine wash cold. Tumble dry low. Light iron if needed.',
    rating: 4.8,
    sizes: [
      { size: '6-12M', stockCount: 6, weightRange: '16-20 lbs', heightRange: '26-28 in' },
      { size: '1Y', stockCount: 8, weightRange: '20-24 lbs', heightRange: '28-30 in' },
      { size: '2Y', stockCount: 14, weightRange: '24-28 lbs', heightRange: '30-32 in' },
      { size: '3Y', stockCount: 10, weightRange: '28-32 lbs', heightRange: '32-35 in' },
      { size: '4Y', stockCount: 6, weightRange: '32-37 lbs', heightRange: '35-39 in' },
      { size: '5Y', stockCount: 5, weightRange: '37-44 lbs', heightRange: '39-43 in' }
    ],
    reviews: [
      {
        id: 'rev-7-1',
        reviewerName: 'Grace A.',
        rating: 5,
        comment: 'Beautiful dress, incredibly soft. My daughter loves spinning in it, and it holds up in the sand box!',
        date: '2026-07-07',
        sizePurchased: '3Y',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-8',
    name: 'Explorer Knit Beanie & Booties',
    description: 'Keep tiny extremities cozy with our breathable cotton-knit accessory set. Features an elasticized bootie ankle band to prevent booties from kicking off. Ribbed beanie keeps ears warm without leaving pressure marks.',
    basePrice: 24.00,
    category: 'unisex',
    collection: 'basics',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600'
    ],
    fabricTags: ['Tagless/Itch-Free', 'Kick-Proof Ankles', '100% Breathable Cotton'],
    fabricDetails: '100% Fine-Gauge Organic Cotton Knit. Anti-slip details on soles of booties for baby steps.',
    careInstructions: 'Hand wash recommended or machine wash cold on delicate cycle. Lay flat to dry.',
    rating: 4.4,
    sizes: [
      { size: 'Newborn', stockCount: 8, weightRange: '5-8 lbs', heightRange: '17-21 in' },
      { size: '0-3M', stockCount: 10, weightRange: '8-12 lbs', heightRange: '21-24 in' },
      { size: '3-6M', stockCount: 6, weightRange: '12-16 lbs', heightRange: '24-26 in' },
      { size: '6-12M', stockCount: 5, weightRange: '16-20 lbs', heightRange: '26-28 in' }
    ],
    reviews: [
      {
        id: 'rev-8-1',
        reviewerName: 'Sophia V.',
        rating: 4,
        comment: 'The booties actually stay on! That is a miracle in itself. The beanie was a bit snug, so check the sizes.',
        date: '2026-06-15',
        sizePurchased: '0-3M',
        fitFeedback: 'Runs Small'
      }
    ]
  }
];

export const CURATED_COLLECTIONS = [
  {
    id: 'loungewear',
    title: 'Ultra-Soft Loungewear',
    description: 'Breathable, tagless, and stretch-comfy matching sets designed for sweet dreams and cozy roll-abouts.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600',
    color: 'bg-baby-pink/30'
  },
  {
    id: 'playground',
    title: 'Playground Proof',
    description: 'Durable construction, reinforced joints, and fabrics engineered to survive grass stains and endless scrapes.',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600',
    color: 'bg-baby-blue/30'
  },
  {
    id: 'basics',
    title: 'Organic Basics',
    description: 'Premium GOTS certified cotton essentials, simple silhouettes, and easy washes for everyday routines.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600',
    color: 'bg-baby-yellow/40'
  }
];
