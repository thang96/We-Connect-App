import Loading from "@components/Loading";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
// Supports weights 100-900
import '@fontsource-variable/public-sans';

const RootLayout = () => {
  return (
    <>
      <div className=''>
        <Suspense fallback={<Loading/>}>
          <Outlet/>
        </Suspense>
      </div>
    </>
  );
};

export default RootLayout;