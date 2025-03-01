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
  sortComparer: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
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
            rootApi.util.updateQueryData("getPost", "allPosts", (draft) => {
              // draft.unshift(newPost);
              postsAdapter.addOne(draft, newPost);
            }),
          );

          try {
            const { data } = await queryFulfilled;
            dispatch(
              rootApi.util.updateQueryData("getPost", "allPosts", (draft) => {
                // const index = draft.findIndex((post) => post._id === tempId);
                // if (index !== -1) {
                // draft[index] = data;
                // }
                postsAdapter.removeOne(draft, tempId);
                postsAdapter.addOne(draft, data);
              }),
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
          return postsAdapter.upsertMany(currentCache, newItems.entities);
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
            rootApi.util.updateQueryData("getPost", "allPosts", (draft) => {
              const currentPost = draft.entities[args];
              if (currentPost) {
                currentPost.likes.push({
                  author: {
                    _id: store.auth.useInfo._id,
                    fullName: store.auth.useInfo.fullName,
                  },
                  _id: tempId,
                });
              }
            }),
          );

          try {
            const { data } = await queryFulfilled;
            dispatch(
              rootApi.util.updateQueryData("getPost", "allPosts", (draft) => {
                let currentPost = draft.entities[args];
                if (currentPost) {
                  currentPost.likes = currentPost.likes.map((like) => {
                    if (like._id === tempId) {
                      return {
                        author: {
                          _id: store.auth.useInfo._id,
                          fullName: store.auth.useInfo.fullName,
                        },
                        _id: data._id,
                        createAt: data.createAt,
                        updateAt: data.updateAt,
                        post: data.post,
                      };
                    }

                    return like;
                  });
                }
              }),
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

        onQueryStarted: async (
          args,
          { dispatch, queryFulfilled, getState },
        ) => {
          const store = getState();
          const tempId = crypto.randomUUID();

          const patchResult = dispatch(
            rootApi.util.updateQueryData("getPost", "allPosts", (draft) => {
              const currentPost = draft.entities[args];
              if (currentPost) {
                currentPost.likes.push({
                  author: {
                    _id: store.auth.useInfo._id,
                    fullName: store.auth.useInfo.fullName,
                  },
                  _id: tempId,
                });
              }
            }),
          );

          try {
            const { data } = await queryFulfilled;
            dispatch(
              rootApi.util.updateQueryData("getPost", "allPosts", (draft) => {
                let currentPost = draft.entities[args];
                if (currentPost) {
                  currentPost.likes = currentPost.likes.map((like) => {
                    if (like._id === tempId) {
                      return {
                        author: {
                          _id: store.auth.useInfo._id,
                          fullName: store.auth.useInfo.fullName,
                        },
                        _id: data._id,
                        createAt: data.createAt,
                        updateAt: data.updateAt,
                        post: data.post,
                      };
                    }

                    return like;
                  });
                }
              }),
            );
          } catch (error) {
            dispatch(openSnackBar({ message: error?.message }));
            patchResult.undo();
          }
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
