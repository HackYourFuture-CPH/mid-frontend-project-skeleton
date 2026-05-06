// import events from "../../data/events.js";
import { useEvents } from "../../hooks/useEvents.js";
import EventCard from "../EventCard/EventCard.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Pagination from "../Pagination/Pagination.jsx"
import styles from "./EventList.module.css";
import { useState } from "react";
import api from "../../api.js";

// TODO: split each event below into its own EventCard component
// TODO: add a "Buy ticket" button to each event card
// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {

const [searchInput, setSearchInput] = useState("");
const [page, setPage] = useState(1);
const limit = 6;

const apiUrl = searchInput ? api(`/events?q=${searchInput}&_page=${page}&_limit=${limit}`) : api(`/events?_page=${page}&_limit=${limit}`);

const { data : events, loading, error, totalCount} = useEvents(apiUrl);

const totalPages = Math.ceil(totalCount / limit);


if(loading){
  return <p>Loading events...</p>;
}
  
if(error){
  return <p>Something went wrong: {error}</p>
}


  return (
    <>
    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
    
    <ul className={styles.list}>
      {events.map((event) => (
          <EventCard key={event.id} event={event}/>
        ))}
    </ul>

    <Pagination page={page} setPage={setPage} totalPages={totalPages}/>

    </>

  );
}
