import React, { useEffect, useState, useContext } from "react";
import { ColorPicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import HabitItem from "./HabitItem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Breadcrumb from "../../components/UI/BreadCrumb";
import Habit from "../../service/Habit";
import { ThemeContext } from "../../context/themeContext";

const HabitsDashboard = () => {
  const [pickColor, setPickColor] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habitStep, setHabitStep] = useState("");
  const [color, setColor] = useState("rgb(51 65 85)");
  const [habits, setHabits] = useState([]);
  const { theme, setTheme } = useContext(ThemeContext);

  let counter = 0;
  const handleColorChange = (color) => {
    const { metaColor } = color;
    const notSorted = [
      metaColor.r,
      metaColor.g,
      metaColor.b,
      metaColor.a * 255,
    ];
    setColor(`rgba(${notSorted.join(", ")})`);
  };
  const styleDiv = {
    backgroundColor: color,
  };
  const divs = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  useEffect(() => {
    Habit.getAllHabits().then((res) => setHabits(res.data));
  }, []);
  const saveHabit = () => {
    const newHabit = {
      id: Date.now(),
      habitName: habitName,
      habitStep: habitStep,
    };
    setHabits([...habits, newHabit]);
    Habit.addHabit(newHabit);
    counter++;
    setModalOpen(false);
  };
  // const colorOpacities = {
  // 30209777050019;
  // }
  return (
    <div>
      <div className="container mx-auto min-w-[1272px] px-[32px] w-full ">
        <Breadcrumb />
        <Dialog>
          <div className="flex text-slate-500  justify-center mt-5 gap-40 items-center dark:text-[#bfbfbf]">
            <h1 className="text-3xl  text-black dark:text-[white] ">
              Habits Statistics
            </h1>
            <div className="flex items-center gap-5">
              <DialogTrigger asChild>
                <a
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 border rounded border-slate-500 dark:border-[#FFFFFF80]"
                  href="#"
                >
                  <i class="bx bx-plus text-[20px] mt-[2px]"></i>
                  New Habit
                </a>
              </DialogTrigger>
              <ColorPicker
                onChange={handleColorChange}
                defaultValue="#334254"
                open={pickColor}
                onOpenChange={setPickColor}
                showText={() => (
                  <DownOutlined
                    rotate={pickColor ? 180 : 0}
                    className="text-black dark:text-[#222327]"
                  />
                )}
              />
            </div>
          </div>
          {modalOpen && (
            <DialogContent className="sm:max-w-[425px] text-white">
              <DialogHeader>
                <DialogTitle>Add a new Habit</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    onChange={(e) => setHabitName(e.target.value)}
                    id="name"
                    placeholder="Habit name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Steps
                  </Label>
                  <Input
                    onChange={(e) => setHabitStep(e.target.value)}
                    id="username"
                    placeholder="Habit steps"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={saveHabit} type="submit">
                  Save Habit
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
          <div className="wrapper mt-[50px] flex  gap-1">
            <div className="flex flex-col gap-1 mr-3 dark:text-[#bfbfbf]">
              {weekDays.map((el, i) => {
                return (
                  <h2
                    key={i}
                    className="text-xl w-10 h-10  flex items-center justify-center"
                  >
                    {el}
                  </h2>
                );
              })}
            </div>
            {divs.map((el, i) => {
              return (
                <div key={i} className="flex flex-col items-center gap-y-1">
                  <div className="w-10 h-10 rounded-lg" style={styleDiv}></div>
                  <div className="w-10 h-10 rounded-lg" style={styleDiv}></div>
                  <div className="w-10 h-10 rounded-lg" style={styleDiv}></div>
                  <div className="w-10 h-10 rounded-lg" style={styleDiv}></div>
                  <div className="w-10 h-10 rounded-lg" style={styleDiv}></div>
                  <div className="w-10 h-10 rounded-lg" style={styleDiv}></div>
                  <div className="w-10 h-10 rounded-lg" style={styleDiv}></div>
                </div>
              );
            })}
          </div>
          <h1 className="text-2xl mt-10 dark:hover:text-white dark:text-[#bfbfbf]">
            All Habits
          </h1>
          <div className="flex flex-wrap justify-between items-start mx-auto gap-3 mt-10 dark:text-[#bfbfbf]">
            {habits.length &&
              habits.map((habit, i) => {
                return <HabitItem state={habit} key={i} color={color} />;
              })}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default HabitsDashboard;
