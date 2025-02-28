import Post from "./Post";
import Loading from "./Loading";
import { useLazyLoadPosts, useUserInfo } from "@hooks/index";
import { useLikePostMutation } from "@services/postApi";

const PostList = () => {
  const { posts, isFetching } = useLazyLoadPosts();
  const [likePost, { isLoading }] = useLikePostMutation();
  const { _id } = useUserInfo();

  const renderPost = () => {
    return (posts || []).map((post) => (
      <Post
        key={post?._id} // Ensure unique key
        postId={post?._id}
        fullName={post.author?.fullName}
        createdAt={post.createdAt}
        content={post.content}
        image={post.image}
        likes={post.likes}
        isLiked={(post.likes || []).some((like) => like.author?._id === _id)}
        comments={post.comments}
        onLike={(postId) => {
          likePost(postId);
        }}
      />
    ));
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
