import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../components/UI/BreadCrumb";
const Dinamic = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full min-w-[100vw] bg-cyan-500 p-10 dark:bg-[#2A2B2F]">
      <div className="container max-w-[1156px] px-[32px]">
        <Breadcrumb />
        <h1 className="text-2xl text-center dark:text-[#bfbfbf]">
          {pathname.slice(1)} Page is coming soon
        </h1>
      </div>
    </div>
  );
};

export default Dinamic;
