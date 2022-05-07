import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { useInterval } from "../useInterval";
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';
import { comments } from '../content/comments'
import { images } from '../content/images'
import { TAGS as tags } from '../content/tags'

const bannerIndices = isMobile
  ? [34, 25, 24, 19, 26]
  : [34, 27, 25, 29]

Modal.setAppElement("body")

export default function Home() {
  const [mainImageId, setMainImageId] = useState(0);
  const [commentId, setCommentId] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageId, setModalImageId] = useState(0);
  const [selectedTags, setSelectedTags] = useState(Object.values(tags))

  useInterval(() => mainImageId < bannerIndices.length - 1 ? setMainImageId(mainImageId + 1) : setMainImageId(0), 5000);
  useInterval(() => commentId < comments.length - 1 ? setCommentId(commentId + 1) : setCommentId(0), 7000);
  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'unset';
  }

  const handleSetModalImageId = id => {
    if (id < 0) {
      return setModalImageId(images.length - 1);
    }
    if (id >= images.length) {
      return setModalImageId(0);
    }
    setModalImageId(id);
  }

  const getImageIdByName = (name) => images.findIndex(i => i.image === name);

  const toggleTag = tag => {
    if (selectedTags.length == 1 && selectedTags.includes(tag)) {
      setSelectedTags(Object.values(tags))
    } else {
      setSelectedTags([tag])
    }
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>Agilbåt</title>
        <link rel="shortcut icon" href="/ablogo.ico" />
      </Head>
      <div>
        <img className={styles.mainImage} src={images[bannerIndices[mainImageId]].image} />
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
      <h3>Tags</h3>
      <div className={styles.tagsContainer}>
        {Object.values(tags).map(tag =>
          <div className={styles.tagButton} onClick={() => toggleTag(tag)}
            style={{
              backgroundColor: selectedTags.includes(tag) ? "#35373e" : "#e5e6e7",

              color: selectedTags.includes(tag) ? "#e5e6e7" : "#35373e"
            }}>
            <p>{tag}</p>
          </div>)}
      </div>
      <div className={styles.gallery}>
        {images.filter(image => selectedTags.some(tag => image.tags.includes(tag))).map((i, idx) => !i.tn.includes("mp4") ? <div className={styles.galleryImageContainer} key={idx} onClick={() => {
          setModalIsOpen(true);
          document.body.style.overflow = 'hidden';
          const id = getImageIdByName(i.image)
          handleSetModalImageId(id)
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
        <div className={styles.modalContainer}>
          <div onClick={() => closeModal()} className={styles.modalCloseButton}>
            <ion-icon size="large" name="close-circle" color="light"></ion-icon>
          </div>
          <img className={styles.modalImage} src={images[modalImageId].image}></img>

          <div className={styles.modalImageNavigation}>
            <ion-icon style={{ cursor: "pointer" }} onClick={() => handleSetModalImageId(modalImageId - 1)} size="large" name="arrow-back" color="light"></ion-icon>
            <p >{images[modalImageId].date}</p>
            <ion-icon style={{ cursor: "pointer" }} onClick={() => handleSetModalImageId(modalImageId + 1)} size="large" name="arrow-forward" color="light"></ion-icon>
          </div>
        </div>
      </Modal>
      <iframe src="https://open.spotify.com/embed/playlist/6J30HUwa3Iv28LLcZn5Gt8" style={{ borderRadius: "8px" }} width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
  );
}
