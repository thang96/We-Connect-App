import FriendRequests from "@components/FriendRequests";
import PostCreation from "@components/PostCreation";
import PostList from "@components/PostList";
import Sidebar from "@components/Sidebar";

const HomePage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="flex flex-col flex-1 items-center justify-start w-[100%]">
        <div className="">
          <PostCreation />
          <PostList />
        </div>
      </div>
      <div className="hidden w-72 sm:block">
        <FriendRequests />
      </div>
    </div>
  );
};

export default HomePage;
