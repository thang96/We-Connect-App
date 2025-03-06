import { socket } from "@context/SocketProvider";
import { Check, Close } from "@mui/icons-material";
import { Avatar } from "@mui/material";

import { useEffect } from "react";
import ButtonLoading from "./ButtonLoading";
import {
  useAccepntFriendRequestMutation,
  useCancelFriendRequestMutation,
  useGetPenddingFriendRequestQuery,
} from "@services/friendApi";

const FriendRequestItems = ({ fullName, id }) => {
  const [accepntFriendRequest, { isLoading: isAccepting }] =
    useAccepntFriendRequestMutation();
  const [cancelFriendRequest, { isLoading: isCanceling }] =
    useCancelFriendRequestMutation();

  return (
    <div>
      <div className="flex items-center !space-x-1">
        <Avatar className="!bg-primary-main">
          {fullName?.[0].toUpperCase()}
        </Avatar>
        <p>{fullName}</p>
      </div>
      <div className="mt-2 flex !space-x-1">
        <ButtonLoading
          isLoading={isAccepting}
          icon={<Check className="mr-1" fontSize="small" />}
          onClick={async () => {
            await accepntFriendRequest(id).unwrap();
          }}
          variant={"contained"}
          title={"Accept"}
          size={"small"}
        />
        <ButtonLoading
          isLoading={isCanceling}
          icon={<Close className="mr-1" fontSize="small" />}
          onClick={async () => {
            await cancelFriendRequest(id).unwrap();
          }}
          title={"Cancel"}
          size={"small"}
        />
      </div>
    </div>
  );
};

const FriendRequests = () => {
  const { data = [], refetch } = useGetPenddingFriendRequestQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const renderFriendRequestItems = () => {
    return data.map((user) => (
      <FriendRequestItems
        key={user?._id}
        fullName={user?.fullName}
        id={user?._id}
      />
    ));
  };

  useEffect(() => {
    socket.on("friendRequestReceived", () => {
      console.log("friendRequestReceived", data);
      if (data) {
        refetch();
      }
    });
    return () => {
      socket.off("friendRequestReceived");
    };
  }, [data, refetch]);

  return (
    <div className="card">
      <p className="mb-4 font-bold">FriendRequests</p>
      <div className="space-y-4">{renderFriendRequestItems()}</div>
      {/* <FriendRequestItems fullName={"SSS"} /> */}
    </div>
  );
};

export default FriendRequests;
