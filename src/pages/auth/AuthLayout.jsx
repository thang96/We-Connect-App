import Loading from "@components/Loading";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="">
      <div className="bg-dark-100 flex h-screen items-center justify-center">
        <div className="w-[450px] rounded-[6px] border-3 border-gray-200 bg-white px-8 py-10 shadow-md">
          <img
            src="/weconnect-logo.png"
            className="mx-auto mb-6"
            width={58}
            height={55}
            alt=""
          />
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
