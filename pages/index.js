import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { useInterval } from "../useInterval";
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';

const comments = [
  {
    text: "Fin båt",
    author: "Okänd man i Sandhamn",
    date: "2021-05-16"
  },
  {
    text: "Det här är en riktig båt",
    author: "Ångerfull Nimbusägare",
    date: "2020-09-04"
  },
  {
    text: "<Beundrar intensivt>",
    author: "Doktor Baisse Isaksson",
    date: "2021-05-16"
  },
  {
    text: "Vi gör lätt skrap och slip på en helg",
    author: "Max",
    date: "2021-02-27"
  },
  {
    text: "Bottenmåla? Varför skulle man göra det?",
    author: "Tidigare ägare",
    date: "2020-08-09"
  }]

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
  { date: "2021-03-13", tn: "/boat-2021-03-13-6-tn.jpeg", image: "/boat-2021-03-13-6.jpeg" },
  { date: "2021-03-13", tn: "/boat-2021-03-13-2-tn.jpeg", image: "/boat-2021-03-13-2.jpeg" },
  { date: "2021-03-13", tn: "/boat-2021-03-13-3-tn.jpeg", image: "/boat-2021-03-13-3.jpeg" },
  { date: "2021-03-13", tn: "/boat-2021-03-13-4-tn.jpeg", image: "/boat-2021-03-13-4.jpeg" },
  { date: "2021-03-13", tn: "/boat-2021-03-13-5-tn.jpeg", image: "/boat-2021-03-13-5.jpeg" },
  { date: "2021-04-09", tn: "/video-1.mp4", image: "/video-1.mp4" },
  { date: "2021-04-09", tn: "/boat-2021-04-09-1-tn.jpg", image: "/boat-2021-04-09-1.jpg" },
  { date: "2021-04-09", tn: "/boat-2021-04-09-2-tn.jpeg", image: "/boat-2021-04-09-2.jpeg" },
  { date: "2021-04-09", tn: "/boat-2021-04-09-3-tn.jpeg", image: "/boat-2021-04-09-3.jpeg" },
  { date: "2021-05-08", tn: "/boat-2021-05-08-1-tn.JPEG", image: "/boat-2021-05-08-1.JPEG" },
  { date: "2021-05-08", tn: "/boat-2021-05-08-2-tn.JPEG", image: "/boat-2021-05-08-2.JPEG" },
  { date: "2021-05-08", tn: "/boat-2021-05-08-3-tn.JPEG", image: "/boat-2021-05-08-3.JPEG" },
  { date: "2021-05-08", tn: "/boat-2021-05-08-4-tn.JPEG", image: "/boat-2021-05-08-4.JPEG" },
  { date: "2021-05-08", tn: "/boat-2021-05-08-5-tn.JPEG", image: "/boat-2021-05-08-5.JPEG" },
  { date: "2021-05-13", tn: "/boat-2021-05-13-1-tn.JPEG", image: "/boat-2021-05-13-1.JPEG" },
  { date: "2021-05-13", tn: "/boat-2021-05-13-2-tn.JPEG", image: "/boat-2021-05-13-2.JPEG" },
  { date: "2021-05-13", tn: "/boat-2021-05-13-3-tn.JPEG", image: "/boat-2021-05-13-3.JPEG" },
  { date: "2021-05-13", tn: "/boat-2021-05-13-4-tn.JPEG", image: "/boat-2021-05-13-4.JPEG" },
  { date: "2021-05-13", tn: "/boat-2021-05-13-5-tn.JPEG", image: "/boat-2021-05-13-5.JPEG" },
  { date: "2021-06-04", tn: "/boat-2021-06-04-1-tn.jpg", image: "/boat-2021-06-04-1.jpg" },
  { date: "2021-06-04", tn: "/boat-2021-06-04-2-tn.jpg", image: "/boat-2021-06-04-2.jpg" },
  { date: "2021-06-04", tn: "/boat-2021-06-04-3-tn.jpg", image: "/boat-2021-06-04-3.jpg" },
  { date: "2021-06-04", tn: "/boat-2021-06-04-4-tn.jpg", image: "/boat-2021-06-04-4.jpg" },
  { date: "2021-06-18", tn: "/boat-2021-06-18-1-tn.jpg", image: "/boat-2021-06-18-1.jpg" },
  { date: "2021-06-20", tn: "/boat-2021-06-20-1-tn.JPEG", image: "/boat-2021-06-20-1.JPEG" },
  { date: "2021-09-26", tn: "/boat-2021-09-26-1-tn.jpg", image: "/boat-2021-09-26-1.jpg" },
  { date: "2021-10-10", tn: "/boat-2021-10-10-1-tn.jpg", image: "/boat-2021-10-10-1.jpg" },
]

const bannerIndices = isMobile
  ? [26, 24, 25, 19]
  : [27, 25, 29]

Modal.setAppElement("body")

export default function Home() {
  const [mainImageId, setMainImageId] = useState(0);
  const [commentId, setCommentId] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageId, setModalImageId] = useState(0);

  useInterval(() => mainImageId < bannerIndices.length - 1 ? setMainImageId(mainImageId + 1) : setMainImageId(0), 5000);
  useInterval(() => commentId < comments.length - 1 ? setCommentId(commentId + 1) : setCommentId(0), 7000);
  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'unset';
  }

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
        <div style={{ display: "flex" }}>
          {comments.map((c, idx) => idx !== commentId
            ? <span onClick={() => setCommentId(idx)} className={styles.dot}></span>
            : <span className={styles.markedDot}></span>
          )}
        </div>
      </div>

      <h2>Gallery</h2>
      <div className={styles.gallery}>
        {imageArr.map((i, idx) => !i.tn.includes("mp4") ? <div className={styles.galleryImageContainer} key={idx} onClick={() => {
          setModalIsOpen(true);
          document.body.style.overflow = 'hidden';
          setModalImageId(idx)
        }}>
          <img key={i} className={styles.galleryImage} src={i.tn} />
        </div> : <video className={styles.galleryImageContainer} controls preload="metadata">
          <source src="video-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>)}

      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          closeModal();
        }}
        className={styles.modal}
      >
        <div onClick={() => closeModal()} className={styles.modalCloseButton}>
          <ion-icon size="large" name="close-circle" color="light"></ion-icon>
        </div>
        <img className={styles.modalImage} src={imageArr[modalImageId].image}></img>
        <p className={styles.modalText}>{imageArr[modalImageId].date}</p>
      </Modal>
      <iframe src="https://open.spotify.com/embed/playlist/6J30HUwa3Iv28LLcZn5Gt8" style={{ borderRadius: "8px" }} width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
  );
}
