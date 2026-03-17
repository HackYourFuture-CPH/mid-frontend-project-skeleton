# The App package

This package sets up a [React](https://react.dev/) web app and uses [Vite](https://vitejs.dev/) to manage the bundling and serving of web assets.
The React app uses [React Router](https://reactrouter.com/en/main) for Single Page Application routing.

For development you can run the command `npm run dev` which uses `vite` to watch files so the web app updates each time you save a change.
You can visit [http://localhost:5173](http://localhost:5173) to see the app running.

To prepare your application for deployment you can run `npm run build`.  
To preview your web app you can use `npx vite preview --port 3000`.

## Environment variables

You can set environment variables in the `.env` file or in the Render.com environment variables section.

## JSX

Vite has built in support for [JSX](https://www.w3schools.com/react/react_jsx.asp). Any file that contains JSX code should have the `.jsx` file extension.

## CSS

Vite has built in support for CSS imports, simply create a `.css` file and import it:

```
import "./main.css";
```

## Assets

Any asset linked in `index.html` should be placed in the `public` folder.  
For assets that are used by React components, they should be placed in the `assets` folder.  
You can import them into your files like this:

```
import hyfLogo from "../../assets/hyf.svg";
```

## Mock API (json-server)

The project includes a local mock API powered by [json-server](https://github.com/typicode/json-server) and [json-server-auth](https://github.com/jeremyben/json-server-auth). It gives you a fully working REST API with authentication so you can build and test the frontend without a real backend.

### Setup

Copy the example environment file and install dependencies:

```
cp .env.example .env
npm install
```

### Running

Start both the Vite dev server and the mock API together:

```
npm run dev:all
```

Or run them separately in two terminals:

```
npm run dev   # Vite on http://localhost:5173
npm run api   # Mock API on http://localhost:3001
```

The API server restarts automatically when you edit `api/db.json`.

### Endpoints

| Method | Route | Auth required | Description |
|--------|-------|---------------|-------------|
| POST | `/register` | No | Create an account `{ email, password }` |
| POST | `/login` | No | Sign in → returns `{ accessToken, user }` |
| GET | `/events` | No | List all events |
| GET | `/events/:id` | No | Get a single event |
| GET | `/orders` | Yes | List your own orders |
| POST | `/orders` | Yes | Place an order |
| PATCH | `/orders/:id` | Yes | Update your order |
| DELETE | `/orders/:id` | Yes | Delete your order |

For protected routes, include the token from `/login` as a header:

```
Authorization: Bearer <accessToken>
```

### Seed data

Event data lives in `api/db.json`. Edit it freely — the server reloads automatically.

### Data structure

json-server stores whatever JSON you send it — it does no validation. This means if you POST an order with `items` in one place and `tickets` somewhere else, both will be saved without error. Decide on a consistent shape for each resource early and stick to it throughout your app, otherwise your UI will break in hard-to-debug ways.

### Switching to the real API

While it is _not_ required as part of your project's requirements, if at a later point you want to move from the mock API to the real Express backend (the `api/` package at the project root), follow these steps:

1. **Stop the mock API** (`npm run api` / `npm run dev:all`).
2. **Set up and start the real backend** — follow the instructions in `api/README.md`.
3. **Update `VITE_API_URL` in your `.env`** to point at the real backend:

```
VITE_API_URL=http://localhost:3001
```

The `api()` helper already appends `/api` to every route, so no path prefix is needed here.

> Note: both servers default to port 3001. If they are running at the same time, change one of the ports to avoid a conflict — update `API_PORT` in this package's `.env` for the mock API, or `PORT` in `api/.env` for the real backend.

Your fetch calls via the `api()` helper will work without any other changes.

## Authentication

Authentication is handled by `AuthContext` (`src/context/AuthContext.jsx`). The `AuthProvider` is mounted at the root of the app in `main.jsx`, so auth state is available everywhere.

### Using auth in a component

```jsx
import { useAuth } from "../../context/AuthContext.jsx";

const { user, token, login, register, logout } = useAuth();
```

### What each value gives you

| Value | Type | Description |
|---|---|---|
| `user` | object \| null | The logged-in user `{ id, email }`, or `null` if not logged in |
| `token` | string \| null | The JWT access token, or `null` if not logged in |
| `login(email, password)` | async function | Signs in — throws an `Error` if credentials are wrong |
| `register(email, password)` | async function | Creates an account and signs in — throws an `Error` on failure |
| `logout()` | function | Clears the session from state and localStorage |

### Making authenticated API calls

Pass the token as a `Bearer` header on any request that requires auth (orders etc.):

```js
const response = await fetch(api("/orders"), {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Session persistence

The token and user are saved to `localStorage` so the session survives a page refresh. They are loaded back into state automatically when the app mounts.

## Calling the API using `fetch` and the `api()` helper

When you need data from the API, you can use `fetch` but it's important to not hardcode the URLs since they will differ between your development environment and the deployment environment. For this we can use the `api()` helper function.

Assuming you've deployed your API somewhere and you've defined the following environment variable:

```
VITE_API_URL=https://my-cool-domain:1234

```

When you call `api('/nested')` the helper generates the following URL `https://my-cool-domain:1234/api/nested` which you can pass to `fetch`:

```
const response = await fetch(api('/nested'));
```

## Deploying a static web app

> Last tested: 2024-04-11

Follow the steps [here](../api/README.md#deploying) first to deploy your database and your web service.

Once you've done that, click "New" and this time select "Static Site".

![](../images/render/app/step16.png)
![](../images/render/app/step17.png)

Select the same repository as you used for the web service.

![](../images/render/app/step18.png)

Fill in the required fields and add the "VITE_API_URL" environment variable with the value based on the URL your web service got (for example `https://hyf-template-api.onrender.com/api`). Then click "Create Static Site".

![](../images/render/app/step19.png)
![](../images/render/app/step20.png)

In the next screen, wait until you see the text "Your site is live".  
Then navigate to "Redirects/Rewrites".

![](../images/render/app/step21.png)

Click "Add Rule" and input the below rule settings before clicking "Save Changes".

![](../images/render/app/step22.png)
![](../images/render/app/step23.png)

After this you should be able to test your web app in your browser on the URL shown, which should be something like `https://hyf-template-app.onrender.com/`.

If everything has been done correctly then your web app should be able to load data from your web service's API.
