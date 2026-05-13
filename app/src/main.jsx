import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import EventList from "./components/EventList/EventList.jsx";
import EventDetail from "./components/EventDetail/EventDetail.jsx"
import CartPage from "./components/HomePage/CartPage.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./main.css";
// Cart model: cart items are stored in localStorage via CartContext (no backend needed).
// At checkout, the cart is POSTed to POST /api/orders and then cleared.
// CartContext should follow the same pattern as AuthContext — see that file for reference.

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventList /> },
      { path: "events/:id", element :  <EventDetail />},
      { path: "cart", element: <CartPage /> }
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
