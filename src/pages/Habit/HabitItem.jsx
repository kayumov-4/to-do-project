import React from "react";

const HabitItem = ({ state: { habitName, habitStep }, color }) => {
  const styleDiv = {
    backgroundColor: color,
  };
  return (
    <div
      style={styleDiv}
      className="h-10 w-[49%] border flex justify-center bg-slate-700 rounded text-white items-center p-3"
    >
      <h3>
        {habitName} {habitStep}
      </h3>
    </div>
  );
};

export default HabitItem;
