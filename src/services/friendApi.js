import { rootApi } from "./rootApi";

export const friendApi = rootApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      sendFriendRequest: builder.mutation({
        query: (userId) => {
          return {
            url: "/friends/request",
            method: "POST",
            body: {
              friendId: userId,
            },
          };
        },
        invalidatesTags: (result, error, args) => [
          { type: "Users", id: args },
          { type: "FriendPendingRequest", id: "LIST" },
        ], // Invalidate the Users tag
      }),

      getPenddingFriendRequest: builder.query({
        query: () => {
          return {
            url: "/friends/pending",
            method: "get",
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ _id }) => ({
                  type: "FriendPendingRequest",
                  id: _id,
                })),
                { type: "FriendPendingRequest", id: "LIST" },
              ]
            : [{ type: "FriendPendingRequest", id: "LIST" }],
      }),

      accepntFriendRequest: builder.mutation({
        query: (userId) => {
          return {
            url: "/friends/accept",
            method: "POST",
            body: {
              friendId: userId,
            },
          };
        },
        invalidatesTags: (result, error, args) => [
          { type: "Users", id: args },
          { type: "FriendPendingRequest", id: "LIST" },
        ], // Invalidate the Users and FriendPendingRequest tags
      }),

      cancelFriendRequest: builder.mutation({
        query: (userId) => {
          return {
            url: "/friends/cancel",
            method: "POST",
            body: {
              friendId: userId,
            },
          };
        },
        invalidatesTags: (result, error, args) => [
          { type: "Users", id: args },
          { type: "FriendPendingRequest", id: "LIST" },
        ], // Invalidate the Users and FriendPendingRequest tags
      }),
    };
  },
});

export const {
  useSendFriendRequestMutation,
  useGetPenddingFriendRequestQuery,
  useAccepntFriendRequestMutation,
  useCancelFriendRequestMutation,
} = rootApi;
