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

import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutDialog = () => {
  const navigate = useNavigate();
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
  return (
    <AlertDialog className="dialog">
      <AlertDialogTrigger>
        <a href="#" className="a_hover mt-[420px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            opacity={0.5}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.0833 18.3333C10.0833 17.8271 9.67293 17.4167 9.16667 17.4167H4.58333V4.58333H9.16667C9.67293 4.58333 10.0833 4.17293 10.0833 3.66667C10.0833 3.1604 9.67293 2.75 9.16667 2.75H4.58333C3.57081 2.75 2.75 3.57081 2.75 4.58333V17.4167C2.75 18.4292 3.57081 19.25 4.58333 19.25H9.16667C9.67293 19.25 10.0833 18.8396 10.0833 18.3333Z"
              fill="white"
            />
            <path
              d="M19.9041 11.6422C19.9891 11.5557 20.0534 11.4565 20.0971 11.3509C20.1416 11.2436 20.1663 11.126 20.1667 11.0027L20.1667 11L20.1667 10.9973C20.166 10.7636 20.0765 10.5301 19.8982 10.3518L16.2315 6.68515C15.8735 6.32717 15.2931 6.32717 14.9352 6.68515C14.5772 7.04313 14.5772 7.62353 14.9352 7.98151L17.037 10.0833H8.25C7.74374 10.0833 7.33333 10.4937 7.33333 11C7.33333 11.5063 7.74374 11.9167 8.25 11.9167H17.037L14.9352 14.0185C14.5772 14.3765 14.5772 14.9569 14.9352 15.3148C15.2931 15.6728 15.8735 15.6728 16.2315 15.3148L19.8975 11.6488L19.9041 11.6422Z"
              fill="white"
            />
          </svg>
        </a>
      </AlertDialogTrigger>
      <AlertDialogContent className="content text-white">
        <AlertDialogHeader className="">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently logout your
            account and after this you need to sign in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={logOut}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
