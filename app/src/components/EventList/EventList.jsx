import events from "../../data/events.js";
import EventCard from "../EventCard/EventCard.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import styles from "./EventList.module.css";
import { useState } from "react";

// TODO: split each event below into its own EventCard component
// TODO: add a "Buy ticket" button to each event card
// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {

const [searchInput, setSearchInput] = useState("");

  return (

    <>
    
    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
    
    <ul className={styles.list}>
      {events
        .filter((event) =>
          event.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          event.city.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map((event) => (
          <EventCard key={event.id} event={event}/>
        ))}
    </ul>
    </>

  );
}
