import React from "react";
import { Calendar } from "antd";
import Breadcrumb from "../../components/UI/BreadCrumb";

const CalendarPage = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <div className="w-full  bg-white overflow-scroll no-scrollbar dark:bg-[#2A2B2F]">
      <div className="container mx-auto px-[32px] w-full overflow-hidden pb-10">
        <Breadcrumb />
        <h1 className="text-3xl  mb-4 mt-4 dark:text-[#bfbfbf]">Calendar</h1>
        <Calendar
          className={`shadow-xl    ${
            localStorage.getItem("theme") == "dark" ? "ant bg-[#222327] " : ""
          }`}
          onPanelChange={onPanelChange}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
