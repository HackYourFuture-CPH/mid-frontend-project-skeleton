const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Required: bind the router db to the app for json-server-auth to work
app.db = router.db;

// Strip the /api prefix (added by the frontend's api() helper) and apply
// access control permissions where needed.
//
// Permissions are 3 digits: owner | authenticated | public
//   4 = read, 2 = write, 6 = read+write, 0 = no access
//
// Auth routes are handled by json-server-auth at their root paths.
// /api/events* → /events:        public read, no write
// /api/orders* → /600/orders:    only the owning user can read or write
// /api/users*  → /600/users:     only the owning user can access their record
const routeGuards = jsonServer.rewriter({
  "/api/login": "/login",
  "/api/register": "/register",
  "/api/events*": "/events$1",
  "/api/orders*": "/600/orders$1",
  "/api/users*": "/600/users$1",
});

app.use(routeGuards);
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});
app.use(middlewares);
app.use(auth);
app.use(router);

const PORT = process.env.API_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
  console.log("");
  console.log("Auth (public):");
  console.log("  POST /register  { email, password }");
  console.log("  POST /login     { email, password }  → { accessToken, user }");
  console.log("");
  console.log("Events (public read):");
  console.log("  GET  /events");
  console.log("  GET  /events/:id");
  console.log("");
  console.log("Orders (requires Authorization: Bearer <token>):");
  console.log("  GET    /orders          ← returns only your own orders");
  console.log(
    "  POST   /orders          ← userId set automatically from token",
  );
  console.log("  PATCH  /orders/:id");
  console.log("  DELETE /orders/:id");
});
