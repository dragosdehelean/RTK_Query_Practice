import React, { useState } from 'react';
import { useGetPostsQuery } from '../features/posts/postsApi';
import { useGetUsersQuery } from '../features/users/usersApi';
import { selectPostViewModels } from '../features/posts/selectors';
import { Link } from 'react-router-dom';

const PostsList = () => {
  const { data: postsData, isLoading: postsLoading } = useGetPostsQuery();
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();

  const [visiblePosts, setVisiblePosts] = useState(6); // Numărul inițial de posturi afișate

  if (postsLoading || usersLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  const postViewModels = selectPostViewModels(postsData, usersData);
  const currentPosts = postViewModels.slice(0, visiblePosts); // Afișează doar posturile vizibile

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 6); // Crește numărul de posturi afișate
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Posts</h1>
      <div className="row">
        {currentPosts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                  by{' '}
                  <Link to={`/users/${post.userId}`}>
                    {post.userName}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visiblePosts < postViewModels.length && (
        <div className="text-center mt-4 mb-5"> {/* Adăugăm o margine de jos */}
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default PostsList;