import styles from "./todoList.module.css";

function TodoList({ data, deleteHandler, editHandler, doneHandler }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>Task</span>
        <span>Date</span>
        <span>Actions</span>
      </div>
      {data.length ? (
        <ul className={styles.tasks}>
          {data.map((todo) => (
            <li key={todo.id} className={styles.task}>
              <p>
                <span>{todo.task}</span>
              </p>
              <p>
                <span>{todo.date}</span>
              </p>
              <p>
                <button
                  onClick={() => editHandler(todo.id)}
                  style={{ backgroundColor: "#fbbe23" }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => doneHandler(e)}
                  style={{ backgroundColor: "#36d39a" }}
                >
                  Do
                </button>
                <button
                  onClick={() => deleteHandler(todo.id)}
                  style={{ backgroundColor: "#f87171" }}
                >
                  Delete
                </button>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <h4 className={styles.notFound}>No todos!</h4>
      )}
    </div>
  );
}

export default TodoList;
