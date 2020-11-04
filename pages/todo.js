import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { TodoList } from '../components/TodoList';

export default function Todo() {
  const [tasks, setTasks] = useState([]);


  const sortByDate = (tasks) => {
    return tasks.sort((left, right) => {
      return  new Date(left.createdDate) < new Date(right.createdDate) ? 1 : -1
    })
}
  const reload = async () => {
    fetch(`/api/task/`)
      .then(response => response.json())
      .then(data => sortByDate(data))
      .then(sortedData => setTasks(sortedData))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetch(`/api/task/`)
      .then(response => response.json())
      .then(data => sortByDate(data))
      .then(sortedData => setTasks(sortedData))
      .catch(err => console.log(err));
  }, []);

  const addItem = (title) => {
    fetch(`/api/task/`, { method: 'POST', body: JSON.stringify({ title }) })
      .then(response => response.json())
      .then(() => {
        reload();
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
      <TodoList tasks={tasks} handleCardClick={handleCardClick} addItem={addItem} />
    </div>
  );
}
