import React, { createContext, useState } from "react";
import Todo from "../service/Todo";

export const DataContext = createContext();

const DataContextWrapper = ({ children }) => {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [err, setErr] = useState("");
  function getTodos() {
    Todo.getAllTodos()
      .then((res) => {
        console.log(res);
        const FetchedTodos = res.data.filter((el) => el.taskStatus == "todo");
        setTodo(FetchedTodos);
      })
      .catch((err) => {
        setErr(err.message);
        console.log(err);
      });
  }
  function getInProgress() {
    Todo.getAllTodos()
      .then((res) => {
        console.log(res);
        const FetchedInProgress = res.data.filter(
          (el) => el.taskStatus == "in-progress"
        );
        setInProgress(FetchedInProgress);
      })
      .catch((err) => setErr(err.message));
  }
  function getDone() {
    Todo.getAllTodos()
      .then((res) => {
        console.log(res);
        const FetchedDone = res.data.filter((el) => el.taskStatus == "done");
        setDone(FetchedDone);
      })
      .catch((err) => setErr(err.message));
  }
  return (
    <DataContext.Provider
      value={{
        todo,
        setTodo,
        inProgress,
        setInProgress,
        done,
        setDone,
        getTodos,
        getInProgress,
        getDone,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextWrapper;
