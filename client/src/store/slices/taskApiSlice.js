import { apiSlice } from "./apiSlice";
import { usersApiSlice } from "./userApiSlice";
const TASKS_URL = "/api/tasks";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => ({
        url: `${TASKS_URL}/`,
      }),
    }),
    getDayTasks: builder.query({
      query: (day) => ({
        url: `${TASKS_URL}/${day}`,
      }),
    }),
  }),
});

export const { useGetAllTasksQuery, useGetDayTasksQuery } = usersApiSlice;
