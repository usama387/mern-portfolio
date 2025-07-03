import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = import.meta.env.VITE_PROJECT_BACKEND_URL;

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    credentials: "include",
    mode: "cors",
  }),
  // tags to refresh after mutations
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Project"],
    }),
    getAllProjects: builder.query({
      query: () => ({
        url: "/getAllProjects",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddProjectMutation, useGetAllProjectsQuery } = projectApi;
