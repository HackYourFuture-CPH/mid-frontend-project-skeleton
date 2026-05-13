// TODO: display at least date, time, venue, city, and description for one event
// TODO: use useParams() to get the event id from the URL
// TODO: fetch the event from GET /events/:id instead of using mock data
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api.js"
import { useCartItems } from "../../context/CartContext.jsx";
import { useState } from "react";

import styles from "./EventDetail.module.css";
import { useEvents } from "../../hooks/useEvents";

const EventDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartItems();
  const [addedToCart, setAddedToCart] = useState(false);
  
    console.log("EventCard params:", id);

  const apiUrl = api(`/events/${id}`);

  const { data : event } = useEvents(apiUrl);

  console.log("EVENT ::::: "+event);

  const handleAddToCart = () => {
    const eventId = Number.parseInt(id);
    addToCart(eventId);
    setAddedToCart(true);
    
    // Reset the visual feedback after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className={styles.container}>
      {event.image && (
        <img 
          src={event.image} 
          alt={event.name}
          className={styles.image}
        />
      )}
      <h1 className={styles.title}>{event.name}</h1>


      <p className={styles.info}>
        📅 {event.date} • ⏰ {event.time}
      </p>

      <p className={styles.info}>
        📍 {event.venue}, {event.city}
      </p>
      <h3 className={styles.category}>
        Category: 
      </h3>
      <p>{event.category}</p>
      <h3 className={styles.soldOut}>
        {event.soldOut && "This event is sold out!"}
      </h3>
      <h3 className={styles.description}>
        Description:
      </h3>
      <p className={styles.description}>
        {event.description}
      </p>

      <h3 className={styles.price}>
      {event.price === 0 ? "Free" : `${event.price} DKK`}
      </h3>
      <h3 className={styles.tickets}>
        {event.ticketsAvailable > 0 ? 
                `${event.ticketsAvailable} tickets left` : 
                "Sold Out"
                }
      </h3>
      <div className={styles.buttonGroup}>
        <button 
          className={`${styles.button} ${addedToCart ? styles.addedSuccess : ''}`}
          onClick={handleAddToCart}
          disabled={event.soldOut}
        >
          {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
        </button>
        <button 
          className={styles.viewCartBtn}
          onClick={() => navigate('/cart')}
        >
          View Cart
        </button>
      </div>

    </div>
  );
}

export default EventDetail;