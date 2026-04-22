import styles from "./EventCard.module.css";

const EventCard = ({event}) => {
    return(
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.category}>{event.category}</span>
                {event.soldOut && <span className={styles.soldOut}>Sold Out</span>}
            </div>
            <h3 className={styles.title}>{event.name}</h3>
            <p>📅 {event.date} • ⏰ {event.time}</p>
            <p>🏙️ {event.venue}, {event.city}</p>
            <p>{event.description.slice(0, 100)}...</p>
            <div className={styles.footer}>
                <span className={styles.price}>{event.price}</span>
                <button className={styles.button}>Buy ticket</button>
            </div>
        </div>
    )
}
export default EventCard;