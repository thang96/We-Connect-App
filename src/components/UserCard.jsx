import { Check, Close, MessageOutlined, PersonAdd } from "@mui/icons-material";
import { Avatar } from "@mui/material";

import { Link } from "react-router-dom";
import { socket } from "@context/SocketProvider";
import ButtonLoading from "./ButtonLoading";
import { useAccepntFriendRequestMutation, useCancelFriendRequestMutation } from "@services/friendApi";

const UserCard = ({
  id,
  fullName = "",
  isFriend,
  requestSent,
  requestReceived,
}) => {
  const [sendFriendRequest, { isLoading }] = useSendFriendRequestMutation();
  const [accepntFriendRequest, { isLoading: isAccepting }] =
    useAccepntFriendRequestMutation();
  const [cancelFriendRequest, { isLoading: isCanceling }] =
    useCancelFriendRequestMutation();
    
  const getActionButtons = () => {
    if (isFriend) {
      return (
        <ButtonLoading
          onClick={() => {}}
          variant={"contained"}
          title={"Mesage"}
          size={"small"}
          isLoading={isLoading}
          icon={<MessageOutlined className="mr-1" fontSize="small" />}
        />
      );
    }

    if (requestSent) {
      return (
        <ButtonLoading
          disabled={requestSent}
          onClick={() => {}}
          variant={"contained"}
          title={"Request Sent"}
          size={"small"}
          isLoading={isLoading}
          icon={<Check className="mr-1" fontSize="small" />}
        />
      );
    }

    if (requestReceived) {
      return (
        <div>
          <ButtonLoading
            onClick={() => accepntFriendRequest(id)}
            variant={"contained"}
            title={"Accept"}
            size={"small"}
            isLoading={isAccepting}
            icon={<Check className="mr-1" fontSize="small" />}
          />
          <ButtonLoading
            onClick={() => cancelFriendRequest(id)}
            variant={"contained"}
            title={"Cancel"}
            size={"small"}
            isLoading={isCanceling}
            icon={<Close className="mr-1" fontSize="small" />}
          />
        </div>
      );
    }

    return (
      <ButtonLoading
        isLoading={isLoading}
        icon={<PersonAdd className="mr-1" fontSize="small" />}
        onClick={async () => {
          await sendFriendRequest(id)
            .unwrap()
            .then(() => {
              socket.emit("friendRequestSent", {
                receiverId: id,
              });
            });
        }}
        variant={"outlined"}
        title={"Add Friend"}
        size={"small"}
      />
    );
  };

  return (
    <div className="flex flex-col items-center bg-white py-3">
      <Avatar className="!bg-primary-main mb-3 !h-12 !w-12">
        {fullName[0]?.toUpperCase()}
      </Avatar>
      <Link>
        <p className="text-lg font-bold">{fullName}</p>
      </Link>
      <div className="mt-4">{getActionButtons()}</div>
    </div>
  );
};

export default UserCard;
