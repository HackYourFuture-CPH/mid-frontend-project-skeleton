// Hardcoded mock events for development before switching to fetch.
// Shape should match the API: GET /events
const events = [
  {
    id: 1,
    name: "React Copenhagen Conference 2026",
    date: "2026-04-15",
    time: "09:00",
    venue: "Copenhagen Concert Hall",
    city: "Copenhagen",
    description:
      "The largest React conference in Scandinavia. Two tracks covering the latest in React 19, Server Components, and the evolving frontend ecosystem. Keynotes from core React team members and community leaders.",
    price: 149,
    ticketsAvailable: 0,
    totalTickets: 800,
    category: "Conference",
  },
  {
    id: 2,
    name: "Hackathon: Build with AI",
    date: "2026-04-25",
    time: "09:00",
    venue: "BLOX",
    city: "Copenhagen",
    description:
      "A 24-hour hackathon where teams of 2–4 build something real using AI APIs. Cash prizes, free food, and mentoring from engineers at leading AI companies. All skill levels welcome.",
    price: 0,
    ticketsAvailable: 60,
    totalTickets: 150,
    category: "Hackathon",
  },
  {
    id: 3,
    name: "JavaScript: Modern Patterns Workshop",
    date: "2026-05-03",
    time: "10:00",
    venue: "Founders House",
    city: "Copenhagen",
    description:
      "A hands-on full-day workshop covering modern JavaScript patterns: closures, async/await, Promises, modules, and functional techniques. Bring your laptop. Small group, individual coaching included.",
    price: 79,
    ticketsAvailable: 12,
    totalTickets: 30,
    category: "Workshop",
  },
];

export default events;