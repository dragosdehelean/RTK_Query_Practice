import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export interface Post {
  id: number;
  title: string;
  userId: number;
}

const postsAdapter = createEntityAdapter<Post>();
const initialState = postsAdapter.getInitialState();

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<Post>, void>({
      query: () => 'posts',
      keepUnusedDataFor: 10,
      transformResponse: (response: Post[]) => postsAdapter.setAll(initialState, response),
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;