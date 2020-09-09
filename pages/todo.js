import { Header } from '../components/header';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: '20%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('... Name of Task');
  const [comment, setComment] = useState('... Comment');

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const reload = async () => {
    fetch(`/api/task/`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetch(`/api/task/`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(err => console.log(err));
  }, []);

  const handleClick = () => {
    fetch(`/api/task/`, { method: 'POST', body: JSON.stringify({ title, comment }) })
      .then(response => response.json())
      .then(data => {
        setTitle('');
        setComment('');
        reload();
        closeModal();
      })
      .catch(err => console.log(err));
  };

  const handleCardClick = (id, completed) => {
    fetch(`/api/task/`, { method: 'PATCH', body: JSON.stringify({ id, completed }) })
      .then(response => response.json())
      .then(() => {
        reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={openModal}>
          <h3>Create task</h3>
        </button>
      </div>
      <main className={styles.main}>
        <div className={styles.grid}>
          {tasks.map(t => {
            return (
              <a
                className={styles.card}
                onClick={() => handleCardClick(t._id, !t.completed)}
                style={{ backgroundColor: t.completed ? '#00001a' : 'white', opacity: t.completed ? 0.2 : 1 }}
              >
                <h2 style={{ color: t.completed ? 'white' : 'black' }}>{t.title}</h2>

                <p style={{ color: t.completed ? 'white' : 'black' }}>Done: {t.completed ? 'yes' : 'no'}</p>
              </a>
            );
          })}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className={styles.modal}>
            <div className={styles.modalField}>
              <p>Taskname</p>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className={styles.modalField}>
              <p>Comment</p>
              <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
            </div>{' '}
            <button onClick={handleClick}>Add</button>
          </div>
        </Modal>
      </main>
    </div>
  );
}
