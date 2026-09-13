import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# DUALAT Kidswear

## Brand Overview
DUALAT is an Indian boutique kidswear brand focused primarily on girls aged 0 to 9 years. Originating from Kerala, India, Dualat delivers thoughtfully to families nationwide.

## Core Positioning
“Modest, Comfortable & Beautiful Kidswear for Little Girls.”

## Brand Ethos
- **Born from Motherhood**: Inspired by a mother's personal search for clothing that feels comfortable, modest, and graceful for little girls.
- **Comfort-First Styles**: Relaxed silhouettes, soft contrast collars, smocked details, and gentle elasticated fits allowing free movement.
- **Breathable Natural Fabrics**: Skin-friendly textured cottons, soft poplins, and lightweight cotton weaves ideal for warm Indian climates.
- **Made for Little Moments**: Timeless checks, delicate floral lace, and everyday co-ords crafted for family moments, playdates, and festivals.

## Product Range
- Dresses & Frocks
- Two-Piece Sets & Co-ords
- Everyday Cotton Wear
- Festive & Occasion Outfits
- Age Groups: 0–1Y, 1–2Y, 2–3Y, 3–5Y, 5–7Y, 7–9Y

## Official Links
- **Website**: https://www.dualat.in
- **Girls Collection**: https://www.dualat.in/girls
- **Shop by Age**: https://www.dualat.in/shop
- **Parenting Journal**: https://www.dualat.in/journal
- **Size Guide**: https://www.dualat.in/size-guide
- **Order Tracking**: https://www.dualat.in/track
- **Contact & WhatsApp**: https://www.dualat.in/contact

## Service & Support
- **Delivery**: Pan India doorstep courier delivery within 4–7 business days.
- **Exchange**: 7-day hassle-free size exchange for unworn garments.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
