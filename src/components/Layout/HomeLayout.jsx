import AsideLeft from "../Aside/AsideLeft";
import AsideRight from "../Aside/AsideRight";
import Layout from "./index";

const HomeLayout = () => {
  return (
    <div className="h-auto w-[100vw]">
      <div className="flex w-full h-[100vh] overflow-hidden ">
        <div className="h-full flex w-[408px]">
          <AsideLeft />
          <AsideRight />
        </div>
        <Layout />
      </div>
    </div>
  );
};

export default HomeLayout;
