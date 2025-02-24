import Loading from "@components/Loading";
import UserCard from "@components/UserCard";
import { useLazyLoadSearchUsers } from "@hooks/index";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchUserPage = () => {
  const location = useLocation();
  const searchQuery = location?.state?.searchTemp || "";

  const { users, isLoading, isFetching, loadMore } = useLazyLoadSearchUsers({
    searchQuery,
  });

  // useEffect(() => {
  //   if (!searchQuery) return;

  //   const checkAndLoadMore = () => {
  //     const contentHeight = document.documentElement.scrollHeight;
  //     const viewportHeight = window.innerHeight;
  //     if (contentHeight <= viewportHeight && !isFetching) {
  //       loadMore();
  //     }
  //   };

  //   checkAndLoadMore(); // Initial check
  //   window.addEventListener("resize", checkAndLoadMore);
  //   return () => {
  //     window.removeEventListener("resize", checkAndLoadMore);
  //   };
  // }, [isFetching, loadMore, searchQuery]);

  const renderUsers = () => {
    return (users || []).map((user) => (
      <UserCard
        key={user._id}
        id={user._id}
        fullName={user.fullName}
        isFriend={user.isFriend}
        requestSent={user.requestSent}
        requestReceived={user.requestReceived}
      />
    ));
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container flex-col">
      <p className="text-xl font-bold">Search</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {renderUsers()}
      </div>
      {isFetching && <Loading />}
    </div>
  );
};

export default SearchUserPage;
