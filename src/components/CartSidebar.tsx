"use client";

import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} />
            <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Cart</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="close-cart">
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.3 }} />
              <p>Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="btn btn-dark" 
                style={{ marginTop: '1.5rem', width: 'auto', padding: '0.8rem 2rem' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-meta">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </p>
                  <div className="cart-item-bottom">
                    <div className="qty-picker">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="cart-item-price">${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-item">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <p className="cart-tax-note">Shipping & taxes calculated at checkout</p>
            
            <Link href="/checkout" onClick={() => setIsCartOpen(false)} style={{ width: '100%' }}>
              <button className="btn btn-primary checkout-btn">
                Proceed to Checkout <ArrowRight size={18} style={{ marginLeft: '10px' }} />
              </button>
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(false)}
              className="view-cart-link"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
