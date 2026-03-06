import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
});

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  tagTypes: ["enums"],
  endpoints: (builder) => ({
    fetchEnums: builder.query({
      query: () => ({
        url: "/api/enums",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchEnumsQuery } = profileApi;
