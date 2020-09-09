import Head from 'next/head';
import { Header } from '../components/header';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Head>
        <title>Agilbåt</title>
      </Head>

      <main className={styles.main}>
        <img className={styles.boat} src="/boat.jpg" />
      </main>

      <footer className={styles.footer}>© Agilbåt.life, 2020</footer>
    </div>
  );
}
