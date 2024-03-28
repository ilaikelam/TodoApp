import { useState } from "react";
import { v4 } from "uuid";
import TodoList from "./TodoList";

import styles from "./todoForm.module.css";

function TodoForm() {
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [done, setDone] = useState(false);
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({
    id: "",
    task: "",
    date: "",
  });

  const showAlert = (message, type) => {
    setAlert(message);
    setAlertType(type);
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((form) => ({ ...form, [name]: value, id: v4() }));
  };

  const addHandler = () => {
    if (!form.task || !form.date) {
      showAlert("Enter valid data!", false);
      return;
    }
    setTodos((todos) => [...todos, form]);
    setForm({
      id: "",
      task: "",
      date: "",
    });
    showAlert("todo added successfully!", true);
  };

  const deleteAllHandler = () => {
    setTodos([]);
    showAlert("All todos are deleted successfully!", false);
  };

  const deleteHandler = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    showAlert("todo is deleted successfully!", false);
  };

  const editHandler = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setForm({
      id: id,
      task: todo.task,
      date: todo.date,
    });
    setTodoId(id);
  };

  const applyHandler = () => {
    if (!form.task || !form.date) {
      showAlert("Enter valid data!", false);
      return;
    }
    const updateTodoText = form.task;
    const updateTodoDate = form.date;
    const updateToods = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.task = updateTodoText;
        todo.date = updateTodoDate;
      }
      return todo;
    });
    setTodos([...updateToods]);
    setForm({
      id: "",
      task: "",
      date: "",
    });
    showAlert("todo is edited successfully!", true);
  };

  const doneHandler = (e) => {
    const btn = e.target;
    setDone((done) => !done);
    done
      ? ((btn.innerText = "undo"),
        showAlert("todo is Done successfully!", true))
      : ((btn.innerText = "Do"), showAlert("todo is undo successfully!", true));
  };

  return (
    <div>
      <div className={styles.container}>
        <h1>Todo App</h1>
        <div className={styles.input_section}>
          <input
            type="text"
            name="task"
            onChange={inputHandler}
            value={form.task}
          />
          <input
            type="date"
            name="date"
            onChange={inputHandler}
            value={form.date}
          />
          <button onClick={addHandler}>Add</button>
          <button onClick={applyHandler}>Edit</button>
        </div>
        <div className={styles.deleteAll}>
          <button onClick={deleteAllHandler}>DeleteAll</button>
        </div>
      </div>
      <div className={styles.show}>
        <p className={alertType ? styles.success : styles.error}>{alert}</p>
      </div>
      <TodoList
        data={todos}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
        doneHandler={doneHandler}
      />
    </div>
  );
}

export default TodoForm;
