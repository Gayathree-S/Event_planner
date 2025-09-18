import React, { useState } from "react";

const aboutBackground = "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=60";

function AboutPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormStatus("Please enter your name and phone number.");
      return;
    }
    // For demo, just show success (replace with actual backend/email integration)
    setFormStatus("Thank you for contacting us! We will reach out soon.");
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${aboutBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          
          backgroundColor: "rgba(255,255,255,0.95)",
          maxWidth: 720,
          borderRadius: 20,
          marginLeft:350,
          padding: "40px 32px",
          boxShadow: "0 8px 36px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#3c1361",
          marginBottom: 48,
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 20, color: "#ae37c9ff" }}>
          About AI Event Planner
        </h1>

        <p style={{ fontSize: "1.15rem", lineHeight: 1.6, marginBottom: 16 }}>
          AI Event Planner is your trusted digital assistant to make event planning effortless and enjoyable.
          Whether you’re organizing a birthday party, corporate gathering, or intimate occasion, our AI-powered platform generates tailored, detailed plans customized to your preferences.
        </p>

        <p style={{ fontSize: "1.15rem", lineHeight: 1.6, marginBottom: 16 }}>
          We believe every event deserves a personal touch, so you get clear checklists, creative ideas, schedules, and budget insights — all without the hassle.
          Our platform stores your events securely and conveniently so you have full control to review, update, or delete anytime.
        </p>

        <p style={{ fontSize: "1.15rem", lineHeight: 1.6, marginBottom: 16 }}>
          Built with care, privacy, and simplicity in mind, AI Event Planner helps you focus on creating memories while we handle the planning details.
        </p>
      </div>

      {/* Contact Form */}
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          maxWidth: 480,
          borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 8px 36px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#3c1361",
          margin: "0 auto 60px auto",
          width: "100%",
        }}
      >
        <h2 style={{ marginBottom: 24, color: "#ae37c9ff", textAlign: "center" }}>Contact Us</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "12px 16px",
              fontSize: "1rem",
              borderRadius: 8,
              border: "1.5px solid #ae37c9ff",
              outline: "none",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              padding: "12px 16px",
              fontSize: "1rem",
              borderRadius: 8,
              border: "1.5px solid #ae37c9ff",
              outline: "none",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          />
          <textarea
            name="message"
            placeholder="Your Message (optional)"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            style={{
              padding: "12px 16px",
              fontSize: "1rem",
              borderRadius: 8,
              border: "1.5px solid #ae37c9ff",
              outline: "none",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              resize: "vertical",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#ae37c9ff",
              color: "white",
              padding: "14px 0",
              fontWeight: "bold",
              fontSize: "1.1rem",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = "#872aaf")}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = "#ae37c9ff")}
          >
            Send Message
          </button>
        </form>
        {formStatus && (
          <p style={{ marginTop: 16, textAlign: "center", color: formStatus.includes("Thank you") ? "green" : "red", fontWeight: "600" }}>
            {formStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default AboutPage;
