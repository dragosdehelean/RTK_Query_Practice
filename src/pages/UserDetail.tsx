import React from "react";
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "../features/users/usersApi";

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, isLoading } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.entities[Number(userId)],
      isLoading,
    }),
  });

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="alert alert-danger text-center mt-5">
        User not found.
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">{user.name}</h2>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="card-text">
            <strong>Company:</strong> {user.company?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
