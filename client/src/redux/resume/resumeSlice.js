import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_RESUME;
export const resumeApi = createApi({
    reducerPath: "resumeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getResumes: builder.query({ query: () => "/" }),
        getResumeById: builder.query({ query: (id) => `/${id}`,}),
        addResume: builder.mutation({ query: (resume) => ({
                url: "/", method: "POST", body: resume }) }),
        updateResume: builder.mutation({ query: ({ id, updatedResume }) => ({
                url: `/${id}`, method: "PUT", body: updatedResume }) }),
        deleteResume: builder.mutation({ query: (id) => ({
                url: `/${id}`, method: "DELETE" }) }),
    }),
});

export const { useGetResumesQuery, useGetResumeByIdQuery, useAddResumeMutation,
    useUpdateResumeMutation, useDeleteResumeMutation } = resumeApi;
export default resumeApi;
