import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

export async function GET() {
  const CONSUMER_KEY = process.env.WOOCOMMERCE_KEY || '';
  const CONSUMER_SECRET = process.env.WOOCOMMERCE_SECRET || '';
  const BASE_URL = process.env.WOOCOMMERCE_URL || '';

  const url = `${BASE_URL}/wp-json/wc/v3/products?per_page=2&status=publish&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

  try {
    const res = await axios.get(url, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
      timeout: 15000,
    });
    return NextResponse.json({
      status: res.status,
      ok: true,
      productCount: res.data?.length,
      firstName: res.data?.[0]?.name,
      env_url: BASE_URL,
      env_key: CONSUMER_KEY ? CONSUMER_KEY.slice(0, 10) + '...' : 'MISSING',
    });
  } catch (err: any) {
    return NextResponse.json({
      error: err?.message,
      code: err?.code,
      url: url.replace(CONSUMER_SECRET, '***'),
      env_url: BASE_URL,
    });
  }
}
