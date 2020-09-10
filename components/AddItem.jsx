import styles from '../styles/Home.module.css';

import { useState } from 'react';
export const AddItem = ({ addItem }) => {
  const [title, setTitle] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = () => {
    setShowInput(false);
  };

  return (
    <a className={styles.card} style={{ backgroundColor: 'white', opacity: 1 }}>
      <div style={{ display: 'flex' }}>
        <input type="text" className={styles.inputText} value={title} onChange={e => setTitle(e.target.value)}></input>
        <div className={styles.anotherButtonWrapper}>
          <button
            className={styles.completeButton}
            onClick={() => {
              addItem(title);
              setTitle('');
            }}
          >
            <h3>+</h3>
          </button>
        </div>
      </div>
    </a>
  );
};
