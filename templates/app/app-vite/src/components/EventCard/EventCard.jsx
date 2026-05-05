import { Link } from "react-router-dom";
import "./EventCard.css";


export default function EventCard({ event }) {
  const {
    id,
    name,
    date,
    time,
    venue,
    city,
    category,
    price,
    ticketsAvailable,
  } = event;

  return (
    <article className="event-card">
      <span className="event-category">{category}</span>

      <h2 className="event-title">{name}</h2>

      <div className="event-meta">
        <p>
          📅 {date} at {time}
        </p>
        <p>
          📍 {venue}, {city}
        </p>
      </div>

      <div className="event-footer">
        <span className="event-price">
          {price === 0 ? "Free" : `€${price}`}
        </span>
        <span
          className={`event-availability ${ticketsAvailable === 0 ? "sold-out" : ""}`}
        >
          {ticketsAvailable === 0
            ? "Sold out"
            : `${ticketsAvailable} tickets left`}
        </span>
        <Link to={`/events/${id}`} className="event-link">
          View details →
        </Link>
      </div>
    </article>
  );
}
