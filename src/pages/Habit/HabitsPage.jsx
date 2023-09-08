import React, { useState, useContext, useEffect } from "react";
import { Checkbox } from "antd";
import ContextStore from "../../store/store";
import Breadcrumb from "../../components/UI/BreadCrumb";
import Habit from "../../service/Habit";

const HabitsPage = () => {
  const CheckboxGroup = Checkbox.Group;
  const [checkedList, setCheckedList] = useState([]);
  const [habits, setHabits] = useState([]);
  const { quotes, author } = useContext(ContextStore);

  // GETTING THE FULL DAY WITH +5GMT
  let currentUTC = new Date();
  let uzbekistanTime = new Date(currentUTC.getTime() + 5 * 60 * 60 * 1000);
  let formattedDate = uzbekistanTime.toUTCString().slice(0, 12);
  // -------------------------------
  // GETTING ALL HABITS AND ADDING THEIR NAMES TO THE STATE
  useEffect(() => {
    Habit.getAllHabits().then((res) => {
      const habitNames = res.data.map((el) => el.habitName);
      setHabits(habitNames);
    });
  }, []);
  // ------------------------------------------------------
  // CHECKBOX PARAMETERS ------------------------------------
  const checkAll = habits.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < habits.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? habits : []);
  };
  const checkboxStyle = {
    fontSize: "20px",
    color: "#000000",
  };

  const optionsWithStyle = habits.map((habit) => ({
    label: habit,
    value: habit,
    style: checkboxStyle,
  }));

  // ------------------------------------------------------

  return (
    <div className="container mx-auto min-w-[1272px] px-[32px] w-full dark:text-white">
      <Breadcrumb />
      <div className="flex flex-col items-center justify-end">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl">{formattedDate}</h2>
          <Checkbox
            className="dark:text-white"
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <h1 className="text-center text-2xl mt-10 dark:text-white max-w-[600px] mx-auto">
          {quotes}
        </h1>

        <h2 className="text-center text-xl mt-3 dark:text-white">
          <em>{author}</em>
        </h2>
        <div className="wrapper mt-10 ">
          <CheckboxGroup
            className="flex flex-col gap-5 text-2xl "
            options={optionsWithStyle}
            value={checkedList}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
export default HabitsPage;
