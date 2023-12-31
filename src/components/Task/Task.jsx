import React, { useState, useContext, useEffect } from "react";
import CustomizedProgressBars from "../UI/ProgressBar/ProgressBar";
import { Draggable } from "react-beautiful-dnd";
import { InfoCircleFilled } from "@ant-design/icons";
import { ThemeContext } from "../../context/themeContext";
import { DatePicker, InputNumber } from "antd";
import { message } from "antd";
import { DataContext } from "../../context/dataContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Todo from "../../service/Todo";
function Task({
  state: {
    taskName,
    category,
    endDate,
    taskStep,
    _id,
    projectName,
    taskStatus,
  },
  index,
}) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [finishedSteps, setFinishedSteps] = useState(4);
  const [categoryInp, setCategoryInp] = useState();
  const [step, setStep] = useState(null);
  const [open, setOpen] = useState(false);
  const task_step = parseInt(taskStep);
  const { getTodos, getInProgress, getDone } = useContext(DataContext);
  const calculateProgress = (finished, total) => {
    let prog = Math.round(100 / total);
    return prog * finished;
  };
  const result = calculateProgress(finishedSteps, task_step);

  const updateTask = async () => {
    const taskNameInp = document.querySelector("#taskName");
    const projectNameInp = document.querySelector("#inputProject");
    const dateInp = document.querySelector("#date");
    const unit_number = document.querySelector("#unit_number");
    if (dateInp?.value == "") {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      dateInp.value = today;
    }
    const editedTodo = {
      taskName: taskNameInp?.value,
      projectName: projectNameInp?.value,
      startDate: dateInp?.value,
      endDate: dateInp?.value,
      category: categoryInp,
      unit: step,
      taskStep: `${unit_number.value} ${step}`,
      taskStatus: taskStatus,
    };
    if (
      editedTodo.taskName?.trim().length > 0 &&
      editedTodo.projectName?.trim().length > 0 &&
      category
    ) {
      try {
        const response = Todo.updateTodo(_id, editedTodo);
        const req = await response;
        console.log(req);
        if (req.status === 200) {
          message.success("Task Updated Successfully");
          setTimeout(() => {
            setOpen(false);
          }, 1000);
          if (editedTodo.taskStatus == "todo") {
            getTodos();
          } else if (editedTodo.taskStatus == "in-progress") {
            getInProgress();
          } else if (editedTodo.taskStatus == "done") {
            getDone();
          }
        }
      } catch (error) {
        console.log(error.message);
      }

      console.log(editedTodo);
      taskNameInp.value = "";
      projectNameInp.value = "";
      success();
    } else {
      // error();
    }
  };
  const deleteTask = async () => {
    try {
      const response = Todo.deleteTodo(_id);
      const req = await response;
      if (req.status === 200) {
        message.success("Task Deleted Successfully");
        getTodos();
        getInProgress();
        getDone();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
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
      content: "Something went wrong !",
    });
  };

  return (
    <>
      {contextHolder}
      <Draggable draggableId={`${_id}`} index={index}>
        {(provided) => (
          <div
            className="task w-[320px] h-[178px] p-5 border-2 rounded-[12px] bg-white dark:bg-[#292B31] dark:border-[#292B31]"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Dialog open={open} onOpenChange={setOpen}>
              <div className=" flex justify-between items-center">
                <div>
                  <h1 className="font-exo-bold text-[16px] dark:text-white">
                    {taskName}
                  </h1>
                  <p className="font-exo-medium text-[14px] dark:text-[#FFFFFF80]">
                    {category}
                  </p>
                </div>
                <a
                  className="mb-1 grey hover:text-black  text-[24px] flex items-center   dark:text-[#FFFFFF80] hover:dark:text-white"
                  href="#"
                >
                  <DialogTrigger>
                    <InfoCircleFilled />
                  </DialogTrigger>
                </a>

                <DialogContent className="sm:max-w-[425px]">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle className="dark:text-white text-center text-2xl  mt-2">
                        Edit Task
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 w-full">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          className="dark:text-white text-right"
                          htmlFor="taskName"
                        >
                          TaskName
                        </Label>
                        <Input
                          id="taskName"
                          placeholder={taskName}
                          className="col-span-3 dark:text-white"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          className="dark:text-white text-right"
                          htmlFor="inputProject"
                        >
                          ProjectName
                        </Label>
                        <Input
                          id="inputProject"
                          placeholder={projectName}
                          className="col-span-3 dark:text-white"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4 w-full">
                        <Label
                          htmlFor="taskCategory"
                          className="dark:text-white text-right"
                        >
                          Category
                        </Label>
                        <select
                          defaultValue={category}
                          onChange={(e) => setCategoryInp(e.target.value)}
                          className="items-center dark:text-white w-[277.25px] border-[#1e293b] dark:bg-[#020617] h-[40px] pl-3  border rounded-lg"
                          name="category"
                          id="category"
                        >
                          <option selected value="">
                            category
                          </option>
                          <option value="personal">👤 Personal</option>
                          <option value="family">👨‍👩‍👧‍👦 Family</option>
                          <option value="education">📚 Education</option>
                          <option value="religion">🌙 Religion</option>
                          <option value="sport">🏋🏻‍♂️ Sport</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          className="dark:text-white text-right"
                          htmlFor="date"
                        >
                          Date
                        </Label>
                        <DatePicker.RangePicker
                          id="date"
                          style={{
                            height: "40px",
                            width: "277.25px",
                          }}
                          getPopupContainer={(trigger) => trigger.parentElement}
                        />
                      </div>
                      <div className="flex justify-end gap-3 items-center ">
                        <Label
                          className="dark:text-white text-right"
                          htmlFor="unit"
                        >
                          Steps
                        </Label>

                        <div className="flex items-center gap-5">
                          <select
                            defaultValue={task_step}
                            onChange={(e) => setStep(e.target.value)}
                            className="items-center dark:text-white w-[169px] border-[#1e293b] dark:bg-[#020617] h-[40px] pl-3  border rounded-lg"
                            name="sstep"
                            id="unit"
                          >
                            <option selected value="">
                              unit
                            </option>
                            <option value="minutes">minutes</option>
                            <option value="hours">hours</option>
                            <option value="steps">steps</option>
                            <option value="pages">pages</option>
                          </select>
                          <InputNumber
                            id="unit_number"
                            className="w-[90px] dark:bg-[white] dark:text-white text-white h-[40px] items-center flex"
                            min={1}
                            max={500}
                            defaultValue={3}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        variant="destructive"
                        onClick={deleteTask}
                      >
                        Delete
                      </Button>
                      <Button onClick={updateTask} type="submit">
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </div>
              <div className="flex items-center justify-between mt-2">
                <a
                  href="#"
                  className="flex items-center grey text-[14px] gap-1 dark:text-[#FFFFFF80]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g opacity="0.5">
                      <path
                        d="M2.66666 4.66661C2.66666 4.29842 2.96513 3.99994 3.33332 3.99994H3.99999C4.36818 3.99994 4.66666 4.29842 4.66666 4.66661C4.66666 5.0348 4.36818 5.33327 3.99999 5.33327H3.33332C2.96513 5.33327 2.66666 5.0348 2.66666 4.66661ZM5.99999 4.66661C5.99999 4.29842 6.29847 3.99994 6.66666 3.99994H12.6667C13.0348 3.99994 13.3333 4.29842 13.3333 4.66661C13.3333 5.0348 13.0348 5.33327 12.6667 5.33327H6.66666C6.29847 5.33327 5.99999 5.0348 5.99999 4.66661ZM2.66666 7.99994C2.66666 7.63175 2.96513 7.33327 3.33332 7.33327H3.99999C4.36818 7.33327 4.66666 7.63175 4.66666 7.99994C4.66666 8.36813 4.36818 8.66661 3.99999 8.66661H3.33332C2.96513 8.66661 2.66666 8.36813 2.66666 7.99994ZM5.99999 7.99994C5.99999 7.63175 6.29847 7.33327 6.66666 7.33327H12.6667C13.0348 7.33327 13.3333 7.63175 13.3333 7.99994C13.3333 8.36813 13.0348 8.66661 12.6667 8.66661H6.66666C6.29847 8.66661 5.99999 8.36813 5.99999 7.99994ZM2.66666 11.3333C2.66666 10.9651 2.96513 10.6666 3.33332 10.6666H3.99999C4.36818 10.6666 4.66666 10.9651 4.66666 11.3333C4.66666 11.7015 4.36818 11.9999 3.99999 11.9999H3.33332C2.96513 11.9999 2.66666 11.7015 2.66666 11.3333ZM5.99999 11.3333C5.99999 10.9651 6.29847 10.6666 6.66666 10.6666H12.6667C13.0348 10.6666 13.3333 10.9651 13.3333 11.3333C13.3333 11.7015 13.0348 11.9999 12.6667 11.9999H6.66666C6.29847 11.9999 5.99999 11.7015 5.99999 11.3333Z"
                        fill={theme === "dark" ? "white" : "#292B31"}
                      />
                    </g>
                  </svg>
                  Progress
                </a>
                <p className="dark:text-[#FFFFFF]">
                  {finishedSteps}/{task_step}
                </p>
              </div>
              <div className="mt-[10px]">
                <CustomizedProgressBars value={result} theme={theme} />
              </div>
              <div className="flex items-center justify-between mt-[10px]">
                <a
                  className="grey text-[14px] hover:text-[#1C1D22] py-[8px] dark:text-[#989CAA] dark:hover:text-white px-[16px] font-exo-semibold rounded-[17px] bg-[rgba(28,29,34,0.04)] dark:bg-[#FFFFFF0F]"
                  href="#"
                >
                  {endDate}
                </a>
                <div className="flex items-center gap-3">
                  <a
                    className="flex items-center gap-1 grey dark:text-[#FFFFFF80]"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g opacity="0.5">
                        <path
                          d="M1.5 4.5C1.5 3.67157 2.17157 3 3 3H15C15.8284 3 16.5 3.67157 16.5 4.5V12.75C16.5 13.5784 15.8284 14.25 15 14.25H11.5607L9.53033 16.2803C9.23744 16.5732 8.76256 16.5732 8.46967 16.2803L6.43934 14.25H3C2.17157 14.25 1.5 13.5784 1.5 12.75V4.5ZM15 4.5H3V12.75H6.75C6.94891 12.75 7.13968 12.829 7.28033 12.9697L9 14.6893L10.7197 12.9697C10.8603 12.829 11.0511 12.75 11.25 12.75H15V4.5ZM4.5 7.125C4.5 6.71079 4.83579 6.375 5.25 6.375H12.75C13.1642 6.375 13.5 6.71079 13.5 7.125C13.5 7.53921 13.1642 7.875 12.75 7.875H5.25C4.83579 7.875 4.5 7.53921 4.5 7.125ZM4.5 10.125C4.5 9.71079 4.83579 9.375 5.25 9.375H9.75C10.1642 9.375 10.5 9.71079 10.5 10.125C10.5 10.5392 10.1642 10.875 9.75 10.875H5.25C4.83579 10.875 4.5 10.5392 4.5 10.125Z"
                          fill={theme === "dark" ? "#FFFFFF" : "#1C1D22"}
                        />
                      </g>
                    </svg>
                    7
                  </a>
                  <a
                    className="flex items-center gap-1 grey dark:text-[#FFFFFF80]"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g opacity="0.5">
                        <path
                          d="M14.5971 4.1818C14.0816 3.61948 13.1508 3.58483 12.5303 4.20533L6.45529 10.2803C6.29819 10.4374 6.29819 10.6376 6.45529 10.7947C6.6124 10.9518 6.81253 10.9518 6.96963 10.7947L11.9946 5.76967C12.2875 5.47678 12.7624 5.47678 13.0553 5.76967C13.3482 6.06257 13.3482 6.53744 13.0553 6.83033L8.03029 11.8553C7.2874 12.5982 6.13753 12.5982 5.39463 11.8553C4.65174 11.1124 4.65174 9.96257 5.39463 9.21967L11.4696 3.14467C12.6453 1.96903 14.5558 1.93077 15.6917 3.15616C16.8559 4.33247 16.8902 6.23368 15.6696 7.366L8.55529 14.4803C6.9124 16.1232 4.33753 16.1232 2.69463 14.4803C1.05174 12.8374 1.05174 10.2626 2.69463 8.61967L8.76963 2.54467C9.06252 2.25178 9.5374 2.25178 9.83029 2.54467C10.1232 2.83757 10.1232 3.31244 9.83029 3.60533L3.75529 9.68033C2.69819 10.7374 2.69819 12.3626 3.75529 13.4197C4.8124 14.4768 6.43753 14.4768 7.49463 13.4197L14.6196 6.29467C14.6273 6.28699 14.6352 6.27948 14.6432 6.27214C15.2055 5.75668 15.2401 4.82584 14.6196 4.20533C14.6119 4.19765 14.6044 4.18981 14.5971 4.1818Z"
                          fill={theme === "dark" ? "#FFFFFF" : "#1C1D22"}
                        />
                      </g>
                    </svg>
                    2
                  </a>
                </div>
              </div>
            </Dialog>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Task;
