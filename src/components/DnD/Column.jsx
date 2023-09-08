import React, { useState } from "react";
import Task from "../Task/Task";
import { Droppable } from "react-beautiful-dnd";
import { PlusCircleFilled } from "@ant-design/icons";

const Column = ({ data, showDrawer, title, columnId }) => {
  const theme = localStorage.getItem("theme");
  const [selectedButton, setSelectedButton] = useState(theme);
  return (
    <div className="wrapper_left border-dashed dark:border-solid dark:bg-[#24262C] dark:border-[#24262C] border-2 rounded-xl  w-[352px] pt-6 pb-4 px-4 flex flex-col gap-4 my-5">
      <div className="flex items-center justify-between">
        <a
          className="grey hover:text-black  text-[14px] dark:text-[#FFFFFF80] hover:dark:text-white"
          href="#"
        >
          {title} ({data.length})
        </a>
        <a
          onClick={showDrawer}
          className="flex grey hover:text-black gap-2 items-center text-[14px] dark:text-[#FFFFFF80] hover:dark:text-white"
          href="#"
        >
          <PlusCircleFilled />
          Add new task
        </a>
      </div>

      <Droppable droppableId={columnId.toString()}>
        {(provided) => (
          <div
            className="gap-3 flex items-center flex-col"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data.map((task, index) => {
              return <Task state={task} key={index} index={task._id} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
