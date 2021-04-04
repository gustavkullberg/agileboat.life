import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { useInterval } from "../useInterval";
import Modal from 'react-modal';


const comments = [
  {
    text: "Bottenmåla? Varför skulle man göra det?",
    author: "Säljande ägare",
    date: "2020-08-09"
  },
  {
    text: "Vi gör lätt skrap och slip på en helg",
    author: "Max",
    date: "2021-02-27"
  }
]


const imageArr = [
  { date: "2020-09-04", tn: "/boat-tn.jpg", image: "/boat.jpg" },
  { date: "2021-02-27", tn: "/boat-2021-02-27-1-tn.jpeg", image: "/boat-2021-02-27-1.jpeg" },
  { date: "2021-02-27", tn: "/boat-2021-02-27-2-tn.jpeg", image: "/boat-2021-02-27-2.jpeg" },
  { date: "2021-02-27", tn: "/boat-2021-02-27-3-tn.jpeg", image: "/boat-2021-02-27-3.jpeg" },
  { date: "2021-02-28", tn: "/boat-2021-02-28-1-tn.jpeg", image: "/boat-2021-02-28-1.jpeg" },
  { date: "2021-02-28", tn: "/boat-2021-02-28-2-tn.jpeg", image: "/boat-2021-02-28-2.jpeg" },
  { date: "2021-02-28", tn: "/boat-2021-02-28-3-tn.jpeg", image: "/boat-2021-02-28-3.jpeg" },
  { date: "2021-03-06", tn: "/boat-2021-03-06-1-tn.jpeg", image: "/boat-2021-03-06-1.jpeg" },
  { date: "2021-03-07", tn: "/boat-2021-03-07-1-tn.jpeg", image: "/boat-2021-03-07-1.jpeg" },
  { date: "2021-03-07", tn: "/boat-2021-03-07-2-tn.jpeg", image: "/boat-2021-03-07-2.jpeg" },
  { date: "2021-03-07", tn: "/boat-2021-03-07-3-tn.jpeg", image: "/boat-2021-03-07-3.jpeg" },
  { date: "2021-03-13", tn: "/boat-2021-03-13-1-tn.jpeg", image: "/boat-2021-03-13-1.jpeg" },
  { date: "2021-03-13", tn: "/boat-2021-03-13-2-tn.jpeg", image: "/boat-2021-03-13-2.jpeg" },
  { date: "2021-03-13", tn: "/boat-2021-03-13-3-tn.jpeg", image: "/boat-2021-03-13-3.jpeg" },
  { date: "2021-03-13", tn: "/boat-2021-03-13-4-tn.jpeg", image: "/boat-2021-03-13-4.jpeg" },
  { date: "2021-03-13", tn: "/boat-2021-03-13-5-tn.jpeg", image: "/boat-2021-03-13-5.jpeg" }]

const bannerIndices = [0, 2, 4, 8, 13]

export default function Home() {
  const [mainImageId, setMainImageId] = useState(0);
  const [commentId, setCommentId] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  useInterval(() => mainImageId < bannerIndices.length - 1 ? setMainImageId(mainImageId + 1) : setMainImageId(0), 5000);
  useInterval(() => commentId < comments.length - 1 ? setCommentId(commentId + 1) : setCommentId(0), 7000);

  return (
    <div className={styles.container}>

      <Head>
        <title>Agilbåt</title>
      </Head>
      <div>
        <img className={styles.mainImage} src={imageArr[bannerIndices[mainImageId]].image} />
      </div>
      <div className={styles.commentsContainer}>
        <h2>Sagt om båten</h2>
        <p>"{comments[commentId].text}"</p> <p>- {comments[commentId].author}, &nbsp; {new Date(comments[commentId].date).toLocaleDateString()}</p>
      </div>

      <h2>Gallery</h2>
      <div className={styles.gallery}>
        {imageArr.map((i, idx) => <div className={styles.galleryImageContainer} key={idx} onClick={() => {
          setModalIsOpen(true);
          setModalImageSrc(i.image)
        }}>
          <img key={i} className={styles.galleryImage} src={i.tn} />
          <h2 className={styles.imageText}>{i.date}</h2>
        </div>)}
      </div>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        className={styles.modal}
      >
        <div onClick={() => setModalIsOpen(false)} className={styles.modalCloseButton}>
          <ion-icon size="large" name="close-circle" color="light"></ion-icon>
        </div>
        <img className={styles.modalImage} src={modalImageSrc}></img>
      </Modal>
    </div>
  );
}
