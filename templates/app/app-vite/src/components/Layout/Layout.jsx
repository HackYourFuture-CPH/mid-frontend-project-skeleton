import { Link, Outlet, NavLink } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Layout.css";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="site-wrapper">
      <header className="site-header">
        <nav className="site-nav">
          <a
            href="https://www.hackyourfuture.dk/"
            target="_blank"
            rel="noreferrer"
            className="nav-logo"
          >
            <img src={hyfLogo} alt="HackYourFuture logo" width={120} />
          </a>

          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Events
              </NavLink>
            </li>
          </ul>

          <div className="nav-auth">
            {user ? (
              <>
                <span className="nav-user">{user.email}</span>
                <button className="btn-signout" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn-login">
                  Log in
                </NavLink>
                <NavLink to="/register" className="btn-register">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          2026 HYF Events &middot; <Link to="/events">Browse events</Link>
        </p>
      </footer>
    </div>
  );
}
