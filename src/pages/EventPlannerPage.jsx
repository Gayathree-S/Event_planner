import React, { useState } from "react";
import { askGemini } from "../geminiHelper";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const inputStyle = {
  padding: "10px 14px",
  border: "1.5px solid #ccc",
  borderRadius: 6,
  fontSize: "1rem",
  outline: "none",
  marginBottom: 16,
  transition: "border-color 0.25s",
};

function EventLocationMap({ coords, location }) {
  if (!coords) return null;
  return (
    <MapContainer
      center={coords}
      zoom={13}
      style={{ height: "300px", width: "100%", marginTop: 20, borderRadius: 12 }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
}

function EventPlannerPage() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [theme, setTheme] = useState("");
  const [budget, setBudget] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCoords = async (location) => {
    if (!location) return null;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
    } catch (error) {
      console.error("Failed to fetch coordinates:", error);
    }
    return null;
  };

  const handlePlanEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuggestion("");
    setCoords(null);

    const prompt = `
You are an expert event planner.
Create a detailed event plan including theme, schedule, food, activities, budget allocation, checklist, and pro tips.

Event Name: ${eventName}
Date: ${eventDate}
Location: ${location}
Number of Guests: ${guests}
Preferred Theme: ${theme || "No specific theme"}
Budget: ${budget || "No budget specified"}
`;

    try {
      const suggestionResponse = await askGemini(prompt);
      setSuggestion(suggestionResponse);

      // Get user info from localStorage for event ownership
      const storedUserRaw = localStorage.getItem("loggedInUser");
      const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : {};

      // Save the event with user info
      const newEvent = {
        id: Date.now(),
        eventName,
        eventDate,
        location,
        guests,
        theme,
        budget,
        suggestion: suggestionResponse,
        email: storedUser.email,
        username: storedUser.username,
      };

      const storedEventsRaw = localStorage.getItem("events");
      const storedEvents = storedEventsRaw ? JSON.parse(storedEventsRaw) : [];
      storedEvents.push(newEvent);
      localStorage.setItem("events", JSON.stringify(storedEvents));

      const locationCoords = await getCoords(location);
      if (locationCoords) {
        setCoords(locationCoords);
      } else {
        console.warn("Location coordinates not found");
      }
    } catch (error) {
      console.error("Error planning event or fetching coords:", error);
      setSuggestion(
        "Sorry, could not fetch suggestions from Gemini API. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          maxWidth: "100vw",
          width: "100%",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 25, color: "#222" }}>
          AI-Powered Event Planner
        </h1>
        <form
          onSubmit={handlePlanEvent}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="eventName" style={{ marginBottom: 6, fontWeight: "600", color: "#444" }}>
            Event Name *
          </label>
          <input
            id="eventName"
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            style={inputStyle}
          />

          <label htmlFor="eventDate" style={{ marginBottom: 6, fontWeight: "600", color: "#444" }}>
            Event Date *
          </label>
          <input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
            style={inputStyle}
          />

          <label htmlFor="location" style={{ marginBottom: 6, fontWeight: "600", color: "#444" }}>
            Location *
          </label>
          <input
            id="location"
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={inputStyle}
          />

          <label htmlFor="guests" style={{ marginBottom: 6, fontWeight: "600", color: "#444" }}>
            Number of Guests *
          </label>
          <input
            id="guests"
            type="number"
            min="1"
            placeholder="Enter number of guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
            style={inputStyle}
          />

          <label htmlFor="theme" style={{ marginBottom: 6, fontWeight: "600", color: "#444" }}>
            Preferred Theme (Optional)
          </label>
          <input
            id="theme"
            type="text"
            placeholder="e.g., Beach, Formal, Birthday"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={inputStyle}
          />

          <label htmlFor="budget" style={{ marginBottom: 6, fontWeight: "600", color: "#444" }}>
            Budget (Optional)
          </label>
          <input
            id="budget"
            type="text"
            placeholder="e.g., $5000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 20,
              padding: "14px",
              fontWeight: "700",
              fontSize: "1rem",
              backgroundColor: loading ? "#7ca1ff" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: loading ? "default" : "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            {loading ? "Planning Your Event..." : "Plan My Event"}
          </button>
        </form>

        <section style={{ marginTop: 30, minHeight: 120 }}>
          {suggestion && (
            <>
              <h2 style={{ color: "#007bff", marginBottom: 12 }}>
                Your Event Plan
              </h2>
              <pre
                style={{
                  padding: 20,
                  background: "#eef3ff",
                  borderRadius: 10,
                  maxHeight: 400,
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.5,
                  fontSize: "0.95rem",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  color: "#222",
                }}
              >
                {suggestion}
              </pre>
            </>
          )}
          {coords && <EventLocationMap coords={coords} location={location} />}
        </section>
      </div>
    </div>
  );
}

export default EventPlannerPage;
