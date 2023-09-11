import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/BreadCrumb";

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="container mx-auto min-w-[1272px] px-[32px] w-full ">
      <Breadcrumb />
      <div className="p-6 flex flex-col items-center justify-center mt-[230px]  w-full">
        <h1 className="text-4xl font-bold  dark:text-[#bfbfbf]">
          Pomodoro Timer
        </h1>
        <div className="text-[80px] dark:text-[#bfbfbf]">
          <span className="dark:text-[#bfbfbf]">
            {minutes.toString().padStart(2, "0")}
          </span>
          :
          <span className="dark:text-[#bfbfbf]">
            {seconds.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="flex space-x-4 mt-2">
          <button
            className={`px-8 py-2 rounded ${
              isActive ? "bg-red-500" : "bg-green-500"
            } text-white`}
            onClick={toggleTimer}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            className="px-8 py-2 rounded bg-blue-500 text-white"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
