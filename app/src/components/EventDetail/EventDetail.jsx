// TODO: display at least date, time, venue, city, and description for one event
// TODO: use useParams() to get the event id from the URL
// TODO: fetch the event from GET /events/:id instead of using mock data


import styles from "./EventDetail.module.css";

const EventDetail = () => {
  const event = {
    name: "React Copenhagen Conference 2026",
    date: "2026-04-15",
    time: "09:00",
    venue: "Copenhagen Concert Hall",
    city: "Copenhagen",
    description:
      "The largest React conference in Scandinavia. Two tracks covering the latest in React 19, Server Components, and the evolving frontend ecosystem.",
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{event.name}</h1>

      <p className={styles.info}>
        📅 {event.date} • ⏰ {event.time}
      </p>

      <p className={styles.info}>
        📍 {event.venue}, {event.city}
      </p>

      <p className={styles.description}>{event.description}</p>
    </div>
  );
}