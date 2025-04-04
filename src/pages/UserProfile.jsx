import { Avatar, Tab, Tabs } from "@mui/material";
import { theme } from "@configs/muiConfig";
import PostCreation from "@components/PostCreation";
import PostList from "@components/PostList";
import { useParams } from "react-router-dom";
import { useUserInfo } from "@hooks/index";

function UserProfile() {
  const { userId } = useParams();

  const { _id } = useUserInfo();

  const isMyProfile = userId === _id;

  const fullName = "Tung Nguyen";
  return (
    <div className="container flex-col">
      <div className="card relative p-0">
        <img
          className="h-36 object-cover sm:h-80"
          src="https://placehold.co/1920x540"
        />
        <div className="absolute mb-3 flex w-full -translate-y-1/3 transform flex-col items-center gap-3 px-6 sm:-translate-y-1/2 sm:flex-row sm:items-end">
          <Avatar className="!h-24 !w-24 border-4 border-white !bg-primary-main !text-6xl sm:!h-44 sm:!w-44">
            {fullName?.[0]?.toUpperCase()}
          </Avatar>
          <div className="text-center sm:text-left">
            <p className="max-w-80 truncate text-2xl font-bold sm:text-3xl">
              {fullName}
            </p>
            <p className="text-sm text-dark-400">123 Friends</p>
          </div>
        </div>
        <div className="pt-28">
          <div className="border-t border-dark-300 px-6 py-2">
            <Tabs
              value={0}
              sx={{
                "&& .Mui-selected": {
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                  borderRadius: "5px",
                },
                "&& .MuiTabs-indicator": {
                  display: "none",
                },

                "&& .MuiTab-root": {
                  minHeight: "auto",
                },

                "&& .MuiTabs-scroller": {
                  marginTop: "4px",
                },
              }}
            >
              <Tab label="About" />
              <Tab label="Friends" />
            </Tabs>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="hidden sm:block flex-[2] space-y-4">
          <div className="card">
            <p className="mb-3 text-lg font-bold">Introduction</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              optio corrupti libero delectus maiores culpa praesentium dicta
              adipisci animi laborum, temporibus reprehenderit quam pariatur
              saepe odit placeat vel velit ex?
            </p>
          </div>
          <div className="card">
            <p className="mb-3 text-lg font-bold">Photo</p>
          </div>
        </div>
        <div className="flex-[3]">
          <div className="flex flex-1 flex-col gap-4">
            {isMyProfile && <PostCreation />}
            <PostList />
          </div>
        </div>
      </div>
      {/* <Sidebar />
      <div className="flex-1 flex flex-col gap-4">
        <PostCreation />
        <PostList />
      </div>
      <div className="w-72 hidden sm:block">
        <FriendRequests />
      </div> */}
    </div>
  );
}

export default UserProfile;
