import FriendRequests from "@components/FriendRequests";
import PostCreation from "@components/PostCreation";
import PostList from "@components/PostList";
import Sidebar from "@components/Sidebar";

const HomePage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <div className="max-w-[1/3vw]">
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
