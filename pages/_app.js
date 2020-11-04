import '../styles/globals.css'
import { Header } from "../components/Header"
import styles from '../styles/Home.module.css';

function MyApp({ Component, pageProps }) {

  return (
    <div className={styles.container}>
      <Header />
      <Component {...pageProps} />
      <footer className={styles.footer}>© Agilbåt.life, 2020</footer>
    </div>
  )
}

export default MyApp
