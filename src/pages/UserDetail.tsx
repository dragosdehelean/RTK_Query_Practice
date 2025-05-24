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

  if (isLoading) return <p>Loading...</p>;

  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Company: {user.company?.name}</p>
    </div>
  );
};

export default UserDetail;
