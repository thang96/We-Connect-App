import { useUserInfo } from "@hooks/useUserInfo";
import { Avatar, TextField } from "@mui/material";
import { openDialog } from "@redux/slices/dialogSlice";
import { useDispatch } from "react-redux";

const PostCreation = () => {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 rounded border-solid bg-white p-4 shadow-sm">
      <Avatar className="!bg-primary-main">
        {userInfo.fullName?.[0].toUpperCase()}
      </Avatar>
      <TextField
        className="flex-1"
        size="small"
        placeholder="What's on your mind?"
        onClick={() =>
          dispatch(
            openDialog({
              open: true,
              title: "Create Post",
              contentType: "NEW_POST_DIALOG",
              addtionalData: userInfo,
            }),
          )
        }
      />
    </div>
  );
};

export default PostCreation;
