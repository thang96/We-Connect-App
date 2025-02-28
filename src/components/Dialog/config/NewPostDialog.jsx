import ImageUploader from "@components/ImageUploader";
import {
  Avatar,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  TextareaAutosize,
} from "@mui/material";
import { closeDialog } from "@redux/slices/dialogSlice";
import { openSnackBar } from "@redux/slices/snackbarSlice";
import { useCreatePostMutation } from "@services/postApi";
import { useState } from "react";
import { useDispatch } from "react-redux";

const NewPostDialog = ({ userInfo }) => {
  const [createNewPost, { isLoading }] = useCreatePostMutation();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const hanlderCreateNewPost = async () => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);
    try {
      await createNewPost(formData).unwrap();
      setContent("");
      setImage(null);
      dispatch(closeDialog());
      dispatch(openSnackBar({ message: "Create Post Successfully" }));
    } catch (error) {
      dispatch(openSnackBar({ type: "error", message: error?.data?.message }));
    }
  };
  const isValid = !!(content || image);
  return (
    <div>
      <DialogContent>
        <div className="flex items-center gap-2">
          <Avatar className="!bg-primary-main !h-[32px] !w-[32px]">
            {userInfo.fullName?.[0].toUpperCase()}
          </Avatar>
          {userInfo.fullName}
        </div>
        <TextareaAutosize
          minRows={3}
          placeholder="What's on your mind?"
          className="border-dark-100 mt-4 w-full rounded border p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ImageUploader image={image} setImage={setImage} />
      </DialogContent>
      <DialogActions className="!px-6 !pt-0 !pb-5">
        <Button
          disabled={!isValid}
          onClick={hanlderCreateNewPost}
          fullWidth
          variant="contained"
        >
          {isLoading ? (
            <CircularProgress size={"16px"} color="inherit" />
          ) : (
            "Post"
          )}
        </Button>
      </DialogActions>
    </div>
  );
};

export default NewPostDialog;
