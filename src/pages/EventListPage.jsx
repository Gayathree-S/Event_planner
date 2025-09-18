import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import removeMarkdown from "remove-markdown";
import "../App.css"; // make sure to create and import the CSS

function EventListPage() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserRaw = localStorage.getItem("loggedInUser");
    if (storedUserRaw) {
      try {
        setUser(JSON.parse(storedUserRaw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const eventsRaw = localStorage.getItem("events");
    if (eventsRaw && user) {
      const allEvents = JSON.parse(eventsRaw);
      const filtered = allEvents.filter(
        ev =>
          (ev.email && user.email && ev.email === user.email) ||
          (ev.username && user.username && ev.username === user.username)
      );
      setEvents(filtered);
    } else if (user) {
      setEvents([]);
    }
  }, [user]);

  // Delete event for the logged-in user
  const handleDelete = id => {
    const eventsRaw = localStorage.getItem("events");
    if (!eventsRaw) return;
    let allEvents = JSON.parse(eventsRaw);
    // Remove from all events in storage
    allEvents = allEvents.filter(ev => ev.id !== id);
    localStorage.setItem("events", JSON.stringify(allEvents));
    // Remove from user's view
    setEvents(events.filter(ev => ev.id !== id));
  };

  if (!user) {
    return (
      <div className="event-list-container">
        <h2 className="event-title">Please Log In</h2>
        <p>
          You must be logged in to view your events.{" "}
          <Link to="/login">Log in here.</Link>
        </p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="event-list-container">
        <h2 className="event-title">No Events Found</h2>
        <p>
          You have not planned any events yet. <br/>Plan your event 👉{" "}
          <Link to="/event-planner"><button>Event Planner</button></Link> 
        </p>
      </div>
    );
  }

  return (
    <div className="event-list-container">
      <h2 className="event-title">Your Planned Events🧿</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li className="event-item" key={event.id}>
            <div className="event-head">
              <h3 className="event-name">{event.eventName}</h3>
              <button
                className="event-delete"
                onClick={() => handleDelete(event.id)}
                title="Delete Event"
              >
                Delete
              </button>
            </div>
            <div className="event-details">
              <span><strong>Date:</strong> {event.eventDate}</span>
              <span><strong>Location:</strong> {event.location}</span>
              <span><strong>Guests:</strong> {event.guests}</span>
              <span><strong>Theme:</strong> {event.theme || "No specific theme"}</span>
              <span><strong>Budget:</strong> {event.budget || "No budget specified"}</span>
            </div>
            <details className="event-plan-section">
              <summary className="event-plan-summary">
                View Event Plan
              </summary>
              <pre className="event-plan-content">
                {removeMarkdown(event.suggestion || "")}
              </pre>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventListPage;
