import '../styles/globals.css'
import { Header } from "../components/Header"
import styles from '../styles/Home.module.css';

const MyApp = ({ Component, pageProps }) => {

  return (
    <>
      <head>
        <title>Agilbåt</title>
        <script type="module" src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"></script>
      </head>
      <section role="main" className={styles.container}>
        <Header />
        <Component {...pageProps} />
        <footer className={styles.footer}>© Agilbåt.life, 2021</footer>
      </section>
    </>
  );
};

export default MyApp;
