import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="hero">
      <span className="hero-badge">🎟 Events platform</span>
      <h1 className="hero-title">
        Discover events <br /> happening near you
      </h1>
      <p className="hero-subtitle">
        Conferences, workshops, and hackathons — find your next experience and
        grab your ticket in seconds.
      </p>
      <Link to="/events" className="hero-cta">
        Browse events →
      </Link>
    </div>
  );
}
