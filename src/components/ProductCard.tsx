"use client";

import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart, setIsCartOpen } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.src || "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400",
      quantity: 1,
      size: "L", // Default size
      color: "Black"
    });
    
    setIsCartOpen(true);
  };

  return (
    <div className="product-card-container" style={{ position: 'relative' }}>
      <Link href={`/product/${product.slug || product.id}`} className="product-card">
        <div className="product-img-wrap">
          {product.on_sale && <span className="badge sale">Sale</span>}
          <img 
            src={product.images && product.images[0] ? product.images[0].src : "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400"} 
            alt={product.name} 
          />
          <div className="badge" style={{ top: "auto", bottom: "1rem", background: "#000" }}>Prime Delivery</div>
          
          {/* QUICK ADD BUTTON OVERLAY */}
          <button 
            onClick={handleQuickAdd}
            className="quick-add-btn"
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: 'white',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.3s ease'
            }}
          >
            <ShoppingCart size={18} color="#111" />
          </button>
        </div>
        
        <div className="product-info">
          <div className="product-cat">{(product.categories && product.categories[0]) ? product.categories[0].name : "Jackets"}</div>
          <h3 className="product-title">{product.name}</h3>
          <div className="product-stars">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill={s <= 4 ? "currentColor" : "none"} />)}
            <span style={{ color: "#666", fontSize: "0.8rem", marginLeft: "5px" }}>({product.rating_count || 42})</span>
          </div>
          <div className="product-price">
            <span>${product.price}</span>
            {product.regular_price && product.regular_price !== product.price && (
              <span className="price-old">${product.regular_price}</span>
            )}
          </div>
          
          <button 
            onClick={handleQuickAdd}
            style={{
              marginTop: '1.2rem',
              width: '100%',
              padding: '0.8rem',
              background: '#111',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
}
