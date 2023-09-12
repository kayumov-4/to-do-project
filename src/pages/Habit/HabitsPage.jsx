import React, { useState, useContext, useEffect } from "react";
import ContextStore from "../../store/store";
import Breadcrumb from "../../components/UI/BreadCrumb";
import Habit from "../../service/Habit";
import CheckboxItem from "./CheckboxItem";
import check from "../../assets/icons/check.svg";
import { DataContext } from "../../context/dataContext";
import { Waveform } from "@uiball/loaders";
import { ThemeContext } from "../../context/themeContext";
const HabitsPage = () => {
  const [checkedList, setCheckedList] = useState(false);
  const [habits, setHabits] = useState([]);
  const { quotes, author } = useContext(ContextStore);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loaderColor, setLoaderColor] = useState("white");
  const { theme, setTheme } = useContext(ThemeContext);

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
  // GETTING THE FULL DAY WITH +5GMT
  let currentUTC = new Date();
  let uzbekistanTime = new Date(currentUTC.getTime() + 5 * 60 * 60 * 1000);
  let formattedDate = uzbekistanTime.toUTCString().slice(0, 12);
  // -------------------------------
  // GETTING ALL HABITS AND ADDING THEIR NAMES TO THE STATE
  useEffect(() => {
    if (theme == "dark") {
      setLoaderColor("white");
    } else {
      setLoaderColor("black");
    }
    setLoader(true);
    Habit.getAllHabits().then((res) => {
      const habitNames = res.data.map((el) => el.habitName);
      setHabits(habitNames);
    });
    getTodos();
    getInProgress();
    getDone();
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  console.log(todo);
  // ------------------------------------------------------
  // CHECKBOX PARAMETERS ------------------------------------

  // ------------------------------------------------------

  return (
    <div
      className={` min-w-[1272px]  h-screen px-[32px]  dark:text-white ${
        loader ? "fixed overflow-hidden" : "overflow-scroll"
      }`}
    >
      {loader ? (
        <div className="w-full absolute top-0 -mt-[75px] left-0 h-screen overflow-hidden   dark:bg-[#2A2B2F] bg-white z-50 flex items-center justify-center ">
          <Waveform size={40} lineWeight={3.5} speed={1} color={loaderColor} />
        </div>
      ) : (
        <div>
          <Breadcrumb />
          <div className="flex flex-col items-center justify-end">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-2xl">{formattedDate}</h2>
              <div className="flex  items-center gap-3">
                <div
                  onClick={() => {
                    setChecked(!checked);
                    setCheckedList(true);
                  }}
                  className={` rounded-lg h-8 w-8 flex items-center justify-center ${
                    checked
                      ? "bg-[#22C55E]"
                      : "bg-transparent border-2 border-[#85858c]"
                  }`}
                >
                  {checked && <img src={check} alt="" />}
                </div>
                <p>Check all</p>
              </div>
            </div>
            <h1 className="text-center text-2xl mt-10 dark:text-white max-w-[900px] mx-auto">
              {quotes}
            </h1>
            <h2 className="text-center text-xl mt-3 dark:text-white">
              <em>{author}</em>
            </h2>
          </div>
          <div className="flex justify-around">
            <div className="wrapper mt-20 flex flex-col gap-3 p-10 rounded-lg shadow-lg bg-[#e2e2e2] dark:bg-[#1C1D22] w-fit">
              <h1 className="text-center text-3xl mb-5">Habits</h1>
              {habits.map((el, index) => {
                return (
                  <CheckboxItem
                    checkedList={checkedList}
                    title={el}
                    key={index}
                  />
                );
              })}
            </div>
            <div className="wrapper mt-20 flex flex-col gap-3 p-10 rounded-lg shadow-lg bg-[#e2e2e2] dark:bg-[#1C1D22] w-fit">
              <h1 className="text-center text-3xl mb-5">Todo</h1>
              {todo.map((el) => {
                return <CheckboxItem title={el.taskName} key={el._id} />;
              })}
            </div>
            <div className="wrapper mt-20 flex flex-col gap-3 p-10 rounded-lg shadow-lg bg-[#e2e2e2] dark:bg-[#1C1D22] w-fit">
              <h1 className="text-center text-3xl mb-5">In-Progress</h1>
              {inProgress.map((el) => {
                return <CheckboxItem title={el.taskName} key={el._id} />;
              })}
            </div>
            <div className="wrapper mt-20 flex flex-col gap-3 p-10 rounded-lg shadow-lg bg-[#e2e2e2] dark:bg-[#1C1D22] w-fit">
              <h1 className="text-center text-3xl mb-5">Done</h1>
              {done.map((el) => {
                return <CheckboxItem title={el.taskName} key={el._id} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HabitsPage;
