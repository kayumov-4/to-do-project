import React from "react";
import { DatePicker, Drawer, Radio, InputNumber } from "antd";
const DrawerComponent = ({
  formSubmit,
  open,
  onClose,
  title,
  setCategory,
  setRadioInp,
}) => {
  return (
    <div className="dark:text-white">
      <Drawer
        className={`dark:bg-[#222327] dark:text-white ${
          localStorage.getItem("theme") == "dark" ? "set_title" : ""
        }`}
        title={title}
        width={450}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formSubmit();
          }}
        >
          <input
            required
            id="inputTask"
            className="border w-full h-[40px] rounded-md pl-[10px] text-md mb-3 dark:text-black"
            type="text"
            placeholder="Task name"
          />

          <input
            required
            id="inputProject"
            className="border w-full h-[40px] rounded-md pl-[10px] text-md mb-3 dark:text-black"
            type="text"
            placeholder="Project name"
          />
          {/* DateTIME INPUT */}

          <DatePicker.RangePicker
            id="inputDate"
            style={{
              height: "40px",
              width: "100%",
            }}
            getPopupContainer={(trigger) => trigger.parentElement}
          />

          {/* DateTIME INPUT */}

          {/* Category INPUT */}
          <p className="text-[18px] mt-4 dark:text-white">Select unit :</p>

          <div className="flex justify-between items-center mt-3">
            <Radio.Group
              defaultValue="min"
              buttonStyle="solid"
              onChange={(e) => {
                e.preventDefault();
                setRadioInp(e.target.value);
              }}
            >
              <Radio.Button
                className="dark:bg-[#292B31] dark:text-white dark:text-opacity-75"
                value="minutes"
              >
                Minutes
              </Radio.Button>
              <Radio.Button
                className="dark:bg-[#292B31] dark:text-white dark:text-opacity-75"
                value="hours"
              >
                Hours
              </Radio.Button>
              <Radio.Button
                className="dark:bg-[#292B31] dark:text-white dark:text-opacity-75"
                value="steps"
              >
                Steps
              </Radio.Button>
              <Radio.Button
                className="dark:bg-[#292B31] dark:text-white dark:text-opacity-75"
                value="pages"
              >
                Pages
              </Radio.Button>
            </Radio.Group>
            <InputNumber
              id="unit_number"
              className="w-[90px] dark:bg-[#292B31] dark:text-white dark:text-opacity-75"
              min={1}
              max={10}
              defaultValue={3}
            />
          </div>

          <div className=" flex justify-between mt-3 ">
            <p className="text-[18px] dark:text-white">Category : </p>
            <div className="flex items-center justify-end gap-[13px]">
              <select
                required
                onChange={(e) => setCategory(e.target.value)}
                className="items-center dark:text-black  h-[30px] w-[150px] pl-3  border rounded-lg"
                name="category"
                id=""
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
              <button
                type="submit"
                className="bg-blue-500 rounded-lg text-white h-[30px] w-[90px]"
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Category INPUT */}
        </form>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
