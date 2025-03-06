import Post from "./Post";
import Loading from "./Loading";
import { useLazyLoadPosts, useUserInfo } from "@hooks/index";
import {
  useCreateCommentMutation,
  useLikePostMutation,
  useUnLikePostMutation,
} from "@services/postApi";
import { useCreateNotificationMutation } from "@services/notificationApi";

const PostList = () => {
  const { posts, isFetching } = useLazyLoadPosts();
  const [likePost] = useLikePostMutation();
  const [unLikePost] = useUnLikePostMutation();
  const [createNotification] = useCreateNotificationMutation();
  const [createComment] = useCreateCommentMutation();
  const userInfo = useUserInfo();
  const _id = userInfo ? userInfo._id : null;

  const renderPost = () => {
    return (posts || []).map((post) => {
      const likeStatus = (post.likes || []).some(
        (like) => like.author?._id === _id,
      );
      return (
        <Post
          key={post?._id} // Ensure unique key
          postId={post?._id}
          fullName={post.author?.fullName}
          createdAt={post.createdAt}
          content={post.content}
          image={post.image}
          likes={post.likes}
          isLiked={likeStatus}
          comments={post.comments}
          onLike={(postId) => {
            !likeStatus ? onLikePost(postId, post) : onUnLikePost(postId);
          }}
          onComment={async ({ comment, postId }) => {
            const res = await createComment({ comment, postId }).unwrap();

            if (post?.author?._id !== _id) {
              createNotification({
                userId: post?.author?._id,
                postId: post?._id,
                notificationType: "comment",
                notificationTypeId: res?._id,
              });
            }
          }}
        />
      );
    });
  };

  const onLikePost = async (postId, post) => {
    const res = await likePost(postId).unwrap();
    if (post?.author?._id !== _id) {
      createNotification({
        userId: post?.author?._id,
        postId: post?._id,
        notificationType: "like",
        notificationTypeId: res._id,
      });
    }
  };
  const onUnLikePost = (postId) => {
    unLikePost(postId);
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      {renderPost()}
      {isFetching && <Loading />}
    </div>
  );
};

export default PostList;
