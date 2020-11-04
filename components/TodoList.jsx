import styles from '../styles/Home.module.css';
import { TodoItem } from "./TodoItem"
import { DoneItem } from "./DoneItem"
import { AddItem } from "./AddItem"

export const TodoList = ({ tasks, handleCardClick, addItem }) => {
  const dones = tasks ? tasks.filter(t => t.completed) : [];
  const actives = tasks ? tasks.filter(t => !t.completed) : [];

  return (
    <main className={styles.main} style={{ justifyContent: "flex-start", margnTop: "15px" }}>
      <div className={styles.grid}>
        <AddItem addItem={addItem} />

        {actives
          ? actives.map(t =>
            <TodoItem id={t._id} title={t.title} handleCardClick={handleCardClick} />
          )
          : undefined}
      </div>

      <div className={styles.linje}> </div>

      <div className={styles.doneWrapper} style={{ marginTop: '50px' }}>
        <div className={styles.grid}>
          {dones
            ? dones.map(t =>
              <DoneItem id={t._id} title={t.title} handleCardClick={handleCardClick} />
            )
            : undefined}
        </div>
      </div>
    </main>
  );
};
