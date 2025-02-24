import { login, logout } from "@redux/slices/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  // mode: 'no-cors', // Added mode: 'no-cors' for development purposes
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result?.error?.status === 401 ||
    result?.error?.data?.messsage === "Token has expired"
  ) {
    const refreshToken = api.getState().auth.refreshToken;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/refresh-token",
          body: { refreshToken },
          method: "POST",
        },
        api,
        extraOptions,
      );

      const newAccessToken = refreshResult?.data?.accessToken;

      if (newAccessToken) {
        api.dispatch(
          login({
            accessToken: newAccessToken,
            refreshToken,
          }),
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
        window.location.href = "/login";
      }
    }
  }

  return result;
};

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Post", "Users"], // Added tagTypes
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: ({ fullName, email, password }) => {
          return {
            url: "/signup",
            body: { fullName, email, password },
            method: "POST",
          };
        },
      }),

      login: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: "/login",
            body: { email, password },
            method: "POST",
          };
        },
      }),

      verifyOTP: builder.mutation({
        query: ({ email, otp }) => {
          return {
            url: "/verify-otp",
            body: { email, otp },
            method: "POST",
          };
        },
      }),

      refreshToken: builder.mutation({
        query: (refreshToken) => {
          return {
            url: "/refresh-token",
            body: { refreshToken },
            method: "POST",
          };
        },
      }),

      getAuthUser: builder.query({
        query: () => {
          return `/auth-user`;
        },
      }),

      createPost: builder.mutation({
        query: (formData) => {
          return {
            url: "/posts",
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: ["Post"], // Invalidate the Post tag
      }),

      getPost: builder.query({
        query: ({ limit, offset } = {}) => {
          return {
            url: "/posts",
            method: "GET",
            params: { limit, offset },
          };
        },
        providesTags: ["Post"], // Provide the Post tag
      }),

      searchUsers: builder.query({
        query: ({ limit, offset, searchQuery } = {}) => {
          const encodeQuery = encodeURIComponent(searchQuery.trim());
          return {
            url: `/search/users/${encodeQuery}`,
            method: "GET",
            params: { limit, offset },
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.users.map(({ _id }) => ({ type: "Users", id: _id })),
                { type: "Users", id: "LIST" },
              ]
            : [{ type: "Users", id: "LIST" }],
      }),

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
        invalidatesTags: ["Users"], // Invalidate the Users tag
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
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useRefreshTokenMutation,
  useGetAuthUserQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useSearchUsersQuery,
  useSendFriendRequestMutation,
  useGetPenddingFriendRequestQuery,
} = rootApi;
