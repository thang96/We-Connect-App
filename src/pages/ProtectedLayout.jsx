import Header from "@components/Header";
import Loading from "@components/Loading";
import SocketProvider from "@context/SocketProvider";
import { saveUserInfo } from "@redux/slices/authSlice";
import { useGetAuthUserQuery } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const response = useGetAuthUserQuery();
  const dispatch = useDispatch();
  // endpoint name + params

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(saveUserInfo(response.data));
    }
  }, [response.isSuccess, response.data, dispatch]);

  if (response.isLoading) {
    return <Loading />;
  }

  /*
  isLoading: no chi set thanh true o lan query dau tien
  isFetching: no chi set thanh true o lan query dau tien va khi API duoc refetch
  */

  // if (!response?.data?._id) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <SocketProvider>
      <div>
        <Header />
        <div className="bg-dark-200">
          <Outlet />
        </div>
      </div>
    </SocketProvider>
  );
};
export default ProtectedLayout;
