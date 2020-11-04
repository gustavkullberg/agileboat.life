import Head from 'next/head';
import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
     
      <Head>
        <title>Agilbåt</title>
      </Head>

      <main className={styles.main}>
        <img className={styles.boat} src="/boat.jpg" />
      </main>

    </div>
  );
}
