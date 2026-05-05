import events from "../../data/events.js";
import { Link } from "react-router-dom";
import "./EventDetail.css";

export default function EventDetail() {
  const event = events[0];
  return (
    <div className="event-detail">
      <Link to="/events" className="back-link">
        ← Back to all events
      </Link>

      <span className="event-category">{event.category}</span>

      <h1 className="event-detail-title">{event.name}</h1>

      <div className="event-detail-meta">
        <div className="meta-item">
          <span className="meta-label">Date</span>
          <span className="meta-value">{event.date}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Time</span>
          <span className="meta-value">{event.time}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Venue</span>
          <span className="meta-value">{event.venue}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">City</span>
          <span className="meta-value">{event.city}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Price</span>
          <span className="meta-value">
            {event.price === 0 ? "Free" : `€${event.price}`}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Availability</span>
          <span
            className={`meta-value ${event.ticketsAvailable === 0 ? "sold-out" : "available"}`}
          >
            {event.ticketsAvailable === 0
              ? "Sold out"
              : `${ticketsAvailable} ticket${ticketsAvailable === 1 ? "" : "s"} left`}
          </span>
        </div>
      </div>

      <div className="event-description">
        <h2>About this event</h2>
        <p>{event.description}</p>
      </div>
    </div>
  );
}
