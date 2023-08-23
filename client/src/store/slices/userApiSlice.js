import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    getStats: builder.query({
      query: () => ({
        url: `${USERS_URL}/stats`,
      }),
      providesTags: ["User"],
    }),
    checkAuth: builder.query({
      query: () => ({
        url: `${USERS_URL}/check`,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `${USERS_URL}/forgot`,
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetStatsQuery,
  useCheckAuthQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = usersApiSlice;
