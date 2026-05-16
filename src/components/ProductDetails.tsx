"use client";

import { useState } from "react";
import { Star, Truck, ShieldCheck, Heart, Share2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductDetails({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.src || "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400",
      quantity: quantity,
      size: selectedSize,
      color: "Black"
    });
  };

  return (
    <div className="product-details">
      <div className="product-header" style={{ borderBottom: '1px solid #eee', paddingBottom: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', lineHeight: '1.1', marginBottom: '1rem', fontWeight: 700, textTransform: 'uppercase' }}>{product.name}</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="product-stars" style={{ display: 'flex', gap: '2px', color: '#F5A623' }}>
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} fill="currentColor" />)}
            <span style={{ color: '#666', fontSize: '0.9rem', marginLeft: '8px' }}>({product.rating_count || 124} Reviews)</span>
          </div>
          <div style={{ color: '#22C55E', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%' }}></div> IN STOCK
          </div>
        </div>

        <div className="price-display" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: '#111' }}>${product.price}</span>
          {product.regular_price && product.regular_price !== product.price && (
            <span style={{ fontSize: '1.4rem', color: '#999', textDecoration: 'line-through' }}>${product.regular_price}</span>
          )}
        </div>
      </div>

      {/* SIZE SELECTION */}
      <div className="selection-group" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Select Size</span>
          <span style={{ color: '#C89F5D', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Size Guide</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
          {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
            <div 
              key={size} 
              onClick={() => setSelectedSize(size)}
              style={{ 
                border: '1px solid #ddd', 
                padding: '12px 0', 
                textAlign: 'center', 
                cursor: 'pointer', 
                transition: 'all 0.2s', 
                fontWeight: 600, 
                fontSize: '0.9rem', 
                background: selectedSize === size ? '#111' : 'white', 
                color: selectedSize === size ? 'white' : '#111', 
                borderColor: selectedSize === size ? '#111' : '#ddd' 
              }}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className="btn btn-primary" 
          onClick={handleAddToCart}
          style={{ flex: 1, padding: '1.2rem', fontSize: '1rem', borderRadius: '4px' }}
        >
          Add to Cart
        </button>
        <button style={{ width: '60px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', cursor: 'pointer' }}>
          <Heart size={20} />
        </button>
        <button style={{ width: '60px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', cursor: 'pointer' }}>
          <Share2 size={20} />
        </button>
      </div>
      
      <button className="btn btn-dark" style={{ width: '100%', padding: '1.2rem', fontSize: '1rem', background: '#111', color: 'white', borderRadius: '4px', marginBottom: '3rem' }}>Buy It Now</button>

      {/* TRUST BADGES */}
      <div style={{ background: '#F9F9F9', padding: '2rem', borderRadius: '4px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Truck size={24} style={{ color: '#C89F5D' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Free Shipping</div>
            <div style={{ fontSize: '0.75rem', color: '#777' }}>On all orders over $150</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck size={24} style={{ color: '#C89F5D' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Secure Payment</div>
            <div style={{ fontSize: '0.75rem', color: '#777' }}>100% Secure Transaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
