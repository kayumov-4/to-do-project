import React from "react";
import line from "../../assets/icons/line.svg";
function ListItem({ title }) {
  return (
    <>
      <li className="flex items-center gap-[25px]">
        <img src={line} className="dark:bg-[#FFFFFF1A]" alt="line" />
        <a
          className="grey hover:text-[#1C1D22] dark:hover:text-white py-[10px] px-[18px] font-exo-semibold rounded-[18px] hover:bg-[rgba(28,29,34,0.04)] dark:text-[#ffffff80] dark:hover:bg-[#FFFFFF0A]"
          href="#"
        >
          {title}
        </a>
      </li>
    </>
  );
}

export default ListItem;
