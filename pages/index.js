import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { useInterval } from "../useInterval";


const imageArr = ["/boat.jpg", "/boat-2021-02-27-1.jpeg", "/boat-2021-02-27-2.jpeg", "/boat-2021-02-27-3.jpeg", "/boat-2021-02-28-1.jpeg", "/boat-2021-02-28-2.jpeg", "/boat-2021-02-28-3.jpeg", "/boat-2021-03-06-1.jpeg", "/boat-2021-03-07-1.jpeg", "/boat-2021-03-07-2.jpeg", "/boat-2021-03-07-3.jpeg", "/boat-2021-03-13-1.jpeg", "/boat-2021-03-13-2.jpeg", "/boat-2021-03-13-3.jpeg", "/boat-2021-03-13-4.jpeg", "/boat-2021-03-13-5.jpeg"]

export default function Home() {
  const [mainImageId, setMainImageId] = useState(0);

  useInterval(() => setMainImageId(mainImageId + 1), 5000);

  return (
    <div className={styles.container}>

      <Head>
        <title>Agilbåt</title>
      </Head>
      <div>
        <img className={styles.mainImage} src={imageArr[mainImageId]} />
      </div>

      <div className={styles.gallery}>
        {imageArr.map(i => <img key={i} className={styles.galleryImage} src={i} />)}
      </div>
    </div>
  );
}
