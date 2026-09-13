import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // hourly revalidate

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        sizes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const baseUrl = 'https://www.dualat.in';

    const itemsXml = products.map((product) => {
      const price = product.salePrice ?? product.basePrice;
      const isAvailable = product.sizes.some((s) => s.stockCount > 0);
      const imageUrl = product.images?.[0] || `${baseUrl}/icon.png`;
      const productLink = `${baseUrl}/product/${product.id}`;

      return `
    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <title>${escapeXml(product.name)}</title>
      <description>${escapeXml(product.description)}</description>
      <link>${escapeXml(productLink)}</link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:brand>Dualat</g:brand>
      <g:condition>new</g:condition>
      <g:availability>${isAvailable ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${price.toFixed(2)} INR</g:price>
      ${product.salePrice && product.salePrice < product.basePrice ? `<g:sale_price>${product.salePrice.toFixed(2)} INR</g:sale_price>` : ''}
      <g:google_product_category>Apparel &amp; Accessories &gt; Clothing &gt; Dresses</g:google_product_category>
      <g:gender>female</g:gender>
      <g:age_group>toddler</g:age_group>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Standard Courier</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>
    </item>`;
    }).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Dualat Kidswear Google Product Feed</title>
    <link>${baseUrl}</link>
    <description>Modest, comfortable and beautiful kidswear for little girls aged 0–9 years.</description>
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('[GET /api/feed/google-shopping] Error:', error);
    return new NextResponse('Failed to generate product feed', { status: 500 });
  }
}
