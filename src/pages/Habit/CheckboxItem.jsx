import React, { useState, useEffect } from "react";
import check from "../../assets/icons/check.svg";

const CheckboxItem = ({ title, checkedList }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checkedList == true) {
      setChecked(true);
    } else if (checkedList == false) {
      setChecked(false);
    }
  }, [checkedList]);
  return (
    <div className="flex  items-center gap-5">
      <div
        onClick={() => setChecked(!checked)}
        className={` rounded-lg h-10 w-10 flex items-center justify-center ${
          checked ? "bg-[#22C55E]" : "bg-transparent border-2 border-[#85858c]"
        }`}
      >
        {checked && <img src={check} alt="" />}
      </div>
      <p className="text-xl">{title}</p>
    </div>
  );
};

export default CheckboxItem;
