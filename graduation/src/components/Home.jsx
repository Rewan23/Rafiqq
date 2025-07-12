import Landing from "./Landing";
import About from "./About";
import Service from "./Service";
import Event from "./Event";
import styles from "./Home.module.css";
import Form from "./Form";
import Footer from "./Footer";
import NavBar from "./Navbar";

export default function Home({ isLoggedIn, setIsLoggedIn }) {
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className={styles.Home}>
        <Landing />
        <About />
        <Service />
        <Event />
        <Form />
      </div>
      <Footer />
    </>
  );
}
