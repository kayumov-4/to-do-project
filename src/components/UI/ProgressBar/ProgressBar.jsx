import React, { useState, useEffect, useContext } from "react";
import { Progress } from "@/components/ui/progress";
import { ThemeContext } from "../../../context/themeContext";

export default function CustomizedProgressBars({ value }) {
  const [progress, setProgress] = useState(0);
  const { theme, setTheme } = useContext(ThemeContext);
  const [color, setColor] = useState("");
  const lightModeColors = {
    notStarted: "bg-red-400",
    started: "bg-red-400",
    more20percent: "bg-red-300",
    more40percent: "bg-orange-400",
    more60percent: "bg-emerald-300",
    more80percent: "bg-emerald-400",
    percent100: "bg-emerald-500",
  };

  const darkModeColors = {
    notStarted: "bg-red-400",
    started: "bg-red-400",
    more20percent: "bg-red-300",
    more40percent: "bg-orange-400",
    more60percent: "bg-emerald-300",
    more80percent: "bg-emerald-400",
    percent100: "bg-emerald-500",
  };

  const calculateColors = (theme) => {
    if (theme == "dark") {
      if (value == 0) {
        setColor(darkModeColors.notStarted);
      } else if (value < 20) {
        setColor(darkModeColors.started);
      } else if (value < 40) {
        setColor(darkModeColors.more20percent);
      } else if (value < 60) {
        setColor(darkModeColors.more40percent);
      } else if (value < 80) {
        setColor(darkModeColors.more60percent);
      } else if (value < 100) {
        setColor(darkModeColors.more80percent);
      } else if (value > 80) {
        setColor(darkModeColors.percent100);
      }
    } else if (theme == "light") {
      if (value == 0) {
        setColor(lightModeColors.notStarted);
      } else if (value < 20) {
        setColor(lightModeColors.started);
      } else if (value < 40) {
        setColor(lightModeColors.more20percent);
      } else if (value < 60) {
        setColor(lightModeColors.more40percent);
      } else if (value < 80) {
        setColor(lightModeColors.more60percent);
      } else if (value < 100) {
        setColor(lightModeColors.more80percent);
      } else if (value == 100) {
        setColor(lightModeColors.percent100);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    calculateColors(theme);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full bg-gray-200 rounded-full  h-1.5 mb-4 dark:bg-gray-700">
      <div
        className={`bg-blue-600 h-1.5 rounded-full ${color} dark:${color}`}
        style={{
          width: ` ${progress < 100 ? String(progress) + "%" : "100%"}`,
        }}
      ></div>
    </div>
  );
}
