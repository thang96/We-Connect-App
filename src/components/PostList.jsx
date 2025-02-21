import { useGetPostQuery } from "@services/rootApi";
import Post from "./Post";

const PostList = () => {
  const { data, isLoading, isFetching } = useGetPostQuery();
  console.log(data);
  const renderPost = () => {
    return (data || []).map((post) => {
      return (
        <Post
          key={post?.id}
          fullName={post.fullName}
          createAt={post.createAt}
          content={post.content}
          image={post.image}
          likes={post.likes}
          comments={post.comments}
        />
      );
    });
  };
  return <div className="flex flex-col gap-4">{renderPost()}</div>;
};

export default PostList;
