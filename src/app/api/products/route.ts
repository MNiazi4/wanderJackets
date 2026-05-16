import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const KEY = process.env.WOOCOMMERCE_KEY || '';
  const SECRET = process.env.WOOCOMMERCE_SECRET || '';
  const BASE = process.env.WOOCOMMERCE_URL || '';
  
  const timestamp = Date.now();
  const url = `${BASE}/wp-json/wc/v3/products?per_page=12&status=publish&orderby=date&order=desc&consumer_key=${KEY}&consumer_secret=${SECRET}&_t=${timestamp}`;

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
    
    // Fallback logic for missing images and prices
    const defaultImages = [
      "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489987707023-afc824781ef1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559582798-678dfc71caa4?q=80&w=600&auto=format&fit=crop"
    ];

    data = data.map((p: any, i: number) => {
      if (!p.images || p.images.length === 0) {
        p.images = [{ src: defaultImages[i % defaultImages.length] }];
      }
      if (!p.price || p.price === "") {
        p.price = (150 + (i * 10)).toFixed(2);
      }
      return p;
    });

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
