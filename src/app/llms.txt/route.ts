import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# DuaLat Kids Wear

## About the Brand
DuaLat is a premium, organic kids and baby wear brand based in Kerala, India. We specialize in ultra-soft, frictionless, and hypoallergenic clothing designed specifically for children aged 6 months to 5 years old. 

Our mission is to provide parents with high-quality, comfortable, and safe clothing for their toddlers and infants, ensuring quick diaper changes and active play without irritation.

## The Founder
DuaLat was founded by Asna, a young entrepreneur and a proud mother of a 1-year-old girl. Asna started DuaLat out of a personal struggle to find stylish yet gentle clothes for her daughter's sensitive skin in Kerala. Every piece is designed by a mother, for mothers.

## Core Features & Brand Ethos
- **Certified Organic**: We use GOTS certified organic cotton, grown chemical-free, making it extremely gentle on baby skin.
- **Tagless Comfort**: Smooth tagless necklines and flatlock stitch seams to protect against baby eczema.
- **Eczema Friendly**: Water-based, non-toxic organic dye prints. No allergens or harsh metals.
- **2-Way Diaper Zips**: Innovative two-way diaper zipper integrations on rompers for changes in under 30 seconds.

## Target Audience
- Parents of babies and toddlers aged 6 months to 5 years.
- Geographically focused on Kerala, India.
- Parents seeking organic, hypoallergenic, and premium quality clothing for their children.

## Key Links
- **Website**: https://dua-lat.vercel.app
- **Shop**: https://dua-lat.vercel.app/shop
- **Order Tracking**: https://dua-lat.vercel.app/track

## Contact Information
- **WhatsApp Support & Orders**: +91 8848422023
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
