import { apiSlice } from "./apiSlice";
import { usersApiSlice } from "./userApiSlice";
const TASKS_URL = "/api/tasks";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => ({
        url: `${TASKS_URL}/`,
      }),
      providesTags: ["Task"],
    }),
    getDayTasks: builder.query({
      query: (day) => ({
        url: `${TASKS_URL}/${day}`,
      }),
      providesTags: ["Task"],
    }),
    checkTask: builder.mutation({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Task"],
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task", "User"],
    }),
    deleteTasks: builder.mutation({
      query: (day) => ({
        url: `${TASKS_URL}/`,
        method: "DELETE",
        body: day,
      }),
      invalidatesTags: ["Task", "User"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetDayTasksQuery,
  useCheckTaskMutation,
  useAddTaskMutation,
  useDeleteTasksMutation,
} = usersApiSlice;
