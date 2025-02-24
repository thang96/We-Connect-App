import { Check, Close } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { useGetPenddingFriendRequestQuery } from "@services/rootApi";

const FriendRequestItems = ({ fullName }) => {
  return (
    <div>
      <div className="flex items-center !space-x-1">
        <Avatar className="!bg-primary-main">
          {fullName?.[0].toUpperCase()}
        </Avatar>
        <p>{fullName}</p>
      </div>
      <div className="mt-2 flex !space-x-1">
        <Button variant="contained" size="small">
          <Check className="mr-1" fontSize="small" />
          Accept
        </Button>
        <Button variant="outlined" size="small">
          <Close className="mr-1" fontSize="small" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

const FriendRequests = () => {
  const { data = [], isFetching } = useGetPenddingFriendRequestQuery();
  const renderFriendRequestItems = () => {
    return data.map((user) => (
      <FriendRequestItems fullName={user?.fullName} key={user?._id} />
    ));
  };
  return (
    <div className="card">
      <p className="mb-4 font-bold">FriendRequests</p>
      <div className="space-y-4">{renderFriendRequestItems()}</div>
      <FriendRequestItems fullName={"SSS"} />
    </div>
  );
};

export default FriendRequests;
