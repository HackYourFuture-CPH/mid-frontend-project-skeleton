import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
  

  return (
    <div className={styles.container}>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
