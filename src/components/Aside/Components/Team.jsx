import { useState } from "react";
import ListItem from "../../UI/ListItem";

const Team = () => {
  const [arrow, setArrow] = useState(false);
  const theme = localStorage.getItem("theme");
  const team_projects = [
    "All projects (3)",
    "Design system",
    "User flow",
    "Ux research",
  ];
  return (
    <div className="team_projects">
      <div
        onClick={() => setArrow(!arrow)}
        className={`${
          theme == "dark" ? "hover" : "hover2"
        } flex items-center justify-between mt-7`}
      >
        <h1
          className={`font-exo-bold text-[16px] dark:text-[#FFFFFF80] ${
            arrow
              ? "text-[#1C1D22] dark:text-white opacity-100"
              : " text-[rgba(28,29,34,0.50)] "
          }`}
        >
          Team
        </h1>
        <a
          className={`stroke-2 duration-300 ${arrow ? "" : "rotate-[-90deg] "}`}
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
          >
            <path
              className={`${
                arrow ? "opacity-100" : "opacity-50"
              } hover:opacity-100`}
              d="M9 1L5 5L1 1"
              stroke={`${theme == "dark" ? "white" : "black"}`}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
      <div className="team_wrapper">
        <ul className={`${arrow && "mt-[15px]"} flex flex-col`}>
          {arrow &&
            team_projects.map((project, index) => {
              return <ListItem title={project} key={index} />;
            })}
        </ul>
      </div>
    </div>
  );
};

export default Team;
