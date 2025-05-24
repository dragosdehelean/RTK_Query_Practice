import { useGetPostsQuery } from './postsApi';

export const usePosts = () => {
  const { data, error, isLoading } = useGetPostsQuery();

  return {
    posts: data?.ids.map(id => data.entities[id]) ?? [],
    isLoading,
    error,
  };
};