import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@components/Loading";

const AuthLayout = () => {
  return (
    <div className="bg-dark-200 flex h-screen items-center justify-center">
      <div className="h-fit w-[450px] bg-white px-8 py-10">
        <img src="/weconnect-logo.png" className="mx-auto mb-6" />
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
export default AuthLayout;
