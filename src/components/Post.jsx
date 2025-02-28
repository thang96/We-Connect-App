import { timeSince } from "@libs/utils";
import { ThumbUp, Comment } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import classNames from "classnames";

const Post = ({
  postId,
  fullName,
  createdAt,
  content = "",
  image = "",
  likes = [],
  isLiked = false,
  comments = [],
  onLike = () => {},
  onComment = () => {},
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
      {image && <img src={image} className="mx-auto object-contain" />}
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
        <Button
          onClick={() => onLike(postId)}
          size="small"
          className={classNames("flex-1", {
            "!text-dark-100": !isLiked,
            "text-primary-main": isLiked,
          })}
        >
          <ThumbUp
            fontSize="small"
            className={classNames("mr-1", { "text-primary-main": isLiked })}
          />
          {isLiked ? "Unlike" : "Like"}
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
