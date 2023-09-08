import React, { useState, useEffect, useContext } from "react";
import search from "../../assets/icons/search.svg";
import notification from "../../assets/icons/notification.svg";
import calendar from "../../assets/icons/calendar2.svg";
import user from "../../assets/icons/user.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import darknotification from "../../assets/icons/darknotification.svg";
import darkcalendar from "../../assets/icons/darkcalendar.svg";
import darksearch from "../../assets/icons/darksearch.svg";
import { Button } from "antd";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";

function Header() {
  const [showAvatar, setShowAvatar] = useState(false);

  const { theme, setTheme } = useContext(ThemeContext);

  let currentUTC = new Date();
  let uzbekistanTime = new Date(currentUTC.getTime() + 5 * 60 * 60 * 1000);
  let formattedDate = uzbekistanTime.toUTCString().slice(5, 16);
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    setTimeout(() => {
      navigate("/");
      location.reload();
    }, 1000);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAvatar(true);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const navigate = useNavigate();
  function navigateToProfile() {
    navigate("/profile");
  }

  return (
    <>
      <header className="max-w-[1272px] w-full h-[94px] flex items-center justify-center bg-white fixed top-0 right-0 z-[40] dark:bg-[#222327]">
        <div className="container max-w-[1156px] mx-auto px-[32px]">
          <nav className="h-[36px] flex items-center justify-between w-full ">
            <h1 className="text-[20px] blue font-exo-bold dark:text-[white]">
              Welcome back, Muhammadjon 👋
            </h1>
            <div className="flex items-center">
              <div className="flex gap-[22px] mr-2">
                <a href="#">
                  {theme === "dark" ? (
                    <img src={darksearch} alt="" />
                  ) : (
                    <img src={search} alt="" />
                  )}
                </a>
                <a href="#">
                  <img
                    src={`${
                      theme === "dark" ? darknotification : notification
                    }`}
                    alt=""
                  />
                </a>
                <a href="#">
                  <img
                    src={`${theme === "dark" ? darkcalendar : calendar}`}
                    alt=""
                  />
                </a>
              </div>
              <p className="grey text-[16px] mr-[22px] dark:text-[#FFFFFF80]">
                {formattedDate}
              </p>

              <Avatar className="avatar">
                {showAvatar ? (
                  <HoverCard className="">
                    <HoverCardTrigger asChild>
                      <AvatarImage
                        className="bg-white object-cover avatar cursor-pointer"
                        src={user}
                      />
                    </HoverCardTrigger>
                    <HoverCardContent
                      id="popOverContent"
                      className="flex w-80 h-[300px]  mr-[90px] mt-6 dark:bg-[#1C1D22]   border-none  dark:outline-[#737477]  flex-col items-center "
                    >
                      <img
                        className="h-[100px] w-[100px] mt-5"
                        src={user}
                        alt=""
                      />
                      <h2 className="text-[24px] mt-2 mb-2">
                        {localStorage.getItem("userName")}
                      </h2>
                      <AlertDialog className="dialog">
                        <Button
                          onClick={() => navigateToProfile()}
                          type="default"
                          className="outline-none dark:text-[white] text-black  mt-2  px-3"
                        >
                          More info
                        </Button>

                        <AlertDialogTrigger className="mt-3">
                          <Button
                            type="default"
                            className="outline-none dark:text-[white] text-black  px-8"
                          >
                            Logout
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="content text-white">
                          <AlertDialogHeader className="">
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently logout your account and after this you
                              need to sign in.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={logOut}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  <AvatarFallback className="avatar">
                    <Spin size="default" />
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
