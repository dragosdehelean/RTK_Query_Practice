import React from 'react';
import { useGetPostsQuery } from '../features/posts/postsApi';
import { useGetUsersQuery } from '../features/users/usersApi';
import { selectPostViewModels } from '../features/posts/selectors';
import { Link } from 'react-router-dom';

const PostsList = () => {
  const { data: postsData, isLoading: postsLoading } = useGetPostsQuery();
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();

  if (postsLoading || usersLoading) return <p>Loading...</p>;

  const postViewModels = selectPostViewModels(postsData, usersData);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {postViewModels.map((post) => (
          <li key={post.id} data-testid="post-item">
            <strong>{post.title}</strong>
            <br />
            by{' '}
            <Link to={`/users/${post.userId}`}>
              {post.userName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;