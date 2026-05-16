"use client";

import { useCart } from "@/context/CartContext";
import { ArrowLeft, Lock, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "US",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a secure checkout process
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      clearCart();
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ width: '80px', height: '80px', background: '#22C55E', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          <ShieldCheck size={40} />
        </div>
        <h1 style={{ fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Order Confirmed</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px' }}>
          Thank you for your premium order, {formData.firstName}. We've sent a confirmation email to {formData.email} and will begin handcrafting your leather items shortly.
        </p>
        <Link href="/">
          <button className="btn btn-dark" style={{ padding: '1rem 3rem' }}>Return to Boutique</button>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <Link href="/">
          <button className="btn btn-dark" style={{ marginTop: '2rem', padding: '1rem 2rem' }}>Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ background: '#fcfcfc', minHeight: '100vh', padding: '3rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        <Link href="/cart" onClick={(e) => { e.preventDefault(); router.back(); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#666', marginBottom: '2rem', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem' }} className="checkout-grid">
          
          {/* LEFT: CHECKOUT FORM */}
          <div className="checkout-form-wrapper" style={{ background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} /> Secure Checkout
            </h1>
            
            <form onSubmit={handleSubmit}>
              <h3 style={{ textTransform: 'uppercase', fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>1. Contact Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>First Name</label>
                  <input required name="firstName" onChange={handleChange} type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Last Name</label>
                  <input required name="lastName" onChange={handleChange} type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
              </div>
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Address</label>
                <input required name="email" onChange={handleChange} type="email" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>

              <h3 style={{ textTransform: 'uppercase', fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>2. Shipping Address</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Street Address</label>
                <input required name="address" onChange={handleChange} type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>City</label>
                  <input required name="city" onChange={handleChange} type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>ZIP / Postal Code</label>
                  <input required name="zip" onChange={handleChange} type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
              </div>

              <h3 style={{ textTransform: 'uppercase', fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>3. Payment Method</h3>
              <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '4px', border: '1px solid #eee', marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    <CreditCard size={18} /> Card Number
                  </label>
                  <input required name="cardNumber" onChange={handleChange} placeholder="0000 0000 0000 0000" type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Expiry (MM/YY)</label>
                    <input required name="expiry" onChange={handleChange} placeholder="MM/YY" type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>CVC</label>
                    <input required name="cvc" onChange={handleChange} placeholder="123" type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
                style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', background: isSubmitting ? '#555' : '#111' }}
              >
                {isSubmitting ? "Processing Securely..." : `Pay $${(cartTotal + 15).toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="checkout-summary" style={{ background: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', height: 'fit-content', position: 'sticky', top: '2rem' }}>
            <h3 style={{ textTransform: 'uppercase', fontSize: '1.1rem', marginBottom: '2rem' }}>Order Summary</h3>
            
            <div className="checkout-items" style={{ marginBottom: '2rem' }}>
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '60px', height: '80px', background: '#f5f5f5', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#111', color: 'white', width: '20px', height: '20px', borderRadius: '50%', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.quantity}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: '#888' }}>Size: {item.size} | Color: Black</p>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666' }}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666' }}>
                <span>Premium Shipping</span>
                <span>$15.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 700, marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                <span>Total</span>
                <span>${(cartTotal + 15).toFixed(2)}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#22C55E', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'center', marginTop: '2rem' }}>
              <ShieldCheck size={16} /> 256-bit Secure Encryption
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
