import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import API_URL from "../../envs/env";


export interface Post {
  id: number;
  title: string;
  userId: number;
}

const postsAdapter = createEntityAdapter<Post>();
const initialState = postsAdapter.getInitialState();

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  tagTypes: ["Posts"], // Adăugăm tag-ul pentru invalidare
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<Post>, void>({
      query: () => "posts",
      keepUnusedDataFor: 10,
      transformResponse: (response: Post[]) =>
        postsAdapter.setAll(initialState, response),
      providesTags: ["Posts"], // Marchează datele ca fiind asociate cu tag-ul 'Posts'
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"], // Invalidează cache-ul pentru 'Posts'
    }),
    updatePost: builder.mutation<Post, Partial<Post>>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Posts"], // Invalidează cache-ul pentru 'Posts'
    }),
    deletePost: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"], // Invalidează cache-ul pentru 'Posts'
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
