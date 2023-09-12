import React from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
import LogoutDialog from "./Components/LogoutDialog";
import {
  ClockCircleOutlined,
  LineChartOutlined,
  InteractionOutlined,
} from "@ant-design/icons";
function AsideLeft() {
  return (
    <div className="w-[90px] h-full flex">
      <div
        id="aside_left"
        className="flex flex-col gap-[15px] pt-6 w-[90px] h-[100vh] items-center  bg-[#1C1D22] "
      >
        <a className="mb-3" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="6"
            viewBox="0 0 34 6"
            fill="none"
          >
            <circle cx="31" cy="3" r="3" fill="white" fill-opacity="0.2" />
            <circle cx="17" cy="3" r="3" fill="white" fill-opacity="0.4" />
            <circle cx="3" cy="3" r="3" fill="white" />
          </svg>
        </a>
        <NavLink to="/" className="a_hover" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="26"
            viewBox="0 0 24 26"
            fill="none"
            opacity={0.5}
          >
            <path
              d="M24 8.88887L14 4V5.46663L22.5 9.62219L14 13.7777V26L24 21.1111V8.88887Z"
              fill="white"
            />
            <path
              d="M0 17.1111L10 22V20.5334L1.49996 16.3778L10 12.2222V-7.62939e-06L0 4.88887V17.1111Z"
              fill="white"
            />
          </svg>
        </NavLink>
        <NavLink to="/dashboard" className="a_hover" href="#">
          <LineChartOutlined className="text-[22px] opacity-50 text-white  hover:opacity-100" />
        </NavLink>

        <NavLink to="/profile" className="a_hover" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            opacity={0.5}
          >
            <path
              d="M11 3.66666C8.97496 3.66666 7.33333 5.30828 7.33333 7.33333C7.33333 9.35837 8.97496 11 11 11C13.025 11 14.6667 9.35837 14.6667 7.33333C14.6667 5.30828 13.025 3.66666 11 3.66666ZM5.5 7.33333C5.5 4.29576 7.96243 1.83333 11 1.83333C14.0376 1.83333 16.5 4.29576 16.5 7.33333C16.5 10.3709 14.0376 12.8333 11 12.8333C7.96243 12.8333 5.5 10.3709 5.5 7.33333ZM7.33333 16.5C5.81455 16.5 4.58333 17.7312 4.58333 19.25C4.58333 19.7563 4.17293 20.1667 3.66667 20.1667C3.16041 20.1667 2.75 19.7563 2.75 19.25C2.75 16.7187 4.80203 14.6667 7.33333 14.6667H14.6667C17.198 14.6667 19.25 16.7187 19.25 19.25C19.25 19.7563 18.8396 20.1667 18.3333 20.1667C17.8271 20.1667 17.4167 19.7563 17.4167 19.25C17.4167 17.7312 16.1854 16.5 14.6667 16.5H7.33333Z"
              fill="white"
            />
          </svg>
        </NavLink>
        <NavLink to="/calendar" className="a_hover" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            opacity={0.5}
          >
            <path
              d="M8.25 1.83334C8.75626 1.83334 9.16667 2.24375 9.16667 2.75001V3.66668H12.8333V2.75001C12.8333 2.24375 13.2437 1.83334 13.75 1.83334C14.2563 1.83334 14.6667 2.24375 14.6667 2.75001V3.66668H17.4167C18.4292 3.66668 19.25 4.48749 19.25 5.50001V17.4167C19.25 18.4292 18.4292 19.25 17.4167 19.25H4.58333C3.57081 19.25 2.75 18.4292 2.75 17.4167V5.50001C2.75 4.48749 3.57081 3.66668 4.58333 3.66668H7.33333V2.75001C7.33333 2.24375 7.74374 1.83334 8.25 1.83334ZM7.33333 5.50001H4.58333V8.25001H17.4167V5.50001H14.6667V6.41668C14.6667 6.92294 14.2563 7.33334 13.75 7.33334C13.2437 7.33334 12.8333 6.92294 12.8333 6.41668V5.50001H9.16667V6.41668C9.16667 6.92294 8.75626 7.33334 8.25 7.33334C7.74374 7.33334 7.33333 6.92294 7.33333 6.41668V5.50001ZM17.4167 10.0833H4.58333V17.4167H17.4167V10.0833Z"
              fill="white"
            />
          </svg>
        </NavLink>

        <NavLink to="/pomodoro" className="a_hover" href="#">
          <ClockCircleOutlined className="text-[22px] opacity-50 text-white  hover:opacity-100" />
        </NavLink>

        <NavLink to="/habit" className="a_hover" href="#">
          <InteractionOutlined className="text-[22px] opacity-50 text-white  hover:opacity-100" />
        </NavLink>

        <LogoutDialog />
      </div>
    </div>
  );
}

export default AsideLeft;
