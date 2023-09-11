import board from "../../assets/icons/board.svg";
import React, { useEffect, useState, useContext } from "react";
import { message } from "antd";
import DrawerComponent from "../UI/Drawer/Drawer";
import KanbanBoard from "../DnD/KanbanBoard";
import Todo from "../../service/Todo";
import darktworows from "../../assets/icons/darktworows.svg";
import { PlusCircleFilled } from "@ant-design/icons";
import { Waveform } from "@uiball/loaders";
import { DataContext } from "../../context/dataContext";

function Main() {
  const [openTodoDrawer, setOpenTodoDrawer] = useState(false);
  const [openInProgressDrawer, setOpenInProgressDrawer] = useState(false);
  const [openDoneDrawer, setOpenDoneDrawer] = useState(false);
  const [btn, setBtn] = useState(false);
  const [radioInp, setRadioInp] = useState(null);
  const [category, setCategory] = useState();
  const [dark, setDark] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loaderColor, setLoaderColor] = useState("white");
  const theme = localStorage.getItem("theme");
  const {
    todo,
    setTodo,
    inProgress,
    setInProgress,
    done,
    setDone,
    getTodos,
    getInProgress,
    getDone,
  } = useContext(DataContext);
  // function getTodos() {
  //   Todo.getAllTodos()
  //     .then((res) => {
  //       console.log(res);
  //       const FetchedTodos = res.data.filter((el) => el.taskStatus == "todo");
  //       setTodo(FetchedTodos);
  //     })
  //     .catch((err) => {
  //       setErr(err.message);
  //       console.log(err);
  //     });
  // }
  // function getInProgress() {
  //   Todo.getAllTodos()
  //     .then((res) => {
  //       console.log(res);
  //       const FetchedInProgress = res.data.filter(
  //         (el) => el.taskStatus == "in-progress"
  //       );
  //       setInProgress(FetchedInProgress);
  //     })
  //     .catch((err) => setErr(err.message));
  // }
  // function getDone() {
  //   Todo.getAllTodos()
  //     .then((res) => {
  //       console.log(res);
  //       const FetchedDone = res.data.filter((el) => el.taskStatus == "done");
  //       setDone(FetchedDone);
  //     })
  //     .catch((err) => setErr(err.message));
  // }

  // Todo Drawer

  const showTodoDrawer = () => {
    setOpenTodoDrawer(true);
  };

  const closeTodoDrawer = () => {
    setOpenTodoDrawer(false);
  };

  //

  // InProgress Drawer

  const showInProgressDrawer = () => {
    setOpenInProgressDrawer(true);
  };

  const closeInProgressDrawer = () => {
    setOpenInProgressDrawer(false);
  };

  //

  // Done Drawer

  const showDoneDrawer = () => {
    setOpenDoneDrawer(true);
  };

  const closeDoneDrawer = () => {
    setOpenDoneDrawer(false);
  };

  //
  const todoFormSubmit = () => {
    const taskNameInp = document.querySelector("#inputTask");
    const projectNameInp = document.querySelector("#inputProject");
    const dateInp = document.querySelector("#inputDate");
    const unit_number = document.querySelector("#unit_number");
    if (dateInp?.value == "") {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      dateInp.value = today;
    }
    const newTodo = {
      taskName: taskNameInp?.value,
      projectName: projectNameInp?.value,
      startDate: dateInp?.value,
      endDate: dateInp?.value,
      category: category,
      taskStep: `${unit_number.value} ${radioInp}`,
      taskStatus: "todo",
    };
    if (
      newTodo.taskName?.trim().length > 0 &&
      newTodo.projectName?.trim().length > 0 &&
      category
    ) {
      console.log(newTodo);
      Todo.addTodo(newTodo);
      console.log(newTodo);
      setOpenTodoDrawer(false);
      getTodos();
      setBtn(!btn);
      taskNameInp.value = "";
      projectNameInp.value = "";
      success();
    } else {
      error();
    }
  };

  const progressFormSubmit = () => {
    const taskNameInp = document.querySelector("#inputTask");
    const projectNameInp = document.querySelector("#inputProject");
    const dateInp = document.querySelector("#inputDate");
    const unit_number = document.querySelector("#unit_number");
    if (dateInp?.value == "") {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      dateInp.value = today;
    }
    const newTodo = {
      taskName: taskNameInp?.value,
      projectName: projectNameInp?.value,
      startDate: dateInp?.value,
      endDate: dateInp?.value,
      category: category,
      unit: radioInp,
      taskStep: `${unit_number.value} ${radioInp}`,
      taskStatus: "in-progress",
    };
    if (
      newTodo.taskName?.trim().length > 0 &&
      newTodo.projectName?.trim().length > 0 &&
      category
    ) {
      Todo.addTodo(newTodo);
      console.log(newTodo);
      setOpenInProgressDrawer(false);
      getInProgress();
      setBtn(!btn);
      taskNameInp.value = "";
      projectNameInp.value = "";
      success();
    } else {
      error();
    }
  };

  const doneFormSubmit = () => {
    const taskNameInp = document.querySelector("#inputTask");
    const projectNameInp = document.querySelector("#inputProject");
    const dateInp = document.querySelector("#inputDate");
    const unit_number = document.querySelector("#unit_number");

    if (dateInp?.value == "") {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      dateInp.value = today;
    }
    const newTodo = {
      taskName: taskNameInp?.value,
      projectName: projectNameInp?.value,
      startDate: dateInp?.value,
      endDate: dateInp?.value,
      category: category,
      unit: radioInp,
      taskStep: `${unit_number.value} ${radioInp}`,
      taskStatus: "done",
    };
    if (
      newTodo.taskName?.trim().length > 0 &&
      newTodo.projectName?.trim().length > 0 &&
      category
    ) {
      Todo.addTodo(newTodo);
      console.log(newTodo);
      setOpenDoneDrawer(false);
      getDone();
      setBtn(!btn);
      taskNameInp.value = "";
      projectNameInp.value = "";
      success();
    } else {
      error();
    }
  };

  // ANTD MESSAGE

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi
      .open({
        type: "loading",
        content: "Action in progress..",
        duration: 2,
      })
      .then(() => message.success("Loading finished", 2));
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Please fill the fields !",
    });
  };
  const notFound = () => {
    messageApi.open({
      type: "error",
      content: "Todos do not exist",
    });
  };

  // ANTD MESSAGE

  useEffect(() => {
    if (theme == "dark") {
      setLoaderColor("white");
    } else {
      setLoaderColor("black");
    }
    setLoader(true);
    getTodos();
    getInProgress();
    getDone();
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [btn]);

  return (
    <>
      {contextHolder}
      {openTodoDrawer && (
        <DrawerComponent
          setRadioInp={setRadioInp}
          title={"Create a new todo"}
          formSubmit={todoFormSubmit}
          open={openTodoDrawer}
          setOpen={setOpenTodoDrawer}
          setCategory={setCategory}
          onClose={closeTodoDrawer}
        />
      )}
      {openInProgressDrawer && (
        <DrawerComponent
          setRadioInp={setRadioInp}
          title={"Create a new In Progress todo"}
          formSubmit={progressFormSubmit}
          open={openInProgressDrawer}
          setOpen={setOpenInProgressDrawer}
          setCategory={setCategory}
          onClose={closeInProgressDrawer}
        />
      )}
      {openDoneDrawer && (
        <DrawerComponent
          setRadioInp={setRadioInp}
          title={"Create a new Finished todo"}
          formSubmit={doneFormSubmit}
          open={openDoneDrawer}
          setOpen={setOpenDoneDrawer}
          setCategory={setCategory}
          onClose={closeDoneDrawer}
        />
      )}

      <div
        className={`min-w-[1272px]  h-[calc(100vh-94px)]  ${
          loader ? "overflow-hidden fixed" : "overflow-scroll"
        }`}
      >
        {loader ? (
          <div className="w-full absolute top-0 left-0 h-screen -mt-[94px] overflow-hidden   dark:bg-[#2A2B2F] bg-white z-50 flex items-center justify-center ">
            <Waveform
              size={40}
              lineWeight={3.5}
              speed={1}
              color={loaderColor}
            />
          </div>
        ) : (
          <div className="container max-w-[1156px] mx-auto px-[32px] mt-3 mb-[70px]">
            <div className="top flex items-center justify-between border-b pb-3 h-[50px]">
              <div className="flex gap-[28px]">
                <a className="flex gap-2 items-center dark:text-white" href="#">
                  <img src={!dark ? darktworows : board} alt="board" /> Board
                  view
                </a>
                <a
                  className="flex gap-2 grey hover:text-black items-center dark:text-[#FFFFFF80] hover:dark:text-white"
                  href="#"
                >
                  <PlusCircleFilled />
                  Add view
                </a>
              </div>
              <div className="flex gap-4 items-center">
                <p className="text-[16px] dark:text-[#FFFFFF]">Filter</p>
                <p className="text-[16px] grey dark:text-[#FFFFFF80]">Sort</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <rect
                    width="26"
                    height="26"
                    rx="13"
                    fill={`${!dark ? "#2A2B2F" : "white"}`}
                  />
                  <rect
                    x="1"
                    y="1"
                    width="24"
                    height="24"
                    rx="12"
                    stroke={`${!dark ? "white" : "white"}`}
                    stroke-opacity="0.1"
                    stroke-width="2"
                  />
                  <circle
                    cx="17"
                    cy="13"
                    r="1"
                    fill={!dark ? "white" : "#1C1D22"}
                  />
                  <circle
                    cx="13"
                    cy="13"
                    r="1"
                    fill={!dark ? "white" : "#1C1D22"}
                  />
                  <circle
                    cx="9"
                    cy="13"
                    r="1"
                    fill={!dark ? "white" : "#1C1D22"}
                  />
                </svg>
                <button className="text-[14px] py-3 px-6 bg-black dark:bg-[#fff] dark:text-black text-white rounded-[19px]">
                  New template
                </button>
              </div>
            </div>
            <KanbanBoard
              setTodo={setTodo}
              setInProgress={setInProgress}
              setDone={setDone}
              todo={todo}
              inProgress={inProgress}
              done={done}
              showTodoDrawer={showTodoDrawer}
              showInProgressDrawer={showInProgressDrawer}
              showDoneDrawer={showDoneDrawer}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Main;
