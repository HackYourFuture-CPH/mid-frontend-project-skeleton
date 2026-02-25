# Mid-specialism Frontend project

This package sets up a [React](https://react.dev/) web app and uses [Vite](https://vitejs.dev/) to manage the bundling and serving of web assets.
The React app uses [React Router](https://reactrouter.com/en/main) for Single Page Application routing.

For development you can run the command `npm run dev` which uses `vite` to watch files so the web app updates each time you save a change.

To prepare your application for deployment you can run `npm run build`.

## Mock API

The project uses [json-server](https://www.npmjs.com/package/json-server) as a thin mock API. When you run `npm run app`, both the API and the Vite app start: the API is at `http://localhost:3001`, the app at Vite’s usual URL. Set `VITE_API_URL=http://localhost:3001` in your `.env` (see `.env.example`) so the app talks to the mock API.

Mock data lives in `api/db.json`. It exposes REST endpoints for the keys in that file (e.g. `/events`, `/users`, etc.). **Change or generate the data in `api/db.json` for your own needs**- edit the JSON by hand or replace it with generated data. json-server will serve whatever is in that file and supports query params, pagination, and CRUD. Check [json-server](https://www.npmjs.com/package/json-server) for documentation.

To run only the API: `npm run dev:api`.

## Firebase (Google + Email/Password)

The app uses [Firebase Authentication](https://firebase.google.com/docs/auth) with [Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin) and [email/password](https://firebase.google.com/docs/auth/web/password-auth). Set the Firebase config in `.env` (see `.env.example`). In the [Firebase console](https://console.firebase.google.com/): enable **Google** and **Email/Password** under Authentication → Sign-in method. Use `useAuth()` from `src/context/AuthContext.jsx` for `user`, `signInWithGoogle`, `signUpWithEmail`, `signInWithEmail`, and `signOut`.

**Where to find docs and credentials:** To create a project and get your web app config, use [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup). That guide covers creating a project (or using an existing one), registering a web app, and copying the `firebaseConfig` object. The same values (apiKey, authDomain, projectId, etc.) go into your `.env` as `VITE_FIREBASE_*`. You can also open the [Firebase console](https://console.firebase.google.com/) → your project → **Project settings** (gear) → **Your apps** → select or add a web app to see the config.

More providers can be added: follow the [Firebase sign-in method docs](https://firebase.google.com/docs/auth/web/start#add-sign-in-providers) to enable additional providers (e.g. Facebook, GitHub, Twitter) in the Firebase console and wire them up in your app.

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

## Deploying to Render

**Can this setup be deployed to Render?** Yes, with one important distinction.

- **Frontend (this app)** — Deploy as a **Static Site** on Render. Use build command `npm run build` and publish the `dist/` folder. The app will call whatever URL you set in `VITE_API_URL`. No mock API runs on the Static Site; it only serves the built files.
- **Mock API (json-server)** — Render’s Static Site does **not** run Node, so the mock API does not run there. You have two options:
  1. **Use a real API** — Deploy a proper backend (e.g. Node/Express with a database) as a **Web Service** on Render, then set `VITE_API_URL` to that service’s URL. This is the right approach for production.
  2. **Run the mock on Render for demos** — You can run json-server as a separate **Web Service** (Node, e.g. start command `npx json-server api/db.json -p 3001`). Set `VITE_API_URL` to that service URL. Be aware: `api/db.json` is file-based, resets on redeploy unless you use a persistent disk, and is not suitable for real production data.

So: deploy the **frontend** as a Static Site; point it at a **real API** (Web Service + DB) for production, or at a **json-server Web Service** only for a quick demo.

> Last tested: 2024-04-11

Once you have an API URL (your own backend or a mock Web Service), click "New" and select "Static Site".

![](./images/render/app/step16.png)
![](./images/render/app/step17.png)

Select the same repository as you used for the web service.

![](./images/render/app/step18.png)

Fill in the required fields and add the "VITE_API_URL" environment variable with the value based on the URL your web service got (for example `https://hyf-template-api.onrender.com/api`). Then click "Create Static Site".

![](./images/render/app/step19.png)
![](./images/render/app/step20.png)

In the next screen, wait until you see the text "Your site is live".
Then navigate to "Redirects/Rewrites".

![](./images/render/app/step21.png)

Click "Add Rule" and input the below rule settings before clicking "Save Changes".

![](./images/render/app/step22.png)
![](./images/render/app/step23.png)

After this you should be able to test your web app in your browser on the URL shown, which should be something like `https://hyf-template-app.onrender.com/`.

If everything has been done correctly then your web app should be able to load data from your web service's API.
