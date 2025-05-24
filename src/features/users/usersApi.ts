import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
  company?: {
    name: string;
  };
}

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState();

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["Users"], // Adăugăm tag-ul pentru invalidare
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<User>, void>({
      query: () => "users",
      keepUnusedDataFor: 10,
      transformResponse: (response: User[]) =>
        usersAdapter.setAll(initialState, response),
      providesTags: ["Users"]
    }),
    getUser: builder.query<User, number>({
      query: (id) => ({ url: `users/${id}` }),
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation } = usersApi;
