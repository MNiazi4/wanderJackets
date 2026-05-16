import https from 'https';

const FALLBACK_PRODUCTS = [
  { id: 1, name: "Ironbound Heritage Steerhide Moto Perfecto", price: "249.95", regular_price: "350.00", on_sale: true, images: [{ src: "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=600&auto=format&fit=crop" }], categories: [{ name: "Men" }], rating_count: 124 },
  { id: 2, name: "Tralee Black Bomber Women's Jacket", price: "189.00", regular_price: "249.00", on_sale: true, images: [{ src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" }], categories: [{ name: "Women" }], rating_count: 85 },
];

const FALLBACK_CATEGORIES = [
  { id: 101, name: "Leather Jackets", slug: "leather-jackets", parent: 0 },
];

// High-performance direct HTTPS fetch to bypass Next.js fetch patches and proxy latency
async function fetchWooCommerce(endpoint: string): Promise<any> {
  const KEY = process.env.WOOCOMMERCE_KEY || '';
  const SECRET = process.env.WOOCOMMERCE_SECRET || '';
  const BASE_URL = process.env.WOOCOMMERCE_URL || '';
  
  // Extract hostname from URL
  const hostname = BASE_URL.replace('https://', '').replace('http://', '');
  const separator = endpoint.includes('?') ? '&' : '?';
  const path = `/wp-json/wc/v3/${endpoint}${separator}consumer_key=${KEY}&consumer_secret=${SECRET}&_t=${Date.now()}`;

  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      port: 443,
      path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    };

    const req = https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            console.error("JSON Parse Error in woocommerce fetch");
            resolve(null);
          }
        } else {
          console.error(`WooCommerce API Error: ${res.statusCode} for ${endpoint}`);
          resolve(null);
        }
      });
    });

    req.on('error', (e) => {
      console.error(`HTTPS Fetch Error: ${e.message}`);
      resolve(null);
    });

    req.on('timeout', () => {
      req.destroy();
      console.error("HTTPS Fetch Timeout");
      resolve(null);
    });
  });
}

export async function getProducts() {
  const data = await fetchWooCommerce('products?per_page=20&status=publish');
  if (!Array.isArray(data) || data.length === 0) return FALLBACK_PRODUCTS;

  const defaultImages = [
    "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489987707023-afc824781ef1?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559582798-678dfc71caa4?q=80&w=600&auto=format&fit=crop"
  ];

  return data.map((p: any, i: number) => {
    if (!p.images || p.images.length === 0) p.images = [{ src: defaultImages[i % defaultImages.length] }];
    if (!p.price || p.price === "") p.price = (150 + (i * 10)).toFixed(2);
    return p;
  });
}

export async function getCategories() {
  const data = await fetchWooCommerce('products/categories?hide_empty=false&per_page=100');
  if (!Array.isArray(data) || data.length === 0) return FALLBACK_CATEGORIES;

  const defaultImages = [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=300&auto=format&fit=crop"
  ];

  return data.map((cat: any, i: number) => {
    if (!cat.image || !cat.image.src) cat.image = { src: defaultImages[i % defaultImages.length] };
    return cat;
  });
}
