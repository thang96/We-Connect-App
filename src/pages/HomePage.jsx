import FriendRequests from "@components/FriendRequests";
import PostCreation from "@components/PostCreation";
import PostList from "@components/PostList";
import Sidebar from "@components/Sidebar";

const HomePage = () => {
  return (
    <div className="bg-dark-200 flex gap-4 p-6">
      <Sidebar />
      <div className="flex-1">
        <PostCreation />
        <PostList />
      </div>
      <div className="hidden w-64 sm:block">
        <FriendRequests />
      </div>
    </div>
  );
};

export default HomePage;
