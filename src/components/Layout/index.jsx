import Main from "../Main";
import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import Dinamic from "../../pages/Dinamic/Dinamic";
import NotFound from "../../pages/NotFound";
import CalendarPage from "../../pages/Calendar/CalendarPage";
import HabitsDashboard from "../../pages/Habit/HabitsDashboard";
import HabitsPage from "../../pages/Habit/HabitsPage";
import PomodoroTimer from "../../pages/Pomodoro";
import ProfilePage from "../../pages/Profile/ProfilePage";
// import Registration from "../../pages/auth/Registration";
// import Login from "../../pages/auth/Login";

function Layout() {
  return (
    <>
      <Header />
      <main className="mt-[105px] pb-10 overflow-scroll">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/dashboard" element={<HabitsDashboard />} />
          <Route path="/habit" element={<HabitsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pomodoro" element={<PomodoroTimer />} />
          <Route path="/profile" element={<Dinamic />} />
          <Route path="/storage" element={<Dinamic />} />
          <Route path="/map" element={<Dinamic />} />
          <Route path="/settings" element={<Dinamic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default Layout;
