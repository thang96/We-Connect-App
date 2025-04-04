import { useUserInfo } from "@hooks/index";
import { Comment, Send, ThumbUp } from "@mui/icons-material";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import classNames from "classnames";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";

const Post = ({
  id,
  fullName = "",
  authorId,
  createdAt,
  content = "",
  image,
  likes = [],
  comments = [],
  isLiked = false,
  onLike = () => {},
  onComment = () => {},
}) => {
  const userInfo = useUserInfo();
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [comment, setComment] = useState("");
  return (
    <div className="card">
      <div className="mb-3 flex gap-3">
        <Link to={`/users/${authorId}`}>
          <Avatar className="!bg-primary-main">
            {fullName?.[0]?.toUpperCase()}
          </Avatar>
        </Link>
        <div>
          <Link to={`/users/${authorId}`}>
            <p className="font-bold">{fullName}</p>
          </Link>
          <p className="text-sm text-dark-400">
            {dayjs(createdAt).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>
      </div>
      <p className="mb-1">{content}</p>
      {image && <img src={image} />}
      <div className="my-2 flex justify-between">
        <div className="flex gap-1 text-sm">
          <ThumbUp fontSize="small" className="text-primary-main" />
          <p>{likes.length}</p>
        </div>

        <div className="text-sm">
          <p>{comments.length} comments</p>
        </div>
      </div>
      <div className="flex border-b border-t border-dark-300 py-1 text-sm">
        <Button
          size="small"
          className={classNames("flex-1", {
            "text-primary-main": isLiked,
            "!text-dark-100": !isLiked,
          })}
          onClick={() => onLike(id)}
        >
          <ThumbUp
            fontSize="small"
            className={classNames("mr-1", { "text-primary-main": isLiked })}
          />{" "}
          Like
        </Button>
        <Button
          size="small"
          className="flex-1 !text-dark-100"
          onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}
        >
          <Comment fontSize="small" className="mr-1" /> Comment
        </Button>
      </div>
      {isCommentBoxOpen && (
        <>
          <div className="max-h-48 overflow-y-auto py-2">
            {[...comments].reverse().map((comment) => (
              <div key={comment._id} className="flex gap-2 px-4 py-2">
                <Avatar className="!h-6 !w-6 !bg-primary-main">
                  {comment.author?.fullName?.[0]?.toUpperCase()}
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-bold">{comment.author?.fullName}</p>
                    <p className="text-xs text-dark-400">
                      {dayjs(comment.createdAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card flex gap-2">
            <Avatar className="!h-6 !w-6 !bg-primary-main">
              {userInfo.fullName?.[0]?.toUpperCase()}
            </Avatar>
            <TextField
              className="flex-1"
              size="small"
              placeholder="Comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <IconButton
              onClick={() => {
                onComment({ comment, postId: id });
                setComment("");
                setIsCommentBoxOpen(false);
              }}
              disabled={!comment}
              data-testid="send-comment"
            >
              <Send className="text-primary-main" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};
export default Post;
