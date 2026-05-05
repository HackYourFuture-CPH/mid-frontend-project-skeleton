import events from "../../data/events.js";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventList.css";

export default function EventList() {
  return (
    <div className="event-list-container">
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
