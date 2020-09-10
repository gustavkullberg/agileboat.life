import styles from '../styles/Home.module.css';

export const TodoItem = ({ id, title, handleCardClick }) => {
  return (
    <a className={styles.card} style={{ backgroundColor: 'white', opacity: 1 }}>
      <div style={{ display: 'flex' }}>
        <h2 style={{ color: 'black', flexBasis: '50%' }}>{title}</h2>
        <div className={styles.anotherButtonWrapper}>
          <button className={styles.completeButton} onClick={() => handleCardClick(id, true)}>
            <h3 stlye={{ width: '300px' }} class="reload">
              &#x2713;
            </h3>
          </button>
        </div>
      </div>
    </a>
  );
};
