import ImageUploader from "@components/ImageUploader";
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  TextareaAutosize,
} from "@mui/material";

const NewPostDialog = ({ userInfo }) => {
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
        />
        <ImageUploader />
      </DialogContent>
      <DialogActions className="!px-6 !pt-0 !pb-5">
        <Button fullWidth variant="contained">
          Post
        </Button>
      </DialogActions>
    </div>
  );
};

export default NewPostDialog