import Post from "./Post";
import Loading from "./Loading";
import { useLazyLoad } from "@hooks/index";

const PostList = () => {
  const { posts, isLoading, isFetching } = useLazyLoad();

  const renderPost = () => {
    return (posts || []).map((post) => (
      <Post
        key={post?._id}
        fullName={post.author?.fullName}
        createdAt={post.createdAt}
        content={post.content}
        image={post.image}
        likes={post.likes}
        comments={post.comments}
      />
    ));
  };

  if (isLoading) {
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
