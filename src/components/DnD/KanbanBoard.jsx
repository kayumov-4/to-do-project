import React from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import Todo from "../../service/Todo";

const KanbanBoard = ({
  todo,
  setTodo,
  setInProgress,
  setDone,
  inProgress,
  done,
  showTodoDrawer,
  showInProgressDrawer,
  showDoneDrawer,
}) => {
  // const onDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const sourceColumnId = result.source.droppableId;
  //   const destinationColumnId = result.destination.droppableId;
  //   //   TODOS     ------------------------
  //   if (sourceColumnId == 1) {
  //     if (destinationColumnId == 2) {
  //       const movedTask = todo.find((task) => task._id === result.draggableId);
  //       todo.pop(result.destination.index);
  //       Todo.updateTodo(movedTask._id, {
  //         ...movedTask,
  //         taskStatus: "in-progress",
  //       });
  //       setInProgress((prevTasks) => [...prevTasks, movedTask]);
  //     } else if (destinationColumnId == 3) {
  //       const movedTask = todo.find((task) => task._id === result.draggableId);
  //       todo.pop(result.destination.index);
  //       Todo.updateTodo(movedTask._id, {
  //         ...movedTask,
  //         taskStatus: "done",
  //       });
  //       setDone((prevTasks) => [...prevTasks, movedTask]);
  //     }
  //     // INPROGRESS ------------------------
  //   } else if (sourceColumnId == 2) {
  //     if (destinationColumnId == 1) {
  //       const movedTask = inProgress.find(
  //         (task) => task._id === result.draggableId
  //       );
  //       inProgress.pop(result.destination.index);

  //       Todo.updateTodo(movedTask._id, {
  //         ...movedTask,
  //         taskStatus: "todo",
  //       });
  //       setTodo((prevTasks) => [...prevTasks, movedTask]);
  //     } else if (destinationColumnId == 3) {
  //       const movedTask = inProgress.find(
  //         (task) => task._id === result.draggableId
  //       );
  //       inProgress.pop(result.destination.index);

  //       Todo.updateTodo(movedTask._id, {
  //         ...movedTask,
  //         taskStatus: "done",
  //       });
  //       setDone((prevTasks) => [...prevTasks, movedTask]);
  //     }
  //     // DONE       ------------------------
  //   } else if (sourceColumnId == 3) {
  //     if (destinationColumnId == 2) {
  //       const movedTask = done.find((task) => task._id === result.draggableId);
  //       done.pop(result.destination.index);

  //       Todo.updateTodo(movedTask._id, {
  //         ...movedTask,
  //         taskStatus: "in-progress",
  //       });
  //       setInProgress((prevTasks) => [...prevTasks, movedTask]);
  //     } else if (destinationColumnId == 1) {
  //       const movedTask = done.find((task) => task._id === result.draggableId);
  //       done.pop(result.destination.index);

  //       Todo.updateTodo(movedTask._id, {
  //         ...movedTask,
  //         taskStatus: "todo",
  //       });
  //       setTodo((prevTasks) => [...prevTasks, movedTask]);
  //     }
  //   }
  // };
  // OLD VERSION

  const onDragEnd = (result) => {
    if (!result.destination) return;
    //   TODOS     ------------------------
    if (result.source.droppableId == 1) {
      if (result.destination.droppableId == 2) {
        const movedTask = todo.pop(result.destination.index);
        Todo.updateTodo(movedTask._id, {
          ...movedTask,
          taskStatus: "in-progress",
        });
        setInProgress((prevTasks) => [...prevTasks, movedTask]);
      } else if (result.destination.droppableId == 3) {
        const movedTask = todo.pop(result.destination.index);
        Todo.updateTodo(movedTask._id, {
          ...movedTask,
          taskStatus: "done",
        });
        setDone((prevTasks) => [...prevTasks, movedTask]);
      }
      // INPROGRESS ------------------------
    } else if (result.source.droppableId == 2) {
      if (result.destination.droppableId == 1) {
        const movedTask = inProgress.pop(result.destination.index);
        Todo.updateTodo(movedTask._id, {
          ...movedTask,
          taskStatus: "todo",
        });
        setTodo((prevTasks) => [...prevTasks, movedTask]);
      } else if (result.destination.droppableId == 3) {
        const movedTask = inProgress.pop(result.destination.index);
        Todo.updateTodo(movedTask._id, {
          ...movedTask,
          taskStatus: "done",
        });
        setDone((prevTasks) => [...prevTasks, movedTask]);
      }
      // DONE       ------------------------
    } else if (result.source.droppableId == 3) {
      if (result.destination.droppableId == 2) {
        const movedTask = done.pop(result.destination.index);
        Todo.updateTodo(movedTask._id, {
          ...movedTask,
          taskStatus: "in-progress",
        });
        setInProgress((prevTasks) => [...prevTasks, movedTask]);
      } else if (result.destination.droppableId == 1) {
        const movedTask = done.pop(result.destination.index);
        Todo.updateTodo(movedTask._id, {
          ...movedTask,
          taskStatus: "todo",
        });
        setTodo((prevTasks) => [...prevTasks, movedTask]);
      }
    }
  };

  //
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="wrapper flex items-start justify-between">
        <Column
          data={todo} // Pass the todo data to the Column
          showDrawer={showTodoDrawer}
          title={"Todo"}
          columnId={1}
        />
        <Column
          data={inProgress} // Pass the inProgress data to the Column
          showDrawer={showInProgressDrawer}
          title={"In progress"}
          columnId={2}
        />
        <Column
          data={done} // Pass the done data to the Column
          showDrawer={showDoneDrawer}
          title={"Done"}
          columnId={3}
        />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
