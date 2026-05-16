import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const KEY = process.env.WOOCOMMERCE_KEY || '';
  const SECRET = process.env.WOOCOMMERCE_SECRET || '';
  const BASE = process.env.WOOCOMMERCE_URL || '';
  
  // Use a cache buster timestamp
  const timestamp = Date.now();
  const url = `${BASE}/wp-json/wc/v3/products/categories?hide_empty=false&per_page=20&consumer_key=${KEY}&consumer_secret=${SECRET}&_t=${timestamp}`;

  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) throw new Error("Fetch failed");
    
    let data = await res.json();
    
    // Filter out 'Uncategorized' and provide fallback images if missing
    data = data.filter((c: any) => c.slug !== 'uncategorized').map((cat: any, i: number) => {
      if (!cat.image || !cat.image.src) {
        const defaultImages = [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=300&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=300&auto=format&fit=crop"
        ];
        cat.image = { src: defaultImages[i % defaultImages.length] };
      }
      return cat;
    });

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
