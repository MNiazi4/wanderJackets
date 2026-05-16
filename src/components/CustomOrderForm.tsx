"use client";

import { useState } from "react";

export default function CustomOrderForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        setFileName("");
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ padding: "3rem", background: "white", borderRadius: "4px", textAlign: "center", width: "100%" }}>
        <h3 style={{ color: "#4A3728", marginBottom: "1rem", fontSize: "1.5rem" }}>Request Sent!</h3>
        <p>Thank you for your custom order. We have received your details and any attached files. We will review them and contact you shortly.</p>
        <button onClick={() => setSuccess(false)} className="btn btn-primary" style={{ marginTop: "2rem" }}>Submit Another Order</button>
      </div>
    );
  }

  return (
    <form className="custom-order-form" onSubmit={handleSubmit}>
      {error && <p style={{ color: "red", fontSize: "0.9rem", fontWeight: "bold" }}>{error}</p>}
      
      <div className="form-row">
        <input type="text" name="name" placeholder="Name*" required />
        <input type="email" name="email" placeholder="Email*" required />
      </div>
      
      <div className="form-row">
        <input type="tel" name="phone" placeholder="Phone Number" required />
      </div>
      
      <div className="form-full">
        <label className="file-upload" style={{ background: "white", padding: "1.2rem", display: "flex", gap: "10px", border: "1px solid rgba(0,0,0,0.08)", cursor: "pointer" }}>
          <span style={{ fontWeight: "bold" }}>↑</span> 
          <span>{fileName ? `Attached: ${fileName}` : "Upload Design/Logo"}</span>
          <input type="file" name="file" accept="image/*,.pdf" onChange={handleFileChange} style={{ display: "none" }} />
        </label>
      </div>
      
      <div className="form-full">
        <textarea name="description" placeholder="Description: Please write description for your custom order here." rows={6} required></textarea>
      </div>
      
      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <button 
          type="submit" 
          disabled={loading} 
          className="btn btn-primary" 
          style={{ 
            borderRadius: "50%", 
            width: "60px", 
            height: "60px", 
            display: "inline-flex", 
            alignItems: "center", 
            justifyContent: "center", 
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "..." : "✓"}
        </button>
      </div>
    </form>
  );
}
