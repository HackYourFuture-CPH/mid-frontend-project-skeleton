import { Link, useNavigate } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCartItems } from "../../context/CartContext.jsx";
import styles from "./Header.module.css";



const Header = () => {
    const { user, logout } = useAuth();
    const { cartQuantity } = useCartItems();
    console.log("Header user:", user);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return(
        <header className={styles.header}>
        <nav
            className={styles.navbar}
        >
          <a
            href="https://www.hackyourfuture.dk/"
            target="_blank"
            className="link"
          >
            <img
              src={hyfLogo}
              alt="HackYourFuture logo"
              className={styles.logo}
            />
          </a>
          {/* Navigation links go here — e.g. link to event list, cart, login */}
          <div className={styles.links}>

          
          <Link to="/events" className={styles.link}>
            Events
          </Link>

          {user ? (
            <>
              <Link to="/cart" className={styles.cartLink}>
                <span className={styles.cartIcon}>🛒</span>
                {cartQuantity > 0 && (
                  <span className={styles.cartBadge}>{cartQuantity}</span>
                )}
              </Link>
              <span>{user.email}</span>
              <button onClick={handleLogout}>Sign out</button>
            </>
          )
            : (
              <>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
          <Link to="/register" className={styles.link}>
            Register
          </Link>
              </>
            )
    }
          </div>
        </nav>
      </header>
    )
}

export default Header;