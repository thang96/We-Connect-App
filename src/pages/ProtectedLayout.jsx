import Header from "@components/Headers";
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
    return <p>Loading...</p>;
  }

  return responce.data ? (
    <div className="">
      <Header />
      <Outlet />
    </div>
  ) : (
    <div></div>
  );
};

export default ProtectedLayout;
