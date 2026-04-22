import events from "../../data/events.js";
import EventCard from "../EventCard/EventCard.jsx";
import styles from "./EventList.module.css";

// TODO: split each event below into its own EventCard component
// TODO: add a "Buy ticket" button to each event card
// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {
  return (

    <ul className={styles.list}>
      {events.map((event) => (
        <EventCard key={event.id} event={event}/>
      ))}
    </ul>
  );
}
