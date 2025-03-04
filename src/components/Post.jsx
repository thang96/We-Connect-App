import { useUserInfo } from "@hooks/index";
import { timeSince, timeYYMMDD } from "@libs/utils";
import { ThumbUp, Comment, Send } from "@mui/icons-material";
import { Avatar, Button, TextField } from "@mui/material";
import classNames from "classnames";
import { useEffect, useState } from "react";

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
  const userInfo = useUserInfo();
  const [isShowComment, setIsShowComment] = useState(false);
  const [comment, setComment] = useState("");
 
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
        <Button
          size="small"
          className={classNames("!text-dark-100 flex-1", {
            "!text-primary-main": isShowComment,
          })}
          onClick={() => setIsShowComment(!isShowComment)}
        >
          <Comment fontSize="small" className="mr-1" />
          Comment
        </Button>
      </div>
      {isShowComment && (
        <>
          <div className="scroll-container mb-2 max-h-48 overflow-auto">
            {comments
              .slice()
              .reverse()
              .map((cmt) => (
                <div key={cmt._id} className="flex gap-2 px-4 py-4">
                  <Avatar className="!bg-primary-main !h-6 !w-6">
                    {userInfo?.fullName?.[0].toUpperCase()}
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-bold">{cmt.author?.fullName}</p>
                      <p className="text-dark-400 text-xs">
                        {timeYYMMDD(cmt.createdAt)}
                      </p>
                    </div>
                    <p>{cmt.comment}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="card flex items-center gap-2">
            <Avatar className="!bg-primary-main !h-5 !w-5">
              {userInfo?.fullName?.[0].toUpperCase()}
            </Avatar>
            <TextField
              className="flex-1"
              size="small"
              placeholder="Comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              disabled={!comment}
              onClick={() => {
                onComment({ comment, postId });
                setComment("");
              }}
            >
              <Send
                className={classNames("cursor-pointer", {
                  "text-primary-main": comment,
                })}
              />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
