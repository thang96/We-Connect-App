import { timeSince } from "@libs/utils";
import { ThumbUp, Comment } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";

const Post = ({
  fullName,
  createdAt,
  content = "",
  image = "",
  likes = [],
  comments = [],
}) => {
  const date = new Date(createdAt);
  
  return (
    <div className="card">
      <div className="mb-3 flex gap-3">
        <Avatar className="!bg-primary-main">
          {fullName?.[0].toUpperCase()}
        </Avatar>
        <div>
          <p className="font-bold">{fullName}</p>
          <p className="text-dark-400 text-sm">{timeSince(date)}</p>
        </div>
      </div>

      <p className="mb-1">{content}</p>
      {image && <img src={image} className="object-contain mx-auto" />}
      <div className="my-2 flex justify-between">
        <div className="flex gap-1 text-sm">
          <ThumbUp fontSize="small" className="text-primary-main" />
          <p>{likes.length}</p>
        </div>
        <div className="text-sm">
          <p>{comments.length} comments</p>
        </div>
      </div>
      <div className="border-dark-300 flex border-t p-1">
        <Button size="small" className="!text-dark-100 flex-1">
          <ThumbUp fontSize="small" className="mr-1" />
          Like
        </Button>
        <Button size="small" className="!text-dark-100 flex-1">
          <Comment fontSize="small" className="mr-1" />
          Comment
        </Button>
      </div>
    </div>
  );
};

export default Post;
