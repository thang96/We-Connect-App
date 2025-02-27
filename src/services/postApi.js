import { createEntityAdapter } from "@reduxjs/toolkit";
import { rootApi } from "./rootApi";



/*
Entity Adapter giúp quán lý dữ liệu ở ngay trong redux và nó sẽ giúp
tiêu chuẩn hóa dữ liệu theo dạng 
{
  ids: [1, 2], entities: [{id: 1, content: 'abc'}, [{id: 2, content: 'xyz'},]
}
  nó cũng cung cấp thêm các methods để dễ dàng cập nhật dữ liệu được chuẩn hóa
  và tránh trùng lặp dữ liệu và tạo nơi lưu trữ dữ liệu tập chung
*/
const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
});
const initialState = postsAdapter.getInitialState();
export const postApi = rootApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createPost: builder.mutation({
        query: (formData) => {
          return {
            url: "/posts",
            method: "POST",
            body: formData,
          };
        },
        onQueryStarted: async (
          args,
          { dispatch, queryFulfilled, getState },
        ) => {
          const store = getState();
          const tempId = crypto.randomUUID();
          const newPost = {
            _id: tempId,
            likes: [],
            comments: [],
            content: args.get("content"),
            author: {
              notifications: [],
              _id: store.auth.useInfo._id,
              fullName: store.auth.useInfo.fullName,
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            __v: 0,
          };

          const patchResult = dispatch(
            rootApi.util.updateQueryData(
              "getPost",
              { limit: 10, offset: 0 },
              (draft) => {
                draft.unshift(newPost);
              },
            ),
          );

          try {
            const { data } = await queryFulfilled;
            dispatch(
              rootApi.util.updateQueryData(
                "getPost",
                { limit: 10, offset: 0 },
                (draft) => {
                  const index = draft.findIndex((post) => post._id === tempId);
                  if (index !== -1) {
                    draft[index] = data;
                  }
                },
              ),
            );
          } catch (error) {
            dispatch(openSnackBar({ message: error?.message }));
            patchResult.undo();
          }
        },
        // invalidatesTags: ["Post"],
      }),

      getPost: builder.query({
        query: ({ limit, offset } = {}) => {
          return {
            url: "/posts",
            method: "GET",
            params: { limit, offset },
          };
        },
        transformResponse: (response) => {
          return postsAdapter.upsertMany(initialState, response);
        },
        serializeQueryArgs: () => "allPosts",
        merge: (currentCache, newItems) => {
          //Gộp dữ liệu trước đó với dữ liệu mới sau này, nó luôn đảm bảo
          //dữ liệu sẽ không bị duplicate vì có 1 hệ thống ids duy nhất
          return postsAdapter.upsertMany(currentCache, newItems);
        },
        providesTags: ["Post"], // Provide the Post tag
      }),

      likePost: builder.mutation({
        query: (postId) => {
          return {
            url: `/posts/${postId}/like`,
            method: "POST",
          };
        },
        onQueryStarted: async (
          args,
          { dispatch, queryFulfilled, getState },
        ) => {
          const store = getState();
          const tempId = crypto.randomUUID();

          const patchResult = dispatch(
            rootApi.util.updateQueryData(
              "getPost",
              { limit: 10, offset: 0 },
              (draft) => {
                // draft.unshift(newPost);
                const currentPost = draft.find((post) => args === post._id);
                if (currentPost) {
                  currentPost.likes.push({
                    author: {
                      _id: store.auth.useInfo._id,
                      fullName: store.auth.useInfo.fullName,
                    },
                    _id: tempId,
                  });
                }
              },
            ),
          );

          try {
            const { data } = await queryFulfilled;
            dispatch(
              rootApi.util.updateQueryData(
                "getPost",
                { limit: 10, offset: 0 },
                (draft) => {
                  const currentPost = draft.findIndex(
                    (post) => post._id === tempId,
                  );
                  if (currentPost) {
                    const currentLike = currentPost.likes.find(
                      (like) => like._id === tempId,
                    );
                    if (currentLike) {
                      currentPost.likes.push({
                        author: {
                          _id: store.auth.useInfo._id,
                          fullName: store.auth.useInfo.fullName,
                        },
                        _id: data._id,
                        createAt: data.createAt,
                        updateAt: data.updateAt,
                        post: data.post,
                      });
                    }
                  }
                },
              ),
            );
          } catch (error) {
            dispatch(openSnackBar({ message: error?.message }));
            patchResult.undo();
          }
        },
      }),

      unLikePost: builder.mutation({
        query: (postId) => {
          return {
            url: `/posts/${postId}/unlike`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useLikePostMutation,
  useUnLikePostMutation,
} = rootApi;
