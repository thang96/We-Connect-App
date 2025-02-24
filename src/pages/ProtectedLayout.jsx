import Header from "@components/Headers";
import Loading from "@components/Loading";
import SocketProvider from "@context/SocketProvider";
import { saveUseInfo } from "@redux/slices/authSlice";
import { useGetAuthUserQuery } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const responce = useGetAuthUserQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (responce.isSuccess) {
      dispatch(saveUseInfo(responce.data));
    }
  }, [responce.isSuccess, responce.data, dispatch]);

  if (responce.isLoading) {
    return <Loading />;
  }

  return responce.data ? (
    <SocketProvider>
      <div className="bg-dark-200">
        <Header />
        <Outlet />
      </div>
    </SocketProvider>
  ) : (
    <div></div>
  );
};

export default ProtectedLayout;
