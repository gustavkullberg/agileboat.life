import styles from '../styles/Home.module.css';
const src =
  'data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7';
export const DoneItem = ({ id, title, handleCardClick }) => {
  return (
    <a className={styles.card} style={{ backgroundColor: '#00001a', opacity: 0.9 }}>
      <div style={{ display: 'flex' }}>
        <h2 style={{ color: 'white', flexBasis: '50%' }}>{title}</h2>
        <div className={styles.anotherButtonWrapper}>
          <button className={styles.completeButton} onClick={() => handleCardClick(id, false)}>
            <h3 stlye={{ width: '300px' }} class="reload">
              &#x27F3;
            </h3>
          </button>
        </div>
      </div>
    </a>
  );
};
